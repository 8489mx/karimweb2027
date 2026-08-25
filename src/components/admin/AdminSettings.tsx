import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../../context/SettingsContext';
import { CheckCircle, Save, Loader2, Image as ImageIcon, Upload } from 'lucide-react';
import { compressImageToBlob } from '../../utils/imageCompression';

export function AdminSettings({ settings, updateSettings }: { settings: SiteSettings, updateSettings: any }) {
  const [whatsapp, setWhatsapp] = useState(settings.whatsappNumber || '');
  const [social, setSocial] = useState({
    instagram: settings.socialLinks?.instagram || '',
    tiktok: settings.socialLinks?.tiktok || '',
    facebook: settings.socialLinks?.facebook || '',
    snapchat: settings.socialLinks?.snapchat || '',
    youtube: settings.socialLinks?.youtube || ''
  });
  const [seo, setSeo] = useState({
    ogImage: settings.seo?.ogImage || '',
    title: settings.seo?.title || '',
    description: settings.seo?.description || ''
  });
  const [enableStore, setEnableStore] = useState(settings.enableStore !== false);
  
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadImage = async (file: File) => {
    try {
      setUploadingImage(true);
      const compressedBlob = await compressImageToBlob(file, 1200, 1200, 0.85); // good size for OG images
      const formData = new FormData();
      formData.append('image', compressedBlob, file.name.replace(/\.[^/.]+$/, "") + ".webp");
      
      
      const response = await fetch('/api/upload.php', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
        body: formData
      });
      
      
      const contentType = response.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");
      
      let url = "";
      if (isJson) {
          const data = await response.json();
          if (!response.ok) throw new Error(data.error);
          url = data.url;
      } else {
          url = URL.createObjectURL(file);
      }
      setSeo({ ...seo, ogImage: url });

      showToast('تم رفع الصورة بنجاح');
    } catch (err) {
      alert('حدث خطأ أثناء رفع الصورة');
    } finally {
      setUploadingImage(false);
    }
  };


  useEffect(() => {
    const hasUnsavedChanges = whatsapp !== (settings.whatsappNumber || '') || 
   JSON.stringify(social) !== JSON.stringify({
     instagram: settings.socialLinks?.instagram || '',
     tiktok: settings.socialLinks?.tiktok || '',
     facebook: settings.socialLinks?.facebook || '',
     snapchat: settings.socialLinks?.snapchat || '',
     youtube: settings.socialLinks?.youtube || ''
   }) || 
   JSON.stringify(seo) !== JSON.stringify({ ogImage: settings.seo?.ogImage || '', title: settings.seo?.title || '', description: settings.seo?.description || '' }) || 
   enableStore !== (settings.enableStore !== false);
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [whatsapp, social, seo, enableStore, settings]);

  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateSettings({ 
      whatsappNumber: whatsapp,
      socialLinks: social,
      seo: seo,
      enableStore: enableStore
    });
    setSaving(false);
    showToast('تم حفظ الإعدادات بنجاح');
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {toastMsg && (
        <div className="fixed bottom-4 left-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 backdrop-blur-md flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {toastMsg}
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold mb-4">إعدادات الاتصال</h2>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">رقم الواتساب لاستقبال الطلبات</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-4 focus:ring-brand-primary/10 transition-all text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all"
              dir="ltr"
            />
            <p className="text-xs text-slate-500 mt-2">أدخل الرقم متضمناً رمز الدولة (مثال: 201012345678)</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">حسابات التواصل الاجتماعي</h2>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">انستجرام (Instagram)</label>
              <input type="url" value={social.instagram} onChange={e => setSocial({...social, instagram: e.target.value})} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-4 focus:ring-brand-primary/10 transition-all text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all" dir="ltr" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">تيك توك (TikTok)</label>
              <input type="url" value={social.tiktok} onChange={e => setSocial({...social, tiktok: e.target.value})} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-4 focus:ring-brand-primary/10 transition-all text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all" dir="ltr" placeholder="https://tiktok.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">سناب شات (Snapchat)</label>
              <input type="url" value={social.snapchat} onChange={e => setSocial({...social, snapchat: e.target.value})} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-4 focus:ring-brand-primary/10 transition-all text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all" dir="ltr" placeholder="https://snapchat.com/add/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">يوتيوب (YouTube)</label>
              <input type="url" value={social.youtube} onChange={e => setSocial({...social, youtube: e.target.value})} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-4 focus:ring-brand-primary/10 transition-all text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all" dir="ltr" placeholder="https://youtube.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">فيسبوك (Facebook)</label>
              <input type="url" value={social.facebook} onChange={e => setSocial({...social, facebook: e.target.value})} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-4 focus:ring-brand-primary/10 transition-all text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all" dir="ltr" placeholder="https://facebook.com/..." />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">إعدادات المتجر (Store)</h2>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={enableStore} onChange={e => setEnableStore(e.target.checked)} />
              <div className={`block w-12 h-6 rounded-full transition-colors ${enableStore ? 'bg-brand-primary' : 'bg-slate-200'}`}></div>
              <div className={`absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${enableStore ? '-translate-x-6' : 'translate-x-0'}`}></div>
            </div>
            <div className="text-sm font-medium text-slate-600">
              تفعيل قسم المتجر (المنتجات) في الموقع
            </div>
          </label>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">محركات البحث (SEO)</h2>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] space-y-4">

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">صورة المشاركة (Social Media Image)</label>
            <div className="flex items-start gap-4 mb-6">
              <div 
                className="w-32 h-20 bg-slate-100 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden shrink-0 relative group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {seo.ogImage ? (
                  <>
                    <img src={seo.ogImage} alt="OG" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload className="w-5 h-5 text-white" />
                    </div>
                  </>
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-400" />
                )}
                {uploadingImage && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-brand-primary animate-spin" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-2 leading-relaxed">
                  هذه هي الصورة التي تظهر عندما تقوم بمشاركة رابط الموقع في واتساب، فيسبوك، انستجرام، وتويتر. 
                  <br/>يفضل أن تكون بمقاس 1200x630 بكسل.
                </p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleUploadImage(e.target.files[0]);
                    }
                  }}
                />
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  رفع صورة جديدة
                </button>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">عنوان الموقع (Meta Title)</label>
            <input type="text" value={seo.title} onChange={e => setSeo({...seo, title: e.target.value})} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-4 focus:ring-brand-primary/10 transition-all text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">وصف الموقع (Meta Description)</label>
            <textarea value={seo.description} onChange={e => setSeo({...seo, description: e.target.value})} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-4 focus:ring-brand-primary/10 transition-all text-slate-900 focus:outline-none focus:border-brand-primary min-h-[100px] resize-none"></textarea>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-2.5 px-8 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          حفظ الإعدادات
        </button>
      </div>

    </div>
  );
}

import { RichTextEditor } from './RichTextEditor';
import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../../context/SettingsContext';
import { CheckCircle, Save, Loader2 } from 'lucide-react';

export function AdminHeroAbout({ settings, updateSettings }: { settings: SiteSettings, updateSettings: any }) {
  const [cms, setCms] = useState({
    heroTitle: settings.cms?.heroTitle || '',
    heroSubtitle: settings.cms?.heroSubtitle || '',
    heroVideoUrl: settings.cms?.heroVideoUrl || '',
    aboutText: settings.cms?.aboutText || '',
    aboutVideoUrl: settings.cms?.aboutVideoUrl || '',
    aboutVideoThumbnail: settings.cms?.aboutVideoThumbnail || '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const hasUnsavedChanges = JSON.stringify(cms) !== JSON.stringify({
      heroTitle: settings.cms?.heroTitle || '',
      heroSubtitle: settings.cms?.heroSubtitle || '',
      heroVideoUrl: settings.cms?.heroVideoUrl || '',
      aboutText: settings.cms?.aboutText || '',
      aboutVideoUrl: settings.cms?.aboutVideoUrl || '',
      aboutVideoThumbnail: settings.cms?.aboutVideoThumbnail || '',
    });
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [cms, settings.cms]);

  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateSettings({ cms: { ...settings.cms, ...cms } });
    setSaving(false);
    showToast('تم حفظ المحتوى بنجاح');
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {toastMsg && (
        <div className="fixed bottom-4 left-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 backdrop-blur-md flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {toastMsg}
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold mb-4">القسم الرئيسي (Hero Section)</h2>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">العنوان الرئيسي</label>
            <input
              type="text"
              value={cms.heroTitle}
              onChange={(e) => setCms({...cms, heroTitle: e.target.value})}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-4 focus:ring-brand-primary/10 transition-all text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">النص الفرعي</label>
            <textarea
              value={cms.heroSubtitle}
              onChange={(e) => setCms({...cms, heroSubtitle: e.target.value})}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-4 focus:ring-brand-primary/10 transition-all text-slate-900 focus:outline-none focus:border-brand-primary min-h-[80px] resize-none"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">رابط فيديو الخلفية (Vimeo أو يوتيوب مباشر)</label>
            <input
              type="url"
              value={cms.heroVideoUrl}
              onChange={(e) => setCms({...cms, heroVideoUrl: e.target.value})}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-4 focus:ring-brand-primary/10 transition-all text-slate-900 focus:outline-none focus:border-brand-primary text-left"
              dir="ltr"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">قسم من أنا وفيديو الشرح (About / Explainer Video)</h2>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">رابط فيديو الشرح (YouTube / Vimeo / رابط MP4 أو Cloudflare)</label>
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=... أو https://vimeo.com/..."
              value={cms.aboutVideoUrl}
              onChange={(e) => setCms({...cms, aboutVideoUrl: e.target.value})}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-4 focus:ring-brand-primary/10 transition-all text-slate-900 focus:outline-none focus:border-brand-primary text-left"
              dir="ltr"
            />
            <p className="text-xs text-slate-400 mt-1">ضع رابط الفيديو الذي يشرح خدماتك وبرنامجك للمشتركين.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">رابط صورة الغلاف للفيديو (اختياري - Thumbnail)</label>
            <input
              type="url"
              placeholder="/assets/images/about/profile-photo.jpg أو رابط صورة خارجية"
              value={cms.aboutVideoThumbnail}
              onChange={(e) => setCms({...cms, aboutVideoThumbnail: e.target.value})}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-4 focus:ring-brand-primary/10 transition-all text-slate-900 focus:outline-none focus:border-brand-primary text-left"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">نبذة تفصيلية إضافية (اختياري)</label>
            <div dir="ltr"><RichTextEditor value={cms.aboutText} onChange={(val) => setCms({...cms, aboutText: val})} /></div>
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
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { SiteSettings } from '../../context/SettingsContext';
import { CheckCircle, Save, Loader2, Plus, Trash2, Upload, AlertCircle } from 'lucide-react';
import { SortableList, DragHandle } from './SortableList';
import { compressImageToBlob } from '../../utils/imageCompression';

export function AdminTestimonials({ settings, updateSettings }: { settings: SiteSettings, updateSettings: any }) {
  const [screenshots, setScreenshots] = useState<{url: string, id: string}[]>(() => ((Array.isArray(settings.whatsappScreenshots) ? settings.whatsappScreenshots : [])).map(url => ({ url, id: Math.random().toString(36).substr(2, 9) })));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const hasUnsavedChanges = JSON.stringify(screenshots.map(s => s.url)) !== JSON.stringify((Array.isArray(settings.whatsappScreenshots) ? settings.whatsappScreenshots : []));
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [screenshots, settings.whatsappScreenshots]);

  const [toastMsg, setToastMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateSettings({ whatsappScreenshots: screenshots.map(s => s.url) });
    setSaving(false);
    showToast('تم حفظ التقييمات بنجاح');
  };

  const handleUploadFile = async (file: File): Promise<string> => {
    const compressedBlob = await compressImageToBlob(file, 800, 1600, 0.85);
    const formData = new FormData();
    formData.append('image', compressedBlob, file.name.replace(/\.[^/.]+$/, "") + ".webp");
    
    
    const response = await fetch('/api/upload.php', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
      body: formData
    });
    
    
    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    
    if (isJson) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unknown upload error');
      }
      return data.url;
    } else {
      // Mock upload for preview environment
      return URL.createObjectURL(file);
    }
  
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setErrorMsg('');
    setUploading(true);
    try {
      const url = await handleUploadFile(file);
      const newScreenshots = [{ url, id: Math.random().toString(36).substr(2, 9) }, ...screenshots];
      setScreenshots(newScreenshots);
      await updateSettings({ whatsappScreenshots: newScreenshots.map(s => s.url) });
      showToast('تم رفع الصورة بنجاح');
    } catch (err: any) {
      setErrorMsg(err.message || 'فشل في رفع الصورة');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = async (index: number) => {
    if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
      const newScreenshots = [...screenshots];
      newScreenshots.splice(index, 1);
      setScreenshots(newScreenshots);
      await updateSettings({ whatsappScreenshots: newScreenshots.map(s => s.url) });
    }
  };

  
  const moveDown = (index: number) => {
    if (index === screenshots.length - 1) return;
    const newScreenshots = [...screenshots];
    const temp = newScreenshots[index + 1];
    newScreenshots[index + 1] = newScreenshots[index];
    newScreenshots[index] = temp;
    setScreenshots(newScreenshots);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {toastMsg && (
        <div className="fixed bottom-4 left-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 backdrop-blur-md flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {toastMsg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">صور تقييمات واتساب (Testimonials)</h2>
        <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white py-2 px-5 rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          رفع صورة جديدة
        </button>
        <input type="file" ref={fileInputRef} onChange={onFileChange} accept="image/*" className="hidden" />
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4" />
          {errorMsg}
        </div>
      )}

      <SortableList
        items={screenshots}
        onReorder={setScreenshots}
        keyExtractor={(item) => item.id}
        strategy="rect"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        renderItem={(item, index, dragHandleProps) => (
          <div className="relative group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all aspect-[9/16]">
            <img src={item.url} alt={`Testimonial ${index}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
              <div className="flex justify-between">
                <DragHandle {...dragHandleProps} className="p-1.5 bg-white/10 hover:bg-slate-300 rounded-xl text-slate-900" />
              </div>
              <button onClick={() => removeImage(index)} className="flex items-center justify-center gap-2 w-full py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-xl text-sm transition-colors font-medium">
                <Trash2 className="w-4 h-4" /> حذف
              </button>
            </div>
          </div>
        )}
      />
      {screenshots.length === 0 && !uploading && (
        <div className="text-center py-12 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 text-slate-500">
          لا توجد صور تقييمات مضافة.
        </div>
      )}

      <div className="pt-4 border-t border-slate-200 flex justify-end">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-2.5 px-8 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          تحديث ترتيب الصور
        </button>
      </div>
    </div>
  );
}

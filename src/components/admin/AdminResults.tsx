import React, { useState, useRef, useEffect } from 'react';
import { Trash2, Upload, AlertCircle } from 'lucide-react';
import { SortableList, DragHandle } from './SortableList';
import { compressImageToBlob } from '../../utils/imageCompression';

export function AdminResults({ settings, updateSettings }: { settings: any, updateSettings: any }) {
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);
  
  // Use a stable local state for sortable list that guarantees an ID for each item
  const [localResults, setLocalResults] = useState<any[]>(() => {
    const res = Array.isArray(settings.results) ? settings.results : [];
    return res.map((r: any) => ({
      ...r,
      id: r.id || Math.random().toString(36).substring(2, 9)
    }));
  });

  // Sync local results if settings.results changes externally
  useEffect(() => {
    const res = Array.isArray(settings.results) ? settings.results : [];
    // Only update if lengths differ to avoid overwriting local order during quick saves
    if (res.length !== localResults.length) {
      setLocalResults(res.map((r: any) => ({
        ...r,
        id: r.id || Math.random().toString(36).substring(2, 9)
      })));
    }
  }, [settings.results]);

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

  const handleAddResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!beforeFile || !afterFile) {
      setErrorMsg('الرجاء اختيار صورة قبل وصورة بعد');
      return;
    }

    setUploading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const beforeUrl = await handleUploadFile(beforeFile);
      const afterUrl = await handleUploadFile(afterFile);
      
      const newResult = {
        id: Math.random().toString(36).substring(2, 9),
        beforeImage: beforeUrl,
        afterImage: afterUrl,
      };

      const newLocalResults = [newResult, ...localResults];
      setLocalResults(newLocalResults);
      
      await updateSettings({
        results: newLocalResults
      });
      
      setSuccessMsg('تمت إضافة النتيجة بنجاح!');
      setBeforeFile(null);
      setAfterFile(null);
      if (beforeInputRef.current) beforeInputRef.current.value = '';
      if (afterInputRef.current) afterInputRef.current.value = '';
    } catch (err: any) {
      setErrorMsg(`خطأ في الرفع: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteResult = async (idToRemove: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه النتيجة؟')) return;
    
    const newLocalResults = localResults.filter((r: any) => r.id !== idToRemove);
    setLocalResults(newLocalResults);
    
    await updateSettings({ results: newLocalResults });
  };

  const handleReorder = (newItems: any[]) => {
    setLocalResults(newItems);
    updateSettings({ results: newItems });
  };

  return (
    <div className="max-w-4xl space-y-8 text-right" dir="rtl">
      <div className="bg-white border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6 rounded-3xl space-y-4">
        <h2 className="text-xl font-bold mb-6">إضافة نتيجة جديدة (قبل / بعد)</h2>
        
        {errorMsg && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        
        {successMsg && (
          <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleAddResult} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">صورة قبل (Before)</label>
              <input
                ref={beforeInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setBeforeFile(e.target.files?.[0] || null)}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">صورة بعد (After)</label>
              <input
                ref={afterInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setAfterFile(e.target.files?.[0] || null)}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full md:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            <Upload className="w-5 h-5" />
            {uploading ? 'جاري الرفع...' : 'رفع وحفظ النتيجة'}
          </button>
        </form>
      </div>

      <div className="bg-white border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-6 rounded-3xl space-y-4">
        <h2 className="text-xl font-bold mb-6">النتائج الحالية</h2>
        {localResults.length === 0 ? (
          <p className="text-slate-500">لا توجد نتائج مضافة بعد.</p>
        ) : (
          <SortableList
            items={localResults}
            onReorder={handleReorder}
            keyExtractor={(item) => item.id}
            strategy="rect"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            renderItem={(result, index, dragHandleProps) => (
              <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 relative group">
                <div className="flex h-48">
                  <div className="w-1/2 relative border-l border-slate-200">
                    <img src={result?.beforeImage} alt="Before" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">قبل</span>
                  </div>
                  <div className="w-1/2 relative">
                    <img src={result?.afterImage} alt="After" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 right-2 bg-brand-primary text-white text-xs px-2 py-1 rounded">بعد</span>
                  </div>
                </div>
                
                <div className="p-4 flex justify-between items-center bg-white/80">
                  <DragHandle {...dragHandleProps} className="p-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-500" />
                  <button
                    onClick={() => handleDeleteResult(result.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-colors shrink-0"
                    title="حذف النتيجة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
}

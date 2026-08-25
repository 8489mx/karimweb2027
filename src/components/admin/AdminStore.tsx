import { RichTextEditor } from './RichTextEditor';
import React, { useState, useEffect, useRef } from 'react';
import { SiteSettings } from '../../context/SettingsContext';
import { CheckCircle, Save, Loader2, Plus, Trash2, Image as ImageIcon, Upload, AlertCircle } from 'lucide-react';
import { SortableList, DragHandle } from './SortableList';
import { compressImageToBlob } from '../../utils/imageCompression';

const defaultProducts = [
    {
      id: 'demo-1',
      type: 'program',
      title: 'برنامج التضخيم الشامل',
      description: 'برنامج تدريبي متكامل لمدة 12 أسبوع مصمم لزيادة الكتلة العضلية بأقصى كفاءة مع خطة تغذية مرنة.',
      priceUSD: 49,
      originalPriceUSD: 65,
      priceEGP: 1500,
      originalPriceEGP: 2000,
      features: ['جدول تدريبي 5 أيام في الأسبوع', 'فيديوهات توضيحية لكل تمرين', 'خطة تغذية لزيادة الوزن', 'ملف متابعة الأوزان'],
      imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'demo-2',
      type: 'book',
      title: 'دليل الوصفات الصحية',
      description: 'أكثر من 50 وصفة صحية محسوبة السعرات والماكروز لمساعدتك في تحقيق هدفك بدون حرمان.',
      priceUSD: 19,
      originalPriceUSD: 29,
      priceEGP: 600,
      originalPriceEGP: 900,
      features: ['50+ وصفة سهلة التحضير', 'حساب السعرات والماكروز لكل وجبة', 'بدائل صحية للحلويات', 'قائمة مشتريات أسبوعية'],
      imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1000'
    }
];

export function AdminStore({ settings, updateSettings }: { settings: SiteSettings, updateSettings: any }) {
  
  const [products, setProducts] = useState<{id: string, title: string, description: string, priceUSD: number, priceEGP: number, originalPriceUSD?: number, originalPriceEGP?: number, imageUrl: string, type?: string, features?: string[]}[]>(() => {
    if (Array.isArray(settings.products) && settings.products.length > 0) return settings.products;
    return defaultProducts;
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const hasUnsavedChanges = JSON.stringify(products) !== JSON.stringify((Array.isArray(settings.products) ? settings.products : []));
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [products, settings.products]);

  const [toastMsg, setToastMsg] = useState('');
  const [uploadingFor, setUploadingFor] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateSettings({ products });
    setSaving(false);
    showToast('تم حفظ المنتجات بنجاح');
  };

  const addProduct = () => {
    setProducts([...products, { id: Date.now().toString(), title: '', description: '', priceUSD: 0, priceEGP: 0, originalPriceUSD: 0, originalPriceEGP: 0, imageUrl: '', type: 'program', features: [] }]);
  };

  const updateProduct = (index: number, field: string, value: any) => {
    const newProds = [...products];
    (newProds[index] as any)[field] = value;
    setProducts(newProds);
  };

  const removeProduct = (index: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      const newProds = [...products];
      newProds.splice(index, 1);
      setProducts(newProds);
    }
  };

  
  const moveDown = (index: number) => {
    if (index === products.length - 1) return;
    const newProgs = [...products];
    const temp = newProgs[index + 1];
    newProgs[index + 1] = newProgs[index];
    newProgs[index] = temp;
    setProducts(newProgs);
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
    if (!file || uploadingFor === null) return;
    
    setErrorMsg('');
    const indexToUpdate = uploadingFor;
    setUploadingFor(-1); // to show loading state but not null
    try {
      const url = await handleUploadFile(file);
      const newProds = [...products];
      newProds[indexToUpdate].imageUrl = url;
      setProducts(newProds);
      showToast('تم رفع صورة المنتج بنجاح');
    } catch (err: any) {
      setErrorMsg(err.message || 'فشل في رفع الصورة');
    } finally {
      setUploadingFor(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {toastMsg && (
        <div className="fixed bottom-4 left-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 backdrop-blur-md flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {toastMsg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">المنتجات / المتجر</h2>
        <button onClick={addProduct} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 py-2 px-5 rounded-xl transition-all duration-300 text-sm font-medium shadow-sm">
          <Plus className="w-4 h-4" /> إضافة منتج جديد
        </button>
      </div>
      
      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4" />
          {errorMsg}
        </div>
      )}

      <SortableList
        items={products}
        onReorder={setProducts}
        keyExtractor={(item, index) => item.id || `fallback-${index}`}
        strategy="vertical"
        className="space-y-4"
        renderItem={(prod, index, dragHandleProps) => (
          <div className="bg-white border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-2xl p-5 hover:shadow-md hover:border-slate-200 transition-all flex flex-col md:flex-row gap-6">
            <div className="flex flex-row md:flex-col items-center gap-2 text-slate-500">
              <DragHandle {...dragHandleProps} className="p-1" />
              <button onClick={() => removeProduct(index)} className="hover:text-red-400 p-1 md:mt-auto"><Trash2 className="w-4 h-4" /></button>
            </div>
            
            <div className="w-full md:w-40 shrink-0">
              <div className="aspect-square bg-white rounded-xl overflow-hidden border border-slate-200 relative group">
                {(prod.imageUrl || prod.image) ? (
                  <img src={(prod.imageUrl || prod.image)} alt={prod.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                    <ImageIcon className="w-8 h-8 opacity-20" />
                    <span className="text-xs">لا توجد صورة</span>
                  </div>
                )}
                
                <button 
                  onClick={() => { setUploadingFor(index); fileInputRef.current?.click(); }}
                  disabled={uploadingFor === -1 || uploadingFor === index}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-slate-900"
                >
                  {uploadingFor === index || uploadingFor === -1 ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">اسم المنتج</label>
                  <input type="text" value={prod.title || prod.name} onChange={(e) => updateProduct(index, 'title', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all" />
                </div>
                <div>
      <label className="block text-xs font-bold text-emerald-600 mb-1">السعر النهائي ($ USD)</label>
      <input type="number" value={prod.priceUSD || prod.price || 0} onChange={(e) => updateProduct(index, 'priceUSD', parseFloat(e.target.value) || 0)} className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all" dir="ltr" />
    </div>
    <div>
      <label className="block text-xs font-bold text-emerald-600 mb-1">السعر النهائي (EGP)</label>
      <input type="number" value={prod.priceEGP || 0} onChange={(e) => updateProduct(index, 'priceEGP', parseFloat(e.target.value) || 0)} className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all" dir="ltr" />
    </div>
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1">السعر الأصلي ($) (لإظهار الخصم)</label>
      <input type="number" value={prod.originalPriceUSD || 0} onChange={(e) => updateProduct(index, 'originalPriceUSD', parseFloat(e.target.value) || 0)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200 transition-all" dir="ltr" />
    </div>
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1">السعر الأصلي (EGP) (لإظهار الخصم)</label>
      <input type="number" value={prod.originalPriceEGP || 0} onChange={(e) => updateProduct(index, 'originalPriceEGP', parseFloat(e.target.value) || 0)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200 transition-all" dir="ltr" />
    </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">وصف المنتج</label>
                <div dir="ltr"><RichTextEditor value={prod.description || ""} onChange={(val) => updateProduct(index, 'description', val)} /></div>
              </div>
            </div>
          </div>
        )}
      />
      {products.length === 0 && (
        <div className="text-center py-10 text-slate-500 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
          لا توجد منتجات مضافة.
        </div>
      )}

      <input type="file" ref={fileInputRef} onChange={onFileChange} accept="image/*" className="hidden" />

      <div className="pt-4 border-t border-slate-200 flex justify-end">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-2.5 px-8 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          حفظ المنتجات
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../../context/SettingsContext';
import { CheckCircle, Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { SortableList, DragHandle } from './SortableList';

export function AdminFAQ({ settings, updateSettings }: { settings: SiteSettings, updateSettings: any }) {
  const [faqs, setFaqs] = useState<{q: string, a: string, id: string}[]>(() => ((Array.isArray(settings.faq) ? settings.faq : [])).map((f: any) => ({ ...f, id: f.id || Math.random().toString(36).substr(2, 9) })));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const hasUnsavedChanges = JSON.stringify(faqs.map(f => ({ q: f.q, a: f.a }))) !== JSON.stringify((Array.isArray(settings.faq) ? settings.faq : []));
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [faqs, settings.faq]);

  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateSettings({ faq: faqs.map(f => ({ q: f.q, a: f.a })) });
    setSaving(false);
    showToast('تم حفظ الأسئلة الشائعة بنجاح');
  };

  const addFaq = () => {
    setFaqs([...faqs, { q: '', a: '', id: Math.random().toString(36).substr(2, 9) }]);
  };

  const updateFaq = (index: number, field: 'q' | 'a', value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const removeFaq = (index: number) => {
    if (confirm('هل أنت متأكد من حذف هذا السؤال؟')) {
      const newFaqs = [...faqs];
      newFaqs.splice(index, 1);
      setFaqs(newFaqs);
    }
  };

  
  const moveDown = (index: number) => {
    if (index === faqs.length - 1) return;
    const newFaqs = [...faqs];
    const temp = newFaqs[index + 1];
    newFaqs[index + 1] = newFaqs[index];
    newFaqs[index] = temp;
    setFaqs(newFaqs);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {toastMsg && (
        <div className="fixed bottom-4 left-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 backdrop-blur-md flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {toastMsg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">الأسئلة الشائعة (FAQ)</h2>
        <button
          onClick={addFaq}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 py-2 px-5 rounded-xl transition-all duration-300 text-sm font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" />
          إضافة سؤال جديد
        </button>
      </div>

      <SortableList
        items={faqs}
        onReorder={setFaqs}
        keyExtractor={(item) => item.id}
        strategy="vertical"
        className="space-y-4"
        renderItem={(faq, index, dragHandleProps) => (
          <div className="bg-white border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-2xl p-5 hover:shadow-md hover:border-slate-200 transition-all flex gap-4">
            <div className="flex flex-col items-center gap-2 pt-2 text-slate-500">
              <DragHandle {...dragHandleProps} />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">السؤال</label>
                <input
                  type="text"
                  value={faq.q}
                  onChange={(e) => updateFaq(index, 'q', e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">الإجابة</label>
                <textarea
                  value={faq.a}
                  onChange={(e) => updateFaq(index, 'a', e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 min-h-[80px] resize-y transition-all"
                ></textarea>
              </div>
            </div>
            <div className="pt-6">
              <button
                onClick={() => removeFaq(index)}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="حذف السؤال"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      />
      {faqs.length === 0 && (
        <div className="text-center py-10 text-slate-500 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
          لا توجد أسئلة شائعة مضافة. اضغط على "إضافة سؤال جديد" للبدء.
        </div>
      )}

      <div className="pt-4 border-t border-slate-200 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-2.5 px-8 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          حفظ الأسئلة الشائعة
        </button>
      </div>
    </div>
  );
}

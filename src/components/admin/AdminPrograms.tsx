import { RichTextEditor } from './RichTextEditor';
import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../../context/SettingsContext';
import { CheckCircle, Save, Loader2, Plus, Trash2, FileEdit } from 'lucide-react';
import { SortableList, DragHandle } from './SortableList';

export function AdminPrograms({ settings, updateSettings }: { settings: SiteSettings, updateSettings: any }) {
  const [programs, setPrograms] = useState<{id: string, title: string, description: string}[]>((Array.isArray(settings.programs) ? settings.programs : []));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const hasUnsavedChanges = JSON.stringify(programs) !== JSON.stringify((Array.isArray(settings.programs) ? settings.programs : []));
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [programs, settings.programs]);

  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateSettings({ programs });
    setSaving(false);
    showToast('تم حفظ البرامج/الخدمات بنجاح');
  };

  const addProgram = () => {
    setPrograms([...programs, { id: Date.now().toString(), title: '', description: '' }]);
  };

  const updateProgram = (index: number, field: 'title' | 'description', value: string) => {
    const newProgs = [...programs];
    newProgs[index][field] = value;
    setPrograms(newProgs);
  };

  const removeProgram = (index: number) => {
    if (confirm('هل أنت متأكد من الحذف؟')) {
      const newProgs = [...programs];
      newProgs.splice(index, 1);
      setPrograms(newProgs);
    }
  };

  
  const moveDown = (index: number) => {
    if (index === programs.length - 1) return;
    const newProgs = [...programs];
    const temp = newProgs[index + 1];
    newProgs[index + 1] = newProgs[index];
    newProgs[index] = temp;
    setPrograms(newProgs);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {toastMsg && (
        <div className="fixed bottom-4 left-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 backdrop-blur-md flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {toastMsg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">البرامج وطريقة العمل (Programs & Process)</h2>
        <button onClick={addProgram} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 py-2 px-5 rounded-xl transition-all duration-300 text-sm font-medium shadow-sm">
          <Plus className="w-4 h-4" /> إضافة خطوة/خدمة
        </button>
      </div>

      <SortableList
        items={programs}
        onReorder={setPrograms}
        keyExtractor={(item) => item.id}
        strategy="vertical"
        className="space-y-4"
        renderItem={(prog, index, dragHandleProps) => (
          <div className="bg-white border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-2xl p-5 hover:shadow-md hover:border-slate-200 transition-all flex gap-4">
            <div className="flex flex-col items-center gap-2 pt-2 text-slate-500">
              <DragHandle {...dragHandleProps} />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">العنوان</label>
                <input type="text" value={prog.title} onChange={(e) => updateProgram(index, 'title', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">الوصف</label>
                <div dir="ltr"><RichTextEditor value={prog.description || ""} onChange={(val) => updateProgram(index, 'description', val)} /></div>
              </div>
            </div>
            <div className="pt-6">
              <button onClick={() => removeProgram(index)} className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors" title="حذف">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      />
      {programs.length === 0 && (
        <div className="text-center py-10 text-slate-500 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
          لا توجد برامج مضافة.
        </div>
      )}

      <div className="pt-4 border-t border-slate-200 flex justify-end">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-2.5 px-8 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          حفظ البرامج
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { SiteSettings } from '../../context/SettingsContext';
import { Save, Plus, Trash2, Tag, CheckCircle, XCircle, Link as LinkIcon, Check, Users } from 'lucide-react';

export function AdminPromos({ settings, updateSettings }: { settings: SiteSettings, updateSettings: any }) {
  const [promos, setPromos] = useState<{id: string, code: string, discountPercentage: number, isActive: boolean}[]>(
    settings.promos && Array.isArray(settings.promos) ? settings.promos : []
  );
  const [saving, setSaving] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const addPromo = () => {
    setPromos([...promos, { id: Date.now().toString(), code: '', discountPercentage: 10, isActive: true }]);
  };

  const updatePromo = (index: number, field: keyof typeof promos[0], value: string | number | boolean) => {
    const newPromos = [...promos];
    newPromos[index] = { ...newPromos[index], [field]: value };
    setPromos(newPromos);
  };

  const removePromo = (index: number) => {
    setPromos(promos.filter((_, i) => i !== index));
  };

  const save = async () => {
    setSaving(true);
    await updateSettings({ promos });
    setSaving(false);
  };

  const copyPromoLink = (code: string) => {
    if (!code) return;
    const url = new URL(window.location.href);
    const link = `${url.origin}/checkout?promo=${code}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(code);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const getPromoStats = (code: string) => {
    if (!settings.orders || !Array.isArray(settings.orders)) return { count: 0, revenue: 0, currency: 'EGP' };
    const codeUpper = code.trim().toUpperCase();
    if (!codeUpper) return { count: 0, revenue: 0, currency: 'EGP' };
    
    let count = 0;
    let revenue = 0;
    
    settings.orders.forEach((order: any) => {
      if (order.status === 'completed' && order.promoCode && order.promoCode.toUpperCase() === codeUpper) {
        count++;
        revenue += typeof order.amount === 'number' ? order.amount : parseFloat(order.amount) || 0;
      }
    });
    
    return { count, revenue, currency: 'EGP' };
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Tag className="w-6 h-6 text-emerald-500" />
          أكواد الخصم (Promo Codes)
        </h2>
        <button 
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white py-2.5 px-6 rounded-xl transition-all font-medium disabled:opacity-50"
        >
          {saving ? <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span> : <Save className="w-5 h-5" />}
          حفظ التعديلات
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
        <div className="mb-6">
          <p className="text-slate-500 text-sm leading-relaxed">
            يمكنك إضافة أكواد خصم ليستخدمها العملاء في صفحة الدفع للحصول على تخفيض بنسبة مئوية.<br/>
            💡 <strong className="text-emerald-600">نظام الروابط الذكية:</strong> اضغط على علامة (الرابط) بجوار الكود لنسخ رابط مباشر، بمجرد أن يدخل عليه العميل سيتم تطبيق الخصم تلقائياً دون أن يكتبه!
          </p>
        </div>

        <div className="space-y-4">
          {promos.map((promo, index) => {
            const stats = getPromoStats(promo.code);
            return (
            <div key={promo.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 rounded-2xl border border-slate-200 bg-slate-50/50 items-center transition-all hover:border-emerald-200">
              <div className="md:col-span-3 relative">
                <label className="block text-xs font-medium text-slate-500 mb-1">كود الخصم</label>
                <input 
                  type="text" 
                  value={promo.code} 
                  onChange={(e) => updatePromo(index, 'code', e.target.value.toUpperCase())}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 font-en font-bold uppercase focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                  placeholder="مثال: KARIM20"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1">الخصم (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    min="1"
                    max="100"
                    value={promo.discountPercentage} 
                    onChange={(e) => updatePromo(index, 'discountPercentage', Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-8 text-slate-900 font-en font-bold focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                </div>
              </div>

              <div className="md:col-span-3 flex flex-col justify-center">
                <label className="block text-xs font-medium text-slate-500 mb-1">مرات الاستخدام (طلبات مكتملة)</label>
                <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 flex items-center justify-between">
                  <span className="font-bold text-slate-700 font-en">{stats.count}</span>
                  <Users className="w-4 h-4 text-slate-400" />
                </div>
              </div>
              
              <div className="md:col-span-2 flex items-center justify-center gap-3 md:mt-5">
                <button
                  type="button"
                  onClick={() => updatePromo(index, 'isActive', !promo.isActive)}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors w-full ${promo.isActive ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
                >
                  {promo.isActive ? <><CheckCircle className="w-4 h-4" /> فعال</> : <><XCircle className="w-4 h-4" /> معطل</>}
                </button>
              </div>

              <div className="md:col-span-2 flex items-center justify-end gap-2 md:mt-5">
                <button 
                  onClick={() => copyPromoLink(promo.code)}
                  disabled={!promo.code}
                  className={`flex-1 md:flex-none h-10 w-10 rounded-xl flex items-center justify-center transition-all ${
                    copiedLink === promo.code 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                  title="نسخ رابط الخصم المباشر"
                >
                  {copiedLink === promo.code ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => removePromo(index)}
                  className="flex-1 md:flex-none h-10 w-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                  title="حذف كود الخصم"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            );
          })}
        </div>

        <button 
          onClick={addPromo}
          className="mt-6 w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-medium hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          إضافة كود خصم جديد
        </button>
      </div>
    </div>
  );
}

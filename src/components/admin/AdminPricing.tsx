import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../../context/SettingsContext';
import { CheckCircle, Save, Loader2, ChevronDown } from 'lucide-react';
import { PRICING_DATA } from '../../config/pricing';

const COUNTRIES = [
  { code: 'EG', name: 'مصر', currency: 'EGP' },
  { code: 'SA', name: 'السعودية', currency: 'SAR' },
  { code: 'AE', name: 'الإمارات', currency: 'AED' },
  { code: 'KW', name: 'الكويت', currency: 'KWD' },
  { code: 'QA', name: 'قطر', currency: 'QAR' },
  { code: 'BH', name: 'البحرين', currency: 'BHD' },
  { code: 'OTHER', name: 'باقي دول العالم', currency: 'USD' }
];

export function AdminPricing({ settings, updateSettings }: { settings: SiteSettings, updateSettings: any }) {
  const [pricing, setPricing] = useState(settings.pricing || PRICING_DATA);
  const [durations, setDurations] = useState(settings?.packagesData?.durations || { '3m': 'اشتراك 3 شهور', '6m': 'اشتراك 6 شهور' });
  const [selectedCountry, setSelectedCountry] = useState('EG');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const hasUnsavedChanges = JSON.stringify(pricing) !== JSON.stringify(settings.pricing || PRICING_DATA) || JSON.stringify(durations) !== JSON.stringify(settings?.packagesData?.durations || { '3m': 'اشتراك 3 شهور', '6m': 'اشتراك 6 شهور' });
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [pricing, settings.pricing, durations, settings.packagesData]);

  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateSettings({ pricing, packagesData: { ...(settings.packagesData || {}), durations } });
    setSaving(false);
    showToast('تم حفظ الأسعار بنجاح');
  };

  const updatePrice = (country: string, packageCode: string, duration: string, field: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setPricing(prev => ({
      ...prev,
      [country]: {
        ...prev[country],
        [packageCode]: {
          ...prev[country][packageCode],
          [duration]: {
            ...prev[country][packageCode][duration],
            [field]: numValue
          }
        }
      }
    }));
  };

  const countryData = pricing[selectedCountry];

  return (
    <div className="space-y-8 max-w-4xl">
      {toastMsg && (
        <div className="fixed bottom-4 left-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 backdrop-blur-md flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {toastMsg}
        </div>
      )}

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6">
        <h3 className="text-lg font-bold mb-4">مسميات مدد الاشتراك (تطبق على جميع الباقات والدول)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-500 mb-1">المدة الأولى</label>
            <input type="text" value={durations['3m']} onChange={e => setDurations({...durations, '3m': e.target.value})} className="w-full bg-slate-50 rounded-xl px-4 py-2 text-slate-900 border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm text-slate-500 mb-1">المدة الثانية</label>
            <input type="text" value={durations['6m']} onChange={e => setDurations({...durations, '6m': e.target.value})} className="w-full bg-slate-50 rounded-xl px-4 py-2 text-slate-900 border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all" />
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold">تعديل باقات التدريب والأسعار</h2>
        <div className="relative">
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-brand-primary min-w-[200px]"
          >
            {COUNTRIES.map(c => (
              <option key={c.code} value={c.code}>{c.name} ({c.currency})</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        </div>
      </div>

      <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-6">
        <div className="space-y-8">
          
          {/* Elite Package */}
          <div>
            <h3 className="text-xl font-black text-slate-800 mb-4 border-b border-slate-200 pb-3 flex items-center gap-2"><span className="w-2 h-6 bg-slate-800 rounded-full inline-block"></span>باقة Elite المتميزة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group">
                <h4 className="font-bold mb-4 text-slate-800 flex items-center justify-between">{durations['3m']}<span className="text-[10px] font-normal bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Elite</span></h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">السعر النهائي (بعد الخصم)</label>
                    <div className="relative">
                      <input type="number" value={countryData?.elite?.['3m']?.finalAmount || 0} onChange={e => updatePrice(selectedCountry, 'elite', '3m', 'finalAmount', e.target.value)} className="w-full bg-slate-50 rounded-xl pr-12 pl-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 border border-slate-200 transition-all font-mono" dir="ltr" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">{countryData?.currency}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">السعر الأصلي (لإظهار الخصم)</label>
                    <div className="relative">
                      <input type="number" value={countryData?.elite?.['3m']?.originalAmount || 0} onChange={e => updatePrice(selectedCountry, 'elite', '3m', 'originalAmount', e.target.value)} className="w-full bg-slate-50 rounded-xl pr-12 pl-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 border border-slate-200 transition-all font-mono" dir="ltr" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">{countryData?.currency}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">الشهور الأساسية</label>
                      <input type="number" value={countryData?.elite?.['3m']?.baseDurationMonths || 0} onChange={e => updatePrice(selectedCountry, 'elite', '3m', 'baseDurationMonths', e.target.value)} className="w-full bg-slate-50 rounded-xl pr-12 pl-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 border border-slate-200 transition-all font-mono !py-1.5 !px-3 text-sm" dir="ltr" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">الشهور الهدية</label>
                      <input type="number" value={countryData?.elite?.['3m']?.freeMonths || 0} onChange={e => updatePrice(selectedCountry, 'elite', '3m', 'freeMonths', e.target.value)} className="w-full bg-slate-50 rounded-xl pr-12 pl-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 border border-slate-200 transition-all font-mono !py-1.5 !px-3 text-sm" dir="ltr" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group">
                <h4 className="font-bold mb-4 text-slate-800 flex items-center justify-between">{durations['6m']}<span className="text-[10px] font-normal bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Elite</span></h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">السعر النهائي (بعد الخصم)</label>
                    <div className="relative">
                      <input type="number" value={countryData?.elite?.['6m']?.finalAmount || 0} onChange={e => updatePrice(selectedCountry, 'elite', '6m', 'finalAmount', e.target.value)} className="w-full bg-slate-50 rounded-xl pr-12 pl-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 border border-slate-200 transition-all font-mono" dir="ltr" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">{countryData?.currency}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">السعر الأصلي (لإظهار الخصم)</label>
                    <div className="relative">
                      <input type="number" value={countryData?.elite?.['6m']?.originalAmount || 0} onChange={e => updatePrice(selectedCountry, 'elite', '6m', 'originalAmount', e.target.value)} className="w-full bg-slate-50 rounded-xl pr-12 pl-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 border border-slate-200 transition-all font-mono" dir="ltr" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">{countryData?.currency}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">الشهور الأساسية</label>
                      <input type="number" value={countryData?.elite?.['6m']?.baseDurationMonths || 0} onChange={e => updatePrice(selectedCountry, 'elite', '6m', 'baseDurationMonths', e.target.value)} className="w-full bg-slate-50 rounded-xl pr-12 pl-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 border border-slate-200 transition-all font-mono !py-1.5 !px-3 text-sm" dir="ltr" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">الشهور الهدية</label>
                      <input type="number" value={countryData?.elite?.['6m']?.freeMonths || 0} onChange={e => updatePrice(selectedCountry, 'elite', '6m', 'freeMonths', e.target.value)} className="w-full bg-slate-50 rounded-xl pr-12 pl-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 border border-slate-200 transition-all font-mono !py-1.5 !px-3 text-sm" dir="ltr" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Max Package */}
          <div>
            <h3 className="text-xl font-black text-[#E5B951] mb-4 border-b border-[#E5B951]/20 pb-3 flex items-center gap-2"><span className="w-2 h-6 bg-[#E5B951] rounded-full inline-block"></span>باقة MAX الشاملة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-[#E5B951]/30 shadow-sm hover:shadow-md hover:border-[#E5B951]/60 transition-all group">
                <h4 className="font-bold mb-4 text-[#C4952D] flex items-center justify-between">{durations['3m']}<span className="text-[10px] font-normal bg-[#E5B951]/10 text-[#C4952D] px-2 py-0.5 rounded-full">MAX</span></h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">السعر النهائي (بعد الخصم)</label>
                    <div className="relative">
                      <input type="number" value={countryData?.max?.['3m']?.finalAmount || 0} onChange={e => updatePrice(selectedCountry, 'max', '3m', 'finalAmount', e.target.value)} className="w-full bg-[#E5B951]/5 rounded-xl pr-12 pl-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-[#E5B951] focus:ring-4 focus:ring-[#E5B951]/10 border border-[#E5B951]/20 transition-all font-mono hover:border-[#E5B951]/40" dir="ltr" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">{countryData?.currency}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">السعر الأصلي (لإظهار الخصم)</label>
                    <div className="relative">
                      <input type="number" value={countryData?.max?.['3m']?.originalAmount || 0} onChange={e => updatePrice(selectedCountry, 'max', '3m', 'originalAmount', e.target.value)} className="w-full bg-[#E5B951]/5 rounded-xl pr-12 pl-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-[#E5B951] focus:ring-4 focus:ring-[#E5B951]/10 border border-[#E5B951]/20 transition-all font-mono hover:border-[#E5B951]/40" dir="ltr" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">{countryData?.currency}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">الشهور الأساسية</label>
                      <input type="number" value={countryData?.max?.['3m']?.baseDurationMonths || 0} onChange={e => updatePrice(selectedCountry, 'max', '3m', 'baseDurationMonths', e.target.value)} className="w-full bg-[#E5B951]/5 rounded-xl pr-12 pl-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-[#E5B951] focus:ring-4 focus:ring-[#E5B951]/10 border border-[#E5B951]/20 transition-all font-mono hover:border-[#E5B951]/40 !py-1.5 !px-3 text-sm" dir="ltr" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">الشهور الهدية</label>
                      <input type="number" value={countryData?.max?.['3m']?.freeMonths || 0} onChange={e => updatePrice(selectedCountry, 'max', '3m', 'freeMonths', e.target.value)} className="w-full bg-[#E5B951]/5 rounded-xl pr-12 pl-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-[#E5B951] focus:ring-4 focus:ring-[#E5B951]/10 border border-[#E5B951]/20 transition-all font-mono hover:border-[#E5B951]/40 !py-1.5 !px-3 text-sm" dir="ltr" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E5B951]/30 shadow-sm hover:shadow-md hover:border-[#E5B951]/60 transition-all group">
                <h4 className="font-bold mb-4 text-[#C4952D] flex items-center justify-between">{durations['6m']}<span className="text-[10px] font-normal bg-[#E5B951]/10 text-[#C4952D] px-2 py-0.5 rounded-full">MAX</span></h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">السعر النهائي (بعد الخصم)</label>
                    <div className="relative">
                      <input type="number" value={countryData?.max?.['6m']?.finalAmount || 0} onChange={e => updatePrice(selectedCountry, 'max', '6m', 'finalAmount', e.target.value)} className="w-full bg-[#E5B951]/5 rounded-xl pr-12 pl-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-[#E5B951] focus:ring-4 focus:ring-[#E5B951]/10 border border-[#E5B951]/20 transition-all font-mono hover:border-[#E5B951]/40" dir="ltr" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">{countryData?.currency}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">السعر الأصلي (لإظهار الخصم)</label>
                    <div className="relative">
                      <input type="number" value={countryData?.max?.['6m']?.originalAmount || 0} onChange={e => updatePrice(selectedCountry, 'max', '6m', 'originalAmount', e.target.value)} className="w-full bg-[#E5B951]/5 rounded-xl pr-12 pl-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-[#E5B951] focus:ring-4 focus:ring-[#E5B951]/10 border border-[#E5B951]/20 transition-all font-mono hover:border-[#E5B951]/40" dir="ltr" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">{countryData?.currency}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">الشهور الأساسية</label>
                      <input type="number" value={countryData?.max?.['6m']?.baseDurationMonths || 0} onChange={e => updatePrice(selectedCountry, 'max', '6m', 'baseDurationMonths', e.target.value)} className="w-full bg-[#E5B951]/5 rounded-xl pr-12 pl-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-[#E5B951] focus:ring-4 focus:ring-[#E5B951]/10 border border-[#E5B951]/20 transition-all font-mono hover:border-[#E5B951]/40 !py-1.5 !px-3 text-sm" dir="ltr" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">الشهور الهدية</label>
                      <input type="number" value={countryData?.max?.['6m']?.freeMonths || 0} onChange={e => updatePrice(selectedCountry, 'max', '6m', 'freeMonths', e.target.value)} className="w-full bg-[#E5B951]/5 rounded-xl pr-12 pl-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-[#E5B951] focus:ring-4 focus:ring-[#E5B951]/10 border border-[#E5B951]/20 transition-all font-mono hover:border-[#E5B951]/40 !py-1.5 !px-3 text-sm" dir="ltr" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
          حفظ أسعار {COUNTRIES.find(c => c.code === selectedCountry)?.name}
        </button>
      </div>
    </div>
  );
}

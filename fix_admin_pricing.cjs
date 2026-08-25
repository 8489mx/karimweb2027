const fs = require('fs');

let content = fs.readFileSync('src/components/admin/AdminPricing.tsx', 'utf8');

// Add durations state
content = content.replace(
  /const \[pricing, setPricing\] = useState\(settings\.pricing \|\| PRICING_DATA\);/,
  `const [pricing, setPricing] = useState(settings.pricing || PRICING_DATA);
  const [durations, setDurations] = useState(settings?.packagesData?.durations || { '3m': 'اشتراك 3 شهور', '6m': 'اشتراك 6 شهور' });`
);

// Add durations to hasUnsavedChanges
content = content.replace(
  /const hasUnsavedChanges = JSON.stringify\(pricing\) !== JSON.stringify\(settings\.pricing \|\| PRICING_DATA\);/,
  `const hasUnsavedChanges = JSON.stringify(pricing) !== JSON.stringify(settings.pricing || PRICING_DATA) || JSON.stringify(durations) !== JSON.stringify(settings?.packagesData?.durations || { '3m': 'اشتراك 3 شهور', '6m': 'اشتراك 6 شهور' });`
);

// Update dependencies array
content = content.replace(
  /\[pricing, settings\.pricing\]\);/,
  `[pricing, settings.pricing, durations, settings.packagesData]);`
);

// Modify handleSave
content = content.replace(
  /await updateSettings\(\{ pricing \}\);/,
  `await updateSettings({ pricing, packagesData: { ...(settings.packagesData || {}), durations } });`
);

// Replace hardcoded "اشتراك 3 شهور" and "اشتراك 6 شهور"
content = content.replace(/>اشتراك 3 شهور</g, `>{durations['3m']}<`);
content = content.replace(/>اشتراك 6 شهور</g, `>{durations['6m']}<`);

// Add durations UI
content = content.replace(
  /<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">/,
  `<div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6">
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">`
);

fs.writeFileSync('src/components/admin/AdminPricing.tsx', content);


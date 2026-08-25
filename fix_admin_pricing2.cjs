const fs = require('fs');

let content = fs.readFileSync('src/components/admin/AdminPricing.tsx', 'utf8');

// Modify updatePrice to handle any field type
content = content.replace(
  /const updatePrice = \(country: string, packageCode: string, duration: string, field: 'finalAmount' \| 'originalAmount', value: string\) => \{/,
  `const updatePrice = (country: string, packageCode: string, duration: string, field: string, value: string) => {`
);

// Add baseDurationMonths and freeMonths inputs to each pricing block
const blockToReplace = /<label className="block text-xs text-slate-500 mb-1">السعر الأصلي \(لإظهار الخصم\)<\/label>\s*<div className="relative">\s*<input type="number" value=\{countryData\?\.([a-z]+)\?\.\['([36]m)'\]\?\.originalAmount \|\| 0\} onChange=\{e => updatePrice\(selectedCountry, '([a-z]+)', '([36]m)', 'originalAmount', e\.target\.value\)\} className="(.*?)" dir="ltr" \/>\s*<span className="absolute right-3 top-1\/2 -translate-y-1\/2 text-xs text-slate-500">\{countryData\?\.currency\}<\/span>\s*<\/div>\s*<\/div>/g;

content = content.replace(blockToReplace, (match, p1, p2, p3, p4, inputClass) => {
  return `${match}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">الشهور الأساسية</label>
                      <input type="number" value={countryData?.${p1}?.['${p2}']?.baseDurationMonths || 0} onChange={e => updatePrice(selectedCountry, '${p1}', '${p2}', 'baseDurationMonths', e.target.value)} className="${inputClass} !py-1.5 !px-3 text-sm" dir="ltr" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">الشهور الهدية</label>
                      <input type="number" value={countryData?.${p1}?.['${p2}']?.freeMonths || 0} onChange={e => updatePrice(selectedCountry, '${p1}', '${p2}', 'freeMonths', e.target.value)} className="${inputClass} !py-1.5 !px-3 text-sm" dir="ltr" />
                    </div>
                  </div>`;
});

fs.writeFileSync('src/components/admin/AdminPricing.tsx', content);


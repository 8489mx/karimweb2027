const fs = require('fs');

const tsPath = 'src/components/ui/CustomSelect.tsx';
let tsContent = fs.readFileSync(tsPath, 'utf8');

tsContent = tsContent.replace(
  'className={`w-full bg-white border rounded-xl px-4 py-3 text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all flex items-center justify-between shadow-sm cursor-pointer ${isOpen ? \'border-brand-primary ring-1 ring-brand-primary\' : \'border-brand-border\'}`}',
  'className={`w-full bg-white border rounded-xl px-4 py-3.5 text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all flex items-center justify-between shadow-sm cursor-pointer text-lg ${isOpen ? \'border-brand-primary ring-1 ring-brand-primary\' : \'border-brand-border\'}`}'
);

fs.writeFileSync(tsPath, tsContent);

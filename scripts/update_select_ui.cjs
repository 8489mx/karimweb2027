const fs = require('fs');

const selectPath = 'src/components/ui/CustomSelect.tsx';
let selectContent = fs.readFileSync(selectPath, 'utf8');

const oldBtnClass = '`w-full bg-white border rounded-xl px-4 py-3.5 text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all flex items-center justify-between shadow-sm cursor-pointer text-lg ${isOpen ? \'border-brand-primary ring-1 ring-brand-primary\' : \'border-brand-border\'}`';
const newBtnClass = '`w-full border rounded-2xl px-4 py-3.5 text-brand-text focus:outline-none transition-all duration-300 flex items-center justify-between cursor-pointer text-lg ${isOpen ? \'bg-white border-brand-primary/50 ring-2 ring-brand-primary/20 shadow-[0_4px_16px_rgba(0,0,0,0.06)]\' : \'bg-white/60 border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.04)] backdrop-blur-md hover:bg-white/80 hover:shadow-[0_6px_16px_rgba(0,0,0,0.06)]\'}`';

selectContent = selectContent.replace(oldBtnClass, newBtnClass);

const oldDropClass = '"absolute z-50 w-[95vw] md:w-max md:min-w-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-brand-border rounded-xl shadow-xl overflow-hidden py-1"';
const newDropClass = '"absolute z-50 w-[95vw] md:w-max md:min-w-full left-1/2 -translate-x-1/2 mt-2 bg-white/95 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden py-1"';

selectContent = selectContent.replace(oldDropClass, newDropClass);

fs.writeFileSync(selectPath, selectContent);
console.log('Updated CustomSelect.tsx');

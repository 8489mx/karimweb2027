const fs = require('fs');

let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

// Reduce footer padding
content = content.replace(
  '<footer className="relative bg-white pt-16 pb-8 border-t border-slate-100 overflow-hidden">',
  '<footer className="relative bg-white pt-8 pb-4 border-t border-slate-100 overflow-hidden">'
);

// Reduce grid bottom margin and gap
content = content.replace(
  '<div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12 items-center" dir={dir}>',
  '<div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-4 mb-6 items-center" dir={dir}>'
);

// We should also check other margins inside the contact section
content = content.replace(
  '<h3 className="text-[17px] font-bold text-slate-900 mb-4 font-sans text-center">',
  '<h3 className="text-[17px] font-bold text-slate-900 mb-2 font-sans text-center">'
);

content = content.replace(
  '<a href="mailto:info@karimzakaria.com" dir="ltr" className="group flex items-center justify-center gap-3 w-full lg:w-auto mb-5">',
  '<a href="mailto:info@karimzakaria.com" dir="ltr" className="group flex items-center justify-center gap-3 w-full lg:w-auto mb-3">'
);

fs.writeFileSync(path, content);

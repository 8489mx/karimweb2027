const fs = require('fs');
let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '<div className="md:col-span-12 lg:col-span-6 flex flex-col items-center lg:items-end justify-end lg:mt-auto pt-4 lg:pt-0">',
  '<div className="md:col-span-12 lg:col-span-6 flex flex-col items-center justify-end lg:mt-auto pt-4 lg:pt-0">'
);

content = content.replace(
  '<h3 className="text-[17px] font-bold text-slate-900 mb-6 font-sans">',
  '<h3 className="text-[17px] font-bold text-slate-900 mb-6 font-sans text-center">'
);
content = content.replace(
  '<h3 className="text-[17px] font-bold text-slate-900 mb-6 font-sans text-center lg:text-end">',
  '<h3 className="text-[17px] font-bold text-slate-900 mb-6 font-sans text-center">'
);

content = content.replace(
  '<a href="mailto:info@karimzakaria.com" dir="ltr" className="group flex items-center justify-center lg:justify-start gap-3 w-full lg:w-auto mb-8">',
  '<a href="mailto:info@karimzakaria.com" dir="ltr" className="group flex items-center justify-center gap-3 w-full lg:w-auto mb-8">'
);

fs.writeFileSync(path, content);

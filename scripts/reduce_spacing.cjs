const fs = require('fs');

let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '<h3 className="text-[17px] font-bold text-slate-900 mb-6 font-sans text-center">',
  '<h3 className="text-[17px] font-bold text-slate-900 mb-4 font-sans text-center">'
);

content = content.replace(
  '<a href="mailto:info@karimzakaria.com" dir="ltr" className="group flex items-center justify-center gap-3 w-full lg:w-auto mb-8">',
  '<a href="mailto:info@karimzakaria.com" dir="ltr" className="group flex items-center justify-center gap-3 w-full lg:w-auto mb-5">'
);

fs.writeFileSync(path, content);

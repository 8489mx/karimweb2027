const fs = require('fs');

let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace column 1 span
content = content.replace(
  'md:col-span-12 lg:col-span-5 flex flex-col',
  'md:col-span-12 lg:col-span-6 flex flex-col'
);

// Remove column 2
const col2Start = '          {/* Column 2: Quick Links (Spans 3 cols on lg) */}';
const col3Start = '          {/* Column 3: Contact & Social (Spans 4 cols on lg) */}';

const startIdx = content.indexOf(col2Start);
const endIdx = content.indexOf(col3Start);

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + content.substring(endIdx);
}

// Replace column 3 span
content = content.replace(
  'md:col-span-6 lg:col-span-4 flex flex-col items-center justify-end',
  'md:col-span-12 lg:col-span-6 flex flex-col items-center lg:items-end justify-end'
);

// Also we should align contact to the right (end) for lg if column 1 is on the left
content = content.replace(
  '<h3 className="text-[17px] font-bold text-slate-900 mb-6 font-sans text-center">',
  '<h3 className="text-[17px] font-bold text-slate-900 mb-6 font-sans text-center lg:text-end">'
);

content = content.replace(
  '<a href="mailto:info@karimzakaria.com" dir="ltr" className="group flex items-center justify-center gap-3 w-full mb-8">',
  '<a href="mailto:info@karimzakaria.com" dir="ltr" className="group flex items-center justify-center lg:justify-start gap-3 w-full lg:w-auto mb-8">'
);

fs.writeFileSync(path, content);

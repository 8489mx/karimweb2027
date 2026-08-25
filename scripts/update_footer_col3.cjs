const fs = require('fs');

let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '<div className="md:col-span-6 lg:col-span-4 flex flex-col items-center lg:items-start">',
  '<div className="md:col-span-6 lg:col-span-4 flex flex-col items-center lg:items-start justify-end lg:mt-auto pt-4 lg:pt-0">'
);

fs.writeFileSync(path, content);

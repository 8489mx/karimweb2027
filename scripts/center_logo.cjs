const fs = require('fs');

let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '<div className="md:col-span-12 lg:col-span-6 flex flex-col items-center lg:items-start justify-center text-center lg:text-start h-full">',
  '<div className="md:col-span-12 lg:col-span-6 flex flex-col items-center justify-center text-center h-full">'
);

fs.writeFileSync(path, content);

const fs = require('fs');

let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

// Update Grid to be items-center
content = content.replace(
  '<div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12" dir={dir}>',
  '<div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12 items-center" dir={dir}>'
);

// Update Column 1
content = content.replace(
  '<div className="md:col-span-12 lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-start">',
  '<div className="md:col-span-12 lg:col-span-6 flex flex-col items-center lg:items-start justify-center text-center lg:text-start h-full">'
);

// Reduce logo size and remove mb-6
content = content.replace(
  '<HashLink smooth to="/#hero" className="mb-6 block transition-opacity hover:opacity-80">',
  '<HashLink smooth to="/#hero" className="block transition-opacity hover:opacity-80">'
);
content = content.replace(
  'className="w-[150px] md:w-[170px] h-auto object-contain"',
  'className="w-[110px] md:w-[130px] h-auto object-contain"'
);

// Update Column 3
content = content.replace(
  '<div className="md:col-span-12 lg:col-span-6 flex flex-col items-center justify-end lg:mt-auto pt-4 lg:pt-0">',
  '<div className="md:col-span-12 lg:col-span-6 flex flex-col items-center justify-center pt-4 lg:pt-0 h-full">'
);


fs.writeFileSync(path, content);

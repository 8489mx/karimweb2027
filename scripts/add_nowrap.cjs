const fs = require('fs');

let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '<span className="text-slate-500 font-en font-medium',
  '<span className="text-slate-500 font-en font-medium whitespace-nowrap'
);

fs.writeFileSync(path, content);

const fs = require('fs');
let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '<p className="text-slate-500 font-medium text-[15px] leading-relaxed max-w-sm mb-8">\n              {t.footer.caption}\n            </p>',
  ''
);

fs.writeFileSync(path, content);

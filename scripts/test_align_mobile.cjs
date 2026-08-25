const fs = require('fs');

let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace('w-full md:w-[264px]', 'w-[264px]');

fs.writeFileSync(path, content);

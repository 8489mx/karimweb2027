const fs = require('fs');
let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'group-hover:[filter:drop-shadow(1.5px_1.5px_0_#FE2C55)_drop-shadow(-1.5px_-1.5px_0_#25F4EE)]',
  'group-hover:[filter:drop-shadow(1px_1px_0_#FE2C55)_drop-shadow(-1px_-1px_0_#25F4EE)]'
);

fs.writeFileSync(path, content);

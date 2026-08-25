const fs = require('fs');

let transPath = 'src/translations.ts';
let transContent = fs.readFileSync(transPath, 'utf8');
transContent = transContent.replace(/certified: 'مدرب معتمد من ISSA\\nElite Certificate',/g, "certified: 'مدرب معتمد من\\nElite Certificate',");
fs.writeFileSync(transPath, transContent);

console.log('Updated certified text');

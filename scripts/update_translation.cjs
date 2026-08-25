const fs = require('fs');

const path = 'src/translations.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace("certified: 'مدرب معتمد من ISSA',", "certified: 'مدرب معتمد من ISSA elite certificate',");

fs.writeFileSync(path, content);
console.log('Updated translation');

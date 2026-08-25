const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/utils/location.ts');
let content = fs.readFileSync(filePath, 'utf-8');

content = content.replace(
  /\/\/ 1\) Check cache[\s\S]*?\/\/ 2\) Try Cloudflare -> Backup -> Default/,
  "// Try Cloudflare -> Backup -> Default"
);

content = content.replace(
  /sessionStorage\.setItem\(CACHE_KEY, JSON\.stringify\(\{ code, ts: Date\.now\(\) \}\)\);/,
  ""
);

fs.writeFileSync(filePath, content);
console.log('Removed cache.');

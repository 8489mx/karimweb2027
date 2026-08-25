const fs = require('fs');
const path = require('path');

const locationTsPath = path.join(__dirname, '../src/utils/location.ts');
let ts = fs.readFileSync(locationTsPath, 'utf-8');

ts = ts.replace(
  /"https:\/\/www\.cloudflare\.com\/cdn-cgi\/trace"/,
  '`https://www.cloudflare.com/cdn-cgi/trace?_t=${Date.now()}`'
);

ts = ts.replace(
  /"https:\/\/ipwho\.is\/"/,
  '`https://ipwho.is/?_t=${Date.now()}`'
);

fs.writeFileSync(locationTsPath, ts);
console.log('Fixed cache busting in location.ts');

const fs = require('fs');
const path = require('path');

const mainTsxPath = path.join(__dirname, '../src/main.tsx');
let main = fs.readFileSync(mainTsxPath, 'utf-8');

if (!main.includes("localStorage.removeItem('user_country_v2')")) {
  main = main.replace(
    /ReactDOM\.createRoot/,
    `localStorage.removeItem('user_country_v2');
localStorage.removeItem('user_country_v3');
sessionStorage.removeItem('user_country_v3');
sessionStorage.removeItem('kz_checkout_country');

ReactDOM.createRoot`
  );
  fs.writeFileSync(mainTsxPath, main);
  console.log('Added cache clearing to main.tsx');
}

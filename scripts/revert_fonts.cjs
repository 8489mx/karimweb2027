const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf-8');
html = html.replace(
  /family=Cairo:wght@400;500;600;700;800;900&family=Alexandria:wght@300;400;500;600;700;800;900/,
  'family=Alexandria:wght@300;400;500;600;700;800;900'
);
fs.writeFileSync(indexHtmlPath, html);

const indexCssPath = path.join(__dirname, '../src/index.css');
let css = fs.readFileSync(indexCssPath, 'utf-8');
css = css.replace(
  /--font-sans: "Cairo", "Alexandria", "Tajawal",/,
  '--font-sans: "Alexandria", "Tajawal", "Cairo",'
);
fs.writeFileSync(indexCssPath, css);

console.log('Reverted fonts.');

const fs = require('fs');
const path = 'src/components/sections/SocialProof.tsx';
let content = fs.readFileSync(path, 'utf8');

// Desktop
content = content.replace('font-black text-brand-primary', 'font-bold text-brand-primary');
// Mobile
content = content.replace('font-bold text-white', 'font-medium text-white');

fs.writeFileSync(path, content);
console.log('Fixed stats bold weight');

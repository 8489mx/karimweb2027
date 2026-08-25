const fs = require('fs');

let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace bg-slate-50 in the icon containers with bg-slate-200/60
// and add a subtle border
content = content.replace(/bg-slate-50 flex items-center justify-center text-slate-700/g, 'bg-slate-200/60 flex items-center justify-center text-slate-700');

fs.writeFileSync(path, content);

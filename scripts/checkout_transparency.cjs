const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, '../src/pages/Checkout.tsx');
let content = fs.readFileSync(checkoutPath, 'utf-8');

content = content.replace(
  /className="bg-white border-b border-slate-200 py-6 px-4 shadow-sm relative z-20"/,
  'className="bg-white/70 backdrop-blur-md border-b border-slate-200/50 py-6 px-4 shadow-sm relative z-20"'
);

content = content.replace(
  /className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 h-fit"/g,
  'className="bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200/50 h-fit"'
);

fs.writeFileSync(checkoutPath, content);
console.log('Modified Checkout transparency');

const fs = require('fs');

let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

// The icons have 'text-slate-400' in their className.
// We should replace 'text-slate-400' with 'text-slate-700' for the social links and email button.
// And maybe for the email text we can also make it text-slate-700 instead of text-slate-500.

content = content.replace(/text-slate-400/g, 'text-slate-700');
content = content.replace('text-slate-500 font-en font-medium', 'text-slate-700 font-en font-bold');

fs.writeFileSync(path, content);

const fs = require('fs');
let content = fs.readFileSync('src/pages/Checkout.tsx', 'utf8');
content = content.replace(/<span className=\{`\$\{primaryColorClass\}`\}>\*<\/span>/g, '<span className="text-red-500">*</span>');
fs.writeFileSync('src/pages/Checkout.tsx', content);

const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, '../src/pages/Checkout.tsx');
let content = fs.readFileSync(checkoutPath, 'utf-8');

// Replace the duplicate ) ) with a single )
content = content.replace(/\)\n      \)/g, ')');

fs.writeFileSync(checkoutPath, content);
console.log('Fixed syntax error.');

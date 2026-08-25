const fs = require('fs');

let checkoutContent = fs.readFileSync('src/pages/Checkout.tsx', 'utf8');
checkoutContent = checkoutContent.replace(
  /required: true/g,
  'required: true,\n                        autoComplete: "tel"'
);
fs.writeFileSync('src/pages/Checkout.tsx', checkoutContent);

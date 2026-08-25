const fs = require('fs');

let contactContent = fs.readFileSync('src/components/ui/ContactModal.tsx', 'utf8');
contactContent = contactContent.replace(
  /placeholder="الاسم بالكامل"/g,
  'placeholder="الاسم بالكامل"\n                      autoComplete="name"'
);
contactContent = contactContent.replace(
  /placeholder="البريد الإلكتروني"/g,
  'placeholder="البريد الإلكتروني"\n                      autoComplete="email"'
);
contactContent = contactContent.replace(
  /placeholder="رقم الهاتف \(اختياري\)"/g,
  'placeholder="رقم الهاتف (اختياري)"\n                      autoComplete="tel"'
);
fs.writeFileSync('src/components/ui/ContactModal.tsx', contactContent);

let checkoutContent = fs.readFileSync('src/pages/Checkout.tsx', 'utf8');
checkoutContent = checkoutContent.replace(
  /placeholder="ادخل اسمك"/g,
  'placeholder="ادخل اسمك"\n                    autoComplete="name"'
);
fs.writeFileSync('src/pages/Checkout.tsx', checkoutContent);

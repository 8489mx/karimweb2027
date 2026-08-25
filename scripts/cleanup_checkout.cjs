const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, '../src/pages/Checkout.tsx');
let content = fs.readFileSync(checkoutPath, 'utf-8');

content = content.replace(
  /\/\/ Always fetch detected country so we know whether to show EG in dropdown\n\s*useEffect\(\(\) => \{\n\s*detectCountryCode\(\)\.then\(code => \{\n\s*const mappedCode: CountryCode = \['EG', 'SA', 'KW', 'AE', 'QA', 'BH'\]\.includes\(code\) \? \(code as CountryCode\) : 'OTHER';\n\s*setDetectedCountry\(mappedCode\);\n\s*\}\);\n\s*\}, \[\]\);\n\n/,
  ""
);

fs.writeFileSync(checkoutPath, content);
console.log('Cleaned up checkout');

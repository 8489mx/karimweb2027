const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, '../src/pages/Checkout.tsx');
let content = fs.readFileSync(checkoutPath, 'utf-8');

if (!content.includes("import { detectCountryCode }")) {
  content = content.replace(
    /import { trackCheckoutStep, trackCheckoutComplete } from '\.\.\/utils\/tracking';/,
    `import { trackCheckoutStep, trackCheckoutComplete } from '../utils/tracking';\nimport { detectCountryCode } from '../utils/location';`
  );
  
  content = content.replace(
    /const initialCountry = \(tokenData\?\.country as CountryCode\) \|\| \(sessionStorage\.getItem\('kz_checkout_country'\) as CountryCode\) \|\| 'EG';/,
    `const initialCountry = (tokenData?.country as CountryCode) || (sessionStorage.getItem('kz_checkout_country') as CountryCode) || 'EG';`
  );
  
  content = content.replace(
    /const \[residenceCountry, setResidenceCountry\] = useState<CountryCode>\(initialCountry as CountryCode\);/,
    `const [residenceCountry, setResidenceCountry] = useState<CountryCode>(initialCountry as CountryCode);
  const [isDetectingCountry, setIsDetectingCountry] = useState(!tokenData?.country && !sessionStorage.getItem('kz_checkout_country'));

  useEffect(() => {
    if (isDetectingCountry) {
      detectCountryCode().then(code => {
        const mappedCode: CountryCode = ['EG', 'SA', 'KW', 'AE', 'QA', 'BH'].includes(code) ? (code as CountryCode) : 'OTHER';
        setResidenceCountry(mappedCode);
        setIsDetectingCountry(false);
      });
    }
  }, [isDetectingCountry]);`
  );
  
  content = content.replace(
    /if \(!activeCountry\)/g,
    `if (!activeCountry || isDetectingCountry)`
  );

  fs.writeFileSync(checkoutPath, content);
  console.log('Fixed Checkout.tsx country detection.');
}

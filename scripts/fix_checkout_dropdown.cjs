const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, '../src/pages/Checkout.tsx');
let content = fs.readFileSync(checkoutPath, 'utf-8');

// We need to store the true detected country to properly filter Egypt
if (!content.includes("const [detectedCountry, setDetectedCountry]")) {
  content = content.replace(
    /const \[isDetectingCountry, setIsDetectingCountry\] = useState\(!tokenData\?\.country && !sessionStorage\.getItem\('kz_checkout_country'\)\);/,
    `const [isDetectingCountry, setIsDetectingCountry] = useState(!tokenData?.country && !sessionStorage.getItem('kz_checkout_country'));
  const [detectedCountry, setDetectedCountry] = useState<CountryCode | null>(null);

  // Always fetch detected country so we know whether to show EG in dropdown
  useEffect(() => {
    detectCountryCode().then(code => {
      const mappedCode: CountryCode = ['EG', 'SA', 'KW', 'AE', 'QA', 'BH'].includes(code) ? (code as CountryCode) : 'OTHER';
      setDetectedCountry(mappedCode);
    });
  }, []);`
  );

  content = content.replace(
    /detectCountryCode\(\)\.then\(code => \{/,
    `detectCountryCode().then(code => {` // Just to be safe, no actual replacement needed if we use the above useEffect for both, but wait, we already had one useEffect.
  );
}

// Let's rewrite the whole useEffect for detection to be cleaner
content = content.replace(
  /useEffect\(\(\) => \{\n\s*if \(isDetectingCountry\) \{\n\s*detectCountryCode\(\)\.then\(code => \{\n\s*const mappedCode: CountryCode = \['EG', 'SA', 'KW', 'AE', 'QA', 'BH'\]\.includes\(code\) \? \(code as CountryCode\) : 'OTHER';\n\s*setResidenceCountry\(mappedCode\);\n\s*setIsDetectingCountry\(false\);\n\s*\}\);\n\s*\}\n\s*\}, \[isDetectingCountry\]\);/,
  `useEffect(() => {
    detectCountryCode().then(code => {
      const mappedCode: CountryCode = ['EG', 'SA', 'KW', 'AE', 'QA', 'BH'].includes(code) ? (code as CountryCode) : 'OTHER';
      setDetectedCountry(mappedCode);
      if (isDetectingCountry) {
        setResidenceCountry(mappedCode);
        setIsDetectingCountry(false);
      }
    });
  }, [isDetectingCountry]);`
);

// Filter the dropdown
content = content.replace(
  /\{Object\.entries\(t\.countries\)\.map\(\(\[code, countryName\]\) => \(/,
  `{Object.entries(t.countries)
                      .filter(([code]) => {
                        if (code === 'EG') return detectedCountry === 'EG';
                        return true;
                      })
                      .map(([code, countryName]) => (`
);

fs.writeFileSync(checkoutPath, content);
console.log('Fixed checkout dropdown filter');

const fs = require('fs');
const path = require('path');

const locationTsPath = path.join(__dirname, '../src/utils/location.ts');
let ts = fs.readFileSync(locationTsPath, 'utf-8');

if (!ts.includes("test_country")) {
  ts = ts.replace(
    /export async function detectCountryCode\(\): Promise<string> \{/,
    `export async function detectCountryCode(): Promise<string> {
  // Allow URL override for testing
  try {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const testCountry = params.get('test_country');
      if (testCountry) {
        return testCountry.toUpperCase();
      }
    }
  } catch (e) {}`
  );

  fs.writeFileSync(locationTsPath, ts);
  console.log('Added test_country override.');
}

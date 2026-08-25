const fs = require('fs');

// CalorieCalculator.tsx
const calcPath = 'src/components/sections/CalorieCalculator.tsx';
let calcContent = fs.readFileSync(calcPath, 'utf8');

// Remove various shadow classes from buttons and inputs
calcContent = calcContent.replace(/shadow-\[0_4px_12px_rgba\(0,0,0,0\.04\)\]/g, '');
calcContent = calcContent.replace(/shadow-\[0_8px_20px_-4px_rgba\(88,180,229,0\.5\)\]/g, '');
calcContent = calcContent.replace(/hover:shadow-\[0_6px_16px_rgba\(0,0,0,0\.06\)\]/g, '');
// Cleanup any double spaces created by removal
calcContent = calcContent.replace(/\s\s+/g, ' ');

fs.writeFileSync(calcPath, calcContent);

// CustomSelect.tsx
const selectPath = 'src/components/ui/CustomSelect.tsx';
let selectContent = fs.readFileSync(selectPath, 'utf8');

selectContent = selectContent.replace(/shadow-\[0_4px_12px_rgba\(0,0,0,0\.04\)\]/g, '');
selectContent = selectContent.replace(/shadow-\[0_4px_16px_rgba\(0,0,0,0\.06\)\]/g, '');
selectContent = selectContent.replace(/hover:shadow-\[0_6px_16px_rgba\(0,0,0,0\.06\)\]/g, '');
selectContent = selectContent.replace(/\s\s+/g, ' ');

fs.writeFileSync(selectPath, selectContent);

console.log('Removed shadows');

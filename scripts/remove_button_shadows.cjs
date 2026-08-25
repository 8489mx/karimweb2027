const fs = require('fs');

// Button.tsx
const btnPath = 'src/components/ui/Button.tsx';
let btnContent = fs.readFileSync(btnPath, 'utf8');

btnContent = btnContent.replace(/ shadow-sm/g, '');
btnContent = btnContent.replace(/ hover:shadow-md/g, '');
fs.writeFileSync(btnPath, btnContent);

// CalorieCalculator.tsx Submit Button
const calcPath = 'src/components/sections/CalorieCalculator.tsx';
let calcContent = fs.readFileSync(calcPath, 'utf8');

calcContent = calcContent.replace(/shadow-lg shadow-brand-primary\/20 /g, '');
calcContent = calcContent.replace(/shadow-\[0_8px_30px_rgb\(0,0,0,0\.04\)\] /g, '');
fs.writeFileSync(calcPath, calcContent);

console.log('Removed button shadows everywhere');

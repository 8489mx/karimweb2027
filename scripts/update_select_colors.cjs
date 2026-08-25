const fs = require('fs');

const calcPath = 'src/components/sections/CalorieCalculator.tsx';
let calcContent = fs.readFileSync(calcPath, 'utf8');

calcContent = calcContent.replace(
  'className="text-[#3b82f6] font-black"',
  'className="text-brand-primary font-black"'
);
calcContent = calcContent.replace(
  'className="text-slate-800 font-medium"',
  'className="text-brand-text font-medium"'
);

fs.writeFileSync(calcPath, calcContent);
console.log('Updated CalorieCalculator.tsx colors');

const fs = require('fs');
const calcPath = 'src/components/sections/CalorieCalculator.tsx';
let calcContent = fs.readFileSync(calcPath, 'utf8');

calcContent = calcContent.replace(/<label className="flex items-center justify-between text-sm font-bold text-brand-text px-1">\s*<span>\{t\.calculator\.bodyFat\}<\/span>\s*<span className="text-slate-500 font-normal text-xs">\{t\.calculator\.bodyFatOptional\}<\/span>\s*<\/label>/g, 
  `<label className="flex items-center gap-1.5 text-sm font-bold text-brand-text px-1">
                <span>{t.calculator.bodyFat}</span>
                <span className="text-slate-500 font-normal">{t.calculator.bodyFatOptional}</span>
              </label>`);

fs.writeFileSync(calcPath, calcContent);
console.log('Fixed body fat label');

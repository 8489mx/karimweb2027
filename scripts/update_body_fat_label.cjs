const fs = require('fs');

const calcPath = 'src/components/sections/CalorieCalculator.tsx';
let calcContent = fs.readFileSync(calcPath, 'utf8');

const oldLabel = `<label className="flex items-center justify-between text-sm font-bold text-brand-text px-1">
                <span>{t.calculator.bodyFat}</span>
                <span className="text-slate-500 font-normal text-xs">{t.calculator.bodyFatOptional}</span>
              </label>`;
              
const newLabel = `<label className="flex items-center gap-1.5 text-sm font-bold text-brand-text px-1">
                <span>{t.calculator.bodyFat}</span>
                <span className="text-slate-500 font-normal">{t.calculator.bodyFatOptional}</span>
              </label>`;

if (calcContent.includes(oldLabel)) {
  calcContent = calcContent.replace(oldLabel, newLabel);
  fs.writeFileSync(calcPath, calcContent);
  console.log('Updated body fat label successfully');
} else {
  console.log('Old label class not found');
}

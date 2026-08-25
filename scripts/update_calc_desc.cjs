const fs = require('fs');

const calcPath = 'src/components/sections/CalorieCalculator.tsx';
let calcContent = fs.readFileSync(calcPath, 'utf8');

calcContent = calcContent.replace(
  '<p className="mt-4 text-brand-muted text-sm md:text-base font-medium max-w-xl mx-auto">{t.calculator.description}</p>',
  '<p className="mt-4 text-base sm:text-[1.1rem] md:text-xl lg:text-2xl text-brand-muted leading-relaxed px-2 font-medium max-w-2xl mx-auto">{t.calculator.description}</p>'
);

fs.writeFileSync(calcPath, calcContent);
console.log('Updated CalorieCalculator.tsx description text size');

const fs = require('fs');
const calcPath = 'src/components/sections/CalorieCalculator.tsx';
let calcContent = fs.readFileSync(calcPath, 'utf8');

const commentsToReplace = [
  '// Weight to kg',
  '// Height to cm',
  '// BMR Calculation',
  '// Katch-McArdle',
  '// Mifflin-St Jeor',
  '// Protein calculation weight (BMI Cap)',
  '// Default if not selected (youth cases < 13)',
  '// Macros',
  '// Default',
  '// 13-15 years always maintain',
  '// Unit Toggle',
  '// Gender',
  '// Age',
  '// Weight',
  '// Height',
  '// Activity Level - only for 13+',
  '// Resistance Training - only for 13+',
  '// Body Fat (Optional)'
];

for (const c of commentsToReplace) {
  calcContent = calcContent.replace(c, `/* ${c.replace('// ', '')} */`);
}

fs.writeFileSync(calcPath, calcContent);
console.log('Fixed CalorieCalculator comments');

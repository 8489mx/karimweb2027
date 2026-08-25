const fs = require('fs');

const calcPath = 'src/components/sections/CalorieCalculator.tsx';
let calcContent = fs.readFileSync(calcPath, 'utf8');

const oldContainer = '<div className="bg-white/40 backdrop-blur-3xl rounded-[32px] p-6 md:p-10 border border-white/60">';
const newContainer = '<div className="bg-white/60 backdrop-blur-2xl rounded-[32px] p-6 md:p-10 border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">';

if (calcContent.includes(oldContainer)) {
  calcContent = calcContent.replace(oldContainer, newContainer);
  fs.writeFileSync(calcPath, calcContent);
  console.log('Updated glass container successfully');
} else {
  console.log('Old container class not found');
}

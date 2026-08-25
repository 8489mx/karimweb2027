const fs = require('fs');

const calcPath = 'src/components/sections/CalorieCalculator.tsx';
let calcContent = fs.readFileSync(calcPath, 'utf8');

// Update unselected buttons
calcContent = calcContent.replace(/bg-white\/60 border border-white\/80 backdrop-blur-md text-brand-muted hover:bg-white\/80/g, 'bg-white border border-slate-200 text-brand-muted hover:border-slate-300 hover:bg-slate-50');

// Update inputs
calcContent = calcContent.replace(/bg-white\/60 border border-white\/80 backdrop-blur-md/g, 'bg-white border border-slate-200');

fs.writeFileSync(calcPath, calcContent);

const selectPath = 'src/components/ui/CustomSelect.tsx';
let selectContent = fs.readFileSync(selectPath, 'utf8');

selectContent = selectContent.replace(/bg-white\/60 border-white\/80 backdrop-blur-md hover:bg-white\/80/g, 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50');

fs.writeFileSync(selectPath, selectContent);

console.log('Updated visibility of inputs and buttons');

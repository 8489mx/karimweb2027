const fs = require('fs');

// 1. Update CustomSelect.tsx
const selectPath = 'src/components/ui/CustomSelect.tsx';
let selectContent = fs.readFileSync(selectPath, 'utf8');

if (!selectContent.includes('shortLabel?:')) {
  selectContent = selectContent.replace(
    'label: React.ReactNode;',
    'label: React.ReactNode;\n  shortLabel?: React.ReactNode;'
  );
  selectContent = selectContent.replace(
    '{selectedOption.label}',
    '{selectedOption.shortLabel || selectedOption.label}'
  );
  fs.writeFileSync(selectPath, selectContent);
  console.log('Updated CustomSelect.tsx');
}

// 2. Update CalorieCalculator.tsx
const calcPath = 'src/components/sections/CalorieCalculator.tsx';
let calcContent = fs.readFileSync(calcPath, 'utf8');

const newRenderActivityLabel = `  const renderActivityLabel = (text: string) => {
    if (!text) return { label: text, shortLabel: text };
    const parts = text.split(' (');
    if (parts.length > 1) {
      return {
        label: (
          <span className="whitespace-normal leading-relaxed block md:inline">
            <span className="text-[#3b82f6] font-black">{parts[0]}</span> <span className="text-slate-800 font-medium">({parts[1]}</span>
          </span>
        ),
        shortLabel: parts[0]
      };
    }
    return { label: text, shortLabel: text };
  };`;

calcContent = calcContent.replace(
  /const renderActivityLabel = [\s\S]*?return text;\n  };/,
  newRenderActivityLabel
);

calcContent = calcContent.replace(
  /label: renderActivityLabel\((.*?)\) \}/g,
  `...renderActivityLabel($1) }`
);

fs.writeFileSync(calcPath, calcContent);
console.log('Updated CalorieCalculator.tsx');

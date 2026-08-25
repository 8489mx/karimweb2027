const fs = require('fs');

// 1. Update CustomSelect.tsx
const selectPath = 'src/components/ui/CustomSelect.tsx';
let selectContent = fs.readFileSync(selectPath, 'utf8');

// Change label type to React.ReactNode
selectContent = selectContent.replace('label: string;', 'label: React.ReactNode;');

// Remove truncate from the list button
selectContent = selectContent.replace(
  'transition-colors cursor-pointer truncate text-base',
  'transition-colors cursor-pointer text-base'
);

fs.writeFileSync(selectPath, selectContent);

// 2. Update CalorieCalculator.tsx
const calcPath = 'src/components/sections/CalorieCalculator.tsx';
let calcContent = fs.readFileSync(calcPath, 'utf8');

const parseFunction = `  const renderActivityLabel = (text: string) => {
    if (!text) return text;
    const parts = text.split(' (');
    if (parts.length > 1) {
      return (
        <span className="whitespace-normal leading-relaxed block md:inline">
          <span className="text-brand-primary font-black">{parts[0]}</span> <span className="text-brand-text/80 font-medium">({parts[1]}</span>
        </span>
      );
    }
    return text;
  };`;

if (!calcContent.includes('renderActivityLabel')) {
  calcContent = calcContent.replace('  const getActivityLabel =', parseFunction + '\n\n  const getActivityLabel =');

  calcContent = calcContent.replace(
    /\{\s*value:\s*1\.2,\s*label:\s*t\.calculator\.activities\?\.sedentary[^}]+\},/g,
    `{ value: 1.2, label: renderActivityLabel(t.calculator.activities?.sedentary || 'قليل النشاط (عمل مكتبي، أقل من 5000 خطوة، بدون تمرين)') },`
  );
  calcContent = calcContent.replace(
    /\{\s*value:\s*1\.375,\s*label:\s*t\.calculator\.activities\?\.light[^}]+\},/g,
    `{ value: 1.375, label: renderActivityLabel(t.calculator.activities?.light || 'نشاط خفيف (حركة بسيطة، أو تمرين 1-3 أيام)') },`
  );
  calcContent = calcContent.replace(
    /\{\s*value:\s*1\.55,\s*label:\s*t\.calculator\.activities\?\.moderate[^}]+\},/g,
    `{ value: 1.55, label: renderActivityLabel(t.calculator.activities?.moderate || 'نشاط متوسط (حركة يومية + تمرين 3-5 أيام)') },`
  );
  calcContent = calcContent.replace(
    /\{\s*value:\s*1\.725,\s*label:\s*t\.calculator\.activities\?\.active[^}]+\},/g,
    `{ value: 1.725, label: renderActivityLabel(t.calculator.activities?.active || 'نشاط عالي (عمل متحرك + تمرين 5-6 أيام)') },`
  );
  calcContent = calcContent.replace(
    /\{\s*value:\s*1\.9,\s*label:\s*t\.calculator\.activities\?\.veryActive[^}]+\}/g,
    `{ value: 1.9, label: renderActivityLabel(t.calculator.activities?.veryActive || 'نشاط شاق (عمل بدني شاق + تمرين يومي)') }`
  );

  fs.writeFileSync(calcPath, calcContent);
  console.log('Updated CalorieCalculator.tsx');
}

const fs = require('fs');
const tsPath = 'src/components/sections/CalorieCalculator.tsx';
let tsContent = fs.readFileSync(tsPath, 'utf8');

// Fix trackCalculatorCompleted
tsContent = tsContent.replace(
  'trackCalculatorCompleted();',
  'trackCalculatorCompleted({ goal, gender, activity_level: String(activity), target_calories: baseTdee });'
);

// Fix CustomSelect value types
tsContent = tsContent.replace(
  `value: ''`,
  `value: 0`
);
tsContent = tsContent.replace(/value: '1\.2'/g, 'value: 1.2');
tsContent = tsContent.replace(/value: '1\.375'/g, 'value: 1.375');
tsContent = tsContent.replace(/value: '1\.55'/g, 'value: 1.55');
tsContent = tsContent.replace(/value: '1\.725'/g, 'value: 1.725');
tsContent = tsContent.replace(/value: '1\.9'/g, 'value: 1.9');

// Also fix the value prop on CustomSelect itself
tsContent = tsContent.replace(
  `value={String(activity)}`,
  `value={activity === '' ? 0 : activity}`
);

// Also change the onChange handler
tsContent = tsContent.replace(
  `onChange={(val) => { setActivity(val === '' ? '' : parseFloat(val)); clearResults(); }}`,
  `onChange={(val) => { setActivity(val === 0 ? '' : val); clearResults(); }}`
);


fs.writeFileSync(tsPath, tsContent);

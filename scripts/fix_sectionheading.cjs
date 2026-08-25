const fs = require('fs');
const tsPath = 'src/components/sections/CalorieCalculator.tsx';
let tsContent = fs.readFileSync(tsPath, 'utf8');

tsContent = tsContent.replace(
/<SectionHeading \s*title=\{t\.calculator\.title\}\s*subtitle=\{t\.calculator\.description\}\s*\/>/g,
`<div className="text-center mb-10"><SectionHeading>{t.calculator.title}</SectionHeading><p className="mt-4 text-brand-muted text-sm md:text-base font-medium max-w-xl mx-auto">{t.calculator.description}</p></div>`
);

fs.writeFileSync(tsPath, tsContent);

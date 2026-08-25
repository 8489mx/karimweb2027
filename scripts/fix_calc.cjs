const fs = require('fs');

const tsPath = 'src/components/sections/CalorieCalculator.tsx';
let tsContent = fs.readFileSync(tsPath, 'utf8');

// Fix the imperial height flex container
tsContent = tsContent.replace(
  /<div className="flex bg-white\/40 p-1 rounded-xl border border-white\/60 shadow-sm">\s*<input/g,
  '<div className="grid grid-cols-2 gap-3">\n                    <input'
);

// We need to completely rewrite the form part to make it beautiful.
// Let's replace the <form> content.

fs.writeFileSync(tsPath, tsContent);

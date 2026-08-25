const fs = require('fs');

let content = fs.readFileSync('src/components/sections/Packages.tsx', 'utf8');

content = content.replace(
  /return getDurationLabel\(opt\);\s*\};/g,
  `return t.packages.durationOptions[opt as keyof typeof t.packages.durationOptions];\n  };`
);

fs.writeFileSync('src/components/sections/Packages.tsx', content);

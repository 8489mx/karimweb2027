const fs = require('fs');

let content = fs.readFileSync('src/components/sections/Programs.tsx', 'utf8');

content = content.replace(
  /\{\/\* Diagonal Stripes Pattern \*\/\}.*?backgroundImage: 'repeating-linear-gradient\(-45deg, var\(--color-brand-primary\) 0, var\(--color-brand-primary\) 50px, transparent 50px, transparent 100px\)'\s*\}\}\s*\/\>/gs,
  `{/* Diagonal Stripes Pattern */}
                   <div 
                     className="absolute -inset-[100%] opacity-[0.04] group-hover:opacity-0 transition-opacity duration-500 rotate-[15deg]"
                     style={{
                       backgroundImage: 'repeating-linear-gradient(-45deg, var(--color-brand-primary) 0, var(--color-brand-primary) 50px, transparent 50px, transparent 100px)'
                     }}
                   />
                   <div 
                     className="absolute -inset-[100%] opacity-[0.02] group-hover:opacity-0 transition-opacity duration-500 -rotate-[15deg]"
                     style={{
                       backgroundImage: 'repeating-linear-gradient(-45deg, transparent 0, transparent 60px, var(--color-brand-primary) 60px, var(--color-brand-primary) 120px)'
                     }}
                   />`
);

fs.writeFileSync('src/components/sections/Programs.tsx', content);

const fs = require('fs');

let content = fs.readFileSync('src/components/sections/Programs.tsx', 'utf8');

content = content.replace(
  /\{\/\* Shine and Reveal Effects Container \*\/\}\s*<div className="absolute inset-0 overflow-hidden rounded-\[inherit\] pointer-events-none z-0">/g,
  `{/* Shine and Reveal Effects Container */}
                 <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none z-0">
                   {/* Diagonal Stripes Pattern */}
                   <div 
                     className="absolute -inset-[100%] opacity-[0.04] group-hover:opacity-0 transition-opacity duration-500 rotate-[15deg]"
                     style={{
                       backgroundImage: 'repeating-linear-gradient(-45deg, var(--color-brand-primary) 0, var(--color-brand-primary) 50px, transparent 50px, transparent 100px)'
                     }}
                   />`
);

fs.writeFileSync('src/components/sections/Programs.tsx', content);


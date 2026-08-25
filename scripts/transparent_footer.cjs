const fs = require('fs');

let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

// Remove bg-white
content = content.replace(
  '<footer className="relative bg-white pt-8 pb-4 overflow-hidden">',
  '<footer className="relative bg-transparent pt-8 pb-4 overflow-hidden">'
);

// Remove the glow line
const glowLines = `      {/* Glow Line at Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />
      <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent blur-sm" />`;

content = content.replace(glowLines, '');

fs.writeFileSync(path, content);

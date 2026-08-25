const fs = require('fs');

let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

const noiseDiv = `      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />`;

const glowLines = `      {/* Glow Line at Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />
      <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent blur-sm" />`;

// Remove the old top lines and noise
content = content.replace(noiseDiv, '');
content = content.replace('<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />', glowLines);

// Also remove border-t border-slate-100 since we have a glow line
content = content.replace(
  '<footer className="relative bg-white pt-8 pb-4 border-t border-slate-100 overflow-hidden">',
  '<footer className="relative bg-white pt-8 pb-4 overflow-hidden">'
);

fs.writeFileSync(path, content);

const fs = require('fs');

let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

const noiseDiv = `      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />`;

content = content.replace(
  '      {/* Subtle Background Elements */}',
  noiseDiv
);

fs.writeFileSync(path, content);

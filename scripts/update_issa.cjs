const fs = require('fs');

// Update translation
let transPath = 'src/translations.ts';
let transContent = fs.readFileSync(transPath, 'utf8');
transContent = transContent.replace(/certified: 'مدرب معتمد من ISSA elite certificate',/g, "certified: 'مدرب معتمد من ISSA\\nElite Certificate',");
fs.writeFileSync(transPath, transContent);

// Update SocialProof to support whitespace-pre-line
let spPath = 'src/components/sections/SocialProof.tsx';
let spContent = fs.readFileSync(spPath, 'utf8');
spContent = spContent.replace('text-[0.85rem] md:text-[0.95rem] uppercase"', 'text-[0.85rem] md:text-[0.95rem] uppercase whitespace-pre-line"');
spContent = spContent.replace('text-white/90 font-medium text-[0.85rem] uppercase tracking-wide"', 'text-white/90 font-medium text-[0.85rem] uppercase tracking-wide whitespace-pre-line"');
fs.writeFileSync(spPath, spContent);

console.log('Updated ISSA text');

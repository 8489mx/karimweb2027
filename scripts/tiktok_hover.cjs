const fs = require('fs');

let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

// replace the tiktok link
const oldTikTok = `<a href="https://tiktok.com/@karimzakariia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-200/60 flex items-center justify-center text-slate-700 hover:text-white hover:bg-black hover:shadow-lg hover:shadow-black/20 transition-all duration-300 hover:-translate-y-1" aria-label="TikTok">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
              </a>`;

const newTikTok = `<a href="https://tiktok.com/@karimzakariia" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 rounded-xl bg-slate-200/60 flex items-center justify-center text-slate-700 hover:text-white hover:bg-black hover:shadow-lg hover:shadow-black/20 transition-all duration-300 hover:-translate-y-1" aria-label="TikTok">
                <svg viewBox="0 0 24 24" className="w-5 h-5 transition-all duration-300 group-hover:[filter:drop-shadow(1.5px_1.5px_0_#FE2C55)_drop-shadow(-1.5px_-1.5px_0_#25F4EE)]" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
              </a>`;

content = content.replace(oldTikTok, newTikTok);
fs.writeFileSync(path, content);

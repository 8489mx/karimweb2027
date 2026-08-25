const fs = require('fs');
let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldEmailIcon = `<div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-brand-primary/30 group-hover:bg-brand-primary/5 transition-colors duration-300">
                <svg className="w-4 h-4 text-slate-400 group-hover:text-brand-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>`;

const newEmailIcon = `<div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-brand-primary group-hover:shadow-lg group-hover:shadow-brand-primary/20 transition-all duration-300 group-hover:-translate-y-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>`;

content = content.replace(oldEmailIcon, newEmailIcon);
fs.writeFileSync(path, content);

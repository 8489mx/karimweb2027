const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, '../src/pages/Checkout.tsx');
let content = fs.readFileSync(checkoutPath, 'utf-8');

// Replace orange colors with brand colors
content = content.replace(/text-\[\#FF4500\]/g, 'text-brand-primary');
content = content.replace(/border-\[\#FF4500\]/g, 'border-brand-primary');
content = content.replace(/bg-\[\#FF4500\]\/5/g, 'bg-brand-primary/5');
content = content.replace(/ring-\[\#FF4500\]/g, 'ring-brand-primary');
content = content.replace(/bg-\[\#FF4500\]/g, 'bg-brand-primary');
content = content.replace(/hover:border-\[\#FF4500\]\/50/g, 'hover:border-brand-primary/50');
content = content.replace(/hover:text-\[\#FF4500\]/g, 'hover:text-brand-primary');
content = content.replace(/hover:bg-\[\#FF4500\]\/10/g, 'hover:bg-brand-primary/10');
content = content.replace(/hover:bg-\[\#E03E00\]/g, 'hover:bg-brand-primary-hover');

// Replace the shadow colors on the button
content = content.replace(/shadow-\[0_8px_20px_rgba\(255,69,0,0\.3\)\]/g, 'shadow-[0_8px_20px_rgba(88,180,229,0.3)]');
content = content.replace(/hover:shadow-\[0_12px_25px_rgba\(255,69,0,0\.4\)\]/g, 'hover:shadow-[0_12px_25px_rgba(88,180,229,0.4)]');

// Simplify layout (remove backdrop-blur, make backgrounds flat)
content = content.replace(/bg-transparent/g, 'bg-[#FAFBFC]');
content = content.replace(/bg-white\/70 backdrop-blur-md border-b border-slate-200\/50 shadow-sm relative z-20/g, 'bg-white border-b border-slate-200 py-4 px-4 relative z-20');
content = content.replace(/bg-white\/70 backdrop-blur-md border-b border-slate-200\/50/g, 'bg-white border-b border-slate-200');
content = content.replace(/bg-white\/50 backdrop-blur-sm border border-slate-200/g, 'bg-slate-50 border border-slate-200');

// Change "Duration" grid to be a 1-column stack if possible, or just keep grid but simpler.
// Actually, in the user's screenshot, the durations are stacked vertically.
content = content.replace(/<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">/g, '<div className="grid grid-cols-1 gap-3">');

// We also need to fix the Wallet logo to look more like the screenshot if possible.
// And make sure all features are shown (already did in previous step, but let's double check).

fs.writeFileSync(checkoutPath, content);
console.log('Simplified layout and colors.');

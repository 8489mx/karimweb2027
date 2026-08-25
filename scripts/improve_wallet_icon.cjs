const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, '../src/pages/Checkout.tsx');
let content = fs.readFileSync(checkoutPath, 'utf-8');

const newWalletLogo = `<div className="flex items-center gap-1.5">
          {/* Vodafone */}
          <div className="w-6 h-6 rounded-full bg-[#E60000] flex items-center justify-center text-white font-bold text-[10px] shrink-0">
            V
          </div>
          {/* Orange */}
          <div className="w-6 h-6 rounded bg-[#FF6600] flex items-center justify-center text-white font-bold text-[10px] shrink-0">
            O
          </div>
          {/* Etisalat */}
          <div className="w-6 h-6 rounded-full bg-[#008A00] flex items-center justify-center text-white font-bold text-[10px] shrink-0">
            E
          </div>
          {/* We */}
          <div className="w-6 h-6 rounded-full bg-[#5D2279] flex items-center justify-center text-white font-bold text-[10px] shrink-0">
            W
          </div>
        </div>`;

content = content.replace(/<div className="flex gap-1">[\s\S]*?<\/div>\n\s*<\/div>/, newWalletLogo);

// Let's also simplify the payment methods section border and checkmark
// User wants a very simple style like the screenshot (just a radio button, white bg, thin border).
// Current: 'border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary'
// Screenshot: just red border (for active), and red dot.
content = content.replace(/border-brand-primary bg-brand-primary\/5 ring-1 ring-brand-primary/g, 'border-brand-primary bg-white shadow-sm ring-1 ring-brand-primary');

// Let's also remove the header steps entirely to match the simplified checkout? The screenshot doesn't have 4 steps indicator at the top. 
// It just has the form directly. 
// Let's remove the steps indicator.

content = content.replace(/\{\/\* 4 Steps Indicator \*\/\}[\s\S]*?<\/div>\n\s*<\/div>/, '</div>\n      </div>');

fs.writeFileSync(checkoutPath, content);
console.log('Improved wallet icon and simplified header.');

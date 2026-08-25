const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, '../src/pages/Checkout.tsx');
let content = fs.readFileSync(checkoutPath, 'utf-8');

const newWalletLogo = `      logo: (
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-8 h-8 rounded-lg shadow-sm border border-slate-100 overflow-hidden flex items-center justify-center bg-white">
            <img src="/wallets/we.svg" alt="We" className="w-full h-full object-contain p-1" />
          </div>
          <div className="w-8 h-8 rounded-lg shadow-sm border border-slate-100 overflow-hidden flex items-center justify-center bg-white">
            <img src="/wallets/vodafone.svg" alt="Vodafone" className="w-full h-full object-contain p-1" />
          </div>
          <div className="w-8 h-8 rounded-lg shadow-sm border border-slate-100 overflow-hidden flex items-center justify-center bg-white">
            <img src="/wallets/etisalat.svg" alt="Etisalat" className="w-full h-full object-contain p-1" />
          </div>
          <div className="w-8 h-8 rounded-lg shadow-sm border border-slate-100 overflow-hidden flex items-center justify-center bg-white">
            <img src="/wallets/orange.svg" alt="Orange" className="w-full h-full object-contain p-1" />
          </div>
        </div>
      )`;

// Replace from `logo: (` to `      )`
content = content.replace(/logo:\s*\([\s\S]*?<\/div>\n\s*\)/, newWalletLogo);

fs.writeFileSync(checkoutPath, content);
console.log('Updated wallet logos to use SVGs.');

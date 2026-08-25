const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, '../src/pages/Checkout.tsx');
let content = fs.readFileSync(checkoutPath, 'utf-8');

const correctPaymentMethodsEG = `  const paymentMethodsEG = [
    { 
      id: 'wallet', 
      title: 'محافظ إلكترونية', 
      logo: (
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
      )
    },
    { 
      id: 'instapay', 
      title: 'إنستاباي (InstaPay)', 
      logo: (
        <svg viewBox="0 0 100 30" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="22" fontFamily="sans-serif" fontWeight="900" fontSize="24" fill="#6A1B9A" fontStyle="italic">InstaPay</text>
        </svg>
      )
    },
    { 
      id: 'bank', 
      title: 'تحويل بنكي', 
      logo: <CreditCard className="w-8 h-8 text-blue-600" />
    }
  ];`;

content = content.replace(/const paymentMethodsEG = \[[\s\S]*?\];\n\n  const paymentMethodsInternational =/, correctPaymentMethodsEG + '\n\n  const paymentMethodsInternational =');

fs.writeFileSync(checkoutPath, content);
console.log('Fixed payment methods EG.');

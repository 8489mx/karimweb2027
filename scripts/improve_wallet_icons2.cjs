const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, '../src/pages/Checkout.tsx');
let content = fs.readFileSync(checkoutPath, 'utf-8');

const newWalletLogo = `<div className="flex items-center gap-1.5">
          {/* We */}
          <div className="w-7 h-7 rounded-lg bg-[#5D2279] shadow-[0_1px_2px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center text-white shrink-0 relative">
            <span className="font-en font-black text-[13px] leading-none mt-0.5 tracking-tighter">we</span>
          </div>
          {/* Vodafone */}
          <div className="w-7 h-7 rounded-lg bg-[#E60000] shadow-[0_1px_2px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center shrink-0 relative">
            <div className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center mt-0.5">
              <svg viewBox="0 0 100 100" className="w-2.5 h-2.5">
                <path fill="#E60000" d="M50,90 C25,90 15,60 15,45 C15,20 40,10 60,25 C75,37 75,60 50,60 C35,60 35,45 50,45 C60,45 60,55 50,55 C45,55 45,50 50,50" />
              </svg>
            </div>
            <span className="text-[4.5px] font-en font-bold text-white mt-0.5 tracking-tight">vodafone</span>
          </div>
          {/* Etisalat */}
          <div className="w-7 h-7 rounded-lg bg-[#E60000] shadow-[0_1px_2px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center shrink-0 relative">
            <div className="flex items-start text-white leading-none mt-0.5">
              <span className="font-en font-bold text-[12px] tracking-tighter">e</span>
              <span className="font-en font-bold text-[8px] mt-1 ml-[0.5px]">&amp;</span>
            </div>
            <span className="text-[4px] font-en text-white leading-none mt-0.5">etisalat and</span>
          </div>
          {/* Orange */}
          <div className="w-7 h-7 rounded-lg bg-[#FF6600] shadow-[0_1px_2px_rgba(0,0,0,0.15)] flex flex-col items-center justify-end pb-[3px] shrink-0 relative">
            <span className="text-[5px] font-en font-bold text-white tracking-tight">orange<sup className="text-[3px] font-normal leading-none ml-[0.5px]">TM</sup></span>
          </div>
        </div>`;

content = content.replace(/<div className="flex items-center gap-1\.5">[\s\S]*?<\/div>\n\s*<\/div>/, newWalletLogo + '\n      )');

fs.writeFileSync(checkoutPath, content);
console.log('Updated wallet icons.');

const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, '../src/pages/Checkout.tsx');
let content = fs.readFileSync(checkoutPath, 'utf-8');

const oldVodafone = `          {/* Vodafone */}
          <div className="w-7 h-7 rounded-lg bg-[#E60000] shadow-[0_1px_2px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center shrink-0 relative">
            <div className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center mt-0.5">
              <svg viewBox="0 0 100 100" className="w-2.5 h-2.5">
                <path fill="#E60000" d="M50,90 C25,90 15,60 15,45 C15,20 40,10 60,25 C75,37 75,60 50,60 C35,60 35,45 50,45 C60,45 60,55 50,55 C45,55 45,50 50,50" />
              </svg>
            </div>
            <span className="text-[4.5px] font-en font-bold text-white mt-0.5 tracking-tight">vodafone</span>
          </div>`;

const newVodafone = `          {/* Vodafone */}
          <div className="w-7 h-7 rounded-lg bg-[#E60000] shadow-[0_1px_2px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center shrink-0 relative">
            <div className="w-4 h-4 flex items-center justify-center mt-0.5">
              <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="currentColor">
                <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.835 5.568c2.203-1.614 3.125-4.542 2.37-7.234a.126.126 0 0 0-.154-.087l-3.327.915a.127.127 0 0 0-.087.155c.348 1.239-.176 2.584-1.352 3.109-1.28.572-2.829-.026-3.33-1.341-.5-1.314.156-2.836 1.455-3.356.595-.238 1.258-.258 1.85-.04l2.12-5.744a.127.127 0 0 0-.077-.163A7.47 7.47 0 0 0 12 3.61c-4.471 0-8.1 3.818-8.1 8.528 0 4.71 3.629 8.527 8.1 8.527 1.137 0 2.223-.243 3.165-.697z" />
              </svg>
            </div>
            <span className="text-[5px] font-en font-bold text-white tracking-tight">vodafone</span>
          </div>`;

content = content.replace(oldVodafone, newVodafone);

fs.writeFileSync(checkoutPath, content);
console.log('Vodafone icon updated.');

const fs = require('fs');

let content = fs.readFileSync('src/pages/Checkout.tsx', 'utf8');

const progressBarJSX = `
        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-10 relative" dir="rtl">
          {/* Connecting Line */}
          <div className="absolute top-5 left-[10%] right-[10%] h-[2px] bg-slate-200 -z-10">
            <div className={\`h-full transition-all duration-700 ease-in-out \${isMax ? 'bg-[#C4952D]' : 'bg-brand-primary'}\`} style={{ width: isSuccess ? '100%' : '50%' }}></div>
          </div>
          
          <div className="flex justify-between relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2">
              <div className={\`w-10 h-10 rounded-full flex items-center justify-center text-white \${isMax ? 'bg-[#C4952D]' : 'bg-brand-primary'} shadow-md border-4 border-[#FAFBFC] transition-transform hover:scale-110\`}>
                <Check className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-700">اختيار الباقة</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2">
              <div className={\`w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#FAFBFC] transition-all duration-500 \${!isSuccess ? (isMax ? 'bg-[#C4952D] text-white shadow-md scale-110' : 'bg-brand-primary text-white shadow-md scale-110') : (isMax ? 'bg-[#C4952D] text-white shadow-md' : 'bg-brand-primary text-white shadow-md')}\`}>
                {!isSuccess ? <span className="font-bold">2</span> : <Check className="w-5 h-5" />}
              </div>
              <span className={\`text-xs sm:text-sm font-bold \${!isSuccess ? 'text-slate-900' : 'text-slate-700'}\`}>بيانات الاشتراك</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2">
              <div className={\`w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#FAFBFC] transition-all duration-500 \${isSuccess ? (isMax ? 'bg-[#C4952D] text-white shadow-md scale-110' : 'bg-brand-primary text-white shadow-md scale-110') : 'bg-white text-slate-400 border-slate-200'}\`}>
                {isSuccess ? <Check className="w-5 h-5" /> : <span className="font-bold">3</span>}
              </div>
              <span className={\`text-xs sm:text-sm font-bold \${isSuccess ? 'text-slate-900' : 'text-slate-400'}\`}>تأكيد الطلب</span>
            </div>
          </div>
        </div>
`;

content = content.replace(
  '<div className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:py-12">',
  '<div className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:py-12">\n' + progressBarJSX
);

fs.writeFileSync('src/pages/Checkout.tsx', content);
console.log('Progress bar inserted');

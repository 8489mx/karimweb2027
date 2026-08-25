const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/pages/Checkout.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Update selectedMethod initial value
content = content.replace(
  /const \[selectedMethod, setSelectedMethod\] = useState<string>\('card'\);/,
  "const [selectedMethod, setSelectedMethod] = useState<string>('instapay');"
);

// Remove card and applepay from arrays
content = content.replace(
  /\{ id: 'card', title: 'فيزا \/ ماستركارد', logo: <CreditCard className="w-7 h-7" \/>, color: 'text-slate-700' \},\n\s*\{ id: 'applepay', title: 'Apple Pay', logo: <span className="font-sans font-bold text-2xl tracking-tighter">Pay<\/span>, color: 'text-slate-900' \},\n\s*/g,
  ""
);

// Remove mapping
content = content.replace(
  /if \(selectedMethod === 'card'\) paymentMethodName = 'بطاقة بنكية \(فيزا\/ماستركارد\)';\n\s*if \(selectedMethod === 'applepay'\) paymentMethodName = 'Apple Pay';\n\s*/,
  ""
);

// Fix initialMethod logic if needed (it looks like it was hardcoded to 'card')
content = content.replace(
  /const \[selectedMethod, setSelectedMethod\] = useState<string>\('instapay'\);\n\s*const \[isCountryMenuOpen, setIsCountryMenuOpen\] = useState\(false\);/,
  `const [selectedMethod, setSelectedMethod] = useState<string>('instapay');
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);

  // Update default payment method when country changes
  useEffect(() => {
    if (residenceCountry === 'EG') {
      if (selectedMethod === 'international_bank' || selectedMethod === 'international_wallet') {
        setSelectedMethod('instapay');
      }
    } else {
      if (selectedMethod === 'wallet' || selectedMethod === 'bank' || selectedMethod === 'instapay') {
        setSelectedMethod('international_bank');
      }
    }
  }, [residenceCountry]);`
);


// Replace message handling
content = content.replace(
  /const isLinkRequest = selectedMethod === 'card' \|\| selectedMethod === 'applepay';\n\s*const lastLine = isLinkRequest \n\s*\? 'أريد رابط الدفع الآمن لإتمام عملية الدفع\.'\n\s*\: 'قمت بالتحويل وسأرفق صورة الإيصال في هذه المحادثة \(أو أريد بيانات الدفع لو كانت دولية\)\.';/,
  "const lastLine = 'قمت بالتحويل وسأرفق صورة الإيصال في هذه المحادثة (أو أريد بيانات الدفع لو كانت دولية).';"
);

// Remove UI elements
content = content.replace(
  /\{selectedMethod === 'card' && \([\s\S]*?\}\)\}\n\s*\{selectedMethod === 'applepay' && \([\s\S]*?\}\)\}\n\s*(\{selectedMethod === 'instapay' && \()/g,
  "$1"
);

// Update submit button text
content = content.replace(
  /\{\(selectedMethod === 'card' \|\| selectedMethod === 'applepay'\) \n\s*\? 'لطلب رابط الدفع عبر واتساب' \n\s*\: 'وإرسال الإيصال عبر واتساب'\}/,
  "'وإرسال الإيصال عبر واتساب'"
);


fs.writeFileSync(filePath, content);
console.log('Removed card and applepay.');

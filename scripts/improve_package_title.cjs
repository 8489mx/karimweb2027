const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, '../src/pages/Checkout.tsx');
let content = fs.readFileSync(checkoutPath, 'utf-8');

const packageTitleJSX = `const PackageTitle = () => (
    <span className="inline-flex items-center gap-1.5" style={{ direction: 'rtl' }}>
      <span>باقة</span>
      <span className={\`font-en font-black tracking-widest \${pkgKey === 'elite' ? 'text-[#0EA5E9]' : 'text-[#E2B75A]'}\`}>
        {pkgKey.toUpperCase()}
      </span>
    </span>
  );`;

if (!content.includes('PackageTitle = () =>')) {
    // Insert the component before the return
    content = content.replace(/const packageTitle = pkgKey === 'elite' \? 'باقة Elite' : 'باقة Max';/, `const packageTitle = pkgKey === 'elite' ? 'باقة Elite' : 'باقة Max';\n  ${packageTitleJSX}`);
}

content = content.replace(/<h3 className="text-2xl font-black text-slate-900 text-center mb-1">{packageTitle}<\/h3>/, '<h3 className="text-2xl font-black text-slate-900 text-center mb-1 flex justify-center"><PackageTitle /></h3>');

content = content.replace(/<span>المجموع الفرعي \{'\{'\} \{packageTitle\} \{'\}'\} :<\/span>/g, "<span>المجموع الفرعي <span className=\"text-slate-400 mx-1\">{'{'}</span><PackageTitle /><span className=\"text-slate-400 mx-1\">{'}'}</span> :</span>");

fs.writeFileSync(checkoutPath, content);
console.log('Updated package title.');

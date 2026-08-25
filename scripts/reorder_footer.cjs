const fs = require('fs');

let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

const emailButtonMatch = content.match(/<button onClick=\{\(\) => setIsContactModalOpen\(true\)\}.*?<\/button>/s);
const socialDivMatch = content.match(/<div className="flex items-center gap-4">.*?<\/div>/s);

if (emailButtonMatch && socialDivMatch) {
  const emailButton = emailButtonMatch[0];
  const socialDiv = socialDivMatch[0];
  
  // replace both with a placeholder, then put them back in reverse order
  let newContent = content.replace(emailButton, '___EMAIL_BUTTON___');
  newContent = newContent.replace(socialDiv, '___SOCIAL_DIV___');
  
  // They were originally: email then social.
  // We want: social then email.
  
  // wait, the structure is:
  // <h3 ...> {t.footer.contact} </h3>
  // {emailButton}
  // {socialDiv}
  
  // Let's replace the whole section
  const oldSectionRegex = /<h3 className="text-\[17px\] font-bold text-slate-900 mb-2 font-sans text-center">\s*\{t\.footer\.contact\}\s*<\/h3>.*?<\/button>\s*<div className="flex items-center gap-4">.*?<\/div>/s;
  
  const sectionMatch = content.match(oldSectionRegex);
  
  if (sectionMatch) {
     const replacement = `<h3 className="text-[17px] font-bold text-slate-900 mb-3 font-sans text-center">
              {t.footer.contact}
            </h3>
            
            ${socialDiv}

            <button onClick={() => setIsContactModalOpen(true)} dir="ltr" className="group flex items-center justify-center gap-3 w-full lg:w-auto mt-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-brand-primary group-hover:shadow-lg group-hover:shadow-brand-primary/20 transition-all duration-300 group-hover:-translate-y-1 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-slate-500 font-en font-medium whitespace-nowrap group-hover:text-brand-primary transition-colors">
                info@karimzakaria.com
              </span>
            </button>`;
            
     content = content.replace(sectionMatch[0], replacement);
     fs.writeFileSync(path, content);
     console.log("updated");
  } else {
     console.log("Section not found");
  }
}


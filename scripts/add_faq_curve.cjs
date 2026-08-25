const fs = require('fs');

const faqPath = 'src/components/sections/FAQ.tsx';
let faqContent = fs.readFileSync(faqPath, 'utf8');

const oldSideAccent = `{/* Animated Side Accent Line */}`;
const newSideAccent = `{/* Luxurious Fluid Accent Corner (Visible when closed) */}
            <div 
              className={cn(
                "absolute -top-[1px] -bottom-[1px] -left-[1px] -right-[1px] rounded-[inherit] border-[2px] border-brand-primary pointer-events-none transition-all duration-500 z-10",
                openIndex === index ? "opacity-0" : "opacity-60 group-hover:opacity-100"
              )}
              style={{ 
                WebkitMaskImage: lang === 'ar' 
                  ? 'radial-gradient(circle at top right, black 0%, transparent 100px)' 
                  : 'radial-gradient(circle at top left, black 0%, transparent 100px)',
                maskImage: lang === 'ar' 
                  ? 'radial-gradient(circle at top right, black 0%, transparent 100px)' 
                  : 'radial-gradient(circle at top left, black 0%, transparent 100px)',
              }}
            />
            {/* Animated Side Accent Line */}`;

if (faqContent.includes(oldSideAccent)) {
  faqContent = faqContent.replace(oldSideAccent, newSideAccent);
  fs.writeFileSync(faqPath, faqContent);
  console.log('Added curve to FAQ successfully');
} else {
  console.log('Old side accent not found');
}

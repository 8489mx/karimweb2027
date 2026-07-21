import { trackWhatsAppClick } from "../../utils/tracking";
import React from 'react';
import { Section } from '../ui/Section';
import { Dumbbell, Salad, HeartPulse, Shield, MessageCircle, Smartphone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';

export function Programs() {
  const { t, lang } = useLanguage();

  // Icons used
  const icons = [
    <Dumbbell className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
    <Salad className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
    <HeartPulse className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
    <Shield className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
    <MessageCircle className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
    <Smartphone className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
  ];

  return (
    <div className="relative z-10 transition-colors duration-500 overflow-hidden bg-transparent">
      <Section id="programs">
        
        {/* Section Header */}
        <div className="text-center mb-12 max-w-2xl md:max-w-none mx-auto">
          <SectionHeading className="mb-4">
            {t.programs.title.split(lang === 'ar' ? 'خطة متكاملة' : 'A complete plan').map((part: string, i: number, arr: string[]) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="text-brand-primary">
                    {lang === 'ar' ? 'خطة متكاملة' : 'A complete plan'}
                  </span>
                )}
              </React.Fragment>
            ))}
          </SectionHeading>
          {t.programs.description && (
            <p className="text-base sm:text-[1.1rem] md:text-xl lg:text-2xl text-brand-muted leading-relaxed px-2 font-medium whitespace-pre-line">
              {t.programs.description}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
             {t.programs.items.map((item, idx) => (
               <div 
                 key={idx} 
                 className="group relative bg-white rounded-[16px] md:rounded-[20px] p-5 md:p-6 transition-all hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] active:shadow-md duration-300 text-start flex flex-col border border-transparent hover:border-brand-primary/10 active:border-brand-primary/20 cursor-pointer"
                 style={{
                   boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)'
                 }}
                 onTouchStart={() => {}}
               >
                 {/* Luxurious Fluid Accent Corner */}
                 <div 
                   className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-80 group-hover:opacity-100"
                   style={{
                     WebkitMaskImage: lang === 'ar' 
                       ? 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                       : 'radial-gradient(circle at top left, black 0%, transparent 150px)',
                     maskImage: lang === 'ar' 
                       ? 'radial-gradient(circle at top right, black 0%, transparent 150px)'
                       : 'radial-gradient(circle at top left, black 0%, transparent 150px)'
                   }}
                 ></div>

                 {/* Shine and Reveal Effects Container */}
                 <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none z-0">
                   {/* Glassmorphism Shine Effect for Card */}
                   <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[150%] group-active:translate-x-[150%] pointer-events-none z-10" />

                   {/* Circular Background Reveal */}
                   <div className="absolute top-5 end-5 w-12 h-12 bg-brand-primary rounded-full opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-[35] group-active:opacity-100 group-active:scale-[35] transition-all duration-700 ease-out origin-center z-0 pointer-events-none" />
                 </div>

                 <div className="relative z-10 flex items-center justify-between mb-3">
                   <h3 className="text-[16px] md:text-[18px] font-bold text-slate-900 group-hover:text-white group-active:text-white transition-colors duration-300 ml-2">{item.title}</h3>
                   <div className="w-[42px] h-[42px] md:w-[48px] md:h-[48px] rounded-[12px] md:rounded-[14px] bg-brand-primary/90 shadow-sm flex items-center justify-center shrink-0 relative overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:scale-105 group-active:scale-105 text-white border border-brand-primary/30 group-hover:border-white/30 group-active:border-white/30">
                     {/* Darker background on hover inside icon */}
                     <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />
                     
                     {/* Inner icon shine */}
                     <div className="absolute inset-0 -translate-x-[150%] skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[150%] group-active:translate-x-[150%] pointer-events-none z-10" />
                     
                     <div className="relative z-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-active:scale-110">
                        {icons[idx]}
                     </div>
                   </div>
                 </div>
                 <p className="relative z-10 text-[14px] md:text-[15px] text-slate-500 leading-relaxed group-hover:text-white/90 group-active:text-white/90 transition-colors duration-300">
                   {item.desc}
                 </p>
               </div>
             ))}
           </div>
           
            <div className="mt-12 flex justify-center">
              <Button onClick={() => trackWhatsAppClick({ cta_location: "programs", button_text: t.hero.cta })} 
                href="https://wa.me/201001060503?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%86%D8%A7%20%D9%85%D9%87%D8%AA%D9%85%20%D8%A3%D8%A8%D8%AF%D8%A3%20%D8%AE%D8%B7%D8%A9%20%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%20%D9%88%D8%AA%D8%BA%D8%B0%D9%8A%D8%A9%20%D8%A3%D9%88%D9%86%D9%84%D8%A7%D9%8A%D9%86%20%D9%88%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%B9%D8%B1%D9%81%20%D8%A3%D9%86%D8%B3%D8%A8%20%D8%A8%D8%A7%D9%82%D8%A9%20%D9%84%D9%8A%D8%A7." 
                size="lg" 
                className="w-full sm:w-auto px-10"
              >
                {t.programs.ctaBtn}
              </Button>
            </div>
        </div>

      </Section>
    </div>
  );
}

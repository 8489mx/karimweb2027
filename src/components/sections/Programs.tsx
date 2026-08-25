import DOMPurify from "dompurify";
import { trackWhatsAppClick } from "../../utils/tracking";
import React from 'react';
import { Section } from '../ui/Section';
import { Dumbbell, Salad, HeartPulse, Shield, MessageCircle, Smartphone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';

export function Programs() {
  const { t, lang } = useLanguage();
  const { settings } = useSettings();

  // Icons used
  const icons = [
    <Dumbbell className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
    <Salad className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
    <HeartPulse className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
    <Shield className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
    <MessageCircle className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
    <Smartphone className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
  ];

  const itemColors = [
    '#58B4E5', 
    '#58B4E5', 
    '#58B4E5', 
    '#58B4E5', 
    '#58B4E5', 
    '#58B4E5', 
  ];

  return (
    <div className="relative z-10 transition-colors duration-500 overflow-hidden bg-transparent">
      <Section id="programs">
        
        {/* Section Header */}
        <div className="text-center mb-12 max-w-2xl md:max-w-none mx-auto">
          <SectionHeading className="mb-2">
            {t.programs.title}
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
             {((settings?.programs && settings.programs.length > 0) ? settings.programs : t.programs.items).map((item, idx) => (
               <div 
                 key={idx} 
                 className="group relative bg-white/60 backdrop-blur-md rounded-[16px] md:rounded-[20px] p-5 md:p-6 transition-all duration-500 hover:shadow-md active:scale-[0.98] text-start flex flex-col border border-white/50 hover:-translate-y-1 cursor-pointer"
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
                   {/* Diagonal Stripes Pattern */}
                   <div 
                     className="absolute -inset-[100%] opacity-[0.04] group-hover:opacity-0 transition-opacity duration-500 rotate-[15deg]"
                     style={{
                       backgroundImage: 'repeating-linear-gradient(-45deg, var(--color-brand-primary) 0, var(--color-brand-primary) 50px, transparent 50px, transparent 100px)'
                     }}
                   />
                   <div 
                     className="absolute -inset-[100%] opacity-[0.02] group-hover:opacity-0 transition-opacity duration-500 -rotate-[15deg]"
                     style={{
                       backgroundImage: 'repeating-linear-gradient(-45deg, transparent 0, transparent 60px, var(--color-brand-primary) 60px, var(--color-brand-primary) 120px)'
                     }}
                   />
                   {/* Glassmorphism Shine Effect for Card */}
                   <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[150%] group-active:translate-x-[150%] pointer-events-none z-10" />
                   
                   {/* Circular Background Reveal */}
                   <div className="absolute top-5 end-5 w-12 h-12 bg-brand-primary rounded-full opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-[35] group-active:opacity-100 group-active:scale-[35] transition-all duration-700 ease-out origin-center z-0 pointer-events-none" />
                 </div>

                 <div className="relative z-10 flex items-center justify-between mb-3">
                   <h3 className="text-[16px] md:text-[18px] font-bold text-slate-900 ml-2 group-hover:text-white group-active:text-white transition-colors duration-300">{item.title}</h3>
                   <div 
                     className="w-[42px] h-[42px] md:w-[48px] md:h-[48px] rounded-[12px] md:rounded-[14px] flex items-center justify-center shrink-0 relative overflow-hidden transition-all duration-300 group-hover:scale-105 group-active:scale-105"
                     style={{ 
                       backgroundColor: `${itemColors[idx % itemColors.length]}15`, 
                       color: itemColors[idx % itemColors.length],
                       boxShadow: `inset 0 0 0 1px ${itemColors[idx % itemColors.length]}25, 0 4px 12px ${itemColors[idx % itemColors.length]}20`
                     }}
                   >
                     {/* Darker background on hover inside icon */}
                     <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />
                     
                     {/* Inner icon shine */}
                     <div className="absolute inset-0 -translate-x-[150%] skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[150%] group-active:translate-x-[150%] pointer-events-none z-10" />
                     
                     <div className="relative z-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-active:scale-110">
                        {icons[idx % icons.length]}
                     </div>
                   </div>
                 </div>
                 <div className="relative z-10 text-[14px] md:text-[15px] text-slate-500 leading-relaxed group-hover:text-white/90 group-active:text-white/90 transition-colors duration-300 [&>p]:inline" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.desc || (item as any).description || "") }} />
               </div>
             ))}
           </div>
           
            <div className="mt-12 flex justify-center">
              <Button onClick={(e) => { e.preventDefault(); document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" }); }}
                href="#packages" 
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

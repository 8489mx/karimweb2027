import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Section } from '../ui/Section';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { SectionHeading } from '../ui/SectionHeading';
import { MessageCircle, FileText, Dumbbell } from 'lucide-react';

export function Process() {
  const { t, lang } = useLanguage();
  const isRtl = lang === 'ar';

  const icons = [MessageCircle, FileText, Dumbbell];
  
  const iconBgColors = [
    "#58B4E5",
    "#399ACF",
    "#1A80B9"
  ];

  return (
    <Section id="process" className="relative z-10 overflow-hidden bg-transparent border-none py-24">
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 max-w-3xl mx-auto px-4"
      >
        <SectionHeading className="mb-2">
          {t.process.title}
        </SectionHeading>
        {t.process.description && (
          <p className="text-base sm:text-[1.1rem] md:text-xl lg:text-2xl text-brand-muted leading-relaxed px-2 font-medium max-w-3xl mx-auto mb-6">
            {t.process.description}
          </p>
        )}
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Desktop Connecting Dashed Line */}
        <div className="hidden lg:block absolute top-[44px] left-[15%] right-[15%] h-[2px] z-0">
          <div className="w-full h-full border-t-2 border-dashed border-slate-200" style={{ backgroundImage: 'linear-gradient(90deg, #e2e8f0 50%, transparent 50%)', backgroundSize: '16px 2px', border: 'none' }}></div>
        </div>

        {/* Mobile Connecting Dashed Line */}
        <div className={cn(
          "lg:hidden absolute top-[40px] bottom-[40px] w-[2px] z-0",
          isRtl ? "right-[39px]" : "left-[39px]"
        )}>
          <div className="w-full h-full border-l-2 border-dashed border-slate-200" style={{ backgroundImage: 'linear-gradient(180deg, #e2e8f0 50%, transparent 50%)', backgroundSize: '2px 16px', border: 'none' }}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
          {t.process.steps.map((step: any, index: number) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={cn(
                  "relative flex flex-col group",
                  "lg:items-center lg:text-center",
                  isRtl ? "pr-24 lg:pr-0" : "pl-24 lg:pl-0"
                )}
                dir={isRtl ? "rtl" : "ltr"}
              >
                {/* Icon Container (Squircle) */}
                <div 
                  className={cn(
                    "absolute lg:relative lg:mb-10 w-20 h-20 lg:w-[88px] lg:h-[88px] rounded-[1.5rem] lg:rounded-[2rem] flex items-center justify-center shrink-0 shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 z-10",
                    isRtl ? "right-0 lg:right-auto" : "left-0 lg:left-auto"
                  )}
                  style={{ backgroundColor: iconBgColors[index % iconBgColors.length] }}
                >
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 rounded-[inherit] border border-white/20"></div>
                  <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-white drop-shadow-sm" strokeWidth={2} />
                  

                </div>

                {/* Content Card */}
                <div className={cn(
                  "relative bg-white/60 backdrop-blur-md p-6 lg:p-8 rounded-3xl border border-white/50 shadow-[0_4px_24px_rgb(0,0,0,0.03)] transition-all duration-500 w-full lg:h-full lg:flex lg:flex-col hover:-translate-y-1 hover:shadow-md cursor-pointer",
                )}>
                  {/* Luxurious Fluid Accent Corner */}
                  <div 
                    className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] pointer-events-none transition-all duration-500 opacity-80 group-hover:opacity-100 z-20"
                    style={{
                      borderColor: iconBgColors[index % iconBgColors.length],
                      WebkitMaskImage: lang === 'ar' 
                        ? 'radial-gradient(circle at top right, black 0%, transparent 150px), radial-gradient(circle at bottom left, black 0%, transparent 150px)'
                        : 'radial-gradient(circle at top left, black 0%, transparent 150px), radial-gradient(circle at bottom right, black 0%, transparent 150px)',
                      maskImage: lang === 'ar' 
                        ? 'radial-gradient(circle at top right, black 0%, transparent 150px), radial-gradient(circle at bottom left, black 0%, transparent 150px)'
                        : 'radial-gradient(circle at top left, black 0%, transparent 150px), radial-gradient(circle at bottom right, black 0%, transparent 150px)'
                    }}
                  ></div>

                  {/* Shine and Reveal Effects Container */}
                  <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none z-0">
                    {/* Glassmorphism Shine Effect for Card */}
                    <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[150%] group-active:translate-x-[150%] pointer-events-none z-10" />
                    
                    {/* Circular Background Reveal */}
                    <div 
                      className="absolute top-5 end-5 w-12 h-12 rounded-full opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-[35] group-active:opacity-100 group-active:scale-[35] transition-all duration-700 ease-out origin-center z-0 pointer-events-none"
                      style={{ backgroundColor: iconBgColors[index % iconBgColors.length] }}
                    />
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    <h3 className="text-[16px] md:text-[18px] font-bold text-slate-900 mb-3 leading-normal group-hover:text-white transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-slate-500 leading-relaxed font-medium text-[15px] lg:mt-auto text-start group-hover:text-white/90 transition-colors duration-300">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Section } from '../ui/Section';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { SectionHeading } from '../ui/SectionHeading';

export function Process() {
  const { t, lang } = useLanguage();
  const isRtl = lang === 'ar';

  return (
    <Section id="process" className="relative z-10 overflow-hidden bg-transparent border-none">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 max-w-3xl mx-auto px-4"
      >
        <SectionHeading className="mb-6">
          <span className="text-brand-primary">
            {t.process.title.split(' ')[0]}
          </span>
          {' '}
          {t.process.title.split(' ').slice(1).join(' ')}
        </SectionHeading>
        {t.process.description && (
          <p className="text-base sm:text-[1.1rem] md:text-xl lg:text-2xl text-brand-muted leading-relaxed px-2 font-medium">
            {t.process.description}
          </p>
        )}
      </motion.div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-6 sm:top-7 left-0 right-0 h-[2px] bg-brand-border/60 z-0"></div>

          {t.process.steps.map((step: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative z-10 flex flex-col items-start text-start group h-full"
              dir={isRtl ? "rtl" : "ltr"}
            >
              {/* Connecting Line (Mobile Only) */}
              <div 
                className={cn(
                  "md:hidden absolute top-6 w-[2px] bg-brand-border/60 z-[-1]",
                  isRtl ? "right-6 sm:right-7" : "left-6 sm:left-7",
                  index === t.process.steps.length - 1 ? "bottom-8" : "bottom-[-2rem]"
                )}
              ></div>

              {/* Step Number Circle */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-[4px] border-brand-bg shadow-sm flex items-center justify-center mb-6 shrink-0 relative z-10 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                <span className="text-lg sm:text-xl font-bold text-brand-primary">
                  {index + 1}
                </span>
              </div>

              {/* Step Content */}
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] w-full border border-brand-border/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 relative group/card">
                {/* Luxurious Fluid Accent Corner */}
                <div 
                  className="absolute -top-[1.5px] -bottom-[1.5px] -left-[1.5px] -right-[1.5px] rounded-[inherit] border-[2px] md:border-[3px] border-brand-primary pointer-events-none transition-all duration-500 opacity-80 group-hover/card:opacity-100"
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
                  <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover/card:translate-x-[150%] group-active:translate-x-[150%] pointer-events-none z-10" />

                  {/* Circular Background Reveal */}
                  <div className="absolute top-5 end-5 w-12 h-12 bg-brand-primary rounded-full opacity-0 scale-0 group-hover/card:opacity-100 group-hover/card:scale-[35] group-active/card:opacity-100 group-active/card:scale-[35] transition-all duration-700 ease-out origin-center z-0 pointer-events-none" />
                </div>
                
                <h3 className="text-lg sm:text-xl lg:text-lg xl:text-xl font-bold text-brand-text group-hover/card:text-white transition-colors duration-300 mb-3 sm:mb-4 relative z-10">
                  {step.title}
                </h3>
                <p className="text-[15px] sm:text-base text-brand-muted group-hover/card:text-white/90 transition-colors duration-300 leading-relaxed relative z-10 whitespace-pre-line">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}


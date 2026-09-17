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
        className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto px-4"
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
        

        {/* We use a flex column for mobile, grid for desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-10 relative z-10">
          {t.process.steps.map((step: any, index: number) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group w-full h-full"
                dir={isRtl ? "rtl" : "ltr"}
              >
                {/* ========================================= */}
                {/* MOBILE LAYOUT (Horizontal Card)           */}
                {/* ========================================= */}
                <div className="flex flex-row bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden w-full relative active:scale-[0.98] transition-transform duration-200 h-full">
                  {/* Colored Block for Step Number */}
                  <div 
                    className="relative w-[50px] lg:w-[70px] shrink-0 flex flex-col items-center justify-center text-white pl-1 lg:pl-2"
                    style={{ 
                      backgroundColor: iconBgColors[index % iconBgColors.length],
                      clipPath: isRtl ? 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)' : 'polygon(0 0, 100% 0, 80% 100%, 0 100%)'
                    }}
                  >
                    
                    <span className="text-2xl lg:text-3xl font-black leading-none mb-0 tracking-tighter">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 py-4 lg:py-5 pl-3 lg:pl-4 pr-4 lg:pr-5 flex flex-col justify-center bg-white">
                    
                    <div className="flex flex-col">
                      <h3 className="font-bold text-[16px] lg:text-[17px] xl:text-[19px] text-slate-900 leading-normal mb-2 whitespace-nowrap text-center">
                        {step.title}
                      </h3>
                      <p className="text-[14px] lg:text-[15px] text-slate-600 leading-[1.8] lg:leading-[2] mt-1 text-center px-1">
                        {step.desc}
                      </p>
                    </div>
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

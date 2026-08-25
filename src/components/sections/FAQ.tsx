import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';
import { SectionHeading } from '../ui/SectionHeading';

export function FAQ() {
  const { t, dir, lang } = useLanguage();
  const { settings } = useSettings();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Use settings.faq if available and not empty, otherwise fallback to translations
  const faqData = settings?.faq && settings.faq.length > 0 ? settings.faq : t.faq.questions;
  const [showAll, setShowAll] = useState(false);

  const toggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const displayedQuestions = showAll ? faqData : faqData.slice(0, 8);

  return (
    <Section className="relative z-10">
      <div 
        className="text-center mb-10 max-w-3xl mx-auto"
      >
        <SectionHeading className="mb-2">
          {t.faq.title}
        </SectionHeading>
        <p className="text-base sm:text-[1.1rem] md:text-xl lg:text-2xl text-brand-muted leading-relaxed px-2 font-medium mb-6">
          {t.faq.description}
        </p>
      </div>

      <div 
        className="max-w-2xl mx-auto space-y-3.5"
      >
        {displayedQuestions.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className={cn(
                "group relative rounded-2xl transition-all duration-300 overflow-hidden",
                isOpen
                  ? "bg-white border-2 border-brand-primary shadow-[0_8px_25px_rgba(88,180,229,0.15)] ring-4 ring-brand-primary/10"
                  : "bg-white/75 backdrop-blur-xl border border-slate-200/75 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:bg-white hover:border-brand-primary/45 hover:shadow-[0_6px_20px_rgba(88,180,229,0.08)] hover:-translate-y-[1px]"
              )}
            >
              <button 
                aria-expanded={isOpen}
                onClick={() => toggle(index)}
                className={cn(
                  "w-full px-4.5 sm:px-5.5 py-3.5 sm:py-4 flex items-center justify-between gap-3.5 text-start cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                  dir === 'rtl' ? 'text-right' : 'text-left'
                )}
              >
                <span className={cn(
                  "font-bold text-[13.5px] sm:text-[15px] md:text-[15.5px] leading-snug transition-colors duration-300 select-none", 
                  isOpen ? "text-brand-primary" : "text-brand-text group-hover:text-brand-primary"
                )}>
                  {faq.q}
                </span>

                <div 
                  className={cn(
                    "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                    isOpen 
                      ? "bg-brand-primary text-white shadow-[0_2px_8px_rgba(88,180,229,0.35)] rotate-180" 
                      : "bg-slate-100/90 text-slate-500 group-hover:bg-brand-primary/15 group-hover:text-brand-primary"
                  )}
                >
                  <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4.5 sm:px-5.5 pb-4 pt-0">
                      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-3.5" />
                      <p className={cn(
                        "text-[#1E3A5F] font-medium text-xs sm:text-[14.5px] leading-relaxed",
                        dir === 'rtl' ? 'pr-1' : 'pl-1'
                      )}>
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {faqData.length > 8 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2.5 rounded-full bg-white/50 backdrop-blur-sm border border-white/60 text-brand-primary font-bold text-sm shadow-sm transition-all hover:bg-white/80 hover:-translate-y-0.5 active:translate-y-0"
          >
            {showAll ? t.faq.showLess : t.faq.showMore}
          </button>
        </div>
      )}

    </Section>
  );
}

import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';
import { SectionHeading } from '../ui/SectionHeading';

export function FAQ() {
  const { t, dir } = useLanguage();
  const { settings } = useSettings();
  
  // Use direct questions array
  const questions = t.faq.questions || [];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  
  const initialShowCount = 5;
  const visibleQuestions = showAll ? questions : questions.slice(0, initialShowCount);

  const toggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <Section className="relative z-10 py-16 md:py-24">
      <div className="text-center mb-10 max-w-3xl mx-auto px-4">
        <SectionHeading className="mb-2">
          {t.faq.title}
        </SectionHeading>
        <p className="text-base sm:text-[1.1rem] md:text-xl lg:text-2xl text-brand-muted leading-relaxed px-2 font-medium mb-8">
          {t.faq.description.includes('؟') ? (
            <>
              <span className="block sm:inline">{t.faq.description.split('؟')[0]}؟</span>
              <span className="hidden sm:inline"> </span>
              <span className="block sm:inline">{t.faq.description.split('؟')[1]?.trim()}</span>
            </>
          ) : t.faq.description.includes('?') ? (
            <>
              <span className="block sm:inline">{t.faq.description.split('?')[0]}?</span>
              <span className="hidden sm:inline"> </span>
              <span className="block sm:inline">{t.faq.description.split('?')[1]?.trim()}</span>
            </>
          ) : (
            t.faq.description
          )}
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-0">
        <div className="space-y-3.5">
          <AnimatePresence initial={false}>
            {visibleQuestions.map((faq: any, index: number) => {
              const isOpen = openIndex === index;
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
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
                      "font-bold text-[13.5px] sm:text-[14.5px] md:text-[16px] leading-[1.5] transition-colors duration-300 select-none", 
                      isOpen ? "text-slate-900 font-extrabold" : "text-brand-text group-hover:text-slate-900"
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
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        {questions.length > initialShowCount && (
          <motion.div layout className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center justify-center gap-2 px-6 py-3 bg-white/80 border border-slate-200/80 hover:border-brand-primary/30 rounded-xl font-bold text-brand-text hover:text-brand-primary shadow-sm hover:shadow-[0_4px_15px_rgba(88,180,229,0.1)] transition-all duration-300"
            >
              <span>{showAll ? t.faq.showLess : t.faq.showMore}</span>
              <ChevronDown className={cn(
                "w-4 h-4 transition-transform duration-300",
                showAll ? "rotate-180" : "group-hover:translate-y-1"
              )} />
            </button>
          </motion.div>
        )}
      </div>
    </Section>
  );
}

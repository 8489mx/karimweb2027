import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '../../context/LanguageContext';
import { SectionHeading } from '../ui/SectionHeading';

export function FAQ() {
  const { t, dir, lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const displayedQuestions = showAll ? t.faq.questions : t.faq.questions.slice(0, 8);

  return (
    <Section className="relative z-10">
      <div 
        className="text-center mb-10 max-w-3xl mx-auto"
      >
        <SectionHeading className="mb-4">
          <span className="text-brand-primary">{t.faq.title.split(' ').slice(0, 1).join(' ')}</span> {t.faq.title.split(' ').slice(1).join(' ')}
        </SectionHeading>
        <p className="text-base sm:text-[1.1rem] md:text-xl lg:text-2xl text-brand-muted leading-relaxed px-2 font-medium">
          {t.faq.description}
        </p>
      </div>

      <div 
        className="max-w-2xl mx-auto space-y-3"
      >
        {displayedQuestions.map((faq, index) => (
          <div 
            key={index}
            className="group relative rounded-xl bg-white/20 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:bg-white/30"
          >
            {/* Animated Side Accent Line */}
            <div 
              className={cn(
                "absolute top-1/2 -translate-y-1/2 w-[3px] sm:w-[4px] bg-brand-primary transition-all duration-500 ease-out z-30 rounded-full",
                dir === 'rtl' ? 'right-[2px]' : 'left-[2px]',
                openIndex === index 
                  ? "h-[calc(100%-12px)] opacity-100 shadow-[0_0_12px_rgba(78,129,182,0.6)]" 
                  : "h-0 opacity-0 group-hover:h-[50%] group-hover:opacity-40"
              )}
            ></div>

            <div className="relative z-20 overflow-hidden rounded-[inherit]">
              <button aria-expanded={openIndex === index}
                onClick={() => toggle(index)}
                className={cn("w-full px-3 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-2 focus:outline-none", dir === 'rtl' ? 'text-right' : 'text-left')}
              >
                <span className={cn("font-semibold text-brand-text text-xs sm:text-sm md:text-[15px] leading-relaxed md:leading-relaxed text-start", dir === 'rtl' ? 'pr-1 sm:pr-2' : 'pl-1 sm:pl-2')}>{faq.q}</span>
                <ChevronDown 
                  className={cn("w-4 h-4 text-brand-muted shrink-0 transition-transform duration-200", 
                  openIndex === index ? "rotate-180 text-brand-primary" : "")} 
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 pt-0 mt-1">
                      <div className="h-[1px] w-full bg-white/20 mb-3" />
                      <p className={cn("text-brand-muted text-[14px] leading-relaxed text-start", dir === 'rtl' ? 'pr-2' : 'pl-2')}>
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {t.faq.questions.length > 8 && (
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

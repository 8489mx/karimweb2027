import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CornerDownLeft, CornerDownRight } from 'lucide-react';
import { trackFinalCtaClick } from '../../utils/tracking';

export function FinalCTA() {
  const { t, lang, dir } = useLanguage();

  return (
    <section id="final-cta" className="relative z-10 w-full md:px-6 mb-16 md:mb-24 mt-8" dir={dir}>
      <div className="relative max-w-5xl mx-auto md:rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl border-y md:border-x border-white/10 group">
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/images/cta/coach-action.png" 
            alt="Gym background" 
            width="1920"
            height="1080"
            loading="lazy"
            className="w-full h-full object-cover object-[center_20%] opacity-40 transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Dark gradient to make text readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/50 to-slate-900/40"></div>
          
          {/* Diagonal Blue Accents */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(45deg,transparent_40%,var(--color-brand-primary)_45%,transparent_50%)] bg-[length:250%_250%] translate-x-1/4"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(45deg,transparent_30%,var(--color-brand-primary)_35%,transparent_40%)] bg-[length:250%_250%] translate-x-1/3"></div>
          </div>
          
          {/* Ambient blue glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-primary/30 blur-[100px] rounded-full pointer-events-none"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8 px-6 md:px-12 py-8 md:py-10">
          
          <div className="flex flex-col gap-2 text-center md:text-start">
            <h2 className="text-[17px] sm:text-lg md:text-[20px] lg:text-[22px] font-bold text-white tracking-tight drop-shadow-sm md:whitespace-nowrap leading-[1.6] md:leading-normal">
              <span className="block md:inline">ابدأ بخطة مصممه ليك،</span>
              <span className="hidden md:inline"> </span>
              <span className="block md:inline">مش نسخة جاهزة لكل الناس</span>
            </h2>
          </div>
          
          <a 
            href="/#packages"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
              }
              trackFinalCtaClick({ cta_location: 'final_cta', button_text: t.finalCta.ctaBtn });
            }}
            className="group/btn relative inline-flex items-center justify-center gap-2 px-6 py-2.5 md:px-8 md:py-3 bg-brand-primary text-white rounded-lg font-bold text-[15px] md:text-base overflow-hidden transition-all hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(78,129,182,0.3)] hover:shadow-[0_8px_25px_rgba(78,129,182,0.5)] border border-white/20 whitespace-nowrap shrink-0"
          >
            {/* Inner shine effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
            
            <span className="relative z-10">{t.finalCta.ctaBtn}</span>
            {lang === 'ar' ? (
              <CornerDownLeft strokeWidth={2.5} size={16} className="relative z-10" />
            ) : (
              <CornerDownRight strokeWidth={2.5} size={16} className="relative z-10" />
            )}
          </a>
          
        </div>
      </div>
    </section>
  );
}

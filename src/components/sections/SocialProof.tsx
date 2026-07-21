import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export function SocialProof() {
  const { t, lang } = useLanguage();
  
  const stats = [
    { label: t.stats.certified, value: "ISSA" },
    { label: t.stats.experience, value: "+10" },
    { label: t.stats.clients, value: "+999" },
    { label: t.stats.customPrograms, value: "%100" },
  ];

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:flex relative z-20 px-4 md:px-0 w-full -mt-[100px] lg:-mt-[56px] mb-8 lg:mb-12 justify-center">
        <div 
          className="w-[95%] max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] group overflow-hidden"
        >
          {/* Glassmorphism Shine Effect */}
          <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[150%] pointer-events-none z-0" />
          
          <div className="relative z-10 pt-4 pb-6 px-6 lg:py-3 lg:px-10">
            <div dir="ltr" className="grid grid-cols-2 lg:flex lg:flex-row lg:justify-between lg:items-center text-center gap-y-6 lg:gap-y-0">
              {stats.map((stat, i) => (
                <React.Fragment key={`stat-${i}`}>
                  <div 
                    className="flex flex-col items-center justify-center w-full lg:w-1/4 opacity-95 group"
                  >
                    <span 
                      dir="ltr" 
                      className="font-black text-brand-primary tracking-tight leading-none mb-1 text-[1.8rem] md:text-[2rem] transition-transform duration-300 group-hover:scale-105"
                    >
                      {stat.value}
                    </span>
                    <span 
                      className="text-slate-500 font-medium text-[0.85rem] md:text-[0.95rem] uppercase"
                    >
                      {stat.label}
                    </span>
                  </div>
                  
                  {/* Desktop vertical divider */}
                  {i !== stats.length - 1 && (
                    <div className="hidden lg:block w-px h-8 bg-slate-200 shrink-0 mx-2"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version - Sleek Marquee Strip */}
      <div className="md:hidden relative z-20 w-full max-w-[100vw] overflow-hidden py-4 -mt-[45px] mb-[5px] flex mask-image-gradient pointer-events-none">
        <div className="flex whitespace-nowrap animate-marquee w-fit">
          {/* Repeat stats to ensure seamless marquee scroll */}
          {[...stats, ...stats, ...stats, ...stats].map((stat, i) => (
            <div key={`stat-mobile-${i}`} className="flex items-center mx-4 sm:mx-6 shrink-0" dir={stat.value === 'ISSA' ? 'ltr' : 'rtl'}>
              <span className={`font-bold text-white tracking-wider text-[1.2rem] ${stat.value === 'ISSA' ? 'mr-2' : 'ml-2'}`}>
                {stat.value}
              </span>
              <span className="text-white/90 font-medium text-[0.85rem] uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import React from 'react';
import { Section } from '../ui/Section';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { SectionHeading } from '../ui/SectionHeading';

export function About() {
  const { t, lang } = useLanguage();

  return (
    <Section id="about" className="overflow-hidden relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div 
          className="order-2 md:order-1 relative w-full rounded-2xl overflow-hidden aspect-[4/5] max-h-[600px] shadow-sm bg-black/5"
        >
          <img
            src="/assets/images/about/profile-photo.jpg"
            alt={lang === 'ar' ? "كابتن كريم زكريا" : "Captain Karim Zakaria"}
            width="500"
            height="500"
            loading="lazy"
            draggable={false}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none"
          />
        </div>
        
        <div className="order-1 md:order-2 flex flex-col gap-8">
          <div>
            <SectionHeading className="mb-6">
              {t.about.title}
            </SectionHeading>
            <div className="text-sm sm:text-base md:text-lg text-brand-muted leading-relaxed text-justify space-y-3">
              {t.about.description.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {t.about.points.map((point, idx) => (
              <div 
                key={idx} 
                className="relative bg-white/60 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-sm p-6 md:p-8 border border-white/50 transition-all duration-500 hover:shadow-md group hover:-translate-y-1"
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
                
                <div className="relative z-10 w-full">
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-brand-text group-hover:text-white group-active:text-white transition-colors duration-300">{point.title}</h3>
                  <p className="text-[18px] text-brand-muted leading-relaxed text-justify group-hover:text-white/90 group-active:text-white/90 transition-colors duration-300">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

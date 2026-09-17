import React from 'react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';
import { trackStartNowClick } from '../../utils/tracking';
import { MobileSocialProofMarquee } from './SocialProof';

import { ArrowLeft } from 'lucide-react';

export function Hero() {
  const { t, lang } = useLanguage();
  const { settings } = useSettings();

  return (
    <section 
      id="hero" 
      className="hero-mobile-viewport relative w-full max-w-[100vw] h-[100svh] min-h-[100svh] md:h-auto md:min-h-screen flex flex-col justify-between items-center overflow-hidden bg-black"
      style={{ minHeight: '100svh' }}
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {settings.cms?.heroVideoUrl ? (
          <video
            src={settings.cms.heroVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-40 select-none pointer-events-none"
          />
        ) : (
          <>
            <link rel="preload" as="image" href="https://images.unsplash.com/photo-1637430308606-86576d8fef3c?q=80&w=2070&auto=format&fit=crop" />
            <img
              src="https://images.unsplash.com/photo-1637430308606-86576d8fef3c?q=80&w=2070&auto=format&fit=crop"
              alt={lang === 'ar' ? "كابتن كريم زكريا - مدرب شخصي أونلاين وتخسيس" : "Captain Karim Zakaria - Online Personal Trainer & Weight Loss Coach"}
              width="2070"
              height="1380"
              fetchPriority="high"
              draggable={false}
              className="w-full h-full object-cover object-center opacity-40 grayscale select-none pointer-events-none"
            />
          </>
        )}
        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80"></div>
      </div>

      {/* Top Spacer to account for fixed Header on mobile */}
      <div className="w-full h-14 sm:h-16 md:h-0 shrink-0 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 w-full px-5 sm:px-6 text-center flex-1 flex flex-col items-center justify-center py-2 md:py-16">
        <h1 
          className="text-[clamp(1.4rem,5.5vw,1.8rem)] whitespace-nowrap leading-[1.3] sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-3 sm:mb-4 drop-shadow-lg text-white max-w-4xl mx-auto"
          dir="auto"
        >
          {settings.cms?.heroTitle || t.hero.title}
        </h1>
        
        <p 
          className="text-[0.8rem] min-[360px]:text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 w-full mb-6 sm:mb-8 md:mb-10 leading-relaxed font-medium text-center max-w-4xl mx-auto whitespace-nowrap"
          dir="auto"
        >
          {settings.cms?.heroSubtitle || t.hero.description}
        </p>
        
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap max-w-full">
          <Button 
            href="/#packages"
            variant="primary" 
            size="md" 
            className="rounded-xl px-5 sm:px-6 py-2.5 shadow-xl shadow-brand-primary/20 sm:text-lg min-w-[100px] sm:min-w-[120px]" 
            showWhatsAppIcon={false}
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
              }
              trackStartNowClick({ cta_location: 'hero', button_text: 'الباقات' });
            }}
          >
            الباقات
          </Button>

          <Button 
            href="/#calculator"
            variant="outline" 
            size="md" 
            className="rounded-xl px-5 sm:px-6 py-2.5 shadow-xl sm:text-lg bg-white border-none text-slate-900 hover:bg-slate-50 transition-all active:scale-[0.98]" 
            showWhatsAppIcon={false}
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
              }
              trackStartNowClick({ cta_location: 'hero_calculator', button_text: 'احسب سعراتك' });
            }}
          >
            احسب سعراتك
          </Button>
        </div>
      </div>

      {/* Mobile Marquee Strip - Pinned at the bottom of the initial screen */}
      <MobileSocialProofMarquee />
    </section>
  );
}

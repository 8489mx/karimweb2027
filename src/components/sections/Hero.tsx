import React from 'react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';
import { trackStartNowClick } from '../../utils/tracking';

export function Hero() {
  const { t, lang } = useLanguage();
  const { settings } = useSettings();

  return (
    <section id="hero" className="relative w-full max-w-[100vw] min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
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
              alt={lang === 'ar' ? "صورة تدريب كابتن كريم زكريا" : "Captain Karim Zakaria Training"}
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

      {/* Content */}
      <div className="relative z-10 w-full px-6 text-center mt-16 md:mt-0 pb-12 md:pb-16 flex flex-col items-center justify-center">
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4 drop-shadow-lg text-white max-w-4xl mx-auto"
          dir="auto"
          style={{ lineHeight: 1.4 }}
        >
          {settings.cms?.heroTitle || t.hero.title}
        </h1>
        
        <p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 w-full mb-10 leading-relaxed font-medium text-center max-w-4xl mx-auto lg:whitespace-nowrap"
        >
          {(settings.cms?.heroSubtitle || t.hero.description).split('\n').map((line: string, i: number) => (
            <React.Fragment key={i}>
              {line}
              {i !== (settings.cms?.heroSubtitle || t.hero.description).split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
        
        <div>
          <Button 
            href="/#packages"
            variant="primary" 
            size="lg" 
            className="rounded-xl px-6 py-2 md:px-8 md:py-3" 
            showWhatsAppIcon={false}
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
              }
              trackStartNowClick({ cta_location: 'hero', button_text: t.hero.cta });
            }}
          >
            {t.hero.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}

import { trackWhatsAppClick } from "../../utils/tracking";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { animate } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, t, dir } = useLanguage();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const headerActive = scrolled || !isHomePage;

  const navLinks = useMemo(() => [
    { name: t.nav.home, href: '/#hero', id: 'hero' },
    { name: t.nav.about, href: '/#about', id: 'about' },
    { name: t.nav.results, href: '/#results', id: 'results' },
    { name: t.nav.programs, href: '/#programs', id: 'programs' },
    { name: t.nav.process, href: '/#process', id: 'process' },
    { name: t.nav.packages, href: '/#packages', id: 'packages' },
    { name: t.nav.calculator, href: '/#calculator', id: 'calculator' },
  ], [t]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      if (!isHomePage) return;
      let currentSectionIndex = 0;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const sectionId = navLinks[i].id;
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Adjust threshold to be middle of screen
          if (rect.top <= window.innerHeight / 2.5) {
            currentSectionIndex = i;
            break;
          }
        }
      }
      setActiveIndex(currentSectionIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks, isHomePage]);

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;

        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          }
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  // Handle the "Ambience" (Active Item) Movement
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);

    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;

      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        },
      });
    }
  }, [activeIndex]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none" dir="ltr">
      <div 
        className={cn(
          "mx-auto pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4",
          headerActive 
            ? "w-[calc(100%-32px)] max-w-7xl md:w-[calc(100%-40px)] bg-white shadow-[0_14px_40px_rgba(0,0,0,0.05)] h-[46px] md:h-[62px] px-5 sm:px-6 lg:px-8 rounded-full mt-3 md:mt-4"
            : "w-full bg-transparent h-[60px] md:h-[96px] px-5 sm:px-6 lg:px-10 mt-0"
        )}
      >
        {/* Logo */}
        <div className="flex justify-start items-center z-10 flex-shrink-0">
          <Link smooth to="/#hero" className="block transition-opacity hover:opacity-80">
            <img 
              src="/assets/images/logo/2.png"
              alt={lang === 'ar' ? "لوجو كابتن كريم زكريا" : "Karim Zakaria Logo"}
              width="180"
              height="45"
              loading="eager"
              fetchPriority="high"
              draggable={false}
              className={cn(
                "w-auto object-contain transition-all duration-500 flex-shrink-0 select-none", 
                headerActive ? "h-8 md:h-[2.6rem]" : "h-10 md:h-[3.35rem]"
              )}
              style={{ filter: headerActive ? 'brightness(0)' : 'brightness(0) invert(1)' }}
            />
          </Link>
        </div>

        {/* Mobile Header Elements */}
        
        {/* Centered Mobile CTA Button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden flex items-center justify-center z-20">
          <Button onClick={() => trackWhatsAppClick({ cta_location: "header", button_text: t.hero.cta })} href="https://wa.me/201001060503?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%86%D8%A7%20%D9%85%D9%87%D8%AA%D9%85%20%D8%A3%D8%A8%D8%AF%D8%A3%20%D8%AE%D8%B7%D8%A9%20%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%20%D9%88%D8%AA%D8%BA%D8%B0%D9%8A%D8%A9%20%D8%A3%D9%88%D9%86%D9%84%D8%A7%D9%8A%D9%86%20%D9%88%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%B9%D8%B1%D9%81%20%D8%A3%D9%86%D8%B3%D8%A8%20%D8%A8%D8%A7%D9%82%D8%A9%20%D9%84%D9%8A%D8%A7." 
            className={cn(
              "px-4 py-1.5 text-[11px] sm:text-xs font-bold rounded-full shadow-sm whitespace-nowrap transition-all duration-300",
              headerActive 
                ? "bg-brand-primary text-white hover:bg-brand-primary-hover border-transparent"
                : "bg-transparent text-white border border-white/40 hover:bg-white hover:text-slate-900"
            )}
            showWhatsAppIcon={false}
          >
            {t.nav.contact}
          </Button>
        </div>
        
        <div className="flex items-center gap-3 lg:hidden justify-end z-20">
          {/* Mobile Nav Toggle */}
          <button
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
            className={cn("transition-colors duration-500", headerActive ? "text-[#0F172A]" : "text-white")}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1={dir === 'rtl' ? "12" : "4"} y1="12" x2={dir === 'rtl' ? "20" : "12"} y2="12"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex justify-center items-center relative h-full">
          <ul 
            ref={navRef}
            className="relative flex items-center h-full gap-1 z-[10]" 
            dir={dir}
          >
            {navLinks.map((link, idx) => (
              <li key={link.name} className="relative h-full flex items-center justify-center">
                <Link smooth
                  to={link.href}
                  data-index={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "px-4 py-2 text-[12px] xl:text-[13px] whitespace-nowrap font-bold uppercase transition-colors duration-200 rounded-full",
                    // Active vs Inactive Text
                    activeIndex === idx
                      ? (headerActive ? "text-brand-primary" : "text-white")
                      : (headerActive ? "text-slate-700 hover:text-slate-900" : "text-white/90 hover:text-white")
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* The Moving Spotlight (Follows Mouse) */}
            <div
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 w-full h-[calc(100%+16px)] z-[1] opacity-0 transition-opacity duration-300"
                style={{
                    opacity: hoverX !== null ? 1 : 0,
                    background: `
                      radial-gradient(
                        80px circle at var(--spotlight-x) 50%, 
                        ${headerActive ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.08)'} 0%, 
                        transparent 100%
                      )
                    `,
                    borderRadius: '999px'
                }}
            />

            {/* The Active State Ambience (Stays on Active) */}
            <div
                className="pointer-events-none absolute top-[calc(50%+16px)] left-0 h-[2px] z-[2] rounded-full transition-colors duration-300"
                style={{
                    width: '24px',
                    transform: 'translateX(calc(var(--ambience-x) - 50%))',
                    backgroundColor: headerActive ? '#94a3b8' : 'rgba(255,255,255,0.7)'
                }}
            />
          </ul>
        </nav>
          
        {/* Desktop Utilities */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 justify-end">
          <Button onClick={() => trackWhatsAppClick({ cta_location: "header", button_text: t.hero.cta })} href="https://wa.me/201001060503?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%86%D8%A7%20%D9%85%D9%87%D8%AA%D9%85%20%D8%A3%D8%A8%D8%AF%D8%A3%20%D8%AE%D8%B7%D8%A9%20%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%20%D9%88%D8%AA%D8%BA%D8%B0%D9%8A%D8%A9%20%D8%A3%D9%88%D9%86%D9%84%D8%A7%D9%8A%D9%86%20%D9%88%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%B9%D8%B1%D9%81%20%D8%A3%D9%86%D8%B3%D8%A8%20%D8%A8%D8%A7%D9%82%D8%A9%20%D9%84%D9%8A%D8%A7." 
            className={cn(
              "rounded-full font-bold whitespace-nowrap transition-all duration-300 px-6 xl:px-7 py-2 text-xs xl:text-sm shadow-sm",
              headerActive 
                ? "bg-brand-primary text-white hover:bg-brand-primary-hover" 
                : "bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-slate-900"
            )}
            showWhatsAppIcon={false}
          >
            {t.nav.contact}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 md:hidden pointer-events-auto"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden pointer-events-auto mt-2 mx-4 bg-white rounded-[24px] overflow-hidden shadow-[0_14px_40px_rgba(0,0,0,0.06)] relative z-10"
              dir={dir}
            >
            <div className="flex flex-col px-6 py-6 pb-8 gap-4">
              {navLinks.map((link) => (
                <Link smooth
                  key={link.name}
                  to={link.href}
                  className="text-sm font-bold uppercase text-slate-800 py-3 border-b border-slate-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex justify-center">
                <Button onClick={() => trackWhatsAppClick({ cta_location: "header", button_text: t.hero.cta })} href="https://wa.me/201001060503?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%86%D8%A7%20%D9%85%D9%87%D8%AA%D9%85%20%D8%A3%D8%A8%D8%AF%D8%A3%20%D8%AE%D8%B7%D8%A9%20%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%20%D9%88%D8%AA%D8%BA%D8%B0%D9%8A%D8%A9%20%D8%A3%D9%88%D9%86%D9%84%D8%A7%D9%8A%D9%86%20%D9%88%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%B9%D8%B1%D9%81%20%D8%A3%D9%86%D8%B3%D8%A8%20%D8%A8%D8%A7%D9%82%D8%A9%20%D9%84%D9%8A%D8%A7." className="rounded-xl bg-brand-primary text-white shadow-md">
                  {t.nav.contact}
                </Button>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

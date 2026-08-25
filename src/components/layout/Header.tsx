import { trackStartNowClick } from "../../utils/tracking";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { animate } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';
import { useLocation, Link } from 'react-router-dom';

export function Header() {
  const { settings } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

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
    ...(settings.enableStore ? [{ name: t.nav.store || 'المتجر', href: '/#store', id: 'store' }] : []),
    { name: t.nav.calculator, href: '/#calculator', id: 'calculator' },
  ], [t, settings.enableStore]);

  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none" dir="ltr">
      <div 
        className={cn(
          "mx-auto pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative flex items-center justify-between lg:gap-4",
          headerActive 
            ? "w-[calc(100%-32px)] max-w-7xl md:w-[calc(100%-40px)] bg-white shadow-[0_14px_40px_rgba(0,0,0,0.05)] h-[46px] md:h-[62px] px-5 sm:px-6 lg:px-8 rounded-full mt-3 md:mt-4"
            : "w-full bg-transparent h-[60px] md:h-[96px] px-5 sm:px-6 lg:px-10 mt-0"
        )}
      >
        {/* Logo */}
        <div className="flex justify-start items-center z-10 flex-shrink-0">
          <Link 
            to="/#hero" 
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="block transition-opacity hover:opacity-80"
          >
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
          <Button 
            href="/#packages"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
              }
              trackStartNowClick({ cta_location: "header", button_text: t.hero.cta });
            }} 
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
            className={cn("focus-visible:ring-2 focus-visible:ring-brand-primary rounded-md focus:outline-none transition-colors duration-500", headerActive ? "text-[#0F172A]" : "text-white")}
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
        <nav className="hidden lg:flex justify-center items-center relative h-full flex-1">
          <ul 
            className="relative flex items-center h-full gap-1 z-[10]" 
            dir={dir}
          >
            {navLinks.map((link, idx) => (
              <li key={link.name} className="relative h-full flex items-center justify-center">
                <Link
                  to={link.href}
                  onClick={(e) => {
                    setActiveIndex(idx);
                    if (isHomePage) {
                      const el = document.getElementById(link.id);
                      if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className={cn(
                    "px-4 py-2 text-[12px] xl:text-[13px] whitespace-nowrap font-bold uppercase transition-colors duration-200 rounded-full",
                    // Active vs Inactive Text
                    activeIndex === idx
                      ? (headerActive ? "text-brand-primary" : "text-white")
                      : (headerActive ? "text-slate-700 hover:text-brand-primary" : "text-white/90 hover:text-white")
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
          
        {/* Desktop Utilities */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 justify-end flex-shrink-0">
          <Button 
            href="/#packages"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
              }
              trackStartNowClick({ cta_location: "header", button_text: t.hero.cta });
            }} 
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
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-bold uppercase text-slate-800 py-3 border-b border-slate-100"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (isHomePage) {
                      const el = document.getElementById(link.id);
                      if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex justify-center">
                <Button 
                  href="/#packages"
                  onClick={(e) => {
                    if (window.location.pathname === '/') {
                      e.preventDefault();
                      document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                      setMobileMenuOpen(false);
                    }
                    trackStartNowClick({ cta_location: "header", button_text: t.hero.cta });
                  }} 
                  className="rounded-xl bg-brand-primary text-white shadow-md"
                >
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

import React, { useState } from 'react';
import { ContactModal } from '../ui/ContactModal';
import { useLanguage } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';
import { Link } from 'react-router-dom';

export function Footer() {
  const { t, lang: dir } = useLanguage();
  const { settings } = useSettings();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <footer className="relative bg-transparent pt-8 pb-4 overflow-hidden">

      
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-4 mb-6 items-center" dir={dir}>
          
          {/* Column 1: Brand & Bio (Spans 5 cols on lg) */}
          <div className="md:col-span-12 lg:col-span-6 flex flex-col items-center justify-center text-center h-full">
            <Link 
              to="/#hero" 
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="block transition-opacity hover:opacity-80"
            >
              <img 
                src="/assets/images/logo/2.png" 
                alt={t.footer.altLogo || "Karim Zakaria"} 
                width="180" 
                height="45" 
                loading="lazy" 
                className="w-[110px] md:w-[130px] h-auto object-contain" 
                style={{ filter: 'brightness(0)' }}
              />
            </Link>
            
          </div>

          {/* Column 3: Contact & Social (Spans 4 cols on lg) */}
          <div className="md:col-span-12 lg:col-span-6 flex flex-col items-center justify-center pt-4 lg:pt-0 h-full">
            <h3 className="text-[17px] font-bold text-slate-900 mb-3 font-sans text-center">
              {t.footer.contact}
            </h3>
            
            <div className="flex items-center gap-4">
              {(settings?.socialLinks?.facebook || (!settings?.socialLinks && "https://facebook.com/karimzakariia")) && (
              <a href={settings?.socialLinks?.facebook || "https://facebook.com/karimzakariia"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-200/60 flex items-center justify-center text-slate-700 hover:text-white hover:bg-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/20 transition-all duration-300 hover:-translate-y-1" aria-label="Facebook">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
            )}
              {(settings?.socialLinks?.youtube || (!settings?.socialLinks && "https://youtube.com/@karimzakariia")) && (
              <a href={settings?.socialLinks?.youtube || "https://youtube.com/@karimzakariia"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-200/60 flex items-center justify-center text-slate-700 hover:text-white hover:bg-[#FF0000] hover:shadow-lg hover:shadow-[#FF0000]/20 transition-all duration-300 hover:-translate-y-1" aria-label="YouTube">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            )}
              {(settings?.socialLinks?.snapchat || (!settings?.socialLinks && "https://snapchat.com/add/karimzakariia")) && (
              <a href={settings?.socialLinks?.snapchat || "https://snapchat.com/add/karimzakariia"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-200/60 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-[#FFFC00] hover:shadow-lg hover:shadow-[#FFFC00]/20 transition-all duration-300 hover:-translate-y-1" aria-label="Snapchat">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/></svg>
              </a>
            )}
              {(settings?.socialLinks?.instagram || (!settings?.socialLinks && "https://instagram.com/karimzakariia")) && (
              <a href={settings?.socialLinks?.instagram || "https://instagram.com/karimzakariia"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-200/60 flex items-center justify-center text-slate-700 hover:text-white hover:bg-gradient-to-tr hover:from-[#FCAF45] hover:via-[#F56040] hover:to-[#C13584] hover:shadow-lg hover:shadow-[#C13584]/20 transition-all duration-300 hover:-translate-y-1" aria-label="Instagram">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>
              </a>
            )}
              {(settings?.socialLinks?.tiktok || (!settings?.socialLinks && "https://tiktok.com/@karimzakariia")) && (
              <a href={settings?.socialLinks?.tiktok || "https://tiktok.com/@karimzakariia"} target="_blank" rel="noopener noreferrer" className="group w-10 h-10 rounded-xl bg-slate-200/60 flex items-center justify-center text-slate-700 hover:text-white hover:bg-black hover:shadow-lg hover:shadow-black/20 transition-all duration-300 hover:-translate-y-1" aria-label="TikTok">
                <svg viewBox="0 0 24 24" className="w-5 h-5 transition-all duration-300 group-hover:[filter:drop-shadow(1px_1px_0_#FE2C55)_drop-shadow(-1px_-1px_0_#25F4EE)]" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
              </a>
            )}
            </div>

            <button onClick={() => setIsContactModalOpen(true)} dir="ltr" className="group flex items-center justify-center gap-3 w-full lg:w-auto mt-4">
              <div className="w-10 h-10 rounded-xl bg-slate-200/60 flex items-center justify-center text-slate-700 group-hover:text-white group-hover:bg-brand-primary group-hover:shadow-lg group-hover:shadow-brand-primary/20 transition-all duration-300 group-hover:-translate-y-1 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-slate-700 font-en font-bold whitespace-nowrap group-hover:text-brand-primary transition-colors">
                info@karimzakaria.com
              </span>
            </button>
          </div>
        </div>

        {/* Elegant Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6" />

        {/* Legal & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4" dir={dir}>
          <p className="text-slate-700 text-[12px] font-en tracking-wide text-center md:text-start" dir="ltr">
            &copy; {new Date().getFullYear()} {t.footer.rights}
          </p>
          
          <p className="text-slate-400 text-[10px] font-en tracking-[0.2em] uppercase hidden lg:block flex items-center gap-1 justify-center">
            Powered by <span className="text-slate-700 text-[13px] font-black">Z</span> Systems
          </p>

          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-slate-700 text-[13px] font-medium hover:text-brand-primary transition-colors">
              {t.footer.privacyPolicy}
            </Link>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <Link to="/terms-and-conditions" className="text-slate-700 text-[13px] font-medium hover:text-brand-primary transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>

      </div>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </footer>
  );
}

import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { StoreSection } from '../components/sections/StoreSection';
import { FloatingWhatsApp } from '../components/ui/FloatingWhatsApp';
import { SEO } from '../components/SEO';
import { useSettings } from '../context/SettingsContext';
import { useNavigate } from 'react-router-dom';
import { ScrollToTop } from '../components/ScrollToTop';

export default function StorePage() {
  const { settings, loading } = useSettings();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && settings.enableStore === false) {
      navigate('/');
    }
  }, [settings.enableStore, loading, navigate]);

  return (
    <div className="relative z-10 flex flex-col min-h-screen bg-slate-50">
      <SEO title="المتجر | كابتن كريم زكريا" />
      <ScrollToTop />
      <Header />
      <main className="flex-1 pt-16">
        <StoreSection />
      </main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

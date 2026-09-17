/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { SocialProof } from './components/sections/SocialProof';
import { CalorieCalculator } from './components/sections/CalorieCalculator';
import { About } from './components/sections/About';
import { ClientResults } from './components/sections/ClientResults';
import { Programs } from './components/sections/Programs';
import { Process } from './components/sections/Process';
import { Packages } from './components/sections/Packages';

import { FAQ } from './components/sections/FAQ';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/layout/Footer';
import { LanguageProvider } from './context/LanguageContext';
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll';
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp';

import Checkout from './pages/Checkout';

const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const TermsAndConditions = React.lazy(() => import('./pages/TermsAndConditions').then(module => ({ default: module.TermsAndConditions })));
const RefundPolicy = React.lazy(() => import('./pages/RefundPolicy').then(module => ({ default: module.RefundPolicy })));
import { SEO } from './components/SEO';
import { useLanguage } from './context/LanguageContext';
import { useSettings } from './context/SettingsContext';

function Home() {
  const { t } = useLanguage();
  const { settings } = useSettings();

  const faqData = t.faq.questions || [];

  // Answer Engine Optimization (AEO) - FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((faq: {q: string, a: string}) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  // Answer Engine Optimization (AEO) & Geographic (GEO) - LocalBusiness / Person Schema
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["HealthAndBeautyBusiness", "Person"],
    "name": settings?.seo?.title || "كابتن كريم زكريا",
    "alternateName": [
      "كريم زكريا",
      "كريم ذكريا",
      "كريم دوت كوم",
      "Karim Zakaria",
      "karim zakria",
      "krimzkria",
      "krim zkria",
      "coach karim",
      "karim zakarya",
      "karim zakaria store",
      "كابتن كريم"
    ],
    "image": "https://karim-zakaria.com/logo.webp", // Assuming a generic logo URL for schema
    "@id": "https://karim-zakaria.com",
    "url": "https://karim-zakaria.com",
    "telephone": settings?.whatsappNumber || "01001060503",
    "areaServed": [
      { "@type": "Country", "name": "Egypt" },
      { "@type": "Country", "name": "Saudi Arabia" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "Kuwait" },
      { "@type": "Country", "name": "Qatar" },
      { "@type": "Country", "name": "Bahrain" },
      { "@type": "Country", "name": "Oman" }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "EG", // Primary HQ
      "addressRegion": "Cairo",
      "addressLocality": "Cairo"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.0444,
      "longitude": 31.2357
    },
    "description": settings?.seo?.description || "مدرب شخصي وخبير تغذية.",
    "sameAs": [
      "https://www.instagram.com/karim_zakariia",
      "https://www.facebook.com/karim.zakaria",
      "https://www.tiktok.com/@karim_zakariia"
    ]
  };

  const structuredData = [faqSchema, businessSchema];

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <SEO structuredData={structuredData} />
      <Header />
      <main className="flex-1">
        <Hero />
        <SocialProof />
        <About />
        <ClientResults />
        <Programs />
        <Process />
        <Packages />
        <FAQ />
        <CalorieCalculator />
        <FinalCTA />
      </main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

import { initializeDefaultConsent } from './utils/tracking';
import { ScrollToTop } from './components/ScrollToTop';

function AppContent() {
  React.useEffect(() => {
    initializeDefaultConsent();
  }, []);

  useLenisSmoothScroll();

  return (
    <div className="min-h-screen text-brand-text font-sans selection:bg-brand-primary selection:text-white pb-0 relative w-full overflow-clip">
      { /* Radial Gradient Background */ }
      <ScrollToTop />
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, rgba(88, 180, 229, 0.15) 100%)",
        }}
      />
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-10 w-10 border-2 border-brand-primary border-t-transparent"></div></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

import { HelmetProvider } from 'react-helmet-async';
import { SettingsProvider } from './context/SettingsContext';

export default function App() {
  return (
    <HelmetProvider>
      <SettingsProvider><Router>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </Router></SettingsProvider>
    </HelmetProvider>
  );
}


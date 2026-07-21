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

const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const TermsAndConditions = React.lazy(() => import('./pages/TermsAndConditions').then(module => ({ default: module.TermsAndConditions })));
const Checkout = React.lazy(() => import('./pages/Checkout').then(module => ({ default: module.Checkout })));

import { SEO } from './components/SEO';

function Home() {
  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <SEO />
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
    <div className="min-h-screen text-brand-text font-sans selection:bg-brand-primary selection:text-white pb-20 md:pb-0 relative w-full overflow-clip">
      { /* Radial Gradient Background */ }
      <ScrollToTop />
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, rgba(88, 180, 229, 0.15) 100%)",
        }}
      />
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </Router>
    </HelmetProvider>
  );
}


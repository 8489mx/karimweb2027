import { getCookieConsent, CookieConsentState } from './cookieConsent';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
  }
}

// Function to initialize default consent state
export const initializeDefaultConsent = () => {
  const consent = getCookieConsent();
  updateConsentState(consent);
};

// Function to update consent state for tracking tools
export const updateConsentState = (consent: CookieConsentState) => {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.marketing ? 'granted' : 'denied',
      ad_user_data: consent.marketing ? 'granted' : 'denied',
      ad_personalization: consent.marketing ? 'granted' : 'denied'
    });
  }

  // Meta Pixel doesn't have a built-in consent mode out of the box like GA, 
  // but we can grant/revoke consent programmatically.
  if (typeof window.fbq === 'function') {
    if (consent.marketing) {
      window.fbq('consent', 'grant');
    } else {
      window.fbq('consent', 'revoke');
    }
  }

  if (typeof window.clarity === 'function') {
    window.clarity('consent', consent.analytics);
  }
};

export const trackEvent = (eventName: string, eventData: Record<string, any>, isMarketing: boolean = false) => {
  const consent = getCookieConsent();
  
  if (consent.analytics && typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventData);
  }
  
  if (consent.marketing && typeof window.fbq === 'function' && isMarketing) {
    let fbEvent = 'CustomEvent';
    if (eventName === 'whatsapp_click' || eventName === 'calculator_whatsapp_click') {
      fbEvent = 'Contact';
    } else if (eventName === 'package_cta_click' || eventName === 'final_cta_click') {
      fbEvent = 'Lead';
    } else {
      fbEvent = eventName;
    }
    
    if (fbEvent === 'Contact' || fbEvent === 'Lead') {
      window.fbq('track', fbEvent, eventData);
    } else {
      window.fbq('trackCustom', fbEvent, eventData);
    }
  }
};

export const trackWhatsAppClick = (data: { cta_location: string; package_name?: string; button_text?: string }) => {
  trackEvent('whatsapp_click', data, true);
};

export const trackPackageClick = (data: { package_name: string; cta_location: string; price?: string; currency?: string }) => {
  trackEvent('package_cta_click', data, true);
};

export const trackCalculatorCompleted = (data: { goal: string; gender: string; activity_level: string; target_calories: number }) => {
  trackEvent('calculator_completed', data, false);
};

export const trackCalculatorWhatsAppClick = (data: { goal: string; target_calories: number }) => {
  trackEvent('calculator_whatsapp_click', data, true);
};

export const trackFinalCtaClick = (data: { cta_location: string; button_text: string }) => {
  trackEvent('final_cta_click', data, true);
};

export const trackStartNowClick = (data: { cta_location: string; button_text?: string }) => {
  trackEvent('start_now_click', data, true);
};

export const trackCheckoutStart = (data: { package_name: string; cta_location: string }) => {
  trackEvent('begin_checkout', data, true);
};

export const trackCheckoutStep = (data: { step_name: string; package_name: string }) => {
  trackEvent('checkout_step', data, true);
};

export const trackCheckoutComplete = (data: { package_name: string; price: string; currency: string }) => {
  trackEvent('InitiateCheckout', data, true);
};

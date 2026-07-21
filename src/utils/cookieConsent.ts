export interface CookieConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  hasConsented: boolean;
}

const defaultConsent: CookieConsentState = {
  necessary: true,
  analytics: true,
  marketing: true,
  hasConsented: true
};

export const getCookieConsent = (): CookieConsentState => {
  return defaultConsent;
};

export const setCookieConsent = (consent: Partial<CookieConsentState>) => {
  try {
    localStorage.setItem('cookie_consent', JSON.stringify(defaultConsent));
    // Dispatch event to notify tracking scripts
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: defaultConsent }));
    return defaultConsent;
  } catch (e) {
    console.error('Error saving cookie consent', e);
    return defaultConsent;
  }
};

import React, { createContext, useContext, useEffect, useState } from 'react';
import { PRICING_DATA as defaultPricingData, CountryCode, PackageCode, DurationCode, PackagePrice } from '../config/pricing';
import { translations } from '../translations';

export interface SiteSettings {
  isAdmin?: boolean;
  enableStore?: boolean;
  pricing: typeof defaultPricingData;
  whatsappNumber: string;
  cms: {
    heroTitle: string;
    heroSubtitle: string;
    aboutText: string;
    heroVideoUrl: string;
    aboutVideoUrl?: string;
    aboutVideoThumbnail?: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
  faq?: { q: string; a: string }[];
  results?: {
    id?: number;
    beforeImage: string;
    afterImage: string;
    name?: string;
    nameAr?: string;
    result?: string;
    resultAr?: string;
    duration?: string;
    durationAr?: string;
    quote?: string;
    quoteAr?: string;
  }[];
  whatsappScreenshots?: string[];
  packagesData?: {
    elite: string[];
    max: string[];
    subtitles: {
      elite: string;
      max: string;
    };
    durations?: {
      "3m": string;
      "6m": string;
    };
  };
  promos?: {
    id: string;
    code: string;
    discountPercentage: number;
    isActive: boolean;
  }[];
  socialLinks?: {
    instagram?: string;
    tiktok?: string;
    facebook?: string;
    snapchat?: string;
    youtube?: string;
  };
  programs?: { id: string; title: string; description: string; icon?: string; }[];
  testimonials?: { id: string; name: string; content: string; image?: string; date?: string; }[];
  products?: { id: string; title: string; description: string; priceUSD: number; priceEGP: number; imageUrl: string; type?: string; features?: string[]; }[];
  lastLogin?: string;
  orders?: {
    id: string;
    customer_name: string;
    phone: string;
    country: string;
    package_name: string;
    package_code: 'elite' | 'max';
    duration: string;
    amount: number;
    currency: string;
    payment_method: string;
    status: 'completed' | 'pending' | 'cancelled';
    date: string;
    notes?: string;
  }[];
}

const defaultSettings: SiteSettings = {
  enableStore: true,
  pricing: defaultPricingData,
  whatsappNumber: "201001060503",
  cms: {
    heroTitle: "",
    heroSubtitle: "",
    aboutText: "",
    heroVideoUrl: "",
  },
  seo: {
    title: "Karim Zakaria | مدرب شخصي",
    description: "حقق هدفك مع كابتن كريم زكريا. خطط تدريب وتغذية مخصصة لتحقيق أفضل النتائج.",
  },
  faq: translations.ar.faq.questions,
};

interface SettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  updatePricing: (newPricing: typeof defaultPricingData) => Promise<void>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  getPrice: (country: CountryCode, pkg: PackageCode, duration: DurationCode) => PackagePrice | undefined;
  refetchSettings: () => Promise<void>;
  isAdmin: boolean;
  logout: () => void;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  loading: true,
  updatePricing: async () => {},
  updateSettings: async () => {},
  getPrice: () => undefined,
  refetchSettings: async () => {},
  isAdmin: false,
  logout: () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      let data: any = null;
      try {
        const token = localStorage.getItem('adminToken');
        const headers: HeadersInit = { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) };

        const apiRes = await fetch('/api/settings.php', { headers });
        if (apiRes.ok) {
          sessionStorage.setItem('lastSettingsFetch', Date.now().toString());
          const text = await apiRes.text();
          try {
            data = JSON.parse(text);
          } catch (e) {
            console.warn('API returned non-JSON response. Falling back to default settings.');
          }
        } else if (apiRes.status === 401 && isAdmin) {
           fetch('/api/logout.php', { method: 'POST' });
            setIsAdmin(false);
        }
      } catch (e) {
        console.warn('Failed to fetch settings from API', e);
      }
      
      
      
      const currentToken = localStorage.getItem('adminToken');
      if (currentToken === 'mock-token-123') {
          setIsAdmin(true);
      } else if (data && data.isAdmin) {
          setIsAdmin(true);
      } else {
          setIsAdmin(false);
      }

      if (data && Object.keys(data).length > 0) {

        setSettings(prev => ({ 
          ...prev, 
          isAdmin: data.isAdmin !== undefined ? data.isAdmin : prev.isAdmin,
          pricing: data.pricing || prev.pricing,
          whatsappNumber: (data.whatsappNumber && data.whatsappNumber !== "201018894170") ? data.whatsappNumber : "201001060503",
          cms: { ...prev.cms, ...(data.cms || {}) },
          seo: { ...prev.seo, ...(data.seo || {}) },
          faq: (data.faq && Array.isArray(data.faq) && data.faq.length > 0) ? data.faq : (prev.faq && prev.faq.length > 0 ? prev.faq : translations.ar.faq.questions),
          results: data.results !== undefined ? data.results : prev.results,
          whatsappScreenshots: data.whatsappScreenshots !== undefined ? data.whatsappScreenshots : prev.whatsappScreenshots,
          enableStore: data.enableStore !== undefined ? data.enableStore : prev.enableStore,
          packagesData: data.packagesData !== undefined ? data.packagesData : prev.packagesData,
          promos: data.promos !== undefined ? data.promos : prev.promos,
          orders: data.orders !== undefined ? data.orders : prev.orders,
          socialLinks: data.socialLinks !== undefined ? data.socialLinks : prev.socialLinks,
          programs: data.programs !== undefined ? data.programs : prev.programs,
          testimonials: data.testimonials !== undefined ? data.testimonials : prev.testimonials,
          products: data.products !== undefined ? data.products : prev.products,
          lastLogin: data.lastLogin !== undefined ? data.lastLogin : prev.lastLogin
        }));
        setIsAdmin(!!data.isAdmin);
      }
    } catch(err) {
      console.warn('Failed to load settings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Only poll on the admin dashboard
      if (window.location.pathname.startsWith('/admin') && isAdmin) {
        loadSettings();
      }
    }, 30000);

    const handleFocus = () => {
      // Only poll frequently if on the admin dashboard
      if (window.location.pathname.startsWith('/admin')) {
        loadSettings();
      } else {
        // Debounce public fetches or avoid them on focus
        const lastFetch = sessionStorage.getItem('lastSettingsFetch');
        if (!lastFetch || (Date.now() - parseInt(lastFetch)) > 5 * 60 * 1000) {
            loadSettings();
            sessionStorage.setItem('lastSettingsFetch', Date.now().toString());
        }
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, []);

  const updatePricing = async (newPricing: typeof defaultPricingData) => {
    await updateSettings({ pricing: newPricing });
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      (async () => {
        const token = localStorage.getItem('adminToken');
        let headers: HeadersInit = { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) };
        
        fetch('/api/settings.php', {
          method: 'POST',
          headers,
          body: JSON.stringify(updated)
        })
        .then(() => loadSettings())
        .catch(err => console.warn('Failed to post settings to API', err));
      })();
      return updated;
    });
  };

  const getPrice = (country: CountryCode, pkg: PackageCode, duration: DurationCode) => {
    return settings.pricing[country]?.[pkg]?.[duration];
  };

  const logout = () => {
    fetch('/api/logout.php', { method: 'POST' });
    setIsAdmin(false);
    loadSettings();
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, updatePricing, updateSettings, getPrice, refetchSettings: loadSettings, isAdmin, logout }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

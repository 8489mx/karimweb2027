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
  enableStore: false,
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
  faq: translations.ar.faq.questions || [],
};

interface SettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  updatePricing: (newPricing: typeof defaultPricingData) => Promise<void>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  getPrice: (country: CountryCode, pkg: PackageCode, duration: DurationCode) => PackagePrice | undefined;
  refetchSettings: () => Promise<void>;
  exportSettingsJSON: () => string;
  importSettingsJSON: (jsonStr: string) => Promise<boolean>;
  resetToDefaults: () => Promise<void>;
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
  exportSettingsJSON: () => '',
  importSettingsJSON: async () => false,
  resetToDefaults: async () => {},
  isAdmin: false,
  logout: () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const loading = false;
  const isAdmin = false;

  const updatePricing = async (newPricing: typeof defaultPricingData) => {};
  const updateSettings = async (newSettings: Partial<SiteSettings>) => {};
  
  const exportSettingsJSON = () => { return ''; };
  const importSettingsJSON = async (jsonStr: string): Promise<boolean> => { return false; };
  const resetToDefaults = async () => {};

  const getPrice = (country: CountryCode, pkg: PackageCode, duration: DurationCode) => {
    return settings.pricing[country]?.[pkg]?.[duration];
  };

  const logout = () => {};
  const refetchSettings = async () => {};

  return (
    <SettingsContext.Provider value={{ 
      settings, 
      loading, 
      updatePricing, 
      updateSettings, 
      getPrice, 
      refetchSettings, 
      exportSettingsJSON,
      importSettingsJSON,
      resetToDefaults,
      isAdmin, 
      logout 
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

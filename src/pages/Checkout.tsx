import React, { useState, useEffect, useRef } from 'react';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { translations } from '../translations';
import { useLanguage } from '../context/LanguageContext';


import { SEO } from '../components/SEO';
import { Search, MessageCircle, ChevronRight, ShieldCheck, Copy, Check, ChevronDown, Globe, CreditCard, ArrowLeft, Landmark, Wallet, FileText, Calendar, Gift, Tag, X } from 'lucide-react';
import { CountryCode, PackageCode, DurationCode } from '../config/pricing';
import { useSettings } from '../context/SettingsContext';
import { trackCheckoutStep, trackCheckoutComplete } from '../utils/tracking';
import { detectCountryCode } from '../utils/location';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';



const SafeFlag = ({ countryCode, alt, className }: { countryCode: string, alt: string, className?: string }) => {
  const [error, setError] = useState(false);
  if (error || !countryCode) {
    return <Globe className="w-4 h-4 text-slate-400" />;
  }
  // Try to map Ascension Island (AC) to Saint Helena (SH) or UK (GB) if needed, 
  // but let's just let it fallback to globe if not found on CDN.
  return (
    <img 
      src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`} 
      alt={alt} 
      className="w-full h-full object-cover" 
      onError={() => setError(true)} 
    />
  );
};

const CustomCountrySelect = ({ value, onChange, options, iconComponent: Icon, isMax }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      // Optional: focus the search input when opened
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  const selectedOption = options.find((o: any) => o.value === value) || options[0];

  // Auto-translate countries to Arabic
  const regionNames = new Intl.DisplayNames(['ar'], { type: 'region' });

  // Prepare options with translation and code for filtering
  const enhancedOptions = options.map((opt: any) => {
    let code = '';
    try { code = getCountryCallingCode(opt.value); } catch (e) {}
    let translatedName = opt.label;
    try { translatedName = regionNames.of(opt.value) || opt.label; } catch (e) {}
    return { ...opt, code, translatedName };
  }).filter((opt: any) => opt.value); // Remove empty values

  // Helper function to normalize Arabic text for better searching
  const normalizeText = (text: string) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .replace(/[أإآ]/g, 'ا') // Normalize alefs
      .replace(/ة/g, 'ه') // Normalize teh marbuta
      .replace(/[ىي]/g, 'ي') // Normalize yaa / alef maksura
      .replace(/[ً-ٟ]/g, ''); // Remove tashkeel
  };

  // Filter based on search query
  const filteredOptions = enhancedOptions.filter((opt: any) => {
    if (!searchQuery) return true;
    const normalizedQuery = normalizeText(searchQuery);
    return (
      normalizeText(opt.translatedName).includes(normalizedQuery) ||
      normalizeText(opt.label).includes(normalizedQuery) ||
      opt.code.includes(normalizedQuery)
    );
  });

  const primaryBorderClass = isMax ? 'border-[#C4952D]' : 'border-brand-primary';
  const primaryRingClass = isMax ? 'ring-[#C4952D]/10' : 'ring-brand-primary/10';

  return (
    <div className="relative h-full flex items-center" ref={ref}>
      <button
        type="button"
        className="flex items-center gap-2 h-full px-4 border-l border-slate-200 hover:bg-slate-100 transition-colors bg-slate-50 focus:outline-none rounded-r-xl"
        onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
        dir="ltr"
      >
        <div className="w-[28px] h-[20px] shadow-sm rounded flex items-center justify-center bg-white overflow-hidden shrink-0"><SafeFlag countryCode={value || "eg"} alt={value} /></div>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </button>

      <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
          className="absolute top-[calc(100%+8px)] right-0 w-[320px] bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-100 z-[9999] flex flex-col custom-country-dropdown"
          style={{ 
            maxHeight: '350px', 
            overscrollBehavior: 'contain',
            pointerEvents: 'auto',
          }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          dir="ltr"
        >
          {/* Search Input */}
          <div className="p-3 border-b border-slate-100 shrink-0 sticky top-0 bg-white z-10 rounded-t-2xl">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن الدولة أو الكود..."
                className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 pr-10 text-sm font-bold text-slate-700 outline-none ${isMax ? "focus:border-[#C4952D] focus:ring-[#C4952D]/10" : "focus:border-brand-primary focus:ring-brand-primary/10"} focus:ring-4 transition-all text-right`}
                dir="rtl"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="overflow-y-auto flex-1 py-2 custom-country-dropdown">
            {filteredOptions.length === 0 ? (
              <div className="py-8 text-center text-sm font-bold text-slate-400" dir="rtl">
                لم يتم العثور على نتائج
              </div>
            ) : (
              filteredOptions.map((opt: any) => {
                const primaryTextClass = isMax ? 'text-[#C4952D]' : 'text-brand-primary';
                const primaryBgClass = isMax ? 'bg-[#C4952D]/5' : 'bg-brand-primary/5';

                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={`flex items-center w-full px-4 py-2.5 min-h-[44px] hover:bg-slate-50 transition-colors shrink-0 ${value === opt.value ? `${primaryBgClass} ${primaryTextClass}` : 'text-slate-700'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                  >
                    <div className="w-[28px] h-[20px] shrink-0 mr-3 shadow-sm rounded flex items-center justify-center bg-slate-100 overflow-hidden"><SafeFlag countryCode={opt.value || ""} alt={opt.label} /></div>
                    <span className="text-sm font-bold text-right flex-1" dir="rtl">{opt.translatedName}</span>
                    <span className="text-sm font-bold ml-3 opacity-60" dir="ltr">+{opt.code}</span>
                  </button>
                );
              })
            )}
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};


  // Suggested curated list of countries for an Arabic store:
  // Arab League + Gulf + Top Expat Destinations (Europe/North America)
  const allowedCountries: any[] = [
    'EG', 'SA', 'AE', 'KW', 'QA', 'OM', 'BH', 'JO', 'LB', 'MA', 
    'DZ', 'TN', 'LY', 'IQ', 'PS', 'SD', 'YE', 'SY',
    'TR', 'US', 'GB', 'DE', 'FR', 'CA', 'AU', 'IT', 'SE', 'NL'
  ];

export default function Checkout() {
  const { getPrice, settings, updateSettings } = useSettings();
  const { lang, dir } = useLanguage();
  const t = translations[lang];
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const tokenDataStrToken = token ? sessionStorage.getItem(token) : null;
  const tokenDataParsed = tokenDataStrToken ? JSON.parse(tokenDataStrToken) : null;
  
  const savedDraft = (() => {
    try {
      const raw = localStorage.getItem('kz_checkout_draft');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const initialPkg = tokenDataParsed?.pkg || queryParams.get('pkg') || savedDraft?.pkg || sessionStorage.getItem('kz_checkout_pkg') || 'elite';
  const initialDuration = tokenDataParsed?.duration || queryParams.get('duration') || savedDraft?.duration || sessionStorage.getItem('kz_checkout_duration') || '3m';
  const initialCountry = tokenDataParsed?.country || queryParams.get('country') || savedDraft?.country || sessionStorage.getItem('kz_checkout_country') || 'EG';
  const initialName = savedDraft?.name || sessionStorage.getItem('kz_checkout_name') || '';
  const initialPhone = savedDraft?.phone || sessionStorage.getItem('kz_checkout_phone') || '';

  if (!['elite', 'max'].includes(initialPkg)) navigate('/');
  if (!['3m', '6m'].includes(initialDuration)) navigate('/');

  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [phoneError, setPhoneError] = useState('');
  const [residenceCountry, setResidenceCountry] = useState<CountryCode>(initialCountry as CountryCode);
  const [isDetectingCountry, setIsDetectingCountry] = useState(!tokenDataParsed?.country && !savedDraft?.country && !sessionStorage.getItem('kz_checkout_country'));
  const [detectedCountry, setDetectedCountry] = useState<CountryCode | null>(null);

  useEffect(() => {
    detectCountryCode().then(code => {
      const mappedCode: CountryCode = ['EG', 'SA', 'KW', 'AE', 'QA', 'BH'].includes(code) ? (code as CountryCode) : 'OTHER';
      setDetectedCountry(mappedCode);
      if (isDetectingCountry) {
        setResidenceCountry(mappedCode);
        setIsDetectingCountry(false);
      }
    });
  }, [isDetectingCountry]);
  
  const [pkgKey, setPkgKey] = useState<PackageCode>(initialPkg as PackageCode);
  const [durationKey, setDurationKey] = useState<DurationCode>(initialDuration as DurationCode);
  const [selectedMethod, setSelectedMethod] = useState<string>(savedDraft?.selectedMethod || 'instapay');

  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedOrderId, setSubmittedOrderId] = useState<string>('');
  const [submittedMethod, setSubmittedMethod] = useState<string>('instapay');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  const [promo_code, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  useEffect(() => {
    const urlPromo = queryParams.get('promo');
    if (urlPromo && !appliedPromo) {
      setPromoCode(urlPromo);
      const autoApply = async () => {
        setPromoLoading(true);
        try {
          const res = await fetch('/api/promo.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: urlPromo.trim().toUpperCase() })
          });
          const data = await res.json();
          if (res.ok && data.isActive) {
            setAppliedPromo({
              code: urlPromo.trim().toUpperCase(),
              discountPercentage: data.discountPercentage
            });
            setPromoError('');
          }
        } catch (error) {
          console.error(error);
        } finally {
          setPromoLoading(false);
        }
      };
      autoApply();
    }
  }, []);


  const applyPromoCode = async () => {
    if (!promo_code.trim()) return;
    setPromoLoading(true);
    setPromoError('');
    
    try {
      const response = await fetch('/api/promo.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: promo_code.trim().toUpperCase() })
      });
      
      const data = await response.json();
      
      if (response.ok && data.isActive) {
        setAppliedPromo({
          code: promo_code.trim().toUpperCase(),
          discountPercentage: data.discountPercentage
        });
        setPromoCode('');
      } else {
        setPromoError(data.error || 'كود الخصم غير صحيح أو منتهي الصلاحية');
        setAppliedPromo(null);
      }
    } catch (err) {
      console.error("Error validating coupon:", err);
      setPromoError('حدث خطأ أثناء التحقق من كود الخصم');
      setAppliedPromo(null);
    }
    
    setPromoLoading(false);
  };
  
  const removePromo = () => {
    setAppliedPromo(null);
  };


  const isMax = pkgKey === 'max';
  const primaryColorClass = isMax ? 'text-[#C4952D]' : 'text-brand-primary';
  const primaryBgClass = isMax ? 'bg-[#C4952D]' : 'bg-brand-primary';
  const primaryBgSubtleClass = isMax ? 'bg-[#C4952D]/10' : 'bg-brand-primary/10';
  const primaryBorderClass = isMax ? 'border-[#C4952D]' : 'border-brand-primary';

  useEffect(() => {
    if (residenceCountry === 'EG') {
      if (selectedMethod === 'international_bank' || selectedMethod === 'international_wallet') {
        setSelectedMethod('instapay');
      }
    } else {
      if (selectedMethod === 'wallet' || selectedMethod === 'bank' || selectedMethod === 'instapay') {
        setSelectedMethod('international_bank');
      }
    }
  }, [residenceCountry]);
  const countryMenuRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryMenuRef.current && !countryMenuRef.current.contains(event.target as Node)) {
        setIsCountryMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const draft = {
      pkg: pkgKey,
      duration: durationKey,
      country: residenceCountry,
      name,
      phone,
      selectedMethod
    };
    try {
      localStorage.setItem('kz_checkout_draft', JSON.stringify(draft));
    } catch (e) {
      console.error(e);
    }
    sessionStorage.setItem('kz_checkout_pkg', pkgKey);
    sessionStorage.setItem('kz_checkout_duration', durationKey);
    sessionStorage.setItem('kz_checkout_country', residenceCountry);
    sessionStorage.setItem('kz_checkout_name', name);
    sessionStorage.setItem('kz_checkout_phone', phone);
  }, [pkgKey, durationKey, residenceCountry, name, phone, selectedMethod]);

  useEffect(() => {
    trackCheckoutStep({ step_name: 'contact_info', package_name: pkgKey });
  }, [pkgKey]);

  
  const basePrice = getPrice(residenceCountry, pkgKey, durationKey);
  const currentPrice = basePrice ? {
    ...basePrice,
    finalAmount: appliedPromo ? Math.round(basePrice.finalAmount * (1 - appliedPromo.discountPercentage / 100)) : basePrice.finalAmount,
    originalAmount: basePrice.finalAmount
  } : undefined;

  const currencyStr = t.currencies[residenceCountry] || '';

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const payment_methodsEG = [
    { 
      id: 'card', 
      title: 'بطاقة بنكية (فيزا / ماستركارد / ميزة)', 
      logo: (
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="h-7 px-2 rounded-lg border border-slate-100 bg-white flex items-center justify-center shadow-sm">
            <span className="font-en font-black text-blue-800 text-[11px] tracking-wider">VISA</span>
          </div>
          <div className="h-7 px-2 rounded-lg border border-slate-100 bg-white flex items-center justify-center shadow-sm">
            <div className="flex -space-x-1.5 items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500 opacity-90" />
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400 opacity-90" />
            </div>
          </div>
          <div className="h-7 px-2 rounded-lg border border-slate-100 bg-white flex items-center justify-center shadow-sm">
            <span className="font-ar font-black text-emerald-700 text-[10px]">ميزة</span>
          </div>
        </div>
      )
    },
    { 
      id: 'instapay', 
      title: 'إنستاباي (InstaPay)', 
      logo: (
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-8 h-8 rounded-lg shadow-sm border border-slate-100 overflow-hidden flex items-center justify-center bg-white p-1">
            <img 
              src="/assets/images/instapay-logo.png" 
              alt="InstaPay" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )
    },
    { 
      id: 'wallet', 
      title: 'محافظ إلكترونية (فودافون كاش)', 
      logo: (
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-8 h-8 rounded-lg shadow-sm border border-slate-100 overflow-hidden flex items-center justify-center bg-white">
            <img src="/wallets/vodafone.svg" alt="Vodafone" className="w-full h-full object-contain p-1" />
          </div>
          <div className="w-8 h-8 rounded-lg shadow-sm border border-slate-100 overflow-hidden flex items-center justify-center bg-white">
            <img src="/wallets/orange.svg" alt="Orange" className="w-full h-full object-contain p-1" />
          </div>
          <div className="w-8 h-8 rounded-lg shadow-sm border border-slate-100 overflow-hidden flex items-center justify-center bg-white">
            <img src="/wallets/etisalat.svg" alt="Etisalat" className="w-full h-full object-contain p-1" />
          </div>
          <div className="w-8 h-8 rounded-lg shadow-sm border border-slate-100 overflow-hidden flex items-center justify-center bg-white">
            <img src="/wallets/we.svg" alt="We" className="w-full h-full object-contain p-1" />
          </div>
        </div>
      )
    },
    { 
      id: 'bank', 
      title: 'تحويل بنكي مباشر', 
      logo: (
        <div className="flex items-center shrink-0">
          <div className={`w-9 h-9 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border ${isMax ? 'border-[#C4952D]/30' : 'border-brand-primary/30'} flex items-center justify-center ${isMax ? 'bg-gradient-to-br from-[#C4952D]/10 to-[#C4952D]/5' : 'bg-gradient-to-br from-brand-primary/10 to-brand-primary/5'} relative group-hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] group-hover:${primaryBorderClass} transition-all duration-300`} title="Bank Transfer">
            <Landmark className={`w-[18px] h-[18px] ${primaryColorClass} relative z-10 transition-transform duration-300 group-hover:scale-110`} strokeWidth={2} />
          </div>
        </div>
      )
    }
  ];

  const payment_methodsInternational = [
    { 
      id: 'card', 
      title: 'بطاقة بنكية دولية (Visa / Mastercard)', 
      logo: (
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="h-7 px-2 rounded-lg border border-slate-100 bg-white flex items-center justify-center shadow-sm">
            <span className="font-en font-black text-blue-800 text-[11px] tracking-wider">VISA</span>
          </div>
          <div className="h-7 px-2 rounded-lg border border-slate-100 bg-white flex items-center justify-center shadow-sm">
            <div className="flex -space-x-1.5 items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500 opacity-90" />
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400 opacity-90" />
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'international_bank', 
      title: 'تحويل بنكي دولي (IBAN / SWIFT)', 
      logo: (
        <div className="flex items-center gap-1.5 shrink-0">
          <div className={`w-9 h-9 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border ${isMax ? 'border-[#C4952D]/30' : 'border-brand-primary/30'} flex items-center justify-center ${isMax ? 'bg-gradient-to-br from-[#C4952D]/10 to-[#C4952D]/5' : 'bg-gradient-to-br from-brand-primary/10 to-brand-primary/5'} relative group-hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] group-hover:${primaryBorderClass} transition-all duration-300`} title="International Bank Transfer">
            <Globe className={`w-[18px] h-[18px] ${primaryColorClass} relative z-10 transition-transform duration-300 group-hover:scale-110`} strokeWidth={2} />
          </div>
          <div className={`w-9 h-9 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border ${isMax ? 'border-[#C4952D]/30' : 'border-brand-primary/30'} flex items-center justify-center ${isMax ? 'bg-gradient-to-br from-[#C4952D]/10 to-[#C4952D]/5' : 'bg-gradient-to-br from-brand-primary/10 to-brand-primary/5'} relative group-hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] group-hover:${primaryBorderClass} transition-all duration-300`} title="Bank Transfer">
            <Landmark className={`w-[18px] h-[18px] ${primaryColorClass} relative z-10 transition-transform duration-300 group-hover:scale-110`} strokeWidth={2} />
          </div>
        </div>
      )
    },
    { 
      id: 'international_wallet', 
      title: 'محافظ وتحويلات دولية (STC Pay / Zain / Apple Pay)', 
      logo: (
        <div className="flex items-center shrink-0">
          <div className={`w-9 h-9 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border ${isMax ? 'border-[#C4952D]/30' : 'border-brand-primary/30'} flex items-center justify-center ${isMax ? 'bg-gradient-to-br from-[#C4952D]/10 to-[#C4952D]/5' : 'bg-gradient-to-br from-brand-primary/10 to-brand-primary/5'} relative group-hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] group-hover:${primaryBorderClass} transition-all duration-300`} title="International Wallet">
            <Wallet className={`w-[18px] h-[18px] ${primaryColorClass} relative z-10 transition-transform duration-300 group-hover:scale-110`} strokeWidth={2} />
          </div>
        </div>
      )
    }
  ];

  const currentMethods = residenceCountry === 'EG' ? payment_methodsEG : payment_methodsInternational;

  const getPaymentMethodLabel = (methodId: string) => {
    switch (methodId) {
      case 'card':
        return 'بطاقة بنكية (فيزا / ماستركارد)';
      case 'instapay':
        return 'إنستاباي (InstaPay)';
      case 'wallet':
        return 'محفظة إلكترونية (فودافون كاش)';
      case 'bank':
        return 'تحويل بنكي';
      case 'international_bank':
        return 'تحويل بنكي دولي';
      case 'international_wallet':
        return 'محافظ دولية';
      default:
        return methodId;
    }
  };

  const validatePhone = (val: string, country: CountryCode) => {
    const clean = val.replace(/[\s\-\(\)]/g, '');
    if (!clean || clean.length < 8) {
      return 'يرجى إدخال رقم هاتف واتساب صحيح مكون من كود الدولة ورقم الهاتف';
    }
    if (country === 'EG' && clean.startsWith('+20') && clean.length < 12) {
      return 'رقم الهاتف المصري يجب أن يتكون من 11 رقماً (مثال: +20 101 234 5678)';
    }
    if (country === 'SA' && clean.startsWith('+966') && clean.length < 12) {
      return 'رقم الهاتف السعودي يجب أن يتكون من 9 أرقام بعد كود الدولة (مثال: +966 50 123 4567)';
    }
    if (country === 'AE' && clean.startsWith('+971') && clean.length < 12) {
      return 'رقم الهاتف الإماراتي يجب أن يتكون من 9 أرقام بعد كود الدولة (مثال: +971 50 123 4567)';
    }
    if (country === 'KW' && clean.startsWith('+965') && clean.length < 11) {
      return 'رقم الهاتف الكويتي يجب أن يتكون من 8 أرقام بعد كود الدولة (مثال: +965 91 234 567)';
    }
    return '';
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('يرجى كتابة اسمك الكريم.');
      return;
    }

    const phoneErr = validatePhone(phone, residenceCountry);
    if (phoneErr) {
      setPhoneError(phoneErr);
      return;
    }
    setPhoneError('');

    if (!selectedMethod) {
      alert('يرجى اختيار طريقة الدفع المناسبة.');
      return;
    }
    
    setIsSubmitting(true);
    const orderId = 'KZ-' + Math.floor(1000 + Math.random() * 9000).toString();
    
    try {
      const newOrder = {
        id: orderId,
        customer_name: name.trim(),
        phone: phone.trim(),
        country: residenceCountry,
        package_name: pkgKey === 'elite' ? 'باقة إيليت' : 'باقة ماكس',
        package_code: pkgKey as 'elite' | 'max',
        duration: durationKey,
        amount: currentPrice?.finalAmount || 0,
        currency: currencyStr,
        payment_method: getPaymentMethodLabel(selectedMethod),
        status: selectedMethod === 'card' ? 'completed' as const : 'pending' as const,
        date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' }),
        notes: promo_code ? `كوبون: ${promo_code}` : undefined,
        promo_code: appliedPromo?.code
      };

      const apiRes = await fetch('/api/orders.php?action=create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      
      if (!apiRes.ok) {
        throw new Error('Failed to create order');
      }

      trackCheckoutComplete({ 
         package_name: pkgKey,
         price: String(currentPrice?.finalAmount || ''),
         currency: currencyStr
       });
       
      setSubmittedOrderId(orderId);
      setSubmittedMethod(selectedMethod);
      
      // Save last order and clear draft
      try {
        localStorage.removeItem('kz_checkout_draft');
        localStorage.setItem('kz_last_order', JSON.stringify({
          orderId,
          name: name.trim(),
          phone: phone.trim(),
          pkgKey,
          durationKey,
          selectedMethod,
          residenceCountry,
          amount: currentPrice?.finalAmount || 0,
          currency: currencyStr,
          timestamp: Date.now()
        }));
      } catch (err) {
        console.error(err);
      }

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const durations = ['3m', '6m'] as DurationCode[];
  const packageFeatures = pkgKey === 'elite' 
    ? (settings?.packagesData?.elite !== undefined ? settings.packagesData.elite : t.packages.elite)
    : (settings?.packagesData?.max !== undefined ? settings.packagesData.max : t.packages.max);
    
  const packageSubtitle = pkgKey === 'elite'
    ? (settings?.packagesData?.subtitles?.elite || t.packages.subtitles.elite)
    : (settings?.packagesData?.subtitles?.max || t.packages.subtitles.max);
  const packageTitle = pkgKey === 'elite' ? 'باقة Elite' : 'باقة Max';
  const PackageTitle = () => (
    <span className="inline-flex items-center gap-1.5" style={{ direction: 'rtl' }}>
      <span>باقة</span>
      <span className={`font-en font-black tracking-widest ${pkgKey === 'elite' ? 'text-[#0EA5E9]' : 'text-[#E2B75A]'}`}>
        {pkgKey.toUpperCase()}
      </span>
    </span>
  );
  const durationMonths = parseInt(durationKey.replace('m', ''));
  
  return (
    <div className={`relative z-10 min-h-screen flex flex-col font-sans bg-[#FAFBFC] ${isMax ? "selection:bg-[#C4952D]/20" : "selection:bg-brand-primary/20"}`} dir={dir}>
      <SEO title="إتمام الدفع | كابتن كريم زكريا" noindex={true} />

      {/* Header Minimal */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 shadow-sm relative z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => {
              navigate('/#packages');
              setTimeout(() => {
                const el = document.getElementById('packages');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm bg-slate-50 px-4 py-2 rounded-lg border border-slate-100"
          >
            <ChevronRight className="w-5 h-5 transition-transform hover:translate-x-1" />
            العودة للباقات
          </button>
          
          <div className="relative" ref={countryMenuRef}>
            <button 
              type="button"
              onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)}
              className={`flex items-center gap-2 bg-slate-50 border border-slate-200 hover:${primaryBorderClass}/50 text-slate-800 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm`}
            >
              <div className="flex items-center gap-2">
                {residenceCountry === 'OTHER' ? (
                  <Globe className={`w-4 h-4 ${primaryColorClass}`} />
                ) : (
                  <div className="w-[18px] h-[13px] rounded-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] overflow-hidden shrink-0"><SafeFlag countryCode={residenceCountry} alt={residenceCountry} /></div>
                )}
                <span>{t.countries[residenceCountry]}</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isCountryMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isCountryMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 left-0 w-48 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50"
                >
                  {Object.entries(t.countries)
                    .filter(([code]) => {
                      if (code === 'EG') return detectedCountry === 'EG';
                      return true;
                    })
                    .map(([code, countryName]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setResidenceCountry(code as CountryCode);
                        setIsCountryMenuOpen(false);
                      }}
                      className={`w-full text-right px-4 py-3 text-sm font-bold transition-colors flex items-center justify-between ${
                        residenceCountry === code 
                          ? (isMax ? 'bg-[#C4952D]/5 text-[#C4952D]' : 'bg-brand-primary/5 text-brand-primary') 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {code === 'OTHER' ? (
                          <Globe className={`w-4 h-4 ${residenceCountry === code ? primaryColorClass : 'text-slate-400'}`} />
                        ) : (
                          <SafeFlag countryCode={code} alt={code} 
                            className="w-[18px] h-[13px] rounded-[2px] object-cover shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                          />
                        )}
                        <span>{countryName as string}</span>
                      </div>
                      {residenceCountry === code && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

<div className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:py-12">

        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-10 relative" dir="rtl">
          {/* Connecting Line */}
          <div className="absolute top-5 left-[10%] right-[10%] h-[2px] bg-slate-200 -z-10">
            <div className={`h-full transition-all duration-700 ease-in-out ${isMax ? 'bg-[#C4952D]' : 'bg-brand-primary'}`} style={{ width: isSuccess ? '100%' : '50%' }}></div>
          </div>
          
          <div className="flex justify-between relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${isMax ? 'bg-[#C4952D]' : 'bg-brand-primary'} shadow-md border-4 border-[#FAFBFC] transition-transform hover:scale-110`}>
                <Check className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-700">اختيار الباقة</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#FAFBFC] transition-all duration-500 ${!isSuccess ? (isMax ? 'bg-[#C4952D] text-white shadow-md scale-110' : 'bg-brand-primary text-white shadow-md scale-110') : (isMax ? 'bg-[#C4952D] text-white shadow-md' : 'bg-brand-primary text-white shadow-md')}`}>
                {!isSuccess ? <span className="font-bold">2</span> : <Check className="w-5 h-5" />}
              </div>
              <span className={`text-xs sm:text-sm font-bold ${!isSuccess ? 'text-slate-900' : 'text-slate-700'}`}>بيانات الاشتراك</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#FAFBFC] transition-all duration-500 ${isSuccess ? (isMax ? 'bg-[#C4952D] text-white shadow-md scale-110' : 'bg-brand-primary text-white shadow-md scale-110') : 'bg-white text-slate-400 border-slate-200'}`}>
                {isSuccess ? <Check className="w-5 h-5" /> : <span className="font-bold">3</span>}
              </div>
              <span className={`text-xs sm:text-sm font-bold ${isSuccess ? 'text-slate-900' : 'text-slate-400'}`}>تأكيد الطلب</span>
            </div>
          </div>
        </div>

        {isSuccess ? (
          <div className="max-w-2xl mx-auto text-center space-y-8 bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-slate-200/70 relative">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${isMax ? 'bg-[#C4952D]/10 text-[#C4952D]' : 'bg-brand-primary/10 text-brand-primary'}`}>
              <Check className="w-12 h-12" />
            </div>
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-800 px-4 py-1.5 rounded-full text-xs font-mono font-bold">
                <span>رقم الطلب:</span>
                <span className={`font-black ${isMax ? 'text-[#C4952D]' : 'text-brand-primary'}`}>#{submittedOrderId || 'KZ-0000'}</span>
              </div>
              
              <h2 className="text-3xl font-black text-slate-900">
                {submittedMethod === 'card' ? 'تم تسجيل الدفع بالبطاقة بنجاح! 💳' : 'تم تسجيل طلب الاشتراك بنجاح! 🚀'}
              </h2>
              
              <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-bold max-w-lg mx-auto">
                {submittedMethod === 'card' ? (
                  <>
                    تم استلام وتأكيد بيانات اشتراكك في {PackageTitle()}.
                    <br />
                    اضغط على الزر أدناه للتواصل عبر واتساب واستلام كود المتابعة ورابط الاستمارة فوراً.
                  </>
                ) : (
                  <>
                    خطوة واحدة أخيرة لتفعيل اشتراكك في {PackageTitle()}.
                    <br />
                    اضغط على الزر أدناه لإرسال صورة إيصال التحويل عبر واتساب لتأكيد الحجز واستلام كود المتابعة.
                  </>
                )}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 max-w-md mx-auto text-right text-xs sm:text-sm space-y-2.5">
              <div className="flex justify-between items-center text-slate-600 font-bold">
                <span>اسم المشترك:</span>
                <span className="text-slate-900 font-bold">{name.trim()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 font-bold">
                <span>رقم الهاتف:</span>
                <span className="text-slate-900 font-mono" dir="ltr">{phone.trim()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 font-bold">
                <span>الباقة والمدة:</span>
                <span className="text-slate-900 font-bold">{pkgKey === 'elite' ? 'باقة Elite' : 'باقة Max'} - {durationKey === '3m' ? '4 شهور (3+1 هدية)' : '8 شهور (6+2 هدية)'}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 font-bold">
                <span>وسيلة الدفع:</span>
                <span className="text-slate-900 font-black">{getPaymentMethodLabel(submittedMethod)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 font-bold pt-2 border-t border-slate-200/60">
                <span>إجمالي المبلغ:</span>
                <span className="text-emerald-700 font-black font-en text-base">{currentPrice?.finalAmount?.toLocaleString()} {currencyStr}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button 
              onClick={() => {
                const isPaidCard = submittedMethod === 'card';
                const orderDetails = [
                  `*كابتن كريم، تم تسجيل طلب اشتراك جديد! 🚀*`,
                  `━━━━━━━━━━━━━━━━━━`,
                  `👤 *الاسم:* ${name.trim()}`,
                  `📱 *الهاتف:* ${phone.trim()}`,
                  `📦 *الباقة:* ${pkgKey === 'elite' ? 'باقة Elite' : 'باقة Max'} - ${durationKey === '3m' ? '4 شهور (3+1 هدية)' : '8 شهور (6+2 هدية)'}`,
                  `🌍 *الدولة:* ${t.countries[residenceCountry]}`,
                  `💳 *وسيلة الدفع:* ${getPaymentMethodLabel(submittedMethod)}`,
                  appliedPromo ? `🏷️ *كود الخصم:* ${appliedPromo.code}` : '',
                  `💰 *المبلغ:* ${currentPrice?.finalAmount} ${currencyStr}`,
                  `🔖 *رقم الطلب:* #${submittedOrderId || 'KZ-0000'}`,
                  `━━━━━━━━━━━━━━━━━━`,
                  isPaidCard 
                    ? `✅ *تم الدفع بالبطاقة البنكية بنجاح، في انتظار كود المتابعة ورابط الاستمارة للبدء فوراً!* 🚀` 
                    : `📄 *مرفق إيصال التحويل لتأكيد الاشتراك واستلام كود المتابعة!* 👇`
                ].filter(Boolean).join('\n');
                window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(orderDetails)}`, '_blank');
              }}
              className={`w-full sm:w-auto px-10 py-5 rounded-2xl font-black text-white text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 mx-auto shadow-[0_8px_30px_rgba(37,211,102,0.35)] bg-[#25D366] hover:bg-[#20bd5a]`}
            >
              <span>تواصل عبر WhatsApp لتأكيد الاشتراك</span>
              <MessageCircle className="w-6 h-6 fill-current" />
            </button>

            {/* Floating Support Button for Mobile/Desktop */}
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md pointer-events-auto sm:hidden">
              <button
                onClick={() => {
                  const isPaidCard = submittedMethod === 'card';
                  const orderDetails = [
                    `*كابتن كريم، تم تسجيل طلب اشتراك جديد! 🚀*`,
                    `━━━━━━━━━━━━━━━━━━`,
                    `👤 *الاسم:* ${name.trim()}`,
                    `📱 *الهاتف:* ${phone.trim()}`,
                    `📦 *الباقة:* ${pkgKey === 'elite' ? 'باقة Elite' : 'باقة Max'} - ${durationKey === '3m' ? '4 شهور (3+1 هدية)' : '8 شهور (6+2 هدية)'}`,
                    `🌍 *الدولة:* ${t.countries[residenceCountry]}`,
                    `💳 *وسيلة الدفع:* ${getPaymentMethodLabel(submittedMethod)}`,
                    appliedPromo ? `🏷️ *كود الخصم:* ${appliedPromo.code}` : '',
                    `💰 *المبلغ:* ${currentPrice?.finalAmount} ${currencyStr}`,
                    `🔖 *رقم الطلب:* #${submittedOrderId || 'KZ-0000'}`,
                    `━━━━━━━━━━━━━━━━━━`,
                    isPaidCard 
                      ? `✅ *تم الدفع بالبطاقة البنكية بنجاح، في انتظار كود المتابعة ورابط الاستمارة للبدء فوراً!* 🚀` 
                      : `📄 *مرفق إيصال التحويل لتأكيد الاشتراك واستلام كود المتابعة!* 👇`
                  ].filter(Boolean).join('\n');
                  window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(orderDetails)}`, '_blank');
                }}
                className="w-full py-4 px-6 rounded-2xl font-black text-white text-base shadow-[0_10px_30px_rgba(37,211,102,0.45)] bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-2.5 active:scale-95 transition-transform"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>تواصل عبر WhatsApp لتأكيد الاشتراك</span>
              </button>
            </div>
          </div>
        ) : (
        <form onSubmit={handleFinalSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Right Column (Form) -> col-span-8 in RTL (on the right) */}
          <div className="lg:col-span-8 space-y-10 order-2 lg:order-1">
            
            {/* Personal Data */}
            <section className="relative bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6 sm:p-8">
              <div 
                className={`absolute -inset-px pointer-events-none rounded-3xl border-t-2 border-r-2 ${isMax ? 'border-[#C4952D]' : 'border-brand-primary'} opacity-40`} 
                style={{
                  maskImage: 'linear-gradient(to bottom left, black 5%, transparent 50%)',
                  WebkitMaskImage: 'linear-gradient(to bottom left, black 5%, transparent 50%)'
                }}
              />
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                البيانات الشخصية
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">اسمك <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="ادخل اسمك"
                    autoComplete="name"
                    className={`w-full bg-slate-50 border border-slate-200 ${isMax ? "focus:border-[#C4952D] focus:ring-[#C4952D]/10" : "focus:border-brand-primary focus:ring-brand-primary/10"} focus:ring-4 rounded-xl px-4 py-3.5 text-slate-900 font-bold transition-all outline-none`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف (الواتساب) <span className="text-red-500">*</span></label>
                  <div className="relative group">
                    <PhoneInput
                      countries={allowedCountries}
                      defaultCountry={residenceCountry !== 'OTHER' ? residenceCountry : 'EG'}
                      value={phone}
                      onChange={(val) => {
                        setPhone(val || '');
                        if (phoneError) setPhoneError('');
                      }}
                      placeholder="ادخل رقم هاتفك"
                      className={`flex items-stretch w-full bg-slate-50 border ${phoneError ? 'border-red-400 focus-within:border-red-500 focus-within:ring-red-500/10' : (isMax ? "border-slate-200 focus-within:border-[#C4952D] focus-within:ring-[#C4952D]/10" : "border-slate-200 focus-within:border-brand-primary focus-within:ring-brand-primary/10")} focus-within:ring-4 rounded-xl transition-all shadow-sm outline-none`}
                      countrySelectComponent={(props) => <CustomCountrySelect {...props} t={t} isMax={isMax} />}
                      numberInputProps={{
                        className: "flex-1 bg-transparent border-none outline-none py-3.5 px-4 font-en text-left text-base text-slate-900 font-bold focus:ring-0 placeholder:text-slate-400 placeholder:font-ar rounded-l-xl",
                        dir: "ltr",
                        required: true,
                        autoComplete: "tel"
                      }}
                    />
                  </div>
                  {phoneError && (
                    <p className="text-red-500 text-xs font-bold mt-2 px-1 flex items-center gap-1">
                      <span>⚠️</span>
                      <span>{phoneError}</span>
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Choose Duration */}
            <section className="relative bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6 sm:p-8">
              <div 
                className={`absolute -inset-px pointer-events-none rounded-3xl border-t-2 border-r-2 ${isMax ? 'border-[#C4952D]' : 'border-brand-primary'} opacity-40`} 
                style={{
                  maskImage: 'linear-gradient(to bottom left, black 5%, transparent 50%)',
                  WebkitMaskImage: 'linear-gradient(to bottom left, black 5%, transparent 50%)'
                }}
              />
              <h2 className="text-xl font-black text-slate-900 mb-6">اختر مدة الاشتراك</h2>
              <div className="grid grid-cols-1 gap-3">
                {durations.map(dur => {
                  const dMonths = parseInt(dur.replace('m', ''));
                  const price = getPrice(residenceCountry, pkgKey, dur);
                  if (!price) return null;
                  
                  return (
                    <label 
                      key={dur} 
                      className={`relative flex items-center justify-between cursor-pointer p-5 rounded-2xl border transition-all ${
                        durationKey === dur 
                          ? `${primaryBorderClass} bg-white shadow-sm ring-1 ${isMax ? "ring-[#C4952D]" : "ring-brand-primary"}` 
                          : `border-slate-200 bg-white/50 backdrop-blur-sm hover:${primaryBorderClass}/50`
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="duration"
                        value={dur}
                        checked={durationKey === dur}
                        onChange={() => setDurationKey(dur)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${durationKey === dur ? primaryBorderClass : 'border-slate-300'}`}>
                          {durationKey === dur && <div className={`w-2.5 h-2.5 rounded-full ${primaryBgClass}`} />}
                        </div>
                        <div className="font-bold text-slate-800 text-lg">
                          {dMonths} {dMonths === 12 ? 'شهر' : 'شهور'}
                          {dMonths === 3 && <span className={`${primaryColorClass} text-sm font-bold mr-1`}> + شهر هدية</span>}
                          {dMonths === 6 && <span className={`${primaryColorClass} text-sm font-bold mr-1`}> + شهرين هدية</span>}
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="font-black text-slate-900">{price.finalAmount} {currencyStr}</div>
                        {price.originalAmount > 0 && (
                          <div className="text-slate-400/80 mt-0.5" dir="ltr">
                            <span className="line-through decoration-slate-400/60 inline-flex items-baseline gap-1 text-[13px] font-bold">
                              <span>{price.originalAmount}</span>
                              <span className="text-[10px]">{currencyStr}</span>
                            </span>
                          </div>
                        )}
                        <div className="text-xs text-slate-500 font-bold mt-1">{Math.round(price.finalAmount / (price.baseDurationMonths + price.freeMonths))} {currencyStr} شهرياً</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </section>

            {/* Payment Method */}
            <section className="relative bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6 sm:p-8">
              <div 
                className={`absolute -inset-px pointer-events-none rounded-3xl border-t-2 border-r-2 ${isMax ? 'border-[#C4952D]' : 'border-brand-primary'} opacity-40`} 
                style={{
                  maskImage: 'linear-gradient(to bottom left, black 5%, transparent 50%)',
                  WebkitMaskImage: 'linear-gradient(to bottom left, black 5%, transparent 50%)'
                }}
              />
              <h2 className="text-xl font-black text-slate-900 mb-2">اختر وسيلة الدفع</h2>
              <p className="text-sm font-bold text-slate-500 mb-6">اختر وسيلة الدفع المناسبة لك</p>
              <div className="grid grid-cols-1 gap-3">
                {currentMethods.map(method => (
                  <label 
                    key={method.id} 
                    className={`relative flex items-center justify-between cursor-pointer p-4 rounded-2xl border transition-all duration-500 overflow-hidden group ${
                      selectedMethod === method.id 
                        ? method.id === 'instapay'
                          ? "border-[#6A1B9A]/40 shadow-[0_8px_30px_rgba(106,27,154,0.12)] ring-1 ring-[#6A1B9A]/20"
                          : method.id === 'wallet'
                          ? "border-slate-300 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-slate-200"
                          : `${primaryBorderClass}/50 bg-white ring-1 ${isMax ? "ring-[#C4952D]/30 shadow-[0_8px_30px_rgba(196,149,45,0.12)]" : "ring-brand-primary/30 shadow-[0_8px_30px_rgba(14,165,233,0.12)]"}` 
                        : method.id === 'instapay'
                          ? "border-slate-200 bg-white/50 backdrop-blur-sm hover:border-[#6A1B9A]/30 hover:shadow-[0_4px_20px_rgba(242,100,34,0.08)]"
                          : method.id === 'wallet'
                          ? "border-slate-200 bg-white/50 backdrop-blur-sm hover:border-slate-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                          : `border-slate-200 bg-white/50 backdrop-blur-sm hover:${primaryBorderClass}/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]`
                    }`}
                  >
                    {/* Glassy Background Effects */}
                    <div 
                      className={`absolute -inset-px pointer-events-none transition-all duration-700 ${
                        selectedMethod === method.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {method.id === 'instapay' ? (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#6A1B9A]/[0.07] via-transparent to-[#f26422]/[0.07] backdrop-blur-2xl" />
                          <div className="absolute top-0 right-0 w-32 h-32 bg-[#f26422]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#6A1B9A]/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
                        </>
                      ) : method.id === 'wallet' ? (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#e60000]/[0.02] via-[#5a2c84]/[0.02] to-[#00a300]/[0.02] backdrop-blur-2xl" />
                          <div className="absolute top-0 right-0 w-32 h-32 bg-[#f16e00]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#e60000]/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
                          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#00a300]/5 rounded-full blur-2xl -translate-y-1/2" />
                          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-[#5a2c84]/5 rounded-full blur-2xl -translate-y-1/2" />
                        </>
                      ) : (
                        <>
                          <div className={`absolute inset-0 bg-gradient-to-tr ${isMax ? 'from-[#C4952D]/[0.05]' : 'from-brand-primary/[0.05]'} via-transparent to-transparent backdrop-blur-2xl`} />
                          <div className={`absolute top-0 right-0 w-32 h-32 ${isMax ? 'bg-[#C4952D]/10' : 'bg-brand-primary/10'} rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`} />
                          <div className={`absolute bottom-0 left-0 w-32 h-32 ${isMax ? 'bg-[#C4952D]/10' : 'bg-brand-primary/10'} rounded-full blur-2xl translate-y-1/2 -translate-x-1/2`} />
                        </>
                      )}
                    </div>

                    <input 
                      type="radio" 
                      name="payment_method"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={() => setSelectedMethod(method.id)}
                      className="sr-only"
                    />
                    <div className="relative z-10 flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        selectedMethod === method.id 
                          ? method.id === 'instapay' ? 'border-[#6A1B9A]' : method.id === 'wallet' ? 'border-slate-800' : primaryBorderClass 
                          : 'border-slate-300 group-hover:border-slate-400'
                      }`}>
                        {selectedMethod === method.id && <div className={`w-2.5 h-2.5 rounded-full ${
                          method.id === 'instapay' ? 'bg-[#6A1B9A]' : method.id === 'wallet' ? 'bg-slate-800' : primaryBgClass
                        }`} />}
                      </div>
                      <div className={`font-bold text-sm whitespace-nowrap transition-colors duration-300 ${
                        selectedMethod === method.id && method.id === 'instapay' ? 'text-[#6A1B9A]' : selectedMethod === method.id && method.id === 'wallet' ? 'text-slate-900' : 'text-slate-800'
                      }`}>{method.title}</div>
                    </div>
                    <div className="relative z-10 shrink-0 flex items-center">
                      {method.logo}
                    </div>
                  </label>
                ))}
              </div>

              {/* Selected Method Details Inline */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedMethod}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-6"
                >
                  <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-slate-200/50 shadow-sm">
                    {selectedMethod === 'card' && (
                      <div className="space-y-4 text-center p-2">
                        <div className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center ${isMax ? 'bg-[#C4952D]/10 text-[#C4952D]' : 'bg-brand-primary/10 text-brand-primary'}`}>
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-black text-slate-900 text-base">دفع إلكتروني آمن ومشفر 🔒</h4>
                          <p className="text-slate-500 text-xs sm:text-sm font-bold leading-relaxed max-w-md mx-auto">
                            الدفع متاح ببطاقات فيزا، ماستركارد، وميزة. بمجرد الضغط على «تأكيد الطلب»، سيتم تسجيل اشتراكك وتوجيهك فوراً للتواصل واستلام كود المتابعة.
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-3 text-xs text-slate-600 font-bold bg-slate-50 py-2.5 px-4 rounded-xl border border-slate-100 max-w-sm mx-auto">
                          <span className="flex items-center gap-1 text-emerald-700 font-bold">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            حماية وتشفير 256-bit
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-brand-primary font-bold">تفعيل فوري</span>
                        </div>
                      </div>
                    )}
                    {selectedMethod === 'instapay' && (
                      <div className="text-center space-y-6">
                        <div className="space-y-4">
                          <a 
                            href={`https://ipn.eg/C/Q/karimzakariia/instapay?ISIGN=23052602MEUCIQCxfDT7wJzrj9Y6dbCV/rSrIi9ox0eyJB0ylW4sZzFiDAIgf8OV7UplSCLv2tsv8BAg/mJPuc30sWf/7ZPQnCBAkK4=`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block max-w-[250px] mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative p-4 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <div className="relative w-full h-full flex items-center justify-center">
                              <QRCode 
                                value="https://ipn.eg/C/Q/karimzakariia/instapay?ISIGN=23052602MEUCIQCxfDT7wJzrj9Y6dbCV/rSrIi9ox0eyJB0ylW4sZzFiDAIgf8OV7UplSCLv2tsv8BAg/mJPuc30sWf/7ZPQnCBAkK4=" 
                                size={200}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                viewBox={`0 0 256 256`}
                                level="H"
                              />
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-100 flex items-center justify-center">
                                  <img 
                                    src="/assets/images/instapay-logo.png"
                                    alt="InstaPay" 
                                    className="w-10 h-10 object-contain"
                                  />
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        
                        <a 
                          href={`https://ipn.eg/C/Q/karimzakariia/instapay?ISIGN=23052602MEUCIQCxfDT7wJzrj9Y6dbCV/rSrIi9ox0eyJB0ylW4sZzFiDAIgf8OV7UplSCLv2tsv8BAg/mJPuc30sWf/7ZPQnCBAkK4=`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 bg-[#6A1B9A] hover:bg-[#5a1782] text-white py-3.5 px-4 rounded-xl font-bold transition-all shadow-sm text-sm"
                        >
                          <span>امسح الكود أو اضغط للفتح في إنستاباي</span>
                        </a>
                      </div>
                    )}
                    {selectedMethod === 'wallet' && (
                      <div className="space-y-3 max-w-[380px] mx-auto">
                        <div className="text-[13px] text-slate-500 font-bold text-center">
                          رقم المحفظة (فودافون كاش)
                        </div>
                        <div className={`flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-1.5 transition-all duration-300 ${isMax ? 'hover:border-[#C4952D]/30' : 'hover:border-brand-primary/30'}`}>
                          <div className="flex-1 text-center font-black text-[#1e293b] font-en tracking-[0.15em] text-[22px] pt-1 pl-2">
                            {t.checkout.methods.wallet.number}
                          </div>
                          <button 
                            type="button" 
                            onClick={() => handleCopy(t.checkout.methods.wallet.number, 'wallet')} 
                            className={`shrink-0 flex items-center justify-center gap-1.5 px-5 h-11 rounded-xl font-bold text-[13px] transition-all duration-300 ${
                              copied === 'wallet' 
                                ? 'bg-emerald-50 text-emerald-600' 
                                : isMax ? 'bg-[#C4952D]/[0.08] text-[#C4952D] hover:bg-[#C4952D]/[0.15]' : 'bg-brand-primary/[0.08] text-brand-primary hover:bg-brand-primary/[0.15]'
                            }`}
                          >
                            <span>{copied === 'wallet' ? 'تم' : 'نسخ'}</span>
                            {copied === 'wallet' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    )}
                    {selectedMethod === 'bank' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <div className="text-[11px] text-slate-500 font-bold mb-1 uppercase">اسم البنك</div>
                            <div className="font-black text-slate-900 text-sm">{t.checkout.methods.bank.bankName}</div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <div className="text-[11px] text-slate-500 font-bold mb-1 uppercase">اسم المستفيد</div>
                            <div className="font-black text-slate-900 font-en text-sm truncate">{t.checkout.methods.bank.accountName}</div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div>
                            <div className="text-[11px] text-slate-500 font-bold mb-1 uppercase">رقم الحساب</div>
                            <div className="font-black text-slate-900 font-en tracking-widest text-lg">{t.checkout.methods.bank.accountNumber}</div>
                          </div>
                          <button type="button" onClick={() => handleCopy(t.checkout.methods.bank.accountNumber, 'bank')} className={`text-slate-400 hover:${primaryColorClass} ${isMax ? "hover:bg-[#C4952D]/10" : "hover:bg-brand-primary/10"} p-2.5 rounded-lg transition-colors`}>
                            {copied === 'bank' ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    )}
                    {selectedMethod === 'international_bank' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <div className="text-[11px] text-slate-500 font-bold mb-1 uppercase">SWIFT / BIC</div>
                            <div className="font-black text-slate-900 font-en text-sm">{t.checkout.methods.bank.swift}</div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <div className="text-[11px] text-slate-500 font-bold mb-1 uppercase">اسم المستفيد</div>
                            <div className="font-black text-slate-900 font-en text-sm truncate">{t.checkout.methods.bank.accountName}</div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between overflow-hidden">
                          <div className="overflow-hidden pr-2">
                            <div className="text-[11px] text-slate-500 font-bold mb-1 uppercase">IBAN</div>
                            <div className="font-black text-slate-900 font-en tracking-wider text-sm truncate">{t.checkout.methods.bank.iban}</div>
                          </div>
                          <button type="button" onClick={() => handleCopy(t.checkout.methods.bank.iban, 'iban')} className={`text-slate-400 hover:${primaryColorClass} ${isMax ? "hover:bg-[#C4952D]/10" : "hover:bg-brand-primary/10"} p-2.5 rounded-lg transition-colors shrink-0`}>
                            {copied === 'iban' ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                          </button>
                        </div>
                        <div className="bg-amber-50 text-amber-800 p-3 rounded-lg border border-amber-200/50 text-xs font-bold text-center">
                          يرجى تحويل المبلغ بعملة {currencyStr}.
                        </div>
                      </div>
                    )}
                    {selectedMethod === 'international_wallet' && (
                      <div className="text-center p-4">
                        <p className="text-slate-700 font-bold leading-relaxed text-sm">
                          سيتم تحويلك لواتساب لتزويدنا بدولتك، وسنرسل لك بيانات التحويل المناسبة (مثل زين كاش، STC Pay، وغيرها).
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </section>

            {/* Submit Area */}
            <div className="pt-6">
               <button 
                   type="submit" 
                   disabled={!selectedMethod}
                  className={`w-full max-w-sm text-white rounded-2xl py-4 font-black text-xl flex flex-row-reverse items-center justify-center gap-3 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 ${isMax ? 'bg-gradient-to-r from-[#C4952D] via-[#D4A53D] to-[#C4952D] shadow-[0_8px_20px_rgba(196,149,45,0.3)] hover:shadow-[0_12px_25px_rgba(196,149,45,0.4)]' : 'bg-brand-primary hover:bg-brand-primary-hover shadow-[0_8px_20px_rgba(88,180,229,0.3)] hover:shadow-[0_12px_25px_rgba(88,180,229,0.4)]'}`}
                >
                  <ArrowLeft className="w-6 h-6" />
                  <span>تأكيد الطلب — {currentPrice?.finalAmount.toLocaleString()} {currencyStr}</span>
                </button>
            </div>

          </div>

          {/* Left Column (Summary) -> col-span-4 in RTL (on the left) */}
          <div className="lg:col-span-4 space-y-6 order-1 lg:order-2">
            
            <div className="relative bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6 sticky top-28">
              <div 
                className={`absolute -inset-px pointer-events-none rounded-3xl border-t-2 border-r-2 ${isMax ? 'border-[#C4952D]' : 'border-brand-primary'} opacity-40`} 
                style={{
                  maskImage: 'linear-gradient(to bottom left, black 5%, transparent 50%)',
                  WebkitMaskImage: 'linear-gradient(to bottom left, black 5%, transparent 50%)'
                }}
              />
              <h3 className="text-2xl font-black text-slate-900 text-center mb-2 flex justify-center"><PackageTitle /></h3>
              <div className="flex justify-center mb-6">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border ${isMax ? 'bg-[#C4952D]/10 border-[#C4952D]/30 text-[#8F6A1A]' : 'bg-brand-primary/10 border-brand-primary/30 text-brand-primary'}`}>
                  <span>المدة المختارة: {durationKey === '3m' ? '4 شهور' : '8 شهور'}</span>
                  <span className="text-xs bg-white/90 px-2 py-0.5 rounded-md font-extrabold shadow-xs">
                    {durationKey === '3m' ? '3 + 1 شهر هدية 🎁' : '6 + 2 شهر هدية 🎁'}
                  </span>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="font-black text-slate-900 text-3xl">{currentPrice?.finalAmount.toLocaleString()} <span className="text-lg">{currencyStr}</span></div>
              </div>
              
              <p className="text-sm text-slate-600 font-bold mb-6 leading-relaxed text-center">
                {packageSubtitle}
              </p>
              
              <div className="pt-6 border-t border-slate-100 flex flex-col">
                <button 
                  onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                  className={`w-full text-right relative ${isFeaturesOpen ? '' : 'pb-6'}`}
                >
                  <div className="space-y-4">
                    {packageFeatures.slice(0, 3).map((f: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-slate-700 font-bold leading-relaxed">
                        <Check className={`w-4 h-4 ${primaryColorClass} shrink-0 mt-0.5`} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  
                  {!isFeaturesOpen && (
                    <div className={`absolute -bottom-6 -left-6 -right-6 h-32 bg-gradient-to-t ${isMax ? 'from-[#C4952D]/15' : 'from-[#e0f2fe]'} via-white/80 to-transparent rounded-b-3xl flex items-end justify-center pointer-events-none pb-4`}>
                      <ChevronDown className={`w-6 h-6 ${primaryColorClass} animate-bounce`} />
                    </div>
                  )}
                </button>
                
                <div 
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isFeaturesOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-4 pt-1">
                      {packageFeatures.slice(3).map((f: string, i: number) => {
                        if (f === "MAX_ADDITIONS_SEPARATOR") {
                          return (
                            <div key={i} className="w-full flex flex-col items-center justify-center pt-2 pb-1">
                              <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#C4952D] to-transparent mb-3 opacity-50" />
                              <span className="text-[14px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C4952D] via-[#FDF0A6] to-[#C4952D] animate-shimmer-gold bg-[length:200%_auto] tracking-wide">
                                {t.packages.maxAdditions}
                              </span>
                            </div>
                          );
                        }
                        return (
                          <div key={i} className="flex items-start gap-3 text-sm text-slate-700 font-bold leading-relaxed">
                            <Check className={`w-4 h-4 ${primaryColorClass} shrink-0 mt-0.5`} />
                            <span>{f}</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    <button 
                      onClick={() => setIsFeaturesOpen(false)}
                      className="w-full flex justify-center mt-6 pb-2"
                    >
                      <ChevronDown className={`w-5 h-5 ${primaryColorClass} rotate-180 transition-transform`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            


            
            {/* Promo Code Card */}
            <div className="relative bg-white rounded-3xl shadow-sm border border-slate-200/70 p-5 mb-4">
              <div 
                className={`absolute -inset-px pointer-events-none rounded-3xl border-t-2 border-r-2 ${isMax ? 'border-[#C4952D]' : 'border-brand-primary'} opacity-20`} 
                style={{
                  maskImage: 'linear-gradient(to bottom left, black 5%, transparent 50%)',
                  WebkitMaskImage: 'linear-gradient(to bottom left, black 5%, transparent 50%)'
                }}
              />
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={promo_code}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="لديك كود خصم؟ أدخله هنا"
                    className={`w-full bg-slate-50 border border-slate-200 rounded-full px-5 py-3.5 text-sm font-bold text-slate-800 focus:outline-none ${isMax ? "focus:border-[#C4952D] focus:ring-[#C4952D]" : "focus:border-brand-primary focus:ring-brand-primary"} focus:ring-1 focus:bg-white transition-all uppercase placeholder:text-slate-400`}
                    disabled={promoLoading || !!appliedPromo}
                    dir="ltr"
                  />
                  {appliedPromo && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-bold">
                      <Check className="w-3.5 h-3.5" />
                      تم التطبيق
                    </div>
                  )}
                </div>
                {!appliedPromo ? (
                  <button
                    type="button"
                    onClick={applyPromoCode}
                    disabled={promoLoading || !promo_code.trim()}
                    className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                      isMax 
                        ? 'bg-[#C4952D]/10 text-[#C4952D] hover:bg-[#C4952D] hover:text-white hover:shadow-xl hover:shadow-[#C4952D]/30 hover:-translate-y-1'
                        : 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white hover:shadow-xl hover:shadow-brand-primary/30 hover:-translate-y-1'
                    } disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:-translate-y-0 disabled:cursor-not-allowed`}
                  >
                    {promoLoading ? <span className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full" /> : <Tag className="w-5 h-5" />}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={removePromo}
                    className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm bg-red-50 text-red-600 hover:bg-red-500 hover:text-white hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {promoError && (
                <p className="text-red-500 text-xs font-bold mt-3 px-2">{promoError}</p>
              )}
            </div>
            {/* Order Summary & Total Card */}
            <div className="relative bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6 mb-6">
              <div 
                className={`absolute -inset-px pointer-events-none rounded-3xl border-t-2 border-r-2 ${isMax ? 'border-[#C4952D]' : 'border-brand-primary'} opacity-20`} 
                style={{
                  maskImage: 'linear-gradient(to bottom left, black 5%, transparent 50%)',
                  WebkitMaskImage: 'linear-gradient(to bottom left, black 5%, transparent 50%)'
                }}
              />
              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-xl font-black text-slate-900">ملخص الطلب</h3>
                <span className="text-slate-500 font-bold flex items-center gap-1 text-base">
                  <span>{'{'}</span><PackageTitle /><span>{'}'}</span>
                </span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex flex-col gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-sm font-bold text-slate-600 bg-slate-50 border border-slate-100 px-3.5 py-2 rounded-xl">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>{durationKey === '3m' ? '3 شهور' : '6 شهور'}</span>
                    </span>
                    <span className={`text-lg font-black ${isMax ? 'text-[#C4952D]' : 'text-brand-primary'}`}>+</span>
                    <span className={`flex items-center gap-1.5 text-sm font-bold px-3.5 py-2 rounded-xl ${isMax ? 'bg-[#C4952D]/10 text-[#C4952D]' : 'bg-brand-primary/10 text-brand-primary'}`}>
                      <Gift className="w-4 h-4" />
                      <span>{durationKey === '3m' ? 'شهر هدية' : 'شهرين هدية'}</span>
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm font-bold text-slate-600">المجموع الفرعي</span>
                  <div className="flex items-center gap-1.5" dir="rtl">
                    <span className="text-base font-black font-en text-slate-900">{currentPrice?.originalAmount.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 font-bold mt-0.5">{currencyStr}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm font-bold text-emerald-600">الخصم</span>
                  <div className="flex items-center gap-1.5" dir="rtl">
                    <span className="text-base font-black font-en text-emerald-600">
                      - {appliedPromo ? ((currentPrice?.originalAmount || 0) - (currentPrice?.finalAmount || 0)).toLocaleString() : 0}
                    </span>
                    <span className="text-xs font-bold mt-0.5 text-emerald-600">{currencyStr}</span>
                  </div>
                </div>
              </div>

              <div className={`bg-slate-50 border border-slate-100 rounded-2xl p-5 ${appliedPromo ? 'ring-1 ring-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : ''}`}>
                <div className="flex justify-between items-center">
                  <span className="text-base font-black text-slate-900">الإجمالي</span>
                  <div className="flex items-center gap-2" dir="rtl">
                    {appliedPromo && (
                      <span className="text-sm font-bold text-slate-400 line-through mt-1">
                        {currentPrice?.originalAmount.toLocaleString()}
                      </span>
                    )}
                    <span className={`text-3xl font-black font-en tracking-tight ${isMax ? 'text-[#C4952D]' : 'text-[#009AE0]'}`}>
                      {currentPrice?.finalAmount.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-500 font-bold mt-1">{currencyStr}</span>
                  </div>
                </div>
                {currentPrice && (
                  <div className={`mt-3 flex items-center justify-center text-sm lg:text-base font-bold ${isMax ? 'bg-[#C4952D]/10 text-[#C4952D]' : 'bg-brand-primary/10 text-brand-primary'} px-3 py-2.5 rounded-xl`} dir="rtl">
                    <span>يعني الشهر بـ <span className="font-en text-lg lg:text-xl font-black mx-1">{Math.round(currentPrice.finalAmount / ((currentPrice.baseDurationMonths || 1) + (currentPrice.freeMonths || 0))).toLocaleString()}</span> {currencyStr} فقط!</span>
                  </div>
                )}
              </div>
            </div>

            <div className="relative bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6 mt-6">
              <div 
                className={`absolute -inset-px pointer-events-none rounded-3xl border-t-2 border-r-2 ${isMax ? 'border-[#C4952D]' : 'border-brand-primary'} opacity-40`} 
                style={{
                  maskImage: 'linear-gradient(to bottom left, black 5%, transparent 50%)',
                  WebkitMaskImage: 'linear-gradient(to bottom left, black 5%, transparent 50%)'
                }}
              />
              <h3 className="text-lg font-black text-slate-900 mb-6">خطوات الدفع والتفعيل</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className={`w-8 h-8 rounded-xl ${primaryBgSubtleClass} ${primaryColorClass} flex items-center justify-center font-black shrink-0 text-sm`}>1</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">تحويل المبلغ</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">قم بتحويل إجمالي المبلغ الموضح إلى وسيلة الدفع التي اخترتها.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className={`w-8 h-8 rounded-xl ${primaryBgSubtleClass} ${primaryColorClass} flex items-center justify-center font-black shrink-0 text-sm`}>2</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">إرفاق الإيصال</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">احتفظ بصورة إيصال التحويل، وبعد تأكيد الطلب أرسله لنا عبر واتساب.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className={`w-8 h-8 rounded-xl ${primaryBgSubtleClass} ${primaryColorClass} flex items-center justify-center font-black shrink-0 text-sm`}>3</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">تأكيد وتفعيل</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">بعد إتمام الطلب، سنقوم بمراجعة الدفع وتفعيل حسابك والتواصل معك فوراً.</p>
                  </div>
                </div>
              </div>
            </div>
            

          </div>
        </form>
        )}
      </div>
    </div>
  );
}

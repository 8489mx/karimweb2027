import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from '../ui/Section';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';
import { detectCountryCode } from '../../utils/location';
import { SectionHeading } from '../ui/SectionHeading';
import { CountryCode } from '../../config/pricing';
import { getCurrencyCode } from '../../utils/api';

import { trackPackageClick } from '../../utils/tracking';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Packages() {
  const { getPrice, settings } = useSettings();
  const { t, dir, lang: language } = useLanguage();
const highlightKeywords = (text: string, pkgKey: string) => {
  const keywords = [
    t.packages?.keywords?.every14Days,
    t.packages?.keywords?.every10Days,
    t.packages?.keywords?.everyWeek,
    t.packages?.keywords?.hours48,
    t.packages?.keywords?.hours24,
    'كل 14 يوم',
    'كل أسبوع',
    '24 ساعة عمل',
    'أولوية قصوى',
    'الرسائل الصوتية المباشرة',
    'مكالمة مراجعة مباشرة',
    'فحص وتصحيح مفتوح',
    'Cardio - Mobility - Stretching'
  ].filter(Boolean) as string[];
  const regex = new RegExp(`(${keywords.join('|')})`, 'g');
  const parts = text.split(regex);
  
  const colorClass = pkgKey === 'max' ? 'text-[#C4952D]' : pkgKey === 'elite' ? 'text-[#0ea5e9]' : 'text-slate-900';

  return parts.map((part, i) => {
    if (keywords.includes(part)) {
      return <span key={i} className={`font-bold ${colorClass}`}>{part}</span>;
    }
    return part;
  });
};

const getDurationLabel = (opt: number) => {
    const key = opt + 'm';
    if (settings?.packagesData?.durations?.[key as '3m' | '6m']) {
      return settings.packagesData.durations[key as '3m' | '6m'];
    }
    return t.packages.durationOptions[opt as keyof typeof t.packages.durationOptions];
  };

const highlightBonusText = (text: string, pkgKey: string, isDropdownSelected: boolean = false) => {
  const keywords = [t.packages.keywords.oneMonthFree, t.packages.keywords.twoMonthsFree];
  const regex = new RegExp(`(${keywords.join('|')})`, 'g');
  const parts = text.split(regex);
  
  const colorClass = isDropdownSelected 
    ? 'text-inherit' 
    : (pkgKey === 'max' ? 'text-[#C4952D]' : 'text-brand-primary');

  return parts.map((part, i) => {
    if (keywords.includes(part)) {
      return <span key={i} className={`font-bold ${colorClass}`}>{part}</span>;
    }
    return part;
  });
};


  const navigate = useNavigate();
  const [detectedCountry, setDetectedCountry] = useState<CountryCode | null>(null);
  const [manualOverride, setManualOverride] = useState<CountryCode | null>(null);
  const [durations, setDurations] = useState<Record<number, 3 | 6>>({ 0: 3, 1: 3, 2: 3 });
  const [openDropdownIdx, setOpenDropdownIdx] = useState<number | null>(null);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  useEffect(() => {
    async function initCountry() {
      const code = await detectCountryCode();
      const mappedCode: CountryCode = ['EG', 'SA', 'KW', 'AE', 'QA', 'BH'].includes(code) ? (code as CountryCode) : 'OTHER';
      setDetectedCountry(mappedCode);
    }
    initCountry();
  }, []);

  const activeCountry = manualOverride || detectedCountry;
  const dropdownsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownsRef.current && !dropdownsRef.current.contains(event.target as Node)) {
        setOpenDropdownIdx(null);
        setIsCountryDropdownOpen(false);
      }
    }
    
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenDropdownIdx(null);
        setIsCountryDropdownOpen(false);
      }
    }

    if (openDropdownIdx !== null || isCountryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside, { passive: true });
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [openDropdownIdx, isCountryDropdownOpen]);
  
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const packages = [
    {
      name: "Elite",
      isPopular: true,
      features: settings?.packagesData?.elite?.length > 0 ? settings.packagesData.elite : t.packages.elite,
      priceKey: 'elite' as const,
      subtitle: settings?.packagesData?.subtitles?.elite || t.packages.subtitles.elite
    },
    {
      name: "MAX",
      features: settings?.packagesData?.max?.length > 0 ? settings.packagesData.max : t.packages.max,
      priceKey: 'max' as const,
      isPopular: false,
      subtitle: settings?.packagesData?.subtitles?.max || t.packages.subtitles.max
    }
  ];

  const visibleCountries = Object.entries(t.countries).filter(([code]) => {
    if (code === 'EG') return detectedCountry === 'EG';
    return true;
  });

  if (!activeCountry) {
    return (
      <Section id="packages" className="relative z-10 bg-transparent">
        <div className="text-center mb-8 max-w-none mx-auto">
          <SectionHeading className="mb-2">
            {t.packages.title}
          </SectionHeading>
          <p className="text-base sm:text-[1.1rem] md:text-xl lg:text-2xl text-brand-muted leading-relaxed px-2 font-medium mb-6">
            {t.packages.description}
          </p>

          <div className="relative inline-block w-full max-w-[280px] mx-auto animate-pulse">
            <div className="w-full h-[52px] bg-slate-200 rounded-[14px]"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[900px] mx-auto items-center px-4 sm:px-6">
          <div className="h-[600px] rounded-[32px] bg-slate-200 animate-pulse"></div>
          <div className="h-[600px] rounded-[32px] bg-slate-200 animate-pulse"></div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="packages" className="relative z-10 bg-transparent">
      <div className="text-center mb-8 max-w-none mx-auto">
        <SectionHeading className="mb-2">
          {t.packages.title}
        </SectionHeading>
        <p className="text-base sm:text-[1.1rem] md:text-xl lg:text-2xl text-brand-muted leading-relaxed px-2 font-medium mb-6">
          {t.packages.description}
        </p>

        {/* Country Selector */}
        <div className="relative inline-flex justify-center w-auto mx-auto country-dropdown-container">
          <button 
            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
            className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-[14px] px-6 py-3 flex items-center gap-4 text-slate-800 font-bold hover:bg-slate-50 transition-colors shadow-sm min-w-[160px] justify-center"
          >
            <div className="flex items-center gap-3">
              {activeCountry === 'OTHER' ? (
                <Globe className="w-5 h-5 text-brand-primary" />
              ) : (
                <img 
                  src={`https://flagcdn.com/${activeCountry.toLowerCase()}.svg`} 
                  alt={activeCountry} 
                  className="w-[22px] h-[16px] rounded-[3px] object-cover shadow-[0_2px_6px_rgba(0,0,0,0.15)] ring-1 ring-black/5" 
                />
              )}
              <span>{t.countries[activeCountry]}</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isCountryDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-1/2 -translate-x-1/2 w-[240px] mt-2 bg-white rounded-[14px] border border-slate-200 shadow-xl overflow-hidden z-50 py-1"
              >
                {visibleCountries.map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setManualOverride(code as CountryCode);
                      setIsCountryDropdownOpen(false);
                    }}
                    className={`w-full text-right px-5 py-3 hover:bg-slate-50 transition-colors font-medium flex items-center justify-between ${activeCountry === code ? 'text-brand-primary bg-brand-primary/5' : 'text-slate-700'}`}
                  >
                    <div className="flex items-center gap-3">
                      {code === 'OTHER' ? (
                        <Globe className={`w-5 h-5 ${activeCountry === code ? 'text-brand-primary' : 'text-slate-400'}`} />
                      ) : (
                        <img 
                          src={`https://flagcdn.com/${code.toLowerCase()}.svg`} 
                          alt={code} 
                          className="w-[22px] h-[16px] rounded-[3px] object-cover shadow-[0_2px_6px_rgba(0,0,0,0.15)] ring-1 ring-black/5" 
                        />
                      )}
                      <span>{name}</span>
                    </div>
                    {activeCountry === code && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[900px] mx-auto items-center px-4 sm:px-6">
        {packages.map((pkg, idx) => {
          const currentDurationNum = durations[idx] || 3;
          const currentDurationCode = `${currentDurationNum}m` as '3m' | '6m';
          
          const priceObj = getPrice(activeCountry, pkg.priceKey, currentDurationCode);
          const currency = getCurrencyCode(activeCountry);
          
          let isBestValue = false;
          if (priceObj) {
            const currentPerMonth = priceObj.finalAmount / (priceObj.baseDurationMonths + priceObj.freeMonths);
            
            const p3m = getPrice(activeCountry, pkg.priceKey, '3m');
            const p6m = getPrice(activeCountry, pkg.priceKey, '6m');
            
            const perMonth3m = p3m ? p3m.finalAmount / (p3m.baseDurationMonths + p3m.freeMonths) : Infinity;
            const perMonth6m = p6m ? p6m.finalAmount / (p6m.baseDurationMonths + p6m.freeMonths) : Infinity;
            
            const minPerMonth = Math.min(perMonth3m, perMonth6m);
            // It's the best value if it has the absolute lowest monthly rate, and it's actually cheaper than at least one other option
            if (currentPerMonth <= minPerMonth && currentPerMonth < perMonth3m) {
                isBestValue = true;
            }
          }
          
          const totalDuration = priceObj ? priceObj.baseDurationMonths + priceObj.freeMonths : currentDurationNum;
          let bonusText = isBestValue ? t.packages.bestValue : '';
          if (priceObj) {
            if (priceObj.freeMonths === 2) {
              bonusText = t.packages.keywords.twoMonthsFree || 'شهرين هدية';
            } else if (priceObj.freeMonths > 2) {
              bonusText = `${priceObj.freeMonths} أشهر هدية`;
            }
          }
          
          return (
            <div 
              key={idx}
              className={`group relative flex flex-col rounded-[32px] bg-white/90 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 active:scale-[0.98] cursor-pointer ${
                pkg.isPopular 
                  ? 'shadow-[0_16px_40px_-15px_rgba(58,155,207,0.3)] border-[1.5px] border-brand-primary md:scale-[1.03] z-10 hover:shadow-[0_20px_50px_-15px_rgba(58,155,207,0.4)] active:shadow-md mt-4 md:mt-0' 
                  : `border-[1.5px] shadow-[0_12px_30px_-15px_rgba(0,0,0,0.08)] z-0 active:shadow-sm ${
                      pkg.priceKey === 'max'
                        ? 'border-[#C4952D]/40 hover:border-[#C4952D]/60 hover:shadow-[0_20px_40px_-15px_rgba(196,149,45,0.15)]'
                        : 'border-slate-200/80 hover:border-brand-primary/40 hover:shadow-[0_20px_40px_-15px_rgba(58,155,207,0.15)]'
                    }`
              }`}
              onTouchStart={() => {}}
            >
              {/* Inner wrapper for overflow hidden to contain the shine */}
              <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none">
                {/* Glassmorphism Shine Effect on Hover */}
                <div className={`absolute inset-0 -translate-x-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent ${
                  pkg.priceKey === 'max' ? 'via-[#ffd700]/30' : 
                  'via-brand-primary/10'
                } to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[150%] group-active:translate-x-[150%] z-0`} />
              </div>

              {/* Badges */}
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[12px] md:text-[13px] font-bold py-1 px-4 rounded-full shadow-[0_4px_10px_rgba(58,155,207,0.4)] flex items-center justify-center z-20 whitespace-nowrap">
                   <span>{t.packages.popular || 'الأكثر مبيعاً'}</span>
                </div>
              )}
              
              <div className="relative z-10 p-5 lg:p-6 flex flex-col h-full flex-1 pt-8 lg:pt-10">
                <h3 className={`text-2xl sm:text-3xl font-black uppercase text-center mb-2 tracking-[0.15em] bg-clip-text text-transparent drop-shadow-sm font-en ${
                  pkg.priceKey === 'elite' ? 'bg-gradient-to-br from-[#0284c7] via-[#38bdf8] to-[#0284c7]' : 
                  'bg-gradient-to-r from-[#C4952D] via-[#FDF0A6] to-[#C4952D] animate-shimmer-gold bg-[length:200%_auto]'
                }`}>
                  {pkg.name}
                </h3>
                
                <div className="flex items-center justify-center gap-1.5 mt-3 mb-4">
                  <span className={`h-1.5 w-3 rounded-full transition-all duration-500 group-hover:w-8 ${pkg.priceKey === 'elite' ? 'bg-[#38bdf8]/20 group-hover:bg-[#38bdf8]/40' : 'bg-[#C4952D]/20 group-hover:bg-[#C4952D]/40'}`}></span>
                  <span className={`h-1.5 w-16 rounded-full transition-all duration-500 group-hover:w-10 ${pkg.priceKey === 'elite' ? 'bg-[#38bdf8]/60 group-hover:bg-[#38bdf8]' : 'bg-[#C4952D]/60 group-hover:bg-[#C4952D]'}`}></span>
                  <span className={`h-1.5 w-3 rounded-full transition-all duration-500 group-hover:w-8 ${pkg.priceKey === 'elite' ? 'bg-[#38bdf8]/20 group-hover:bg-[#38bdf8]/40' : 'bg-[#C4952D]/20 group-hover:bg-[#C4952D]/40'}`}></span>
                </div>
                
                <div className="flex flex-col justify-start items-center mb-6">
                  <p className="text-sm text-center text-slate-500 leading-relaxed px-1">
                    {pkg.subtitle}
                  </p>
                </div>
                
                <div className="text-center mb-6 flex flex-col items-center justify-center">
                    <>
                      <div className="flex items-center justify-center gap-1.5 flex-row-reverse" dir="ltr">
                        <span className="text-[38px] lg:text-[44px] font-black text-slate-900 tracking-tighter leading-none font-en">
                          {priceObj ? priceObj.finalAmount : '--'}
                        </span>
                        {currency && <span className="text-[18px] font-bold text-slate-900 mt-2">{currency}</span>}
                      </div>
                      {priceObj && priceObj.originalAmount > 0 && (
                        <div className="flex items-center justify-center text-slate-400/80 mt-1" dir="ltr">
                          <span className="line-through decoration-slate-400/60 inline-flex items-baseline gap-1.5 flex-row-reverse">
                            <span className="text-[20px] font-bold tracking-tight font-en">
                              {priceObj.originalAmount}
                            </span>
                            {currency && <span className="text-[13px] font-bold">{currency}</span>}
                          </span>
                        </div>
                      )}
                    </>
                </div>

                {/* Accent Divider */}
                <div className={`h-[1px] w-[80%] mx-auto bg-gradient-to-r from-transparent to-transparent mb-6 ${
                  pkg.priceKey === 'max' ? 'via-[#E5B951]' : 'via-[#0ea5e9]'
                }`} />

                <div className="flex-1 w-full px-1 pb-8">
                  <ul className="space-y-4 w-full list-none p-0 m-0" >
                    {pkg.features.map((feature: string, fIdx: number) => {
                      if (feature === "MAX_ADDITIONS_SEPARATOR") {
                        return (
                          <li key={fIdx} className="w-full flex flex-col items-center justify-center pt-2 pb-1">
                            <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#C4952D] to-transparent mb-3 opacity-50" />
                            <span className="text-[14px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C4952D] via-[#FDF0A6] to-[#C4952D] animate-shimmer-gold bg-[length:200%_auto] tracking-wide">
                              {t.packages.maxAdditions}
                            </span>
                          </li>
                        );
                      }
                      
                      return (
                      <li 
                        key={fIdx} 
                        className={`flex items-start group/feature w-full gap-3 py-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                      >
                        <div className={`relative shrink-0 flex items-center justify-center w-[22px] h-[22px] mt-0.5 rounded-[8px] transition-colors ${
                          pkg.priceKey === 'max' ? 'bg-[#E5B951]/15 group-hover/feature:bg-[#E5B951]/25' : 
                          'bg-[#0ea5e9]/15 group-hover/feature:bg-[#0ea5e9]/25'
                        }`}>
                          <div className={`w-[16px] h-[16px] rounded-[6px] flex items-center justify-center shadow-sm ${
                            pkg.priceKey === 'max' ? 'bg-gradient-to-br from-[#C4952D] via-[#FDF0A6] to-[#C4952D]' : 
                            'bg-[#0ea5e9]'
                          }`}>
                            <Check className={`w-[12px] h-[12px] ${pkg.priceKey === 'max' ? 'text-slate-900' : 'text-white'}`} strokeWidth={3.5} />
                          </div>
                        </div>
                        <span 
                          className="text-[13px] sm:text-[13.5px] lg:text-[14px] font-semibold text-slate-700 leading-relaxed group-hover/feature:text-slate-900 transition-colors flex-1"
                        >
                          {highlightKeywords(feature, pkg.priceKey)}
                        </span>
                      </li>
                    )})}
                  </ul>
                </div>

                <div className="mt-auto flex flex-col items-center w-full">
                  {/* Custom Duration Select */}
                  <div className="relative w-full mb-3 duration-dropdown-container">
                    <button 
                      onClick={() => setOpenDropdownIdx(openDropdownIdx === idx ? null : idx)}
                      className={`bg-[#F8FAFC] border rounded-[14px] py-3.5 px-4 text-[15px] font-bold w-full flex items-center justify-center transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 ${
                        pkg.priceKey === 'max' ? 'text-slate-800 focus:ring-[#C4952D]/30 border-[#C4952D]/40' : 'text-slate-700 focus:ring-[#0ea5e9]/30 border-[#0ea5e9]/40'
                      }`}
                    >
                      <span>{highlightBonusText(getDurationLabel(currentDurationNum), pkg.priceKey)}</span>
                      <div className={cn(
                        "absolute top-1/2 -translate-y-1/2 transition-transform duration-300",
                        language === 'ar' ? 'left-4' : 'right-4',
                        openDropdownIdx === idx ? 'rotate-180' : ''
                      )}>
                        <ChevronDown className={`w-5 h-5 ${pkg.priceKey === 'max' ? 'text-[#C4952D]' : 'text-slate-400'}`} />
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {openDropdownIdx === idx && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute top-[calc(100%+8px)] left-0 w-full bg-white border rounded-[14px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden z-50 p-1.5 ${
                            pkg.priceKey === 'max' ? 'border-[#C4952D]/20' : 'border-[#0ea5e9]/30'
                          }`}
                        >
                          {[3, 6].map((opt) => {
                            const isSelected = currentDurationNum === opt;
                            let activeBg = 'bg-[#0ea5e9] text-white';
                            if (pkg.priceKey === 'max') activeBg = 'bg-gradient-to-r from-[#C4952D] via-[#FDF0A6] to-[#C4952D] text-slate-900 animate-shimmer-gold';

                            return (
                              <button
                                key={opt}
                                onClick={() => {
                                  setDurations(prev => ({ ...prev, [idx]: opt as 3 | 6 }));
                                  setOpenDropdownIdx(null);
                                }}
                                className={cn(
                                  "w-full px-4 py-3 rounded-[10px] text-[15px] font-bold text-center transition-all duration-200 mb-1 last:mb-0",
                                  isSelected 
                                    ? activeBg 
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                )}
                              >
                                {isSelected ? getDurationLabel(opt) : highlightBonusText(getDurationLabel(opt), pkg.priceKey)}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Total duration & bonus badge */}
                  <div className="flex flex-col items-center justify-center gap-1.5 mb-5 w-full">
                    <div className="text-[14px] font-medium text-slate-600">
                      {t.packages.totalDurationPrefix}
                      <span className={`font-bold mx-1 ${pkg.priceKey === 'max' ? 'text-[#C4952D]' : 'text-brand-primary'}`}>
                        {totalDuration} {totalDuration === 12 ? t.packages.monthLabel : t.packages.monthsLabel}
                      </span>
                    </div>
                  </div>

                  {/* Distinct Subscribe Button */}
                  <button 
                    onClick={() => {
                      trackPackageClick({ package_name: pkg.name, cta_location: "packages", price: String(priceObj?.finalAmount || ""), currency: String(currency || "") });
                      const token = 'tok_' + Math.random().toString(36).substring(2, 15);
                      sessionStorage.setItem(token, JSON.stringify({ pkg: pkg.priceKey, duration: currentDurationCode, country: activeCountry }));
                      navigate(`/checkout?token=${token}`);
                    }} 
                    className={`w-full rounded-[14px] py-3.5 px-4 font-bold text-[15px] flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:translate-y-0 shadow-md hover:shadow-xl ${
                      pkg.priceKey === 'max' ? 'bg-gradient-to-r from-[#C4952D] via-[#FDF0A6] to-[#C4952D] text-slate-900 animate-shimmer-gold hover:shadow-[0_8px_25px_rgba(196,149,45,0.4)]' :
                      'bg-[#0ea5e9] hover:bg-[#0284c7] text-white'
                    }`}>
                    <span>{t.packages.selectPackagePrefix}{pkg.name}{t.packages.selectPackageDuration}{totalDuration} {totalDuration === 12 ? t.packages.monthLabel : t.packages.monthsLabel}</span>
                    <ArrowIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}


import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react'; interface Option { label: React.ReactNode; shortLabel?: React.ReactNode; value: number;
} interface CustomSelectProps { options: Option[]; value: number; onChange: (value: number) => void; lang?: 'ar' | 'en';
} export function CustomSelect({ options, value, onChange, lang = 'ar' }: CustomSelectProps) { const [isOpen, setIsOpen] = useState(false); const dropdownRef = useRef<HTMLDivElement>(null); const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);
 useEffect(() => { function handleClickOutside(event: MouseEvent) { if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) { setIsOpen(false); } } document.addEventListener('mousedown', handleClickOutside); return () => document.removeEventListener('mousedown', handleClickOutside); }, []); return ( <div className="relative" ref={dropdownRef}> <button type="button" onClick={() => setIsOpen(!isOpen)} aria-haspopup="listbox" aria-expanded={isOpen} className={`w-full border rounded-2xl px-4 py-3.5 text-brand-text focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 transition-all duration-300 flex items-center justify-between cursor-pointer text-lg ${isOpen ? 'bg-white border-brand-primary/50 ring-2 ring-brand-primary/20 ' : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 '}`} dir={lang === 'ar' ? 'rtl' : 'ltr'} > <span className="truncate flex-1 text-center font-medium text-base">{selectedOption.shortLabel || selectedOption.label}</span> <ChevronDown className={`w-5 h-5 text-brand-muted shrink-0 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} /> </button> {isOpen && ( <div className="absolute z-50 w-[95vw] md:w-max md:min-w-full left-1/2 -translate-x-1/2 mt-2 bg-white/95 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden py-1" dir={lang === 'ar' ? 'rtl' : 'ltr'} > <ul className="max-h-72 overflow-auto" role="listbox"> {options.map((option) => ( <li key={option.value} role="option" aria-selected={value === option.value}> <button type="button" onClick={() => { onChange(option.value); setIsOpen(false); }} className={`block w-full text-center px-4 py-3 hover:bg-brand-primary/5 focus-visible:bg-brand-primary/10 focus-visible:text-brand-primary focus:outline-none transition-colors cursor-pointer text-base font-medium ${ value === option.value ? 'bg-brand-primary/10 text-brand-primary' : 'text-brand-text' }`} > {option.label} </button> </li> ))} </ul> </div> )} </div> );
}

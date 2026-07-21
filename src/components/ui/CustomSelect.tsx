import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  label: string;
  value: number;
}

interface CustomSelectProps {
  options: Option[];
  value: number;
  onChange: (value: number) => void;
  lang?: 'ar' | 'en';
}

export function CustomSelect({ options, value, onChange, lang = 'ar' }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border rounded-xl px-4 py-3 text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all flex items-center justify-between shadow-sm cursor-pointer ${isOpen ? 'border-brand-primary ring-1 ring-brand-primary' : 'border-brand-border'}`}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <span className="truncate flex-1 text-center font-medium text-base">{selectedOption.label}</span>
        <ChevronDown className={`w-5 h-5 text-brand-muted shrink-0 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute z-50 w-[95vw] md:w-max md:min-w-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-brand-border rounded-xl shadow-xl overflow-hidden py-1"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <ul className="max-h-72 overflow-auto">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-center px-4 py-3 hover:bg-brand-primary/5 transition-colors cursor-pointer truncate text-base font-medium ${
                    value === option.value ? 'bg-brand-primary/10 text-brand-primary' : 'text-brand-text'
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

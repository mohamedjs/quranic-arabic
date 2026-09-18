'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/lib/i18n/languages';
import { Globe, ChevronDown } from 'lucide-react';

export const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLangConfig = SUPPORTED_LANGUAGES[language] || SUPPORTED_LANGUAGES['ar'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
        aria-expanded={isOpen}
        aria-label="Select Language"
      >
        <span className="text-base leading-none">{currentLangConfig.flag}</span>
        <span className="hidden sm:inline font-medium">{currentLangConfig.nativeName}</span>
        <span className="sm:hidden font-mono uppercase text-[11px]">{currentLangConfig.code}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-44 rounded-2xl bg-white shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in-50 zoom-in-95">
          <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Choose Language / اختر اللغة
          </div>
          {(Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguage[]).map((code) => {
            const lang = SUPPORTED_LANGUAGES[code];
            const isSelected = language === code;

            return (
              <button
                key={code}
                type="button"
                onClick={() => handleSelect(code)}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

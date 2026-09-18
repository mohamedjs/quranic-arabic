'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, SupportedLanguage } from './languages';
import { TRANSLATIONS } from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  dir: 'rtl' | 'ltr';
  t: (key: string, params?: Record<string, string | number>) => string;
  getLocalized: (obj: any, fieldName: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  dir: 'rtl',
  t: (key) => key,
  getLocalized: () => '',
});

const STORAGE_KEY = 'bayan_selected_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as SupportedLanguage;
      if (savedLang && SUPPORTED_LANGUAGES[savedLang]) {
        setLanguageState(savedLang);
      }
    } catch (e) {
      // localStorage not available
    }
    setMounted(true);
  }, []);

  const setLanguage = (newLang: SupportedLanguage) => {
    if (!SUPPORTED_LANGUAGES[newLang]) return;
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch (e) {
      // ignore
    }
  };

  const config = SUPPORTED_LANGUAGES[language] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];
  const dir = config.dir;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = dir;
    }
  }, [language, dir]);

  const t = (key: string, params?: Record<string, string | number>): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE];
    let translation = langDict[key] || TRANSLATIONS[DEFAULT_LANGUAGE][key] || key;

    if (params) {
      Object.entries(params).forEach(([paramKey, paramVal]) => {
        translation = translation.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
      });
    }

    return translation;
  };

  /**
   * Helper to retrieve localized database attributes like title_ar, title_en, title_ru
   */
  const getLocalized = (obj: any, fieldName: string): string => {
    if (!obj) return '';

    // First try active language specific column: e.g. title_en, title_ru, title_ar
    const langKey = `${fieldName}_${language}`;
    if (obj[langKey] && typeof obj[langKey] === 'string' && obj[langKey].trim() !== '') {
      return obj[langKey];
    }

    // Try default/mirror column: e.g. title
    if (obj[fieldName] && typeof obj[fieldName] === 'string' && obj[fieldName].trim() !== '') {
      return obj[fieldName];
    }

    // Fallback to Arabic version: e.g. title_ar
    const arKey = `${fieldName}_ar`;
    if (obj[arKey] && typeof obj[arKey] === 'string' && obj[arKey].trim() !== '') {
      return obj[arKey];
    }

    // Fallback to English version: e.g. title_en
    const enKey = `${fieldName}_en`;
    if (obj[enKey] && typeof obj[enKey] === 'string' && obj[enKey].trim() !== '') {
      return obj[enKey];
    }

    return '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t, getLocalized }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

'use client';

import React, { createContext, useContext, useEffect, useMemo, useSyncExternalStore, ReactNode } from 'react';
import { Language, LANGUAGES, LanguageOption, translations, TranslationKey } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey | string, fallback?: string) => string;
  isRtl: boolean;
  currentLanguage: LanguageOption;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'aereo_language';

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('aereo_language_change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('aereo_language_change', callback);
  };
}

function getSnapshot(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored === 'en' || stored === 'es' || stored === 'ar') {
      return stored;
    }
  } catch {
    // Ignore storage errors
  }
  return 'en';
}

function getServerSnapshot(): Language {
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Synchronize HTML tag attributes for accessibility and RTL rendering
  useEffect(() => {
    const isRtl = language === 'ar';
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

    if (isRtl) {
      document.documentElement.classList.add('rtl-layout');
    } else {
      document.documentElement.classList.remove('rtl-layout');
    }
  }, [language]);

  const setLanguage = (newLang: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      window.dispatchEvent(new Event('aereo_language_change'));
    } catch {
      // Storage error ignored
    }
  };

  const isRtl = language === 'ar';

  const currentLanguage = useMemo(() => {
    return LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  }, [language]);

  const t = useMemo(() => {
    return (key: TranslationKey | string, fallback?: string): string => {
      const langDict = translations[language] as Record<string, string>;
      if (langDict && langDict[key]) {
        return langDict[key];
      }
      // Fallback to English dictionary
      const enDict = translations.en as Record<string, string>;
      if (enDict && enDict[key]) {
        return enDict[key];
      }
      return fallback || key;
    };
  }, [language]);

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      isRtl,
      currentLanguage,
      languages: LANGUAGES,
    }),
    [language, isRtl, currentLanguage, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      <div dir={isRtl ? 'rtl' : 'ltr'} className={isRtl ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

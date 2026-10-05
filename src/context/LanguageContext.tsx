import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Language, LanguageOption } from '../types';
import { LANGUAGES, NAV_TRANSLATIONS, NavI18n } from '../utils/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentOption: LanguageOption;
  t: ((key: string, options?: any) => any) & NavI18n;
  translationsObj: NavI18n;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'freedive_dahab_language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { t: i18nTranslate } = useTranslation();

  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved && ['en', 'ar', 'es', 'de'].includes(saved)) {
        return saved;
      }
    }
    return (i18n.language as Language) || 'en';
  });

  const currentOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const isRtl = currentOption.dir === 'rtl';

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    i18n.changeLanguage(newLang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
      } catch (e) {
        console.warn('Could not save language to localStorage', e);
      }
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
      if (language === 'ar') {
        document.documentElement.classList.add('lang-ar');
      } else {
        document.documentElement.classList.remove('lang-ar');
      }
    }
  }, [language, isRtl]);

  // Create hybrid translate function supporting both t('key.path') and legacy t.section.prop
  const hybridTranslate = ((key: string, options?: any) => {
    return i18nTranslate(key, options);
  }) as any;

  const currentTranslations = NAV_TRANSLATIONS[language] || NAV_TRANSLATIONS.en;
  Object.assign(hybridTranslate, currentTranslations);

  const value: LanguageContextType = {
    language,
    setLanguage,
    currentOption,
    t: hybridTranslate,
    translationsObj: currentTranslations,
    isRtl,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    const fallbackOption = LANGUAGES[0];
    const fallbackTranslate = ((key: string, options?: any) => key) as any;
    Object.assign(fallbackTranslate, NAV_TRANSLATIONS.en);

    return {
      language: 'en',
      setLanguage: () => {},
      currentOption: fallbackOption,
      t: fallbackTranslate,
      translationsObj: NAV_TRANSLATIONS.en,
      isRtl: false,
    };
  }
  return context;
}

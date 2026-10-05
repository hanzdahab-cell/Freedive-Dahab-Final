import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { TRANSLATIONS } from './utils/i18n';

const resources = {
  en: { translation: TRANSLATIONS.en },
  ar: { translation: TRANSLATIONS.ar },
  es: { translation: TRANSLATIONS.es },
  de: { translation: TRANSLATIONS.de },
};

const getSavedLanguage = (): string => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('freedive_dahab_language');
      if (saved && ['en', 'ar', 'es', 'de'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
  }
  return 'en';
};

const initialLang = getSavedLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    returnObjects: true,
  });

export default i18n;

export const SUPPORTED_LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    locale: 'en-US',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    locale: 'ar-SA',
  },
  bn: {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    dir: 'ltr',
    locale: 'bn-BD',
  },
};

export const DEFAULT_LANGUAGE = 'en';
export const STORAGE_KEY = 'portfolio-language';

export const isRTL = (langCode) => SUPPORTED_LANGUAGES[langCode]?.dir === 'rtl';

export const getLanguageConfig = (langCode) =>
  SUPPORTED_LANGUAGES[langCode] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './config.js';
import { getInitialLanguage, persistLanguage } from './languageDetector.js';
import { dictionaries } from './locales/index.js';
import { translateKey } from './translationUtils.js';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState(() => getInitialLanguage());

  const setLanguage = useCallback((langCode) => {
    if (SUPPORTED_LANGUAGES[langCode]) {
      setCurrentLanguageState(langCode);
      persistLanguage(langCode);
    }
  }, []);

  const languageConfig = useMemo(
    () => SUPPORTED_LANGUAGES[currentLanguage] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE],
    [currentLanguage]
  );

  const direction = languageConfig.dir;
  const isRTL = direction === 'rtl';

  // Synchronize document attributes with language and direction
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.setAttribute('lang', currentLanguage);
    root.setAttribute('dir', direction);

    if (isRTL) {
      root.classList.add('rtl');
      root.classList.remove('ltr');
    } else {
      root.classList.add('ltr');
      root.classList.remove('rtl');
    }
  }, [currentLanguage, direction, isRTL]);

  const activeDictionary = useMemo(
    () => dictionaries[currentLanguage] || dictionaries[DEFAULT_LANGUAGE],
    [currentLanguage]
  );

  const fallbackDictionary = dictionaries[DEFAULT_LANGUAGE];

  const t = useCallback(
    (key, params = {}, defaultText = null) => {
      return translateKey({
        currentDict: activeDictionary,
        fallbackDict: fallbackDictionary,
        key,
        params,
        defaultText,
      });
    },
    [activeDictionary, fallbackDictionary]
  );

  const contextValue = useMemo(
    () => ({
      currentLanguage,
      language: currentLanguage,
      languageConfig,
      direction,
      isRTL,
      supportedLanguages: SUPPORTED_LANGUAGES,
      setLanguage,
      t,
    }),
    [currentLanguage, languageConfig, direction, isRTL, setLanguage, t]
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return {
    t: context.t,
    currentLanguage: context.currentLanguage,
    language: context.currentLanguage,
    isRTL: context.isRTL,
    direction: context.direction,
    setLanguage: context.setLanguage,
    supportedLanguages: context.supportedLanguages,
  };
};

export default LanguageContext;

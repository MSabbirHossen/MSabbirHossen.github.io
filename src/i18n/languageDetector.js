import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, STORAGE_KEY } from './config.js';

/**
 * Match a raw language string (e.g., 'en-US', 'ar-SA', 'bn-BD') to supported languages.
 */
export const normalizeLanguageCode = (rawCode) => {
  if (!rawCode || typeof rawCode !== 'string') return null;

  const cleaned = rawCode.trim().toLowerCase();

  // Direct match
  if (SUPPORTED_LANGUAGES[cleaned]) {
    return cleaned;
  }

  // Prefix match (e.g. 'ar-SA' -> 'ar', 'bn-BD' -> 'bn', 'en-GB' -> 'en')
  const primaryTag = cleaned.split('-')[0].split('_')[0];
  if (SUPPORTED_LANGUAGES[primaryTag]) {
    return primaryTag;
  }

  return null;
};

/**
 * Detect language from browser preferences:
 * 1. Checks `navigator.languages` array
 * 2. Fallback to `navigator.language`
 * 3. Fallback to DEFAULT_LANGUAGE ('en')
 */
export const detectBrowserLanguage = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  try {
    const candidateLanguages = Array.isArray(navigator.languages)
      ? [...navigator.languages]
      : [navigator.language || navigator.userLanguage];

    for (const raw of candidateLanguages) {
      const matched = normalizeLanguageCode(raw);
      if (matched) {
        return matched;
      }
    }
  } catch {
    // Ignore error in restricted browser sandboxes
  }

  return DEFAULT_LANGUAGE;
};

/**
 * Retrieve the active language:
 * 1. Saved preference in localStorage has highest priority
 * 2. If valid saved preference exists, return it
 * 3. Otherwise detect browser language
 * 4. Fallback to English
 */
export const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES[saved]) {
      return saved;
    }
  } catch {
    // In private browsing mode or storage disabled
  }

  return detectBrowserLanguage();
};

/**
 * Persist manual language selection.
 */
export const persistLanguage = (langCode) => {
  if (typeof window === 'undefined') return;
  try {
    if (SUPPORTED_LANGUAGES[langCode]) {
      window.localStorage.setItem(STORAGE_KEY, langCode);
    }
  } catch {
    // Ignore storage errors
  }
};

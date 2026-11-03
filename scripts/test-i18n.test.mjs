import test from 'node:test';
import assert from 'node:assert/strict';

import { en } from '../src/i18n/locales/en/index.js';
import { ar } from '../src/i18n/locales/ar/index.js';
import { bn } from '../src/i18n/locales/bn/index.js';

import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  STORAGE_KEY,
  isRTL,
  getLanguageConfig,
} from '../src/i18n/config.js';

import {
  normalizeLanguageCode,
  detectBrowserLanguage,
  getInitialLanguage,
  persistLanguage,
} from '../src/i18n/languageDetector.js';

import { getNestedValue, interpolate, translateKey } from '../src/i18n/translationUtils.js';

import { assistantPortfolioData } from '../src/data/assistantPortfolioData.js';
import { createKnowledgeEngine } from '../src/lib/ai/knowledgeEngine.js';
import { detectIntent } from '../src/lib/ai/intentMatcher.js';
import {
  generateLocalResponse,
  getErrorFallbackResponse,
  defaultUnknownResponse,
} from '../src/lib/ai/responseBuilder.js';
import {
  getTemplate,
  getActionLabels,
  getFollowUps,
  getCardBadge,
} from '../src/lib/ai/responseTemplates.js';

function collectKeys(obj, prefix = '') {
  const result = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      result.push(...collectKeys(value, fullPath));
    } else {
      result.push(fullPath);
    }
  }
  return result;
}

function extractPlaceholders(str) {
  if (typeof str !== 'string') return [];
  const matches = str.match(/\{\s*(\w+)\s*\}|\{\{\s*(\w+)\s*\}\}/g);
  if (!matches) return [];
  return matches.map((m) => m.replace(/[{}]/g, '').trim()).sort();
}

function setMockNavigator(mockObj) {
  Object.defineProperty(globalThis, 'navigator', {
    value: mockObj,
    configurable: true,
    writable: true,
  });
}

// -------------------------------------------------------------
// 1. Dictionaries & Key Completeness
// -------------------------------------------------------------
test('i18n dictionaries: all supported languages export valid objects', () => {
  assert.ok(en && typeof en === 'object', 'English locale is an object');
  assert.ok(ar && typeof ar === 'object', 'Arabic locale is an object');
  assert.ok(bn && typeof bn === 'object', 'Bengali locale is an object');
});

test('i18n dictionaries: key parity across en, ar, and bn', () => {
  const enKeys = collectKeys(en).sort();
  const arKeys = collectKeys(ar).sort();
  const bnKeys = collectKeys(bn).sort();

  assert.equal(
    enKeys.length,
    arKeys.length,
    `Key counts must match: EN(${enKeys.length}) vs AR(${arKeys.length})`
  );
  assert.equal(
    enKeys.length,
    bnKeys.length,
    `Key counts must match: EN(${enKeys.length}) vs BN(${bnKeys.length})`
  );

  const missingInAr = enKeys.filter((k) => !arKeys.includes(k));
  const missingInBn = enKeys.filter((k) => !bnKeys.includes(k));
  const orphanInAr = arKeys.filter((k) => !enKeys.includes(k));
  const orphanInBn = bnKeys.filter((k) => !enKeys.includes(k));

  assert.deepEqual(missingInAr, [], 'No keys should be missing in Arabic');
  assert.deepEqual(missingInBn, [], 'No keys should be missing in Bengali');
  assert.deepEqual(orphanInAr, [], 'No orphan keys should exist in Arabic');
  assert.deepEqual(orphanInBn, [], 'No orphan keys should exist in Bengali');
});

test('i18n dictionaries: no empty string, null, or undefined values', () => {
  const dictionaries = { en, ar, bn };

  for (const [lang, dict] of Object.entries(dictionaries)) {
    const keys = collectKeys(dict);
    for (const key of keys) {
      const val = getNestedValue(dict, key);
      assert.notEqual(val, undefined, `${lang}.${key} must not be undefined`);
      assert.notEqual(val, null, `${lang}.${key} must not be null`);
      if (typeof val === 'string') {
        assert.ok(val.trim().length > 0, `${lang}.${key} must not be empty`);
      }
    }
  }
});

test('i18n dictionaries: placeholder token consistency', () => {
  const enKeys = collectKeys(en);

  for (const key of enKeys) {
    const enVal = getNestedValue(en, key);
    const arVal = getNestedValue(ar, key);
    const bnVal = getNestedValue(bn, key);

    if (typeof enVal === 'string') {
      const enTokens = extractPlaceholders(enVal);
      if (enTokens.length > 0) {
        const arTokens = extractPlaceholders(arVal);
        const bnTokens = extractPlaceholders(bnVal);

        assert.deepEqual(
          arTokens,
          enTokens,
          `AR placeholders for "${key}" must match EN. Expected ${JSON.stringify(enTokens)}, got ${JSON.stringify(arTokens)}`
        );
        assert.deepEqual(
          bnTokens,
          enTokens,
          `BN placeholders for "${key}" must match EN. Expected ${JSON.stringify(enTokens)}, got ${JSON.stringify(bnTokens)}`
        );
      }
    }
  }
});

// -------------------------------------------------------------
// 2. Translation Utilities & Interpolation
// -------------------------------------------------------------
test('translationUtils: interpolate replaces tokens accurately', () => {
  const template = 'Showing {count} of {total} items for {query}';
  const result = interpolate(template, { count: 3, total: 10, query: 'React' });
  assert.equal(result, 'Showing 3 of 10 items for React');

  // Double curly syntax {{name}}
  const doubleCurly = 'Hello {{name}}!';
  assert.equal(interpolate(doubleCurly, { name: 'Sabbir' }), 'Hello Sabbir!');

  // Missing param retains placeholder
  assert.equal(interpolate('Count: {count}', {}), 'Count: {count}');
});

test('translationUtils: translateKey returns active language text', () => {
  const result = translateKey({
    currentDict: ar,
    fallbackDict: en,
    key: 'common.loading',
  });
  assert.equal(result, ar.common.loading);
});

test('translationUtils: translateKey falls back to English if missing in active dictionary', () => {
  const incompleteDict = { common: {} };
  const result = translateKey({
    currentDict: incompleteDict,
    fallbackDict: en,
    key: 'common.loading',
  });
  assert.equal(result, en.common.loading);
});

test('translationUtils: translateKey falls back to explicit defaultText or key string', () => {
  const emptyDict = {};
  const withDefault = translateKey({
    currentDict: emptyDict,
    fallbackDict: emptyDict,
    key: 'non.existent.key',
    defaultText: 'Custom Fallback',
  });
  assert.equal(withDefault, 'Custom Fallback');

  const withoutDefault = translateKey({
    currentDict: emptyDict,
    fallbackDict: emptyDict,
    key: 'non.existent.key',
  });
  assert.equal(withoutDefault, 'non.existent.key');
});

// -------------------------------------------------------------
// 3. Language Code Normalization & Detection
// -------------------------------------------------------------
test('languageDetector: normalizeLanguageCode matches exact and regional codes', () => {
  // Direct matches
  assert.equal(normalizeLanguageCode('en'), 'en');
  assert.equal(normalizeLanguageCode('ar'), 'ar');
  assert.equal(normalizeLanguageCode('bn'), 'bn');

  // Regional codes with hyphen
  assert.equal(normalizeLanguageCode('en-US'), 'en');
  assert.equal(normalizeLanguageCode('en-GB'), 'en');
  assert.equal(normalizeLanguageCode('ar-SA'), 'ar');
  assert.equal(normalizeLanguageCode('ar-EG'), 'ar');
  assert.equal(normalizeLanguageCode('bn-BD'), 'bn');
  assert.equal(normalizeLanguageCode('bn-IN'), 'bn');

  // Regional codes with underscore
  assert.equal(normalizeLanguageCode('ar_AE'), 'ar');
  assert.equal(normalizeLanguageCode('bn_BD'), 'bn');

  // Case insensitivity & trimming
  assert.equal(normalizeLanguageCode('  EN-us '), 'en');
  assert.equal(normalizeLanguageCode('AR-sa'), 'ar');

  // Unsupported languages return null
  assert.equal(normalizeLanguageCode('fr'), null);
  assert.equal(normalizeLanguageCode('ur'), null);
  assert.equal(normalizeLanguageCode('de-DE'), null);
  assert.equal(normalizeLanguageCode(''), null);
  assert.equal(normalizeLanguageCode(null), null);
});

test('languageDetector: detectBrowserLanguage returns correct language from mock navigator', () => {
  const originalWindow = globalThis.window;
  const originalDesc = Object.getOwnPropertyDescriptor(globalThis, 'navigator');

  try {
    globalThis.window = {};

    // Scenario 1: English user
    setMockNavigator({ languages: ['en-US', 'en'] });
    assert.equal(detectBrowserLanguage(), 'en');

    // Scenario 2: Arabic user
    setMockNavigator({ languages: ['ar-SA', 'ar', 'en'] });
    assert.equal(detectBrowserLanguage(), 'ar');

    // Scenario 3: Bengali user
    setMockNavigator({ languages: ['bn-BD', 'bn', 'en'] });
    assert.equal(detectBrowserLanguage(), 'bn');

    // Scenario 4: Unsupported language (e.g., French, Urdu) falls back to 'en'
    setMockNavigator({ languages: ['fr-FR', 'fr', 'es'] });
    assert.equal(detectBrowserLanguage(), 'en');

    // Scenario 5: Single navigator.language fallback
    setMockNavigator({ language: 'ar-EG' });
    assert.equal(detectBrowserLanguage(), 'ar');

    // Scenario 6: Empty navigator
    setMockNavigator({});
    assert.equal(detectBrowserLanguage(), 'en');
  } finally {
    globalThis.window = originalWindow;
    if (originalDesc) {
      Object.defineProperty(globalThis, 'navigator', originalDesc);
    }
  }
});

// -------------------------------------------------------------
// 4. Persistence & LocalStorage
// -------------------------------------------------------------
test('languageDetector: getInitialLanguage prioritizes saved preference over browser', () => {
  const originalWindow = globalThis.window;
  const originalDesc = Object.getOwnPropertyDescriptor(globalThis, 'navigator');

  const mockStorage = new Map();
  globalThis.window = {
    localStorage: {
      getItem: (k) => mockStorage.get(k) ?? null,
      setItem: (k, v) => mockStorage.set(k, String(v)),
    },
  };

  try {
    // Browser prefers Arabic, but user previously selected Bengali in localStorage
    setMockNavigator({ languages: ['ar-SA', 'ar'] });
    mockStorage.set(STORAGE_KEY, 'bn');
    assert.equal(getInitialLanguage(), 'bn');

    // User previously selected English
    mockStorage.set(STORAGE_KEY, 'en');
    assert.equal(getInitialLanguage(), 'en');

    // Invalid or corrupted value in localStorage -> falls back to browser detection
    mockStorage.set(STORAGE_KEY, 'invalid-lang-code');
    assert.equal(getInitialLanguage(), 'ar');

    // Empty storage -> falls back to browser detection
    mockStorage.clear();
    assert.equal(getInitialLanguage(), 'ar');

    // Test persistLanguage
    persistLanguage('bn');
    assert.equal(mockStorage.get(STORAGE_KEY), 'bn');

    // Reject persisting unsupported language
    persistLanguage('klingon');
    assert.equal(mockStorage.get(STORAGE_KEY), 'bn');
  } finally {
    globalThis.window = originalWindow;
    if (originalDesc) {
      Object.defineProperty(globalThis, 'navigator', originalDesc);
    }
  }
});

// -------------------------------------------------------------
// 5. Directionality & RTL Configuration
// -------------------------------------------------------------
test('config: isRTL and direction configuration', () => {
  assert.equal(isRTL('ar'), true, 'Arabic must be RTL');
  assert.equal(isRTL('en'), false, 'English must be LTR');
  assert.equal(isRTL('bn'), false, 'Bengali must be LTR');
  assert.equal(isRTL('unknown'), false, 'Unknown code must default to false');

  const arConfig = getLanguageConfig('ar');
  assert.equal(arConfig.dir, 'rtl');
  assert.equal(arConfig.locale, 'ar-SA');
  assert.equal(arConfig.nativeName, 'العربية');

  const bnConfig = getLanguageConfig('bn');
  assert.equal(bnConfig.dir, 'ltr');
  assert.equal(bnConfig.locale, 'bn-BD');
  assert.equal(bnConfig.nativeName, 'বাংলা');

  const enConfig = getLanguageConfig('en');
  assert.equal(enConfig.dir, 'ltr');
  assert.equal(enConfig.locale, 'en-US');
  assert.equal(enConfig.nativeName, 'English');
});

// -------------------------------------------------------------
// 6. Theme & Language Independence
// -------------------------------------------------------------
test('theme & language: keys and storage remain completely decoupled', () => {
  const THEME_STORAGE_KEY = 'portfolio-theme';
  assert.notEqual(
    STORAGE_KEY,
    THEME_STORAGE_KEY,
    'Language storage key and theme storage key must be different'
  );

  // Ensure language config does not mutate or prescribe theme state
  for (const config of Object.values(SUPPORTED_LANGUAGES)) {
    assert.equal(config.theme, undefined, 'Language config must not define theme');
  }
});

// -------------------------------------------------------------
// 7. Multilingual AI Assistant Response Support
// -------------------------------------------------------------
const knowledge = createKnowledgeEngine(assistantPortfolioData);

test('multilingual AI: welcome message localized across all languages', () => {
  assert.ok(en.ai.welcomeMessage.includes('Assalamu Alaikum'));
  assert.ok(ar.ai.welcomeMessage.includes('السلام عليكم'));
  assert.ok(bn.ai.welcomeMessage.includes('আসসালামু আলাইকুম'));
});

test('multilingual AI: intent responses generated in active language', () => {
  const context = {
    knowledge,
    portfolio: assistantPortfolioData,
    memory: {},
    conversation: [],
  };

  // Why Hire intent across EN, AR, BN
  const resEn = generateLocalResponse({
    ...context,
    message: 'Why should we hire Sabbir?',
    language: 'en',
  });
  const resAr = generateLocalResponse({
    ...context,
    message: 'Why should we hire Sabbir?',
    language: 'ar',
  });
  const resBn = generateLocalResponse({
    ...context,
    message: 'Why should we hire Sabbir?',
    language: 'bn',
  });

  assert.equal(resEn.intent, 'why_hire');
  assert.ok(resEn.text.includes('Why consider Md. Sabbir Hossen'));
  assert.ok(
    resEn.actions.some((a) => a.label === 'View Report BD' || a.label.includes('Report BD'))
  );

  assert.equal(resAr.intent, 'why_hire');
  assert.ok(resAr.text.includes('لماذا يجدر بك اختيار محمد صابر حسين'));
  assert.ok(resAr.actions.some((a) => a.label.includes('Report BD') || a.label.includes('عرض')));

  assert.equal(resBn.intent, 'why_hire');
  assert.ok(resBn.text.includes('কেন আপনার ইঞ্জিনিয়ারিং টিমে মোঃ সাব্বির হোসেনকে'));
  assert.ok(resBn.actions.some((a) => a.label.includes('Report BD') || a.label.includes('দেখুন')));
});

test('multilingual AI: preserves technical terminology in Arabic and Bengali', () => {
  const context = {
    knowledge,
    portfolio: assistantPortfolioData,
    memory: {},
    conversation: [],
  };

  const resAr = generateLocalResponse({
    ...context,
    message: 'Tell me about Report BD',
    language: 'ar',
  });
  const resBn = generateLocalResponse({
    ...context,
    message: 'Tell me about Report BD',
    language: 'bn',
  });

  const mandatoryTech = [
    'Report BD',
    'TypeScript',
    'React 19',
    'Express 4',
    'MongoDB Atlas',
    'HTTP 409 Conflict',
    '@reportbd/shared',
  ];

  for (const term of mandatoryTech) {
    assert.ok(
      resAr.text.includes(term),
      `Arabic response must preserve technical term "${term}" verbatim`
    );
    assert.ok(
      resBn.text.includes(term),
      `Bengali response must preserve technical term "${term}" verbatim`
    );
  }
});

test('multilingual AI: detects intents from queries written in Arabic and Bengali', () => {
  // Arabic queries
  assert.equal(detectIntent('مشاريع').intent, 'projects');
  assert.equal(detectIntent('من هو صابر؟').intent, 'about');
  assert.equal(detectIntent('تواصل معي').intent, 'contact');
  assert.equal(detectIntent('تقرير بي دي').intent, 'project_reportbd');
  assert.equal(detectIntent('لماذا نوظف صابر؟').intent, 'why_hire');

  // Bengali queries
  assert.equal(detectIntent('প্রজেক্টসমূহ দেখান').intent, 'projects');
  assert.equal(detectIntent('সাব্বির কে?').intent, 'about');
  assert.equal(detectIntent('যোগাযোগ করতে চাই').intent, 'contact');
  assert.equal(detectIntent('রেপোর্ট বিডি সম্পর্কে বলুন').intent, 'project_reportbd');
  assert.equal(detectIntent('কেন সাব্বিরকে নিয়োগ করবেন?').intent, 'why_hire');
});

test('multilingual AI: knowledge engine alias matching in Arabic and Bengali', () => {
  const matchAr = knowledge.findProjectByQuery('تقرير بي دي');
  const matchBn = knowledge.findProjectByQuery('রেপোর্ট বিডি');

  assert.ok(matchAr && matchAr.id === 'report-bd', 'Arabic alias must resolve to report-bd');
  assert.ok(matchBn && matchBn.id === 'report-bd', 'Bengali alias must resolve to report-bd');
});

test('multilingual AI: language switching preserves past history while answering in new language', () => {
  // User asked Turn 1 in English
  const turn1User = { role: 'user', content: 'Tell me about Report BD' };
  const turn1Assistant = {
    role: 'assistant',
    content: 'Report BD is Sabbir’s flagship MERN stack application...',
  };
  const history = [turn1User, turn1Assistant];

  // User now switches language to Arabic and asks Turn 2
  const turn2Response = generateLocalResponse({
    message: 'ما هي مهاراتك؟',
    knowledge,
    portfolio: assistantPortfolioData,
    memory: { lastProjectId: 'report-bd', lastTopic: 'projects' },
    conversation: history,
    language: 'ar',
  });

  // History remains strictly preserved
  assert.equal(history[0].content, 'Tell me about Report BD');
  assert.ok(history[1].content.includes('flagship MERN'));

  // New turn answered in Arabic
  assert.equal(turn2Response.intent, 'skills');
  assert.ok(turn2Response.text.includes('حزمة التقنيات والمهارات'));
  assert.ok(turn2Response.text.includes('React 19'));
  assert.ok(
    turn2Response.actions.some((a) => a.label.includes('مهارات') || a.label.includes('قسم'))
  );
});

test('multilingual AI: error fallback and unknown responses are localized', () => {
  const errEn = getErrorFallbackResponse('en');
  const errAr = getErrorFallbackResponse('ar');
  const errBn = getErrorFallbackResponse('bn');

  assert.ok(errEn.text.includes('issue preparing that response'));
  assert.ok(errAr.text.includes('واجهت مشكلة بسيطة'));
  assert.ok(errBn.text.includes('এই উত্তরটি প্রস্তুত করতে একটি সাময়িক ত্রুটি'));

  const unkEn = defaultUnknownResponse('en');
  const unkAr = defaultUnknownResponse('ar');
  const unkBn = defaultUnknownResponse('bn');

  assert.ok(unkEn.text.includes('What would you like to explore?'));
  assert.ok(unkAr.text.includes('ماذا تحب أن نستكشف الآن؟'));
  assert.ok(unkBn.text.includes('আপনি কী বিষয়ে জানতে চান?'));
});

test('multilingual AI: card badges and action labels support RTL and localized copy', () => {
  assert.equal(getCardBadge(true, true, 'Full-Stack', 'en'), '🌟 Flagship MERN');
  assert.equal(getCardBadge(true, true, 'Full-Stack', 'ar'), '🌟 تطبيق MERN الرئيسي');
  assert.equal(getCardBadge(true, true, 'Full-Stack', 'bn'), '🌟 ফ্ল্যাগশিপ MERN');

  const labelsAr = getActionLabels('ar');
  assert.equal(labelsAr.caseStudy, 'دراسة الحالة');
  assert.equal(labelsAr.liveDemo, 'معاينة حية');
  assert.equal(labelsAr.githubCode, 'كود GitHub');

  const labelsBn = getActionLabels('bn');
  assert.equal(labelsBn.caseStudy, 'কেস স্টাডি');
  assert.equal(labelsBn.liveDemo, 'লাইভ ডেমো');
  assert.equal(labelsBn.githubCode, 'গিটহাব কোড');
});

test('portfolio guide: getGuideSteps provides 8 structured onboarding steps', async () => {
  const { getGuideSteps } = await import('../src/data/guideData.js');
  const steps = getGuideSteps();
  assert.equal(steps.length, 8);
  for (let i = 0; i < steps.length; i++) {
    assert.ok(steps[i].id, `Step ${i} must have an ID`);
    assert.ok(steps[i].title, `Step ${i} must have a title`);
    assert.ok(steps[i].badge, `Step ${i} must have a badge`);
    assert.ok(steps[i].description, `Step ${i} must have a description`);
  }
});

test('portfolio guide: localization parity for guide keys across all languages', () => {
  for (const lang of ['en', 'ar', 'bn']) {
    const dict = lang === 'en' ? en : lang === 'ar' ? ar : bn;
    assert.ok(dict.guide, `Language ${lang} must have guide section`);
    assert.ok(dict.guide.startTour, `Language ${lang} must have guide.startTour`);
    assert.ok(dict.guide.nextStep, `Language ${lang} must have guide.nextStep`);
    assert.ok(dict.guide.back, `Language ${lang} must have guide.back`);
    assert.ok(dict.guide.finishTour, `Language ${lang} must have guide.finishTour`);
    assert.ok(dict.guide.restart, `Language ${lang} must have guide.restart`);
  }
});

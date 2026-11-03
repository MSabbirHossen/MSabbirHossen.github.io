import { en } from '../src/i18n/locales/en/index.js';
import { ar } from '../src/i18n/locales/ar/index.js';
import { bn } from '../src/i18n/locales/bn/index.js';

let issuesCount = 0;

function checkValues(obj, lang, path = '') {
  for (const [k, v] of Object.entries(obj)) {
    const full = path ? `${path}.${k}` : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      checkValues(v, lang, full);
    } else {
      if (typeof v !== 'string' || v.trim() === '') {
        console.error(`[EMPTY VALUE] ${lang}: ${full} = ${JSON.stringify(v)}`);
        issuesCount++;
      }
    }
  }
}

checkValues(en, 'en');
checkValues(ar, 'ar');
checkValues(bn, 'bn');

function getPlaceholders(str) {
  const matches = str.match(/\{([a-zA-Z0-9_]+)\}/g) || [];
  return matches.sort().join(',');
}

function comparePlaceholders(enObj, targetObj, lang, path = '') {
  for (const [k, v] of Object.entries(enObj)) {
    const full = path ? `${path}.${k}` : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      comparePlaceholders(v, targetObj[k] || {}, lang, full);
    } else {
      const enP = getPlaceholders(String(v));
      const targetP = getPlaceholders(String(targetObj[k] || ''));
      if (enP !== targetP) {
        console.warn(
          `[PLACEHOLDER MISMATCH] in ${lang} at ${full}: EN=[${enP}], ${lang}=[${targetP}]`
        );
        issuesCount++;
      }
    }
  }
}

comparePlaceholders(en, ar, 'ar');
comparePlaceholders(en, bn, 'bn');

console.log(`\nAudit completed. Total issues found: ${issuesCount}`);

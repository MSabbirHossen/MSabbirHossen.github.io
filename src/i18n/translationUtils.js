/**
 * Traverse an object hierarchy using dot notation path (e.g. 'common.loading')
 */
export const getNestedValue = (obj, path) => {
  if (!obj || typeof obj !== 'object' || !path) return undefined;

  const parts = path.split('.');
  let current = obj;

  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    current = current[part];
  }

  return current;
};

/**
 * Replace placeholders like {{count}} or {count} with params object values.
 */
export const interpolate = (template, params = {}) => {
  if (typeof template !== 'string') return template;
  if (!params || Object.keys(params).length === 0) return template;

  return template.replace(/\{\{\s*(\w+)\s*\}\}|\{\s*(\w+)\s*\}/g, (match, p1, p2) => {
    const key = p1 || p2;
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      return params[key] !== undefined && params[key] !== null ? String(params[key]) : '';
    }
    return match;
  });
};

/**
 * Perform translation with graceful fallback.
 * Checks:
 * 1. Current dictionary
 * 2. Fallback (English) dictionary
 * 3. Explicit fallback string provided in call
 * 4. Key itself
 */
export const translateKey = ({
  currentDict,
  fallbackDict,
  key,
  params = {},
  defaultText = null,
}) => {
  if (!key) return defaultText || '';

  // 1. Try active language
  let val = getNestedValue(currentDict, key);

  // 2. Fall back to English dictionary if not found in active language
  if (val === undefined && fallbackDict) {
    val = getNestedValue(fallbackDict, key);
  }

  // 3. Fall back to explicit defaultText or key
  if (val === undefined) {
    val = defaultText !== null && defaultText !== undefined ? defaultText : key;
  }

  if (typeof val === 'string') {
    return interpolate(val, params);
  }

  return val;
};

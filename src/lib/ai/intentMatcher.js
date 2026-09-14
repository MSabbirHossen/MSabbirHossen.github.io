const INTENT_RULES = [
  { key: 'greeting', terms: ['hi', 'hello', 'hey', 'assalam', 'salam', 'greetings'] },
  { key: 'thanks', terms: ['thanks', 'thank you', 'jazak', 'appreciate', 'grateful'] },
  {
    key: 'projects',
    terms: [
      'project',
      'projects',
      'best projects',
      'portfolio',
      'case study',
      'work',
      'build',
      'built',
      'shipped',
      'delivered',
      'made',
    ],
  },
  {
    key: 'skills',
    terms: ['skill', 'skills', 'show skills', 'stack', 'technology', 'tech stack', 'tools'],
  },
  {
    key: 'experience',
    terms: ['experience', 'work history', 'role', 'freelance', 'career', 'background'],
  },
  {
    key: 'current_focus',
    terms: ['focus', 'current focus', 'currently working on', 'learning', 'building now'],
  },
  { key: 'education', terms: ['education', 'study', 'degree', 'university', 'academic'] },
  {
    key: 'certifications',
    terms: ['certification', 'certifications', 'certificate', 'training', 'course'],
  },
  { key: 'resume', terms: ['resume', 'cv'] },
  { key: 'github', terms: ['github', 'repo', 'repository', 'commit', 'open source'] },
  { key: 'contact', terms: ['contact', 'email', 'reach', 'hire', 'interview'] },
  { key: 'availability', terms: ['availability', 'available', 'open to', 'opportunity'] },
  { key: 'social_links', terms: ['linkedin', 'social', 'profile link'] },
  { key: 'react', terms: ['react', 'reactjs', 'react.js'] },
  { key: 'mern', terms: ['mern', 'mongodb', 'express', 'node', 'full stack'] },
  { key: 'security', terms: ['security', 'secure', 'owasp', 'cybersecurity', 'osint'] },
  { key: 'ai', terms: ['ai', 'llm', 'prompt', 'assistant', 'machine learning'] },
  {
    key: 'about',
    terms: [
      'about',
      'who is',
      'who are you',
      'tell me about you',
      'tell me about yourself',
      'journey',
    ],
  },
];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildTermPattern(term) {
  const escaped = escapeRegex(term.trim()).replace(/\s+/g, '\\s+');
  const isSingleWord = !escaped.includes('\\s+');
  const allowPlural = isSingleWord && !escaped.endsWith('s') && /^[a-z0-9]+$/i.test(escaped);
  const pattern = allowPlural ? `${escaped}s?` : escaped;

  return new RegExp(`\\b${pattern}\\b`, 'i');
}

function includesTerm(normalizedText, term) {
  return buildTermPattern(term).test(normalizedText);
}

function scoreIntent(normalizedText, rule) {
  const directScore = rule.terms.reduce((score, term) => {
    if (includesTerm(normalizedText, term)) {
      return score + Math.max(1, term.length / 8);
    }

    return score;
  }, 0);

  const words = normalizedText.match(/[a-z0-9]+/g) ?? [];
  const fuzzyScore = rule.terms.reduce((score, term) => {
    if (term.includes(' ') || term.length < 4 || includesTerm(normalizedText, term)) {
      return score;
    }

    return words.some((word) => levenshteinDistance(word, term) <= 2) ? score + 0.75 : score;
  }, 0);

  return directScore + fuzzyScore;
}

function levenshteinDistance(left, right) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let row = 1; row <= left.length; row += 1) {
    const current = [row];

    for (let column = 1; column <= right.length; column += 1) {
      current[column] = Math.min(
        current[column - 1] + 1,
        previous[column] + 1,
        previous[column - 1] + (left[row - 1] === right[column - 1] ? 0 : 1)
      );
    }

    previous.splice(0, previous.length, ...current);
  }

  return previous[right.length];
}

export function detectIntent(message) {
  const normalizedText = message.toLowerCase().trim();

  if (!normalizedText) {
    return { intent: 'unknown', confidence: 0 };
  }

  let bestMatch = { intent: 'unknown', confidence: 0 };

  INTENT_RULES.forEach((rule) => {
    const score = scoreIntent(normalizedText, rule);

    if (score > bestMatch.confidence) {
      bestMatch = { intent: rule.key, confidence: score };
    }
  });

  if (bestMatch.confidence < 1) {
    return { intent: 'unknown', confidence: 0 };
  }

  return bestMatch;
}

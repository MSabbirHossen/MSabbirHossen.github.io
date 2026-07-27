const INTENT_RULES = [
  { key: 'greeting', terms: ['hi', 'hello', 'hey', 'assalam', 'salam'] },
  { key: 'thanks', terms: ['thanks', 'thank you', 'jazak', 'appreciate'] },
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
    ],
  },
  {
    key: 'skills',
    terms: ['skill', 'skills', 'show skills', 'stack', 'technology', 'tech stack', 'tools'],
  },
  { key: 'experience', terms: ['experience', 'work history', 'role', 'freelance'] },
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
  { key: 'about', terms: ['about', 'background', 'who is', 'tell me about you'] },
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
  return rule.terms.reduce((score, term) => {
    if (includesTerm(normalizedText, term)) {
      return score + Math.max(1, term.length / 8);
    }

    return score;
  }, 0);
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

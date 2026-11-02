const INTENT_RULES = [
  {
    key: 'greeting',
    terms: [
      'hi',
      'hello',
      'hey',
      'assalam',
      'salam',
      'greetings',
      'good morning',
      'good evening',
      'good afternoon',
      'whats up',
      'sup',
    ],
  },
  {
    key: 'thanks',
    terms: [
      'thanks',
      'thank you',
      'jazak',
      'appreciate',
      'grateful',
      'awesome',
      'great',
      'cool',
      'well done',
    ],
  },
  {
    key: 'project_reportbd',
    terms: [
      'report bd',
      'reportbd',
      'bps report',
      'bps',
      'incident reporting',
      'personal report',
      'personalreport',
      'latest project',
      'top project',
      'flagship project',
      'newest project',
    ],
  },
  {
    key: 'project_eta',
    terms: [
      'eta',
      'exploratory training academy',
      'training academy',
      'lms',
      'digital education platform',
      'course management',
    ],
  },
  {
    key: 'project_lifeos',
    terms: ['life os', 'lifeos', 'productivity app', 'habit tracker', 'daily routines'],
  },
  {
    key: 'projects',
    terms: [
      'project',
      'projects',
      'best projects',
      'featured projects',
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
    terms: [
      'skill',
      'skills',
      'show skills',
      'stack',
      'technology',
      'technologies',
      'tech stack',
      'tools',
      'languages',
    ],
  },
  {
    key: 'why_hire',
    terms: [
      'why hire',
      'why should we hire',
      'why choose',
      'strengths',
      'value proposition',
      'what makes you special',
      'what makes you unique',
      'fit for role',
      'hire you',
      'reason to hire',
    ],
  },
  {
    key: 'architecture',
    terms: [
      'architecture',
      'system design',
      'monorepo',
      'database schema',
      'api design',
      'restful api',
      'concurrency',
      'optimistic locking',
      'design pattern',
    ],
  },
  {
    key: 'typescript',
    terms: ['typescript', 'ts', 'zod', 'type safety', 'schema validation', 'validation'],
  },
  {
    key: 'experience',
    terms: [
      'experience',
      'work history',
      'role',
      'freelance',
      'career',
      'background',
      'milestones',
      'jobs',
    ],
  },
  {
    key: 'current_focus',
    terms: [
      'focus',
      'current focus',
      'currently working on',
      'learning',
      'building now',
      'ongoing',
    ],
  },
  {
    key: 'education',
    terms: [
      'education',
      'study',
      'degree',
      'university',
      'academic',
      'polytechnic',
      'bteb',
      'diploma',
      'student',
    ],
  },
  {
    key: 'certifications',
    terms: [
      'certification',
      'certifications',
      'certificate',
      'training',
      'course',
      'phitron',
      'credential',
      'certified',
    ],
  },
  {
    key: 'resume',
    terms: ['resume', 'cv', 'curriculum vitae', 'download resume', 'view resume', 'pdf'],
  },
  {
    key: 'github',
    terms: ['github', 'repo', 'repository', 'commit', 'open source', 'stats', 'contributions'],
  },
  {
    key: 'contact',
    terms: [
      'contact',
      'email',
      'reach',
      'hire',
      'interview',
      'talk',
      'message',
      'whatsapp',
      'phone',
      'call',
      'schedule',
    ],
  },
  {
    key: 'availability',
    terms: [
      'availability',
      'available',
      'open to',
      'opportunity',
      'start date',
      'remote',
      'relocate',
    ],
  },
  {
    key: 'social_links',
    terms: ['linkedin', 'social', 'profile link', 'facebook'],
  },
  {
    key: 'react',
    terms: ['react', 'reactjs', 'react.js', 'react 19', 'nextjs', 'next.js', 'frontend'],
  },
  {
    key: 'mern',
    terms: ['mern', 'mongodb', 'express', 'node', 'full stack', 'fullstack', 'backend'],
  },
  {
    key: 'security',
    terms: [
      'security',
      'secure',
      'owasp',
      'cybersecurity',
      'osint',
      'jwt',
      'auth',
      'authentication',
      'rbac',
      'sanitization',
      'audit log',
    ],
  },
  {
    key: 'llms_txt',
    terms: [
      'llms.txt',
      'llms',
      'ai profile',
      'machine readable',
      'raw text',
      'ai text',
      'context file',
      'system prompt',
      'llm context',
    ],
  },
  {
    key: 'ai',
    terms: ['ai', 'llm', 'prompt', 'assistant', 'machine learning', 'artificial intelligence'],
  },
  {
    key: 'guide',
    terms: [
      'guide',
      'portfolio guide',
      'how to navigate',
      'walkthrough',
      'user guide',
      'tour',
      'manual',
      'instructions',
    ],
  },
  {
    key: 'about',
    terms: [
      'about',
      'who is',
      'who are you',
      'tell me about you',
      'tell me about yourself',
      'journey',
      'bio',
      'introduction',
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
      return score + Math.max(1, term.length / 6);
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

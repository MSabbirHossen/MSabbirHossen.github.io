const INTENT_RULES = [
  {
    key: 'greeting',
    terms: [
      // English
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
      // Arabic
      'مرحبا',
      'أهلا',
      'اهلا',
      'السلام عليكم',
      'سلام',
      'صباح الخير',
      'مساء الخير',
      'أهلاً وسهلاً',
      'تحياتي',
      // Bengali
      'হ্যালো',
      'হাই',
      'আসসালামু আলাইকুম',
      'সালাম',
      'নমস্কার',
      'কেমন আছেন',
      'শুভ সকাল',
      'শুভ অপরাহ্ন',
      'শুভ সন্ধ্যা',
    ],
  },
  {
    key: 'thanks',
    terms: [
      // English
      'thanks',
      'thank you',
      'jazak',
      'appreciate',
      'grateful',
      'awesome',
      'great',
      'cool',
      'well done',
      // Arabic
      'شكرا',
      'شكراً',
      'جزاك الله خيرا',
      'تسلم',
      'مشكور',
      'يعطيك العافية',
      'ممتاز',
      'رائع',
      // Bengali
      'ধন্যবাদ',
      'থ্যাংকস',
      'জাজাকাল্লাহ',
      'অনেক ধন্যবাদ',
      'চমৎকার',
      'দারুণ',
      'অসাধারণ',
    ],
  },
  {
    key: 'project_reportbd',
    terms: [
      // English
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
      // Arabic
      'تقرير بي دي',
      'تقرير ب د',
      'مشروع ريبورت',
      'المشروع الرئيسي',
      'أحدث مشروع',
      'مشروع التقرير',
      // Bengali
      'রেপোর্ট বিডি',
      'রিপোর্ট বিডি',
      'সর্বশেষ প্রজেক্ট',
      'ফ্ল্যাগশিপ প্রজেক্ট',
      'নতুন প্রজেক্ট',
      'টপ প্রজেক্ট',
    ],
  },
  {
    key: 'project_eta',
    terms: [
      // English
      'eta',
      'exploratory training academy',
      'training academy',
      'lms',
      'digital education platform',
      'course management',
      // Arabic
      'اي تي ايه',
      'إي تي إيه',
      'أكاديمية التدريب',
      'منصة التعليم',
      'إدارة الدورات',
      // Bengali
      'ইটিএ',
      'ট্রেনিং একাডেমি',
      'এডুকেশন প্ল্যাটফর্ম',
      'এলএমএস',
      'কোর্স ম্যানেজমেন্ট',
    ],
  },
  {
    key: 'project_lifeos',
    terms: [
      'life os',
      'lifeos',
      'productivity app',
      'habit tracker',
      'daily routines',
      'لايف او اس',
      'لايف أوس',
      'লাইফ ওএস',
      'লাইফ-ওএস',
    ],
  },
  {
    key: 'projects',
    terms: [
      // English
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
      // Arabic
      'مشاريع',
      'مشروع',
      'أفضل المشاريع',
      'أعمال',
      'أعمال سابقة',
      'بورتفوليو',
      'نماذج أعمال',
      'ماذا بنيت',
      'أبرز المشاريع',
      // Bengali
      'প্রজেক্ট',
      'প্রজেক্টসমূহ',
      'কাজ',
      'সেরা প্রজেক্ট',
      'পোর্টফোলিও',
      'প্রজেক্টগুলো',
      'কেস স্টাডি',
      'কাজের নমুনা',
    ],
  },
  {
    key: 'skills',
    terms: [
      // English
      'skill',
      'skills',
      'show skills',
      'stack',
      'technology',
      'technologies',
      'tech stack',
      'tools',
      'languages',
      // Arabic
      'مهار',
      'مهارات',
      'مهارة',
      'تقني',
      'تقنيات',
      'حزمة التقنيات',
      'أدوات',
      'لغات البرمجة',
      'خبرات تقنية',
      'تك ستك',
      // Bengali
      'দক্ষতা',
      'স্কিল',
      'টেকনোলজি',
      'প্রযুক্তি',
      'টেক স্ট্যাক',
      'টুলস',
      'দক্ষতাসমূহ',
      'ল্যাঙ্গুয়েজ',
    ],
  },
  {
    key: 'why_hire',
    terms: [
      // English
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
      // Arabic
      'لماذا نوظف',
      'نوظف',
      'توظيف',
      'لماذا أختارك',
      'نقاط القوة',
      'سبب التوظيف',
      'لماذا صابر',
      'ميزاتك',
      // Bengali
      'নিয়োগ',
      'কেন নিয়োগ করবেন',
      'কেন সাব্বির',
      'কেন হায়ার করবেন',
      'হায়ার',
      'শক্তি',
      'যোগ্যতা',
      'কেন আপনাকে নেব',
      'কেন সাব্বিরকে নেব',
    ],
  },
  {
    key: 'architecture',
    terms: [
      // English
      'architecture',
      'system design',
      'monorepo',
      'database schema',
      'api design',
      'restful api',
      'concurrency',
      'optimistic locking',
      'design pattern',
      // Arabic
      'بنية النظام',
      'معمارية البرمجيات',
      'تصميم النظام',
      'مونوريبو',
      'هندسة النظام',
      'التزامن',
      // Bengali
      'আর্কিটেকচার',
      'সিস্টেম ডিজাইন',
      'মনোরিপো',
      'সিস্টেম আর্কিটেকচার',
      'কনকারেন্সি',
    ],
  },
  {
    key: 'typescript',
    terms: [
      'typescript',
      'ts',
      'zod',
      'type safety',
      'schema validation',
      'validation',
      'تايب سكريبت',
      'تايبسكريبت',
      'زد',
      'টাইপস্ক্রিপ্ট',
      'টাইপ সেফটি',
      'স্কিমা ভ্যালিডেশন',
      'জোড',
    ],
  },
  {
    key: 'experience',
    terms: [
      // English
      'experience',
      'work history',
      'role',
      'freelance',
      'career',
      'background',
      'milestones',
      'jobs',
      // Arabic
      'خبرة',
      'خبرات',
      'تاريخ العمل',
      'مسيرة مهنية',
      'سجل العمل',
      'وظائف',
      // Bengali
      'অভিজ্ঞতা',
      'কাজের অভিজ্ঞতা',
      'ক্যারিয়ার',
      'কাজের ইতিহাস',
      'চাকরি',
    ],
  },
  {
    key: 'current_focus',
    terms: [
      // English
      'focus',
      'current focus',
      'currently working on',
      'learning',
      'building now',
      'ongoing',
      // Arabic
      'التركيز الحالي',
      'ماذا يتعلم',
      'يعمل حاليا',
      'المشاريع الحالية',
      // Bengali
      'বর্তমান ফোকাস',
      'বর্তমানে কি কাজ করছেন',
      'বর্তমান কাজ',
      'নতুন কি শিখছেন',
    ],
  },
  {
    key: 'education',
    terms: [
      // English
      'education',
      'study',
      'degree',
      'university',
      'academic',
      'polytechnic',
      'bteb',
      'diploma',
      'student',
      // Arabic
      'تعليم',
      'دراسة',
      'جامعة',
      'شهادة جامعية',
      'المؤهل العلمي',
      'الجامعة الإسلامية',
      // Bengali
      'শিক্ষা',
      'শিক্ষাগত যোগ্যতা',
      'ডিগ্রি',
      'বিশ্ববিদ্যালয়',
      'পড়াশোনা',
      'একাডেমিক',
    ],
  },
  {
    key: 'certifications',
    terms: [
      // English
      'certification',
      'certifications',
      'certificate',
      'training',
      'course',
      'phitron',
      'credential',
      'certified',
      // Arabic
      'شهادات',
      'شهادة',
      'دورات معتمدة',
      'مؤهلات موثقة',
      'دورات',
      // Bengali
      'সার্টিফিকেশন',
      'সার্টিফিকেট',
      'সনদপত্র',
      'কোর্স',
      'যাচাইকৃত সনদ',
    ],
  },
  {
    key: 'resume',
    terms: [
      // English
      'resume',
      'cv',
      'curriculum vitae',
      'download resume',
      'view resume',
      'pdf',
      // Arabic
      'سيرة ذاتية',
      'سي في',
      'تحميل السيرة الذاتية',
      'ملف السيرة',
      // Bengali
      'রেজিউমে',
      'সিভি',
      'কারিকুলাম ভিটা',
      'সিভি ডাউনলোড',
    ],
  },
  {
    key: 'github',
    terms: [
      // English
      'github',
      'repo',
      'repository',
      'commit',
      'open source',
      'stats',
      'contributions',
      // Arabic
      'جيت هاب',
      'مستودعات',
      'مستودع',
      'كود مفتوح المصدر',
      'إحصائيات جيت هاب',
      // Bengali
      'গিটহাব',
      'রেপো',
      'রেপোজিটরি',
      'ওপেন সোর্স',
      'কমিট',
    ],
  },
  {
    key: 'contact',
    terms: [
      // English
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
      // Arabic
      'تواصل',
      'اتصال',
      'رسالة',
      'واتساب',
      'بريد إلكتروني',
      'إيميل',
      'توظيف',
      'مقابلة',
      // Bengali
      'যোগাযোগ',
      'ইমেইল',
      'মেসেজ',
      'হোয়াটসঅ্যাপ',
      'বার্তা',
      'যোগাযোগের উপায়',
      'ইন্টারভিউ',
    ],
  },
  {
    key: 'availability',
    terms: [
      // English
      'availability',
      'available',
      'open to',
      'opportunity',
      'start date',
      'remote',
      'relocate',
      // Arabic
      'التفرغ',
      'متاح للعمل',
      'جاهز للعمل',
      'عمل عن بعد',
      'فرص عمل',
      // Bengali
      'কাজের জন্য প্রস্তুত',
      'কবে শুরু করতে পারবেন',
      'উপলব্ধতা',
      'রিমোট জব',
    ],
  },
  {
    key: 'social_links',
    terms: ['linkedin', 'social', 'profile link', 'facebook', 'لينكد إن', 'সোশ্যাল লিংক'],
  },
  {
    key: 'react',
    terms: [
      'react',
      'reactjs',
      'react.js',
      'react 19',
      'nextjs',
      'next.js',
      'frontend',
      'رياكت',
      'রিঅ্যাক্ট',
    ],
  },
  {
    key: 'mern',
    terms: [
      'mern',
      'mongodb',
      'express',
      'node',
      'full stack',
      'fullstack',
      'backend',
      'ميرن',
      'মার্ন',
    ],
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
      'حماية',
      'أمان',
      'নিরাপত্তা',
      'অথেনটিকেশন',
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
      'ملف الذكاء الاصطناعي',
      'এআই প্রোফাইল',
    ],
  },
  {
    key: 'ai',
    terms: [
      'ai',
      'llm',
      'prompt',
      'assistant',
      'machine learning',
      'artificial intelligence',
      'ذكاء اصطناعي',
      'কৃত্রিম বুদ্ধিমত্তা',
    ],
  },
  {
    key: 'guide',
    terms: [
      // English
      'guide',
      'portfolio guide',
      'how to navigate',
      'walkthrough',
      'user guide',
      'tour',
      'manual',
      'instructions',
      // Arabic
      'دليل',
      'دليل البورتفوليو',
      'جولة تفاعلية',
      'كيفية التصفح',
      'مرشد',
      // Bengali
      'গাইড',
      'পোর্টফোলিও গাইড',
      'ট্যুর',
      'ব্যবহারবিধি',
    ],
  },
  {
    key: 'about',
    terms: [
      // English
      'about',
      'who is',
      'who are you',
      'tell me about you',
      'tell me about yourself',
      'journey',
      'bio',
      'introduction',
      // Arabic
      'من هو',
      'من أنت',
      'نبذة',
      'عن صابر',
      'من هو صابر',
      'معلومات عنك',
      // Bengali
      'কে আপনি',
      'সাব্বির কে',
      'সম্পর্কে',
      'পরিচিতি',
      'জীবনবৃত্তান্ত',
      'নিজের সম্পর্কে বলুন',
    ],
  },
];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Builds a regex pattern using Unicode word boundaries (?<![\p{L}\p{N}]) and (?![\p{L}\p{N}])
 * so that English, Arabic, Bengali, and other Unicode scripts match correctly.
 */
function buildTermPattern(term) {
  const escaped = escapeRegex(term.trim()).replace(/\s+/g, '\\s+');
  const isSingleWord = !escaped.includes('\\s+');
  const allowPlural = isSingleWord && !escaped.endsWith('s') && /^[a-z0-9]+$/i.test(escaped);
  const pattern = allowPlural ? `${escaped}s?` : escaped;

  return new RegExp(`(?<![\\p{L}\\p{N}])${pattern}(?![\\p{L}\\p{N}])`, 'ui');
}

function includesTerm(normalizedText, term) {
  const trimmed = term.trim();
  if (/[^\p{ASCII}]/u.test(trimmed)) {
    return normalizedText.includes(trimmed);
  }
  return buildTermPattern(trimmed).test(normalizedText);
}

function scoreIntent(normalizedText, rule) {
  const directScore = rule.terms.reduce((score, term) => {
    if (includesTerm(normalizedText, term)) {
      return score + Math.max(1, term.length / 6);
    }

    return score;
  }, 0);

  // Unicode word extraction supporting Latin, Arabic, Bengali, and numbers
  const words = normalizedText.match(/[\p{L}\p{N}]+/gu) ?? [];
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

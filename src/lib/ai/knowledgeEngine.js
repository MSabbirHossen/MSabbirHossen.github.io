function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalize(value) {
  return String(value ?? '').toLowerCase();
}

function includesQuery(text, query) {
  return normalize(text).includes(normalize(query));
}

const BACKEND_TERMS = [
  'node',
  'express',
  'mongo',
  'firebase',
  'jwt',
  'rest',
  'zod',
  'mongoose',
  'api',
  'docker',
  'typescript',
];

function pickBackendTechnologies(project) {
  return (project.technologies ?? [])
    .map((tech) => tech.name)
    .filter((name) => BACKEND_TERMS.some((term) => includesQuery(name, term)));
}

const PROJECT_ALIASES = {
  'report-bd': [
    'report bd',
    'reportbd',
    'bps report',
    'bps',
    'report-bd',
    'personal report',
    'personalreport',
    'incident reporting',
    'mentorship platform',
    'whistleblower',
    'রেপোর্ট বিডি',
    'রিপোর্ট বিডি',
    'রিপোর্টবিডি',
    'تقرير بي دي',
    'تقرير ب د',
  ],
  'eta-digital-education-platform': [
    'eta',
    'eta-project',
    'exploratory training academy',
    'training academy',
    'lms',
    'digital education platform',
    'education platform',
    'course management',
    'ইটিএ',
    'ট্রেনিং একাডেমি',
    'এক্সপ্লোরেটরি ট্রেনিং একাডেমি',
    'আইটিএ',
    'اي تي ايه',
    'إي تي إيه',
    'أكاديمية التدريب',
  ],
  'life-os': [
    'life os',
    'life-os',
    'lifeos',
    'productivity app',
    'habit tracker',
    'daily routines',
    'journaling',
    'লাইফ ওএস',
    'লাইফ-ওএস',
    'لايف او اس',
    'لايف أوس',
  ],
  'digital-life-lessons': [
    'digital life lessons',
    'life lessons',
    'ডিজিটাল লাইফ লেসনস',
    'دروس الحياة الرقمية',
  ],
  'export-import-project': [
    'import export',
    'export import',
    'import export hub',
    'ইমপোর্ট এক্সপোর্ট',
    'استيراد وتصدير',
  ],
  'movie-explorer': ['movie explorer', 'movieexplorer', 'movies', 'tmdb', 'মুভি এক্সপ্লোরার'],
  'online-game-library': [
    'gamehub',
    'game hub',
    'online game library',
    'games',
    'গেম হাব',
    'مكتبة الألعاب',
  ],
  'personal-app-store': ['personal app store', 'app store', 'অ্যাপ স্টোর', 'متجر التطبيقات'],
};

export function createKnowledgeEngine(portfolio) {
  const projectsById = new Map(portfolio.projects.map((project) => [project.id, project]));

  function findProjectByQuery(query) {
    if (!query) return null;
    const raw = normalize(query);

    // Check for "latest", "top", "flagship", "newest" in English, Arabic, and Bengali
    if (
      /(?<![\p{L}\p{N}])(latest|top|newest|flagship|most recent|الأحدث|أحدث|الرئيسي|أفضل|সর্বশেষ|টপ|সেরা|ফ্ল্যাগশিপ)(?![\p{L}\p{N}])/iu.test(
        raw
      ) &&
      /(?<![\p{L}\p{N}])(project|build|work|app|مشروع|مشاريع|প্রজেক্ট|কাজ|অ্যাপ)(?![\p{L}\p{N}])/iu.test(
        raw
      )
    ) {
      return portfolio.featuredProjects[0] ?? portfolio.projects[0] ?? null;
    }

    // Clean query of common conversational wrappers in English, Arabic, and Bengali
    const cleaned = raw
      .replace(
        /(?<![\p{L}\p{N}])(tell me about|what is|whats|show me|details on|overview of|can you describe|explain|info on|deep dive into|how does|learn about|about the|the|أخبرني عن|ما هو|ما هي|حدثني عن|اشرح لي|اعرض لي|عن|সম্পর্কে বলুন|বলুন|সম্পর্কে জানাও|দেখাও)(?![\p{L}\p{N}])/giu,
        ' '
      )
      .replace(/\s+/g, ' ')
      .trim();

    // 1. Direct alias match using Unicode word boundaries
    for (const [projectId, aliases] of Object.entries(PROJECT_ALIASES)) {
      if (
        aliases.some((alias) => {
          const pattern = new RegExp(
            `(?<![\\p{L}\\p{N}])${escapeRegex(alias)}(?![\\p{L}\\p{N}])`,
            'ui'
          );
          return pattern.test(raw) || (cleaned && pattern.test(cleaned));
        })
      ) {
        const found = projectsById.get(projectId);
        if (found) return found;
      }
    }

    // 2. Title, ID, or Category match with cleaned or raw query
    return (
      portfolio.projects.find((project) => {
        const titleLower = normalize(project.title);
        const idLower = normalize(project.id);
        const categoryLower = normalize(project.category);

        if (cleaned && cleaned.length >= 3) {
          const cleanPattern = new RegExp(
            `(?<![\\p{L}\\p{N}])${escapeRegex(cleaned)}(?![\\p{L}\\p{N}])`,
            'ui'
          );
          if (
            cleanPattern.test(titleLower) ||
            cleanPattern.test(idLower) ||
            cleanPattern.test(categoryLower)
          ) {
            return true;
          }
        }

        const searchable = [project.title, project.id, project.category, project.overview]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return raw.length >= 4 && searchable.includes(raw);
      }) ?? null
    );
  }

  function getProjectsByTopic(topic) {
    const normalizedTopic = normalize(topic);

    if (
      normalizedTopic === 'mern' ||
      normalizedTopic === 'full stack' ||
      normalizedTopic === 'fullstack'
    ) {
      return portfolio.projects.filter((project) => {
        const techNames = (project.technologies ?? []).map((t) => normalize(t.name));
        const hasMongo = techNames.some((n) => n.includes('mongo'));
        const hasExpress = techNames.some((n) => n.includes('express'));
        const hasReact = techNames.some((n) => n.includes('react'));
        const hasNode = techNames.some((n) => n.includes('node'));
        const isFullStackCategory = normalize(project.category).includes('full-stack');

        return (hasReact && (hasNode || hasExpress || hasMongo)) || isFullStackCategory;
      });
    }

    if (normalizedTopic === 'react') {
      return portfolio.projects.filter((project) =>
        (project.technologies ?? []).some((t) => normalize(t.name).includes('react'))
      );
    }

    if (normalizedTopic === 'backend' || normalizedTopic === 'api') {
      return portfolio.projects.filter((project) =>
        (project.technologies ?? []).some((t) =>
          ['node', 'express', 'mongo', 'firebase', 'rest'].some((k) =>
            normalize(t.name).includes(k)
          )
        )
      );
    }

    if (normalizedTopic === 'typescript' || normalizedTopic === 'zod') {
      return portfolio.projects.filter((project) =>
        (project.technologies ?? []).some((t) =>
          ['typescript', 'zod'].some((k) => normalize(t.name).includes(k))
        )
      );
    }

    if (normalizedTopic === 'redux') {
      return portfolio.projects.filter((project) =>
        (project.technologies ?? []).some((t) => normalize(t.name).includes('redux'))
      );
    }

    if (normalizedTopic === 'security' || normalizedTopic === 'auth') {
      return portfolio.projects.filter((project) => {
        const text = [
          project.title,
          project.overview,
          ...(project.architecture ?? []),
          ...(project.technologies ?? []).map((t) => t.name),
        ]
          .join(' ')
          .toLowerCase();

        return (
          text.includes('auth') ||
          text.includes('security') ||
          text.includes('jwt') ||
          text.includes('rbac') ||
          text.includes('audit')
        );
      });
    }

    return portfolio.projects.filter((project) => {
      const searchable = [
        project.title,
        project.category,
        project.overview,
        ...(project.technologies ?? []).map((tech) => tech.name),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchable.includes(normalizedTopic);
    });
  }

  function getFeaturedProjects(limit = 3) {
    return portfolio.featuredProjects.slice(0, limit);
  }

  function getSkillSummary() {
    return portfolio.skills.map((category) => ({
      category: category.category,
      tools: category.items.slice(0, 6).map((item) => item.name),
      proficiency:
        category.category === 'Learning / Exploring' ? 'Actively improving' : 'Production-ready',
      years: 'Demonstrated in active projects & production builds',
    }));
  }

  function getCertifications(limit = 4) {
    return portfolio.certifications.slice(0, limit);
  }

  function getProjectById(projectId) {
    return projectsById.get(projectId) ?? null;
  }

  function getBackendDetails(projectId) {
    const project = getProjectById(projectId);

    if (!project) {
      return null;
    }

    return {
      title: project.title,
      backendTech: pickBackendTechnologies(project),
      apiPreview: (project.apiEndpoints ?? []).slice(0, 4),
      architecture: (project.architecture ?? []).slice(0, 3),
    };
  }

  return {
    findProjectByQuery,
    getProjectsByTopic,
    getFeaturedProjects,
    getSkillSummary,
    getCertifications,
    getProjectById,
    getBackendDetails,
  };
}

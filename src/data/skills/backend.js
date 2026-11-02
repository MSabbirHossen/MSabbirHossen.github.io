import {
  FaServer,
  FaTachometerAlt,
  SiExpress,
  SiJsonwebtokens,
  SiNodedotjs,
  SiZod,
} from '../icons';

export const backendSkillCategory = {
  category: 'Backend Development',
  shortCategory: 'Backend',
  description: 'REST API design, authentication pipelines, request validation, and server logic.',
  items: [
    {
      name: 'Node.js',
      icon: SiNodedotjs,
      color: '#5FA04E',
      type: 'demonstrated',
      projectSlugs: [
        'report-bd',
        'eta-digital-education-platform',
        'life-os',
        'digital-life-lessons',
        'export-import-project',
      ],
      description:
        'Event-driven server runtime, stream processing, filesystem utilities, and process lifecycle.',
    },
    {
      name: 'Express.js',
      icon: SiExpress,
      color: '#68A063',
      type: 'demonstrated',
      projectSlugs: [
        'report-bd',
        'eta-digital-education-platform',
        'life-os',
        'digital-life-lessons',
        'export-import-project',
      ],
      description:
        'Modular routing, centralized error handlers, security middleware, and rate limiting.',
    },
    {
      name: 'REST APIs',
      icon: FaServer,
      color: '#009688',
      type: 'demonstrated',
      projectSlugs: [
        'report-bd',
        'eta-digital-education-platform',
        'life-os',
        'digital-life-lessons',
        'export-import-project',
        'movie-explorer',
      ],
      description:
        'Stateless endpoints, standard HTTP status codes, query filtering, and consistent payload envelopes.',
    },
    {
      name: 'JWT Authentication',
      icon: SiJsonwebtokens,
      color: '#D63AFF',
      type: 'demonstrated',
      projectSlugs: ['life-os', 'report-bd', 'export-import-project'],
      description:
        'Cryptographic token issuance, claims verification, bearer middleware, and refresh workflows.',
    },
    {
      name: 'Zod Validation',
      icon: SiZod,
      color: '#3E67B1',
      type: 'demonstrated',
      projectSlugs: ['report-bd', 'eta-digital-education-platform'],
      description:
        'Type-safe request schema validation, input sanitization, and automatic TypeScript inference.',
    },
    {
      name: 'Node Test Runner',
      icon: FaTachometerAlt,
      color: '#5FA04E',
      type: 'demonstrated',
      projectSlugs: ['report-bd'],
      description:
        'Zero-dependency native test harness powering 148 automated unit and integration tests.',
    },
  ],
};

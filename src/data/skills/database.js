import { FaDatabase, SiFirebase, SiMongodb, SiPostgresql, SiStripe, SiVercel } from '../icons';

export const databaseSkillCategory = {
  category: 'Database & Services',
  shortCategory: 'Database',
  description: 'Document databases, cloud auth providers, payment APIs, and edge deployment.',
  items: [
    {
      name: 'MongoDB Atlas',
      icon: SiMongodb,
      color: '#47A248',
      type: 'demonstrated',
      projectSlugs: [
        'report-bd',
        'eta-digital-education-platform',
        'life-os',
        'digital-life-lessons',
        'export-import-project',
      ],
      description:
        'Document modeling, compound indexing, aggregation pipelines, and revision tracking.',
    },
    {
      name: 'Firebase Auth',
      icon: SiFirebase,
      color: '#FFCA28',
      type: 'demonstrated',
      projectSlugs: [
        'report-bd',
        'eta-digital-education-platform',
        'life-os',
        'digital-life-lessons',
        'export-import-project',
        'online-game-library',
        'personal-app-store',
      ],
      description:
        'Zero-trust token verification via Admin SDK, multi-provider OAuth, and session gating.',
    },
    {
      name: 'Mongoose ODM',
      icon: FaDatabase,
      color: '#880000',
      type: 'demonstrated',
      projectSlugs: [
        'life-os',
        'digital-life-lessons',
        'export-import-project',
        'eta-digital-education-platform',
      ],
      description: 'Schema definition, validation middleware, compound indexing, and population.',
    },
    {
      name: 'Stripe API',
      icon: SiStripe,
      color: '#635BFF',
      type: 'demonstrated',
      projectSlugs: ['digital-life-lessons'],
      description:
        'Payment intent creation, checkout sessions, and webhook signature verification.',
    },
    {
      name: 'Vercel Platform',
      icon: SiVercel,
      color: '#00DF8F',
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
        'Continuous deployment, preview deployments, environment isolation, and edge routing.',
    },
    {
      name: 'PostgreSQL',
      icon: SiPostgresql,
      color: '#4169E1',
      type: 'learning',
      projectSlugs: [],
      description: 'Relational data modeling, foreign keys, SQL joins, and transaction boundaries.',
    },
  ],
};

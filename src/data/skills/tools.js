import {
  FaSearch,
  SiDocker,
  SiEslint,
  SiGit,
  SiGithub,
  SiNpm,
  SiPostman,
  SiTurborepo,
  VscVscodeInsiders,
} from '../icons';

export const toolsSkillCategory = {
  category: 'Tools & Platforms',
  shortCategory: 'Tools',
  description: 'Version control, monorepo tooling, containerization, and automated code quality.',
  items: [
    {
      name: 'Git',
      icon: SiGit,
      color: '#F05032',
      type: 'demonstrated',
      projectSlugs: [
        'report-bd',
        'eta-digital-education-platform',
        'life-os',
        'digital-life-lessons',
        'export-import-project',
        'movie-explorer',
        'online-game-library',
        'personal-app-store',
      ],
      description:
        'Feature branching, atomic conventional commits, merge conflict resolution, and history hygiene.',
    },
    {
      name: 'GitHub',
      icon: SiGithub,
      color: '#8957E5',
      type: 'demonstrated',
      projectSlugs: [
        'report-bd',
        'eta-digital-education-platform',
        'life-os',
        'digital-life-lessons',
        'export-import-project',
        'movie-explorer',
        'online-game-library',
        'personal-app-store',
      ],
      description:
        'Repository management, automated CI/CD workflows, issue tracking, and code reviews.',
    },
    {
      name: 'Turborepo',
      icon: SiTurborepo,
      color: '#EF4444',
      type: 'demonstrated',
      projectSlugs: ['eta-digital-education-platform'],
      description:
        'High-performance monorepo build pipelines, package dependency graphs, and workspace caching.',
    },
    {
      name: 'Docker',
      icon: SiDocker,
      color: '#2496ED',
      type: 'demonstrated',
      projectSlugs: ['report-bd'],
      description: 'Multi-stage container builds, environment parity, and Dockerfile composition.',
    },
    {
      name: 'VS Code',
      icon: VscVscodeInsiders,
      color: '#007ACC',
      type: 'demonstrated',
      projectSlugs: ['report-bd', 'eta-digital-education-platform', 'life-os'],
      description:
        'Debugging configurations, workspace settings, extension tooling, and terminal workflows.',
    },
    {
      name: 'npm & pnpm',
      icon: SiNpm,
      color: '#CB3837',
      type: 'demonstrated',
      projectSlugs: ['report-bd', 'eta-digital-education-platform', 'life-os'],
      description:
        'Multi-package workspaces, dependency resolution, lockfile synchronization, and scripts.',
    },
    {
      name: 'Postman',
      icon: SiPostman,
      color: '#FF6C37',
      type: 'demonstrated',
      projectSlugs: ['report-bd', 'eta-digital-education-platform', 'life-os'],
      description:
        'API endpoint testing, authorization header automation, payload assertions, and documentation.',
    },
    {
      name: 'ESLint & Prettier',
      icon: SiEslint,
      color: '#4B32C3',
      type: 'demonstrated',
      projectSlugs: ['report-bd', 'eta-digital-education-platform', 'life-os'],
      description:
        'Automated static analysis, code style enforcement, and syntax error prevention.',
    },
    {
      name: 'Chrome DevTools',
      icon: FaSearch,
      color: '#4285F4',
      type: 'demonstrated',
      projectSlugs: ['report-bd', 'eta-digital-education-platform', 'life-os', 'movie-explorer'],
      description:
        'Network throttling, accessibility tree inspection, DOM profiling, and console debugging.',
    },
  ],
};

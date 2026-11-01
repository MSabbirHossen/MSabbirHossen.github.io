import { portfolioData } from './index';

const { personalInfo, skills, projects, education, experience, certifications, currentFocus } =
  portfolioData;

const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999));

const topSkillNames = skills
  .flatMap((category) => category.items.map((item) => item.name))
  .slice(0, 12);

export const assistantPortfolioData = {
  name: personalInfo.name,
  headline: `${personalInfo.title} | ${personalInfo.secondaryTitle}`,
  summary: personalInfo.mission,
  about: personalInfo.journey,
  skills,
  topSkillNames,
  projects,
  featuredProjects,
  education,
  experience,
  certifications,
  currentFocus,
  contact: {
    email: personalInfo.email,
    github: personalInfo.github,
    linkedin: personalInfo.linkedin,
    location: personalInfo.location,
  },
  resume: {
    publicPath: '/resume/Md_Sabbir_Hossen_Resume.pdf',
    driveUrl: personalInfo.resumeUrl,
  },
  llmsTxt: {
    path: personalInfo.llmsTxtUrl || '/llms.txt',
    url: personalInfo.llmsTxtFullUrl || 'https://msabbirhossen.github.io/llms.txt',
    description:
      'Curated plaintext summary of projects, architecture, skills, and background formatted according to the llms.txt standard for AI tools and automated agents.',
  },
  github: {
    profileUrl: personalInfo.github,
    statsRoute: '/github-stats',
  },
  linkedin: personalInfo.linkedin,
  availability:
    'Open to full-time roles, freelance projects, and collaborations involving MERN, AI-assisted features, and security-minded development.',
  sections: {
    home: 'hero',
    about: 'about',
    projects: 'projects',
    skills: 'skills',
    education: 'education',
    certifications: 'certifications',
    githubStats: 'github-stats',
    contact: 'contact',
    currentFocus: 'current-focus',
  },
};

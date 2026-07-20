import { portfolioData } from './portfolioData';

const { personalInfo } = portfolioData;
const { github, linkedin, email, facebook } = personalInfo;

export const NAV_LINKS = [
  { name: 'Home', href: 'hero' },
  { name: 'About', href: 'about' },
  { name: 'GitHub', href: 'github-stats' },
  { name: 'Projects', href: 'projects' },
  { name: 'Skills', href: 'skills' },

  { name: 'Contact', href: 'contact' },
];

export const FOOTER_LINKS = [
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Certifications', href: 'certifications' },
  { name: 'Education', href: 'education' },
];

export const resources = [
  { label: 'Resume', href: '/resume/Md_Sabbir_Hossen_Resume.pdf', external: true },
  // { label: 'GitHub', href: github, external: true },
  // { label: 'LinkedIn', href: linkedin, external: true },
  { label: 'Facebook', href: facebook, external: true },
  { label: 'Email', href: `mailto:${email}` },
];

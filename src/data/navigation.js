import { portfolioData } from './index';
import {
  FaFile,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaCertificate,
  FaGraduationCap,
  FaStar,
  FaUser,
  FaBriefcase,
  FaLightbulb,
} from 'react-icons/fa';

const { personalInfo } = portfolioData;
const { github, linkedin, email, facebook, resumeUrl } = personalInfo;

export const resources = [
  { label: 'Resume', href: resumeUrl, external: true, icon: FaFile },
  { label: 'GitHub', href: github, external: true, icon: FaGithub },
  { label: 'LinkedIn', href: linkedin, external: true, icon: FaLinkedin },
  { label: 'Facebook', href: facebook, external: true, icon: FaFacebook },
  { label: 'Email', href: `mailto:${email}`, icon: FaEnvelope },
];

export const PRIMARY_NAV_LINKS = [
  { name: 'About', href: 'about' },
  { name: 'Projects', href: 'projects' },
  { name: 'Experience', href: 'experience' },
  { name: 'Skills', href: 'skills' },
];

export const MORE_NAV_LINKS = [
  {
    name: 'Education',
    href: 'education',
    to: '/education',
    icon: FaGraduationCap,
  },
  {
    name: 'Certifications',
    href: 'certifications',
    to: '/certifications',
    icon: FaCertificate,
  },
  {
    name: 'GitHub Stats',
    href: 'github-stats',
    icon: FaGithub,
  },
];

export const NAV_LINKS = [
  { name: 'Home', href: 'hero' },
  { name: 'About', href: 'about' },
  { name: 'Projects', href: 'projects' },
  { name: 'Experience', href: 'experience' },
  { name: 'Skills', href: 'skills' },
  { name: 'GitHub Stats', href: 'github-stats' },
  { name: 'Education', href: 'education' },
  { name: 'Certifications', href: 'certifications' },
  { name: 'Contact', href: 'contact' },
];

// Quick nav for footer column 2 — mirrors the homepage section order.
export const FOOTER_LINKS = [
  { name: 'About', href: 'about', icon: FaUser },
  { name: 'Projects', href: 'projects', icon: FaStar },
  { name: 'Experience', href: 'experience', icon: FaBriefcase },
  { name: 'GitHub Stats', href: 'github-stats', icon: FaGithub },
  { name: 'Education', href: 'education', icon: FaGraduationCap },
  { name: 'Certifications', href: 'certifications', icon: FaCertificate },
  { name: 'Contact', href: 'contact', icon: FaEnvelope },
];

// Secondary/utility links for footer column 4 ("More").
export const FOOTER_MORE_LINKS = [
  { label: 'All Projects', to: '/projects', icon: FaStar },
  { label: 'Experience Timeline', to: '/experience', icon: FaBriefcase },
  { label: 'Education Timeline', to: '/education', icon: FaGraduationCap },
  { label: 'All Certifications', to: '/certifications', icon: FaCertificate },
  { label: 'Current Focus', href: 'current-focus', icon: FaLightbulb },
];

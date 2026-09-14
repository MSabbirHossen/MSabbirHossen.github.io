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

export const NAV_LINKS = [
  { name: 'Home', href: 'hero' },
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Experience', href: 'experience' },
  { name: 'Projects', href: 'projects' },
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
  { label: 'Current Focus', href: 'current-focus', icon: FaLightbulb },
];

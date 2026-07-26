import { portfolioData } from './portfolioData';
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
} from 'react-icons/fa';

const { personalInfo } = portfolioData;
const { github, linkedin, email, facebook } = personalInfo;

export const resources = [
  {
    label: 'Resume',
    href: '/resume/Md_Sabbir_Hossen_Resume.pdf',
    external: true,
    icon: FaFile,
  },
  { label: 'GitHub', href: github, external: true, icon: FaGithub },
  { label: 'LinkedIn', href: linkedin, external: true, icon: FaLinkedin },
  { label: 'Facebook', href: facebook, external: true, icon: FaFacebook },
  { label: 'Email', href: `mailto:${email}`, icon: FaEnvelope },
];

export const NAV_LINKS = [
  { name: 'Home', href: 'hero' },
  { name: 'About', href: 'about' },
  { name: 'Projects', href: 'projects' },
  { name: 'Skills', href: 'skills' },
  { name: 'Contact', href: 'contact' },
];

export const FOOTER_LINKS = [
  { name: 'Skills', href: 'skills', icon: FaStar },
  { name: 'About Me', href: 'about', icon: FaUser },
  { name: 'Education', href: 'education', icon: FaGraduationCap },
  { name: 'GitHub Stats', href: 'github-stats', icon: FaGithub },
  { name: 'Certifications', href: 'certifications', icon: FaCertificate },
];

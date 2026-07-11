import { portfolioData } from '../../data/portfolioData';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { personalInfo } = portfolioData;

  const socialLinks = [
    { icon: <FaGithub className="w-5 h-5" />, href: personalInfo.github, label: 'GitHub' },
    { icon: <FaLinkedin className="w-5 h-5" />, href: personalInfo.linkedin, label: 'LinkedIn' },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      href: `mailto:${personalInfo.email}`,
      label: 'Email',
    },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#080b13] transition-colors py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Identity & Tagline */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            {personalInfo.brandName} (MS's personal Brand)
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md">
            {personalInfo.brandTagline}
          </p>
        </div>

        {/* Social Icons & Location */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-4">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-accent-primary dark:text-slate-400 dark:hover:text-accent-primary transition-colors p-2 border border-slate-200 dark:border-slate-800 rounded-full"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
          <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <FaMapMarkerAlt className="w-3.5 h-3.5" /> {personalInfo.location}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 gap-4">
        <p>
          &copy; {currentYear} {personalInfo.brandName}. All rights reserved.
        </p>
        <p>Built with React 19, Vite, and Tailwind CSS</p>
      </div>
    </footer>
  );
}

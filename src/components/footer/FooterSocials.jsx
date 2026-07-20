import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';

const FooterSocials = () => {
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
    <div className="max-w-7xl mx-auto flex flex-col items-center md:items-end px-4 gap-3">
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
      <span
        className="flex items-center gap-1.5 text-xs
rounded-md
text-slate-500
transition-colors
hover:text-accent-primary
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-accent-primary
focus-visible:ring-offset-2
dark:text-slate-400
dark:focus-visible:ring-offset-slate-900
"
      >
        <FaMapMarkerAlt className="w-3.5 h-3.5" />{' '}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personalInfo.location)}`}
          target="_blank"
          rel="noreferrer"
        >
          {personalInfo.location}
        </a>
      </span>
    </div>
  );
};

export default FooterSocials;

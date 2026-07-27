import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { portfolioData } from '../../data';

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
    <div className="flex flex-col items-center gap-3 md:items-end">
      <div className="flex items-center gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="rounded-full border border-default p-2 text-secondary transition-colors hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg"
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>
      <span className="flex items-center gap-1.5 rounded-md text-xs text-secondary transition-colors hover:text-accent-primary">
        <FaMapMarkerAlt className="w-3.5 h-3.5" />{' '}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personalInfo.location)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg"
        >
          {personalInfo.location}
        </a>
      </span>
    </div>
  );
};

export default FooterSocials;

import { FaEnvelope, FaFacebook, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { portfolioData } from '../../data';

export default function FooterSocials() {
  const { personalInfo } = portfolioData;
  const socialLinks = [
    { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
    { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: FaWhatsapp, href: personalInfo.whatsappUrl, label: 'WhatsApp' },
    { icon: FaFacebook, href: personalInfo.facebook, label: 'Facebook' },
    {
      icon: FaEnvelope,
      href: `mailto:${personalInfo.email}`,
      label: 'Email',
    },
  ].filter((s) => Boolean(s.href));

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-default bg-surface/80 text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-primary/50 hover:bg-accent-primary/10 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
          aria-label={label}
          title={label}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

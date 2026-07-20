import React from 'react';
import Button from '../common/Button';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

const HeroActions = ({ github, linkedin, facebook, resumeUrl, onContact }) => {
  const socialLinks = [
    {
      label: 'GitHub',
      href: github,
      icon: FaGithub,
      variant: 'outline',
    },
    {
      label: 'LinkedIn',
      href: linkedin,
      icon: FaLinkedin,
      variant: 'ghost',
    },
    {
      label: 'Facebook',
      href: facebook,
      icon: FaFacebook,
      variant: 'ghost',
    },
  ];
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
      {socialLinks.map((link) => (
        <Button key={link.label} variant={link.variant} size="lg" href={link.href} icon={link.icon}>
          {link.label}
        </Button>
      ))}
    </div>
  );
};

export default HeroActions;

import { FaEnvelope, FaExternalLinkAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../../data';
import Typography from '../common/Typography';
import Card from '../common/Card';
import ContactItem from './ContactItem';
import CollaborationCard from './CollaborationCard';

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34 1 2.5c.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.29s-1.44-.71-1.66-.82c-.22-.11-.38-.16-.54.16s-.63.82-.77.98c-.14.16-.28.18-.53.06s-1.05-.39-2-1.23c-.74-.66-1.24-1.47-1.38-1.72s-.01-.38.11-.5c.11-.11.25-.29.37-.43.12-.14.16-.24.25-.4.08-.16.04-.31-.02-.43s-.54-1.3-.74-1.78c-.2-.47-.4-.41-.55-.42z" />
  </svg>
);

const ContactInfo = () => {
  const { personalInfo } = portfolioData;

  const standardItems = [
    {
      title: 'Email',
      icon: FaEnvelope,
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      title: 'GitHub',
      icon: FaGithub,
      value: personalInfo.github.replace('https://', ''),
      href: personalInfo.github,
    },
    {
      title: 'LinkedIn',
      icon: FaLinkedin,
      value: personalInfo.linkedin.replace('https://www.', '').replace('https://', ''),
      href: personalInfo.linkedin,
    },
  ];

  return (
    <Card hover className="h-full flex flex-col justify-between space-y-5">
      {/* Symmetrical Top Header matching Left Card */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-default/50">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-accent-secondary/10 border border-accent-secondary/20 flex items-center justify-center text-accent-secondary shrink-0">
            <FaEnvelope className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <Typography variant="subtitle" className="text-primary font-bold text-base truncate">
              Direct Contact & Channels
            </Typography>
            <p className="text-xs text-secondary truncate">
              Reach out via instant messaging, email, or socials
            </p>
          </div>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/25">
          <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" />
          Available
        </span>
      </div>

      <div className="space-y-3.5 flex-1 flex flex-col justify-between">
        {/* Featured WhatsApp Direct Channel Banner */}
        <div className="rounded-2xl border border-[#25D366]/25 bg-[#25D366]/5 p-3.5 transition-all duration-300 hover:border-[#25D366]/40 hover:bg-[#25D366]/10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                <WhatsAppIcon />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary text-sm">WhatsApp</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/25">
                    Direct Chat
                  </span>
                </div>
                <p className="text-xs text-secondary font-mono truncate">
                  {personalInfo.whatsapp || '+8801773511874'}
                </p>
              </div>
            </div>
            <a
              href={personalInfo.whatsappUrl || 'https://wa.me/+8801773511874'}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow-sm shadow-[#25D366]/20 cursor-pointer"
            >
              Chat Now <FaExternalLinkAlt className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* Standard Channels: Email, GitHub, LinkedIn */}
        <div className="space-y-1">
          {standardItems.map(({ title, icon, value, href }) => (
            <ContactItem key={title} icon={icon} title={title} href={href}>
              {value}
            </ContactItem>
          ))}
        </div>

        {/* Preferred Collaboration Card symmetrically at bottom */}
        <CollaborationCard />
      </div>
    </Card>
  );
};

export default ContactInfo;

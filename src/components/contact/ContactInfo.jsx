import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import Typography from '../common/Typography';
import Card from '../common/Card';
import ContactItem from './ContactItem';
import CollaborationCard from './CollaborationCard';

const ContactInfo = () => {
  const { personalInfo } = portfolioData;
  const contactItems = [
    {
      title: 'Email',
      icon: FaEnvelope,
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      title: 'GitHub',
      icon: FaGithub,
      value: personalInfo.github,
      href: personalInfo.github,
    },
    {
      title: 'LinkedIn',
      icon: FaLinkedin,
      value: personalInfo.linkedin,
      href: personalInfo.linkedin,
    },
    // {
    //   title: 'Facebook',
    //   icon: FaFacebook,
    //   value: personalInfo.facebook,
    //   href: personalInfo.facebook,
    // },
    // {
    //   title: 'Location',
    //   icon: FaMapMarkerAlt,
    //   value: personalInfo.location,
    // },
  ];
  return (
    <div>
      <Card className="h-full space-y-4">
        <Typography variant="subtitle" className="text-primary">
          Contact details
        </Typography>

        <div className="space-y-4 text-secondary">
          {contactItems.map(({ title, icon, value, href }) => (
            <ContactItem key={title} icon={icon} title={title} href={href}>
              {value}
            </ContactItem>
          ))}

          <CollaborationCard />
        </div>
      </Card>
    </div>
  );
};

export default ContactInfo;

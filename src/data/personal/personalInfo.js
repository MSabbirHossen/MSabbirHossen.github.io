import { languages } from './languages';
import { values } from './values';
import { vision } from './vision';

const secondaryTitle = 'AI Integration - Security-Aware Development';

export const personalInfo = {
  name: 'Md. Sabbir Hossen',
  title: 'MERN Stack Developer',
  secondaryTitle,
  availability: ['Full-time', 'Internship', 'Freelance'],
  brandName: 'Md. Sabbir Hossen',
  brandTagline: 'MERN Stack Developer building AI-assisted, security-conscious web applications.',
  mission:
    'Full-stack developer focused on building practical web applications with MERN, AI-assisted workflows, and security-aware implementation.',
  tagline:
    'I combine continuous learning, disciplined problem solving, and real project work to create software that is useful, reliable, and easy to extend.',
  location: 'Medina, Saudi Arabia (Originally from Bangladesh)',
  studyingAt: 'Islamic University of Madinah',
  email: 'mshossen724@gmail.com',
  whatsapp: '+8801773511874',
  whatsappUrl: 'https://wa.me/+8801773511874',
  github: 'https://github.com/MSabbirHossen',
  linkedin: 'https://www.linkedin.com/in/sabb1rhossen/',
  facebook: 'https://web.facebook.com/sabb1rhossen/',
  resumeUrl: '/resume/Md_Sabbir_Hossen_Resume.pdf',
  website: 'https://msabbirhossen.github.io/',
  directContacts: [
    {
      name: 'WhatsApp',
      handle: '+8801773511874',
      subHandle: 'Direct Chat',
      category: 'Direct Chat',
      role: 'Instant Messaging & Voice',
      description:
        'Direct WhatsApp connection for quick project inquiries, instant messaging, and consultations.',
      link: 'https://wa.me/+8801773511874',
      color: '#25D366',
      bgBadge: 'bg-[#25D366]/10 text-[#25D366] border-[#25D366]/25',
      actionLabel: 'Chat on WhatsApp',
    },
  ],
  hero: {
    focusTitle: 'Currently focused on',
    focusItems: ['React', 'MERN Stack', 'AI Integration', 'Security-Aware Development'],
  },
  languages,
  values,
  vision,
  journey:
    'I started with HTML and CSS, then moved into JavaScript and interactive front-end work as my curiosity about the web grew. That path led me into the MERN stack, where I now build full-stack applications with React, Node.js, Express.js, MongoDB, and Firebase. I keep expanding into AI integration, cybersecurity, OSINT, and secure coding so I can ship work that is both practical and responsible.',
};

export const directContacts = personalInfo.directContacts;

import { languages } from './languages';
import { values } from './values';
import { vision } from './vision';

const secondaryTitle = 'Frontend Craftsmanship · Full-Stack JavaScript';

export const personalInfo = {
  name: 'Md. Sabbir Hossen',
  title: 'Junior MERN Stack Developer',
  secondaryTitle,
  availability: ['Remote Roles', 'Internships', 'Junior Full-Stack Opportunities'],
  statusBadge: 'Available for new opportunities',
  brandName: 'Md. Sabbir Hossen',
  brandTagline:
    'Junior MERN Stack Developer building responsive, secure, and production-ready web applications.',
  mission:
    'Computer Science student at the Islamic University of Madinah engineering practical web applications with React 19, TypeScript, Node.js, Express, and MongoDB. Combining solid frontend craftsmanship with end-to-end JavaScript problem-solving.',
  tagline:
    'Focused on clean component architecture, deterministic business logic, and reliable user experiences.',
  location: 'Madinah, Saudi Arabia (Open to Remote & Relocation)',
  shortLocation: 'Madinah, Saudi Arabia',
  studyingAt: 'Islamic University of Madinah',
  email: 'mshossen724@gmail.com',
  whatsapp: '+8801773511874',
  whatsappUrl: 'https://wa.me/+8801773511874',
  github: 'https://github.com/MSabbirHossen',
  linkedin: 'https://www.linkedin.com/in/sabb1rhossen/',
  facebook: 'https://web.facebook.com/sabb1rhossen/',
  resumeUrl: '/resume/Md_Sabbir_Hossen_Resume.pdf',
  llmsTxtUrl: '/llms.txt',
  llmsTxtFullUrl: 'https://msabbirhossen.github.io/llms.txt',
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
    focusTitle: 'Core Stack & Engineering Focus',
    focusItems: ['React 19', 'Node.js & Express', 'MongoDB Atlas', 'TypeScript', 'Tailwind CSS'],
  },
  highlights: [
    {
      metric: '8+',
      numericValue: 8,
      suffix: '+',
      title: 'Full-Stack Applications',
      desc: 'Built with React 19, TypeScript, Node.js, Express, and MongoDB.',
      badge: 'Production-Ready',
      category: 'projects',
    },
    {
      metric: 'BS CS',
      title: 'Computer Science Degree',
      desc: 'Undergraduate student at Islamic University of Madinah focusing on software engineering.',
      badge: 'Academic Rigor',
      category: 'education',
    },
    {
      metric: '8,000+',
      numericValue: 8000,
      suffix: '+',
      title: 'Community Members',
      desc: 'Mentored 350+ applicants in the 2026 cycle for scholarship admissions.',
      badge: 'Mentorship Impact',
      category: 'community',
    },
    {
      metric: '5',
      numericValue: 5,
      title: 'Verified Certifications',
      desc: 'Credentials in Full-Stack Web Development, UI Architecture, and Git workflows.',
      badge: 'Continuous Learning',
      category: 'certifications',
    },
  ],
  languages,
  values,
  vision,
  journey:
    'I started with HTML and CSS, then moved into JavaScript and interactive front-end work as my curiosity about the web grew. That path led me into the MERN stack, where I now build full-stack applications with React, Node.js, Express.js, MongoDB, and Firebase. I keep expanding into AI integration, cybersecurity, OSINT, and secure coding so I can ship work that is both practical and responsible.',
};

export const directContacts = personalInfo.directContacts;

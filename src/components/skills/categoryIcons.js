import {
  FaCode,
  FaDatabase,
  FaLaptopCode,
  FaRobot,
  FaServer,
  FaShieldAlt,
  FaTerminal,
  FaTools,
  FaUsers,
} from 'react-icons/fa';

export const categoryIcons = {
  'Frontend Development': FaCode,
  'Backend Development': FaServer,
  'Database & Services': FaDatabase,
  'Tools & Platforms': FaTools,
  'Currently Learning': FaRobot,
  // Backwards compatibility keys
  Frontend: FaCode,
  Backend: FaDatabase,
  Tools: FaTools,
  'Soft Skills': FaUsers,
  'Learning / Exploring': FaRobot,
};

export const categoryMeta = {
  'Frontend Development': {
    icon: FaCode,
    subIcon: FaLaptopCode,
    subtitle: 'React & Modern Web Ecosystem',
    badge: '10 Technologies',
  },
  'Backend Development': {
    icon: FaServer,
    subIcon: FaServer,
    subtitle: 'REST APIs, Validation & Node Runtime',
    badge: '6 Technologies',
  },
  'Database & Services': {
    icon: FaDatabase,
    subIcon: FaDatabase,
    subtitle: 'Cloud Auth, NoSQL, APIs & Deployment',
    badge: '6 Technologies',
  },
  'Tools & Platforms': {
    icon: FaTools,
    subIcon: FaTerminal,
    subtitle: 'Monorepo, CI/CD, Container & Workflows',
    badge: '9 Tools',
  },
  'Currently Learning': {
    icon: FaRobot,
    subIcon: FaShieldAlt,
    subtitle: 'AI Engineering & Defensive Security',
    badge: 'Active Study',
  },
};

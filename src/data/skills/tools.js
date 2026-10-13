import {
  FaSearch,
  SiDocker,
  SiEslint,
  SiGit,
  SiGithub,
  SiNpm,
  SiPostman,
  SiPrettier,
  SiVercel,
  VscVscodeInsiders,
} from '../icons';

export const toolsSkillCategory = {
  category: 'Tools',
  items: [
    { name: 'Git', icon: SiGit },
    { name: 'GitHub', icon: SiGithub },
    { name: 'Docker', icon: SiDocker },
    { name: 'VS Code', icon: VscVscodeInsiders },
    { name: 'npm', icon: SiNpm },
    { name: 'Vercel', icon: SiVercel },
    { name: 'ESLint', icon: SiEslint },
    { name: 'Prettier', icon: SiPrettier },
    { name: 'Postman', icon: SiPostman },
    { name: 'Chrome DevTools', icon: FaSearch },
  ],
};

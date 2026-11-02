import { FaBrain, FaSearch, FaShieldAlt, FaTerminal, SiDocker, SiNextdotjs } from '../icons';

export const learningSkillCategory = {
  category: 'Currently Learning',
  shortCategory: 'Learning',
  description:
    'Active study topics, emerging technologies, defensive security, and AI integrations.',
  items: [
    {
      name: 'Next.js App Router & RAG AI',
      icon: SiNextdotjs,
      color: '#0070F3',
      type: 'learning',
      projectSlugs: ['eta-digital-education-platform'],
      description:
        'Server components, streaming responses, cosine vector retrieval, and prompt bounding.',
    },
    {
      name: 'Docker & Containerization',
      icon: SiDocker,
      color: '#2496ED',
      type: 'learning',
      projectSlugs: ['report-bd'],
      description:
        'Container lifecycles, Docker Compose orchestration, and multi-stage container optimization.',
    },
    {
      name: 'Prompt Engineering & AI Integrations',
      icon: FaBrain,
      color: '#8B5CF6',
      type: 'learning',
      projectSlugs: [],
      description:
        'Structured few-shot prompts, chain-of-thought system instructions, and tool calling with LLMs.',
    },
    {
      name: 'OWASP Top 10 Security Awareness',
      icon: FaShieldAlt,
      color: '#10B981',
      type: 'learning',
      projectSlugs: [],
      description:
        'Preventing injection attacks, broken access control, SSRF, and sensitive data exposure.',
    },
    {
      name: 'Linux & Shell Scripting',
      icon: FaTerminal,
      color: '#F59E0B',
      type: 'learning',
      projectSlugs: [],
      description:
        'Bash automation, Unix permissions, process management, and remote server administration.',
    },
    {
      name: 'OSINT & Defensive Security',
      icon: FaSearch,
      color: '#06B6D4',
      type: 'learning',
      projectSlugs: [],
      description:
        'Public intelligence gathering, attack surface minimization, and credential hygiene practices.',
    },
  ],
};

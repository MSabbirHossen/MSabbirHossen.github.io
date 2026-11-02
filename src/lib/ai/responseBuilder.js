import { detectIntent } from './intentMatcher';

const QUICK_FOLLOW_UPS = {
  projects: [
    'Tell me about Report BD',
    'Tell me about ETA (LMS)',
    'What architecture do you use?',
    'Show GitHub code',
  ],
  skills: ['Show MERN stack projects', 'Do you use TypeScript and Zod?', 'Why hire Sabbir?'],
  default: [
    'Tell me about Report BD',
    'Why should we hire Sabbir?',
    'Show MERN skills',
    'How can I contact Sabbir on WhatsApp?',
  ],
};

function directFollowUp(label, actionConfig) {
  return { label, action: actionConfig };
}

function contactFollowUps(portfolio) {
  const followUps = [
    directFollowUp('Copy email', { kind: 'copy-email', value: portfolio.contact.email }),
    directFollowUp('Open LinkedIn', { kind: 'external', target: portfolio.contact.linkedin }),
    directFollowUp('Download resume', { kind: 'external', target: portfolio.resume.publicPath }),
  ];

  if (portfolio.contact.whatsappUrl) {
    followUps.unshift(
      directFollowUp('Chat on WhatsApp', {
        kind: 'external',
        target: portfolio.contact.whatsappUrl,
      })
    );
  }

  return followUps;
}

function createProjectCard(project) {
  const isFlagship = project.featuredOrder === 1;
  const isFeatured = project.featured;

  return {
    type: 'project',
    title: project.title,
    badge: isFlagship ? '🌟 Flagship MERN' : isFeatured ? '🚀 Top Featured' : project.category,
    description: project.overview,
    highlights: (project.keyFeatures ?? []).slice(0, 2),
    techStack: (project.technologies ?? []).slice(0, 6).map((tech) => tech.name),
    links: {
      details: `/projects/${project.id}`,
      github: project.githubUrl,
      live: project.liveUrl,
    },
  };
}

function createSkillCard(skill) {
  return {
    type: 'skill',
    category: skill.category,
    years: skill.years,
    tools: skill.tools,
    proficiency: skill.proficiency,
  };
}

function createContactCard(portfolio) {
  return {
    type: 'contact',
    email: portfolio.contact.email,
    linkedin: portfolio.contact.linkedin,
    github: portfolio.contact.github,
    whatsapp: portfolio.contact.whatsapp,
    whatsappUrl: portfolio.contact.whatsappUrl,
    location: portfolio.contact.location,
    resumePath: portfolio.resume.publicPath,
  };
}

function action(label, config) {
  return {
    id: `${config.kind}-${label.toLowerCase().replace(/[^\w-]/g, '-')}`,
    label,
    ...config,
  };
}

function defaultUnknownResponse() {
  return {
    text: "I can guide you through Sabbir's MERN projects (like Report BD & ETA), technical skills, system architecture, certifications, or direct contact options. What would you like to explore?",
    actions: [
      action('🌟 Report BD (Flagship)', { kind: 'prompt', prompt: 'Tell me about Report BD' }),
      action('🚀 Top Projects', { kind: 'prompt', prompt: 'Best projects' }),
      action('💡 Why Hire Sabbir?', { kind: 'prompt', prompt: 'Why should we hire Sabbir?' }),
      action('📞 Contact Sabbir', { kind: 'prompt', prompt: 'How can I contact Sabbir?' }),
    ],
    followUps: QUICK_FOLLOW_UPS.default,
  };
}

function buildSingleProjectResponse(project, portfolio) {
  const isReportBd = project.id === 'report-bd';
  const isEta = project.id === 'eta-digital-education-platform';

  let intro = `Here is a detailed breakdown of **${project.title}**:`;

  if (isReportBd) {
    intro =
      '🌟 **Report BD (BPS Report)** is Sabbir’s flagship MERN stack application — an institutional mentorship and multi-tenant personal reporting platform built with TypeScript, React 19, Express 4, and MongoDB Atlas.\n\n' +
      '• **Architecture:** npm workspaces monorepo separating shared validation schemas (`@reportbd/shared`), an Express REST API, and a Vite React 19 SPA.\n' +
      '• **Data Integrity & Concurrency:** Optimistic revision locking prevents stale overwrites (HTTP 409 Conflict) and deterministic formula engines handle variable month calculations.\n' +
      '• **Zero-Trust Security:** Firebase Admin token verification, multi-tenant RBAC (4 system roles, 7 tiers), and recursive server-side audit log sanitization.\n' +
      '• **Production Features:** Trilingual i18n (Bengali, English, Arabic RTL) and dedicated A4 printable report layouts with dual signatures.';
  } else if (isEta) {
    intro =
      '🎓 **Exploratory Training Academy (ETA)** is Sabbir’s second featured MERN application — a comprehensive digital education management platform (LMS).\n\n' +
      '• **Role-Based Dashboards:** Distinct tailored interfaces for Students, Instructors, and System Administrators.\n' +
      '• **Course Management:** Curriculum authoring, lesson videos, interactive quizzes, and student progress tracking.\n' +
      '• **Modern Tech Stack:** React 19, Redux Toolkit for complex state, Framer Motion for smooth micro-interactions, Express, and MongoDB.\n' +
      '• **Live Deployment:** Deployed on Vercel with responsive, accessible UI across mobile and desktop.';
  }

  const actions = [action('Case Study', { kind: 'route', target: `/projects/${project.id}` })];

  if (project.liveUrl) {
    actions.push(action('Live Demo', { kind: 'external', target: project.liveUrl }));
  }

  if (project.githubUrl) {
    actions.push(action('GitHub Code', { kind: 'external', target: project.githubUrl }));
  }

  actions.push(
    action('Open Projects Section', { kind: 'scroll', target: portfolio.sections.projects })
  );

  const followUps = isReportBd
    ? [
        'What backend tech is used in Report BD?',
        'Tell me about ETA (LMS)',
        'Why should we hire Sabbir?',
        'How can I contact Sabbir on WhatsApp?',
      ]
    : [
        'Tell me about Report BD',
        'Show MERN stack skills',
        'Why should we hire Sabbir?',
        'How can I contact Sabbir?',
      ];

  return {
    text: intro,
    cards: [createProjectCard(project)],
    actions,
    followUps,
    memory: {
      lastProjectId: project.id,
      lastTopic: 'projects',
    },
  };
}

function buildProjectResponse(message, intent, knowledge, portfolio, memory) {
  const queryMatch = knowledge.findProjectByQuery(message);

  if (queryMatch) {
    return buildSingleProjectResponse(queryMatch, portfolio);
  }

  const rememberedProject =
    intent === 'projects' && memory?.lastProjectId
      ? knowledge.getProjectById(memory.lastProjectId)
      : null;

  if (
    rememberedProject &&
    (message.toLowerCase().includes('this project') || message.toLowerCase().includes('about it'))
  ) {
    return buildSingleProjectResponse(rememberedProject, portfolio);
  }

  const aiRelatedProjects = knowledge.getProjectsByTopic('ai');
  const mernProjects = knowledge.getProjectsByTopic('mern');
  const reactProjects = knowledge.getProjectsByTopic('react');
  const securityProjects = knowledge.getProjectsByTopic('security');

  const intentBuckets = {
    projects: knowledge.getFeaturedProjects(3),
    react: reactProjects,
    mern: mernProjects,
    ai: aiRelatedProjects,
    security: securityProjects,
  };

  const matchedProjects = intentBuckets[intent] ?? [];
  const projects =
    matchedProjects.length > 0 ? matchedProjects.slice(0, 3) : knowledge.getFeaturedProjects(3);

  if (!projects.length) {
    return {
      text: 'I could not find matching project data for that request yet. You can open the Projects section to browse all available work.',
      actions: [
        action('Open Projects Section', { kind: 'scroll', target: portfolio.sections.projects }),
      ],
      followUps: ['Best projects', 'Show skills', 'How can I contact Sabbir?'],
      memory: {
        lastProjectId: null,
        lastTopic: 'projects',
      },
    };
  }

  const cards = projects.map(createProjectCard);
  const headline =
    intent === 'mern'
      ? 'Here are Sabbir’s flagship MERN stack applications, demonstrating end-to-end architecture from MongoDB and Express up to React 19:'
      : intent === 'security'
        ? 'Here are projects where Sabbir implemented zero-trust authentication, audit log sanitization, and optimistic concurrency locking:'
        : 'Here are Sabbir’s top featured projects, prioritized by technical complexity and production readiness:';

  return {
    text: headline,
    cards,
    actions: [
      action('🌟 Explore Report BD', { kind: 'prompt', prompt: 'Tell me about Report BD' }),
      action('Open Projects Section', { kind: 'scroll', target: portfolio.sections.projects }),
      action('Open GitHub Stats', { kind: 'scroll', target: portfolio.sections.githubStats }),
    ],
    followUps: QUICK_FOLLOW_UPS.projects,
    memory: {
      lastProjectId: projects[0]?.id ?? null,
      lastTopic: 'projects',
    },
  };
}

function buildWhyHireResponse(portfolio) {
  const text =
    '💡 **Why consider Md. Sabbir Hossen for your engineering team?**\n\n' +
    '1. **Production-Minded MERN Depth:** He architects complete full-stack web applications with clean separation of concerns, robust REST APIs (Express/Node.js), and modern React 19 frontends.\n' +
    '2. **Type Safety & Data Contracts:** Experienced with TypeScript and Zod validation across shared monorepo packages (as demonstrated in Report BD).\n' +
    '3. **Concurrency & Defensive Security:** Proven implementation of optimistic revision locking (preventing stale writes with HTTP 409), zero-trust Firebase token checks, and recursive audit log sanitization.\n' +
    '4. **Modern UI & State Management:** Skilled in Tailwind CSS v4, Redux Toolkit, TanStack Query, Framer Motion, and responsive accessibility.\n' +
    '5. **Disciplined Problem Solver:** 7 verified technical certifications (Phitron Web Development, CS fundamentals) and rigorous Git commit habits.';

  return {
    text,
    cards: [createContactCard(portfolio)],
    actions: [
      action('🌟 View Report BD', { kind: 'prompt', prompt: 'Tell me about Report BD' }),
      action('🛠 View Skills', { kind: 'scroll', target: portfolio.sections.skills }),
      action('📄 Download Resume', { kind: 'external', target: portfolio.resume.publicPath }),
    ],
    followUps: [
      'Tell me about Report BD',
      'What architecture do you use?',
      'How can I contact Sabbir on WhatsApp?',
      'Show certifications',
    ],
    memory: {
      lastTopic: 'why_hire',
    },
  };
}

function buildArchitectureResponse(portfolio) {
  const text =
    '🏛️ **Sabbir’s System Architecture Standards:**\n\n' +
    '• **Monorepo Separation:** Packages split cleanly into shared domain logic (`@reportbd/shared`), Express REST APIs, and client SPAs.\n' +
    '• **Contract-First Validation:** Shared Zod schemas ensure client-side forms and server-side endpoints validate against the exact same rules without logic drift.\n' +
    '• **Optimistic Concurrency Control:** Uses revision counters on sensitive records to reject stale edits with explicit HTTP 409 Conflict instead of silent data loss.\n' +
    '• **Defensive Security & RBAC:** Multi-tenant role tiers, zero-trust token decoding, and recursive sanitization of audit logs before database insertion.\n' +
    '• **Performance & Accessibility:** Mobile-first responsive layouts, dynamic typography scaling (1.0x–1.30x), trilingual LTR/RTL support, and clean A4 print formatting.';

  return {
    text,
    actions: [
      action('🌟 Report BD Deep Dive', { kind: 'prompt', prompt: 'Tell me about Report BD' }),
      action('Open Projects Section', { kind: 'scroll', target: portfolio.sections.projects }),
      action('Contact Sabbir', { kind: 'prompt', prompt: 'How can I contact Sabbir?' }),
    ],
    followUps: [
      'Tell me about Report BD',
      'Do you use TypeScript and Zod?',
      'Why should we hire Sabbir?',
    ],
    memory: {
      lastTopic: 'architecture',
    },
  };
}

function buildTypeScriptResponse(portfolio) {
  const text =
    '📘 **TypeScript & Schema Validation:**\n\n' +
    'Sabbir leverages TypeScript and Zod to guarantee end-to-end type safety in production:\n' +
    '• In **Report BD**, data schemas, mathematical calculation formulas, and validation rules are centralized in a shared workspace package (`@reportbd/shared`).\n' +
    '• Both the Vite React 19 frontend and Node.js/Express API consume these contracts directly, eliminating runtime contract drift.\n' +
    '• Zod schema validation guards all mutating endpoints against invalid payloads before hitting MongoDB Atlas.';

  return {
    text,
    actions: [
      action('🌟 View Report BD', { kind: 'prompt', prompt: 'Tell me about Report BD' }),
      action('Open Skills Section', { kind: 'scroll', target: portfolio.sections.skills }),
      action('Contact Sabbir', { kind: 'prompt', prompt: 'How can I contact Sabbir?' }),
    ],
    followUps: ['What architecture do you use?', 'Tell me about ETA (LMS)', 'Why hire Sabbir?'],
    memory: {
      lastTopic: 'typescript',
    },
  };
}

function buildSkillsResponse(knowledge, portfolio) {
  const topSkills = knowledge.getSkillSummary().slice(0, 4);

  return {
    text:
      '🛠️ **Technical Stack & Skills:**\n' +
      'Sabbir specializes in the MERN stack with modern full-stack tooling:\n' +
      '• **Frontend:** React 19, JavaScript (ES6+), TypeScript, Tailwind CSS v4, Redux Toolkit, TanStack Query, Framer Motion.\n' +
      '• **Backend & DB:** Node.js, Express.js, MongoDB Atlas, Mongoose, RESTful APIs, Firebase Auth, JWT, Zod Validation.\n' +
      '• **Tools & Workflow:** Git, GitHub, Vite, Vercel, Docker basics, Postman, Linux environments.',
    cards: topSkills.map(createSkillCard),
    actions: [
      action('🌟 See Skills in Report BD', { kind: 'prompt', prompt: 'Tell me about Report BD' }),
      action('Open Skills Section', { kind: 'scroll', target: portfolio.sections.skills }),
      action('📄 View Resume', { kind: 'external', target: portfolio.resume.publicPath }),
    ],
    followUps: QUICK_FOLLOW_UPS.skills,
    memory: {
      lastTopic: 'skills',
    },
  };
}

function buildContactResponse(portfolio) {
  return {
    text:
      '📞 **Get in Touch with Sabbir:**\n' +
      'He is actively available for Junior MERN Stack Developer, Full-Stack, Backend, or Frontend roles, internships, and freelance projects.\n' +
      'Feel free to connect directly via WhatsApp or email!',
    cards: [createContactCard(portfolio)],
    actions: [
      action('Open Contact Form', { kind: 'scroll', target: portfolio.sections.contact }),
      action('Open LinkedIn', { kind: 'external', target: portfolio.contact.linkedin }),
    ],
    followUps: contactFollowUps(portfolio),
    memory: {
      lastTopic: 'contact',
    },
  };
}

function buildExperienceResponse(portfolio) {
  const text =
    '💼 **Experience & Milestones:**\n\n' +
    '• **Solo Full-Stack Developer — Report BD (BPS Report):**\n' +
    'Architected multi-tenant personal reporting & mentorship platform using TypeScript, React 19, Express 4 REST API, MongoDB Atlas, Firebase Auth, and Zod.\n\n' +
    '• **Full-Stack Developer & Mentorship — Exploratory Training Academy (ETA):**\n' +
    'Engineered comprehensive LMS with student enrollment, interactive quizzes, video progress tracking, and Redux Toolkit state management.\n\n' +
    '• **Open-Source & Project Work:**\n' +
    'Active contributor with disciplined version control, atomic commits, and continuous testing.';

  return {
    text,
    actions: [
      action('🌟 Explore Report BD', { kind: 'prompt', prompt: 'Tell me about Report BD' }),
      action('Open About Section', { kind: 'scroll', target: portfolio.sections.about }),
      action('📄 Resume (PDF)', { kind: 'external', target: portfolio.resume.publicPath }),
    ],
    followUps: [
      'Tell me about Report BD',
      'Why should we hire Sabbir?',
      'How can I contact Sabbir on WhatsApp?',
    ],
    memory: {
      lastTopic: 'experience',
    },
  };
}

function buildCurrentFocusResponse(portfolio) {
  return {
    text: '⚡ **What Sabbir is Actively Building & Learning Right Now:**',
    cards: portfolio.currentFocus.map((item) => ({
      type: 'focus',
      title: item.title,
      organization: item.organization,
      period: item.period,
      description: item.description,
    })),
    actions: [
      action('Open Current Focus', { kind: 'scroll', target: portfolio.sections.currentFocus }),
      action('🌟 View Latest Project', { kind: 'prompt', prompt: 'Tell me about Report BD' }),
    ],
    followUps: ['Show projects', 'Show skills', 'How can I contact Sabbir?'],
    memory: {
      lastTopic: 'current_focus',
    },
  };
}

function buildEducationResponse(portfolio) {
  const latest = portfolio.education[0];

  return {
    text: latest
      ? `🎓 **Academic Background:**\nCurrently studying **${latest.degree}** at **${latest.institution}** (${latest.period}).\nSpecializing in computer science fundamentals, software engineering, and web systems.`
      : 'Education details are available in the Education section.',
    actions: [
      action('Open Education Section', { kind: 'scroll', target: portfolio.sections.education }),
      action('Education Timeline', { kind: 'navigate', target: '/education' }),
    ],
    followUps: ['Show certifications', 'Show current focus', 'Contact Sabbir'],
    memory: {
      lastTopic: 'education',
    },
  };
}

function buildCertificationResponse(knowledge, portfolio) {
  const certs = knowledge.getCertifications(4);

  return {
    text: `🏆 **Verified Certifications & Credentials:**\nSabbir holds **${portfolio.certifications.length} verified certifications** covering full-stack web development, computer science fundamentals, and programming foundations (including Phitron Complete Web Development).`,
    cards: certs.map((cert) => ({
      type: 'certification',
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      link: cert.link,
    })),
    actions: [
      action('Open Certifications Section', {
        kind: 'scroll',
        target: portfolio.sections.certifications,
      }),
      action('View All Certifications', { kind: 'navigate', target: '/certifications' }),
    ],
    followUps: ['Show skills', 'Tell me about Report BD', 'How to contact Sabbir'],
    memory: {
      lastTopic: 'certifications',
    },
  };
}

function buildResumeResponse(portfolio) {
  return {
    text: '📄 **Resume & Credentials:**\nYou can review Sabbir’s latest software engineering resume instantly via the links below:',
    actions: [
      action('Open Resume (PDF)', { kind: 'external', target: portfolio.resume.publicPath }),
      action('Open Resume (Drive)', { kind: 'external', target: portfolio.resume.driveUrl }),
      action('Why Hire Sabbir?', { kind: 'prompt', prompt: 'Why should we hire Sabbir?' }),
    ],
    followUps: ['Why should we hire Sabbir?', 'Show best projects', 'Contact Sabbir'],
    memory: {
      lastTopic: 'resume',
    },
  };
}

function buildLlmsTxtResponse(portfolio) {
  const path = portfolio.llmsTxt?.path || '/llms.txt';

  return {
    text:
      '🤖 **Machine-Readable AI Profile (/llms.txt):**\n\n' +
      'Sabbir has published an official `/llms.txt` file at the root of his portfolio according to the machine-readable standard.\n' +
      'It contains a structured markdown summary of his technical background, project architectures, technology stack, and contact links designed specifically for AI models, coding assistants, and automated web crawlers.',
    actions: [
      action('Open /llms.txt', { kind: 'external', target: path }),
      action('🌟 Explore Report BD', { kind: 'prompt', prompt: 'Tell me about Report BD' }),
      action('Contact Sabbir', { kind: 'prompt', prompt: 'How can I contact Sabbir?' }),
    ],
    followUps: ['Tell me about Report BD', 'Show skills', 'How can I contact Sabbir?'],
    memory: {
      lastTopic: 'llms_txt',
    },
  };
}

function buildGithubResponse(portfolio) {
  return {
    text:
      '📈 **GitHub Activity & Codebase Evidence:**\n' +
      'Sabbir maintains active GitHub activity with disciplined atomic commits, clear documentation, and open-source monorepos.\n' +
      'Explore his GitHub stats dashboard or visit his profile directly:',
    actions: [
      action('Open GitHub Stats', { kind: 'scroll', target: portfolio.sections.githubStats }),
      action('Open GitHub Profile', { kind: 'external', target: portfolio.github.profileUrl }),
    ],
    followUps: [
      'Tell me about Report BD',
      'Which stack is strongest?',
      'How can I contact Sabbir?',
    ],
    memory: {
      lastTopic: 'github',
    },
  };
}

function buildGuideResponse() {
  return {
    text:
      '📖 **Interactive Portfolio Guide:**\n\n' +
      'Sabbir has built an interactive **Portfolio Guide** at /guide designed to help recruiters, engineering leads, and visitors get the most out of their exploration.\n\n' +
      'It provides an in-depth walkthrough covering:\n' +
      '• 01. Welcome & Engineering Ethos\n' +
      '• 02. Quick Start Paths (Recruiter, Architect, Credentials)\n' +
      '• 03. Complete Route & Keyboard Navigation\n' +
      '• 04. Flagship Projects & Architecture (Report BD & ETA)\n' +
      '• 05. Technology Breakdown (React 19, Zod, MongoDB, TypeScript)\n' +
      '• 06. Verified Credentials & Experience\n' +
      '• 07. Interactive Tools & Dark/Light Themes\n' +
      '• 08. Direct WhatsApp & Contact Channels\n' +
      '• 09. Frequently Asked Questions (FAQ)\n' +
      '• 10. Accessibility & Troubleshooting',
    actions: [
      action('Open Full Guide', { kind: 'route', target: '/guide' }),
      action('🌟 Explore Report BD', { kind: 'prompt', prompt: 'Tell me about Report BD' }),
    ],
    followUps: [
      'Tell me about Report BD',
      'Why should we hire Sabbir?',
      'How can I contact Sabbir on WhatsApp?',
    ],
    memory: {
      lastTopic: 'guide',
    },
  };
}

function buildGreetingResponse(portfolio) {
  return {
    text:
      `👋 **Assalamu Alaikum! I'm Sabbir's Portfolio Guide.**\n` +
      `I can give you an executive recruiter walkthrough of ${portfolio.name}’s latest MERN stack projects, technical architecture, and skill set.\n\n` +
      `Where would you like to begin?`,
    actions: [
      action('🌟 Report BD (Flagship)', { kind: 'prompt', prompt: 'Tell me about Report BD' }),
      action('🚀 Top Projects', { kind: 'prompt', prompt: 'Best projects' }),
      action('💡 Why Hire Sabbir?', { kind: 'prompt', prompt: 'Why should we hire Sabbir?' }),
      action('🛠 Tech Stack', { kind: 'prompt', prompt: 'Show skills' }),
    ],
    followUps: [
      'Tell me about Report BD',
      'Why should we hire Sabbir?',
      'Show MERN stack skills',
      'How can I contact Sabbir on WhatsApp?',
    ],
  };
}

function buildThanksResponse() {
  return {
    text: 'Happy to help! Feel free to ask about specific projects, system design, code samples, or direct contact whenever you are ready.',
    followUps: [
      'Tell me about Report BD',
      'Why hire Sabbir?',
      'How can I contact Sabbir on WhatsApp?',
    ],
  };
}

function buildContextualFollowUp(message, memory, knowledge, conversation = []) {
  const normalizedMessage = message.toLowerCase();

  const recentConversationText = conversation
    .slice(-4)
    .map((turn) => turn.content)
    .join(' ')
    .toLowerCase();

  const hasProjectContext =
    memory.lastProjectId ||
    /project|built|technolog|report|eta|life-os/.test(recentConversationText);

  if (
    (normalizedMessage.includes('backend') ||
      normalizedMessage.includes('api') ||
      normalizedMessage.includes('server')) &&
    hasProjectContext
  ) {
    const targetId = memory.lastProjectId || 'report-bd';
    const backend = knowledge.getBackendDetails(targetId);

    if (backend) {
      const backendTechText =
        backend.backendTech.length > 0
          ? backend.backendTech.join(', ')
          : 'Node.js, Express, MongoDB, RESTful APIs, JWT';

      const architectureText =
        backend.architecture && backend.architecture.length > 0
          ? `\n\n• ${backend.architecture.join('\n• ')}`
          : '';

      return {
        text: `⚡ **${backend.title} Backend Architecture:**\n**Core Stack:** ${backendTechText}${architectureText}`,
        cards: [
          {
            type: 'backend',
            title: backend.title,
            stack: backend.backendTech,
            endpoints: backend.apiPreview,
          },
        ],
        actions: [
          action('Case Study', { kind: 'route', target: `/projects/${targetId}` }),
          action('Why Hire Sabbir?', { kind: 'prompt', prompt: 'Why should we hire Sabbir?' }),
        ],
        followUps: ['Tell me about ETA (LMS)', 'What about security?', 'How can I contact Sabbir?'],
      };
    }
  }

  return null;
}

export function generateLocalResponse({ message, knowledge, portfolio, memory, conversation }) {
  const contextResponse = buildContextualFollowUp(message, memory, knowledge, conversation);

  if (contextResponse) {
    return {
      intent: 'projects',
      ...contextResponse,
    };
  }

  // 1. Check if user is asking about a specific project directly
  const queryMatch = knowledge.findProjectByQuery(message);
  if (queryMatch) {
    return {
      intent: 'projects',
      ...buildSingleProjectResponse(queryMatch, portfolio),
    };
  }

  const { intent } = detectIntent(message);

  switch (intent) {
    case 'greeting':
      return { intent, ...buildGreetingResponse(portfolio) };
    case 'thanks':
      return { intent, ...buildThanksResponse() };
    case 'project_reportbd': {
      const reportBd = knowledge.getProjectById('report-bd') ?? knowledge.getFeaturedProjects(1)[0];
      return { intent: 'projects', ...buildSingleProjectResponse(reportBd, portfolio) };
    }
    case 'project_eta': {
      const eta = knowledge.getProjectById('eta-digital-education-platform');
      return { intent: 'projects', ...buildSingleProjectResponse(eta, portfolio) };
    }
    case 'project_lifeos': {
      const lifeOs = knowledge.getProjectById('life-os');
      return { intent: 'projects', ...buildSingleProjectResponse(lifeOs, portfolio) };
    }
    case 'why_hire':
      return { intent, ...buildWhyHireResponse(portfolio) };
    case 'architecture':
      return { intent, ...buildArchitectureResponse(portfolio) };
    case 'typescript':
      return { intent, ...buildTypeScriptResponse(portfolio) };
    case 'projects':
    case 'react':
    case 'mern':
    case 'ai':
    case 'security':
      return { intent, ...buildProjectResponse(message, intent, knowledge, portfolio, memory) };
    case 'skills':
      return { intent, ...buildSkillsResponse(knowledge, portfolio) };
    case 'contact':
    case 'social_links':
      return { intent, ...buildContactResponse(portfolio) };
    case 'experience':
    case 'about':
      return { intent, ...buildExperienceResponse(portfolio) };
    case 'current_focus':
      return { intent, ...buildCurrentFocusResponse(portfolio) };
    case 'education':
      return { intent, ...buildEducationResponse(portfolio) };
    case 'certifications':
      return { intent, ...buildCertificationResponse(knowledge, portfolio) };
    case 'resume':
      return { intent, ...buildResumeResponse(portfolio) };
    case 'llms_txt':
      return { intent, ...buildLlmsTxtResponse(portfolio) };
    case 'guide':
      return { intent, ...buildGuideResponse() };
    case 'github':
      return { intent, ...buildGithubResponse(portfolio) };
    case 'availability':
      return {
        intent,
        text: `💼 **Availability:**\n${portfolio.availability}\nAvailable immediately for full-time, remote, internship, or freelance opportunities.`,
        actions: [
          action('Open Contact Form', { kind: 'scroll', target: portfolio.sections.contact }),
          action('📄 Download Resume', {
            kind: 'external',
            target: portfolio.resume.publicPath,
          }),
        ],
        followUps: [
          'How can I contact Sabbir on WhatsApp?',
          'Why should we hire Sabbir?',
          'Show best projects',
        ],
      };
    default:
      return { intent: 'unknown', ...defaultUnknownResponse() };
  }
}

export async function generateAIResponse(context) {
  return generateLocalResponse(context);
}

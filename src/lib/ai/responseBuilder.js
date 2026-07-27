import { detectIntent } from './intentMatcher';

const QUICK_FOLLOW_UPS = {
  projects: ['Tell me about this project', 'What technologies were used?', 'Show GitHub'],
  skills: ['Which skills are strongest?', 'Any AI-related skills?', 'Show MERN work'],
  contact: ['Copy email', 'Open LinkedIn', 'Download resume'],
  default: ['Best projects', 'Show experience', 'How can I contact Sabbir?'],
};

function createProjectCard(project) {
  return {
    type: 'project',
    title: project.title,
    description: project.overview,
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
    resumePath: portfolio.resume.publicPath,
  };
}

function action(label, config) {
  return {
    id: `${config.kind}-${label.toLowerCase().replace(/\s+/g, '-')}`,
    label,
    ...config,
  };
}

function defaultUnknownResponse() {
  return {
    text: 'I can guide you through projects, skills, experience, certifications, GitHub activity, and contact details. Choose an action below or ask a specific question.',
    actions: [
      action('Best Projects', { kind: 'prompt', prompt: 'Best projects' }),
      action('Experience', { kind: 'prompt', prompt: 'Show experience' }),
      action('Contact', { kind: 'prompt', prompt: 'How can I contact Sabbir?' }),
    ],
    followUps: QUICK_FOLLOW_UPS.default,
  };
}

function buildProjectResponse(message, intent, knowledge, portfolio) {
  const aiRelatedProjects = knowledge.getProjectsByTopic('ai');
  const mernProjects = knowledge.getProjectsByTopic('mern');
  const reactProjects = knowledge.getProjectsByTopic('react');
  const securityProjects = knowledge.getProjectsByTopic('security');
  const queryMatch = knowledge.findProjectByQuery(message);

  const intentBuckets = {
    react: reactProjects,
    mern: mernProjects,
    ai: aiRelatedProjects,
    security: securityProjects,
  };

  const intentMatches = intentBuckets[intent] ?? [];

  const projects = queryMatch
    ? [queryMatch]
    : intentMatches.length > 0
      ? intentMatches.slice(0, 3)
      : aiRelatedProjects.length > 0
        ? aiRelatedProjects.slice(0, 3)
        : mernProjects.length > 0
          ? mernProjects.slice(0, 3)
          : knowledge.getFeaturedProjects(3);

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

  return {
    text: queryMatch
      ? `Here is a focused breakdown of ${queryMatch.title}.`
      : `I found ${projects.length} standout project${projects.length > 1 ? 's' : ''} to start with.`,
    cards,
    actions: [
      action('Open Projects Section', { kind: 'scroll', target: portfolio.sections.projects }),
      action('Open GitHub Stats', { kind: 'route', target: portfolio.routes.githubStats }),
    ],
    followUps: QUICK_FOLLOW_UPS.projects,
    memory: {
      lastProjectId: projects[0]?.id ?? null,
      lastTopic: 'projects',
    },
  };
}

function buildSkillsResponse(knowledge, portfolio) {
  const topSkills = knowledge.getSkillSummary().slice(0, 3);

  return {
    text: 'These skill groups represent how Sabbir ships frontend, backend, and production tooling work.',
    cards: topSkills.map(createSkillCard),
    actions: [action('Open Skills Section', { kind: 'scroll', target: portfolio.sections.skills })],
    followUps: QUICK_FOLLOW_UPS.skills,
    memory: {
      lastTopic: 'skills',
    },
  };
}

function buildContactResponse(portfolio) {
  return {
    text: 'Here are the fastest contact options if you want to discuss a role or project.',
    cards: [createContactCard(portfolio)],
    actions: [
      action('Open Contact Section', { kind: 'scroll', target: portfolio.sections.contact }),
      action('Copy Email', { kind: 'copy-email', value: portfolio.contact.email }),
      action('Download Resume', { kind: 'external', target: portfolio.resume.publicPath }),
    ],
    followUps: QUICK_FOLLOW_UPS.contact,
    memory: {
      lastTopic: 'contact',
    },
  };
}

function buildExperienceResponse(portfolio) {
  const topExperience = portfolio.experience[0];

  return {
    text: topExperience
      ? `${topExperience.role} at ${topExperience.company}: ${topExperience.desc}`
      : 'Experience details are available in the profile sections.',
    actions: [action('Open About Section', { kind: 'scroll', target: portfolio.sections.about })],
    followUps: [
      'Show projects aligned with this experience',
      'What is current focus?',
      'Show contact',
    ],
    memory: {
      lastTopic: 'experience',
    },
  };
}

function buildEducationResponse(portfolio) {
  const latest = portfolio.education[0];

  return {
    text: latest
      ? `Latest education: ${latest.degree} at ${latest.institution}.`
      : 'Education details are available in the Education page.',
    actions: [action('Open Education', { kind: 'route', target: portfolio.routes.education })],
    followUps: ['Show certifications', 'Show current focus', 'Contact Sabbir'],
    memory: {
      lastTopic: 'education',
    },
  };
}

function buildCertificationResponse(knowledge, portfolio) {
  const certs = knowledge.getCertifications(3);

  return {
    text: `Sabbir currently highlights ${portfolio.certifications.length} certification and training records.`,
    cards: certs.map((cert) => ({
      type: 'certification',
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      link: cert.link,
    })),
    actions: [
      action('Open Certifications', { kind: 'route', target: portfolio.routes.certifications }),
    ],
    followUps: ['Show skills', 'Show projects', 'How to contact Sabbir'],
    memory: {
      lastTopic: 'certifications',
    },
  };
}

function buildResumeResponse(portfolio) {
  return {
    text: 'You can review the latest resume instantly from the button below.',
    actions: [
      action('Open Resume (PDF)', { kind: 'external', target: portfolio.resume.publicPath }),
      action('Open Resume (Drive)', { kind: 'external', target: portfolio.resume.driveUrl }),
    ],
    memory: {
      lastTopic: 'resume',
    },
  };
}

function buildGithubResponse(portfolio) {
  return {
    text: 'GitHub highlights include activity stats, language mix, and recent repositories.',
    actions: [
      action('Open GitHub Stats', { kind: 'route', target: portfolio.routes.githubStats }),
      action('Open GitHub Profile', { kind: 'external', target: portfolio.github.profileUrl }),
    ],
    followUps: ['Show best projects', 'Which stack is strongest?', 'How can I contact Sabbir?'],
    memory: {
      lastTopic: 'github',
    },
  };
}

function buildGreetingResponse(portfolio) {
  return {
    text: `Hi! I can help you evaluate ${portfolio.name}'s projects, stack, and fit quickly.`,
    actions: [
      action('Best Projects', { kind: 'prompt', prompt: 'Best projects' }),
      action('Skills', { kind: 'prompt', prompt: 'Show skills' }),
      action('Contact', { kind: 'prompt', prompt: 'How can I contact Sabbir?' }),
    ],
  };
}

function buildThanksResponse() {
  return {
    text: 'Happy to help. Ask for projects, stack depth, GitHub evidence, or direct contact when ready.',
  };
}

function buildContextualFollowUp(message, memory, knowledge) {
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes('backend') && memory.lastProjectId) {
    const backend = knowledge.getBackendDetails(memory.lastProjectId);

    if (backend) {
      const backendTechText =
        backend.backendTech.length > 0
          ? backend.backendTech.join(', ')
          : 'No explicit backend stack is listed in the current project data.';

      return {
        text: `${backend.title} backend stack: ${backendTechText}`,
        cards: [
          {
            type: 'backend',
            title: backend.title,
            stack: backend.backendTech,
            endpoints: backend.apiPreview,
          },
        ],
        followUps: ['Show full project details', 'Open GitHub', 'What about security?'],
      };
    }
  }

  return null;
}

export function generateLocalResponse({ message, knowledge, portfolio, memory }) {
  const contextResponse = buildContextualFollowUp(message, memory, knowledge);

  if (contextResponse) {
    return {
      intent: 'projects',
      ...contextResponse,
    };
  }

  const { intent } = detectIntent(message);

  switch (intent) {
    case 'greeting':
      return { intent, ...buildGreetingResponse(portfolio) };
    case 'thanks':
      return { intent, ...buildThanksResponse() };
    case 'projects':
    case 'react':
    case 'mern':
    case 'ai':
    case 'security':
      return { intent, ...buildProjectResponse(message, intent, knowledge, portfolio) };
    case 'skills':
      return { intent, ...buildSkillsResponse(knowledge, portfolio) };
    case 'contact':
    case 'social_links':
      return { intent, ...buildContactResponse(portfolio) };
    case 'experience':
    case 'about':
      return { intent, ...buildExperienceResponse(portfolio) };
    case 'education':
      return { intent, ...buildEducationResponse(portfolio) };
    case 'certifications':
      return { intent, ...buildCertificationResponse(knowledge, portfolio) };
    case 'resume':
      return { intent, ...buildResumeResponse(portfolio) };
    case 'github':
      return { intent, ...buildGithubResponse(portfolio) };
    case 'availability':
      return {
        intent,
        text: portfolio.availability,
        actions: [
          action('Open Contact Section', { kind: 'scroll', target: portfolio.sections.contact }),
        ],
        followUps: ['Show contact options', 'Show projects', 'Download resume'],
      };
    default:
      return { intent: 'unknown', ...defaultUnknownResponse() };
  }
}

export async function generateAIResponse(context) {
  return generateLocalResponse(context);
}

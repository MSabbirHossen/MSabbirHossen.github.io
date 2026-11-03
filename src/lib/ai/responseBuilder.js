import { detectIntent } from './intentMatcher.js';
import {
  getTemplate,
  getActionLabels,
  getFollowUps,
  getCardBadge,
  getSafeLanguage,
} from './responseTemplates.js';

function directFollowUp(label, actionConfig) {
  return { label, action: actionConfig };
}

function contactFollowUps(portfolio, language = 'en') {
  const labels = getActionLabels(language);

  const followUps = [
    directFollowUp(labels.copyEmail, { kind: 'copy-email', value: portfolio.contact.email }),
    directFollowUp(labels.openLinkedIn, {
      kind: 'external',
      target: portfolio.contact.linkedin,
    }),
    directFollowUp(labels.downloadResume, {
      kind: 'external',
      target: portfolio.resume.publicPath,
    }),
  ];

  if (portfolio.contact.whatsappUrl) {
    followUps.unshift(
      directFollowUp(labels.chatWhatsApp, {
        kind: 'external',
        target: portfolio.contact.whatsappUrl,
      })
    );
  }

  return followUps;
}

function createProjectCard(project, language = 'en') {
  const isFlagship = project.featuredOrder === 1;
  const isFeatured = project.featured;

  return {
    type: 'project',
    title: project.title,
    badge: getCardBadge(isFlagship, isFeatured, project.category, language),
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

export function defaultUnknownResponse(language = 'en') {
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);
  const followUps = getFollowUps('default', language);

  return {
    text: tpl.unknown,
    actions: [
      action(labels.reportBdPrompt, { kind: 'prompt', prompt: followUps[0] }),
      action(labels.topProjectsPrompt, { kind: 'prompt', prompt: followUps[1] }),
      action(labels.whyHirePrompt, { kind: 'prompt', prompt: followUps[2] }),
      action(labels.contactPrompt, { kind: 'prompt', prompt: followUps[3] }),
    ],
    followUps,
  };
}

export function getErrorFallbackResponse(language = 'en') {
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);
  const followUps = getFollowUps('default', language);

  return {
    text: tpl.errorFallback,
    actions: [
      action(labels.topProjectsPrompt, {
        kind: 'prompt',
        prompt: followUps[0] || 'Report BD',
      }),
      action(labels.contactPrompt, {
        kind: 'prompt',
        prompt: followUps[3] || 'Contact Sabbir',
      }),
    ],
  };
}

function buildSingleProjectResponse(project, portfolio, language = 'en') {
  const isReportBd = project.id === 'report-bd';
  const isEta = project.id === 'eta-digital-education-platform';
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);

  let intro = `Here is a detailed breakdown of **${project.title}**:`;

  if (isReportBd) {
    intro = tpl.reportBd;
  } else if (isEta) {
    intro = tpl.eta;
  }

  const actions = [action(labels.caseStudy, { kind: 'route', target: `/projects/${project.id}` })];

  if (project.liveUrl) {
    actions.push(action(labels.liveDemo, { kind: 'external', target: project.liveUrl }));
  }

  if (project.githubUrl) {
    actions.push(action(labels.githubCode, { kind: 'external', target: project.githubUrl }));
  }

  actions.push(
    action(labels.openProjects, { kind: 'scroll', target: portfolio.sections.projects })
  );

  const followUps = isReportBd
    ? getFollowUps('reportBd', language)
    : isEta
      ? getFollowUps('eta', language)
      : getFollowUps('projects', language);

  return {
    text: intro,
    cards: [createProjectCard(project, language)],
    actions,
    followUps,
    memory: {
      lastProjectId: project.id,
      lastTopic: 'projects',
    },
  };
}

function buildProjectResponse(message, intent, knowledge, portfolio, memory, language = 'en') {
  const queryMatch = knowledge.findProjectByQuery(message);

  if (queryMatch) {
    return buildSingleProjectResponse(queryMatch, portfolio, language);
  }

  const rememberedProject =
    intent === 'projects' && memory?.lastProjectId
      ? knowledge.getProjectById(memory.lastProjectId)
      : null;

  if (
    rememberedProject &&
    (message.toLowerCase().includes('this project') ||
      message.toLowerCase().includes('about it') ||
      message.includes('هذا المشروع') ||
      message.includes('এই প্রজেক্ট'))
  ) {
    return buildSingleProjectResponse(rememberedProject, portfolio, language);
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

  const tpl = getTemplate(language);
  const labels = getActionLabels(language);
  const followUps = getFollowUps('projects', language);

  if (!projects.length) {
    return {
      text: tpl.headlines.notFound,
      actions: [
        action(labels.openProjects, { kind: 'scroll', target: portfolio.sections.projects }),
      ],
      followUps,
      memory: {
        lastProjectId: null,
        lastTopic: 'projects',
      },
    };
  }

  const cards = projects.map((p) => createProjectCard(p, language));
  const headline =
    intent === 'mern'
      ? tpl.headlines.mern
      : intent === 'security'
        ? tpl.headlines.security
        : tpl.headlines.default;

  return {
    text: headline,
    cards,
    actions: [
      action(labels.exploreReportBd, { kind: 'prompt', prompt: followUps[0] }),
      action(labels.openProjects, { kind: 'scroll', target: portfolio.sections.projects }),
      action(labels.openGithubStats, { kind: 'scroll', target: portfolio.sections.githubStats }),
    ],
    followUps,
    memory: {
      lastProjectId: projects[0]?.id ?? null,
      lastTopic: 'projects',
    },
  };
}

function buildWhyHireResponse(portfolio, language = 'en') {
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);
  const followUps = getFollowUps('whyHire', language);

  return {
    text: tpl.whyHire,
    cards: [createContactCard(portfolio)],
    actions: [
      action(labels.viewReportBd, { kind: 'prompt', prompt: followUps[0] }),
      action(labels.openSkills, { kind: 'scroll', target: portfolio.sections.skills }),
      action(labels.downloadResume, {
        kind: 'external',
        target: portfolio.resume.publicPath,
      }),
    ],
    followUps,
    memory: {
      lastTopic: 'why_hire',
    },
  };
}

function buildArchitectureResponse(portfolio, language = 'en') {
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);
  const followUps = getFollowUps('architecture', language);

  return {
    text: tpl.architecture,
    actions: [
      action(labels.reportBdDeepDive, { kind: 'prompt', prompt: followUps[0] }),
      action(labels.openProjects, { kind: 'scroll', target: portfolio.sections.projects }),
      action(labels.contactPrompt, { kind: 'prompt', prompt: followUps[2] }),
    ],
    followUps,
    memory: {
      lastTopic: 'architecture',
    },
  };
}

function buildTypeScriptResponse(portfolio, language = 'en') {
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);
  const followUps = getFollowUps('typescript', language);

  return {
    text: tpl.typescript,
    actions: [
      action(labels.viewReportBd, { kind: 'prompt', prompt: followUps[0] }),
      action(labels.openSkills, { kind: 'scroll', target: portfolio.sections.skills }),
      action(labels.contactPrompt, { kind: 'prompt', prompt: followUps[2] }),
    ],
    followUps,
    memory: {
      lastTopic: 'typescript',
    },
  };
}

function buildSkillsResponse(knowledge, portfolio, language = 'en') {
  const topSkills = knowledge.getSkillSummary().slice(0, 4);
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);
  const followUps = getFollowUps('skills', language);

  return {
    text: tpl.skills,
    cards: topSkills.map(createSkillCard),
    actions: [
      action(labels.seeSkillsReportBd, { kind: 'prompt', prompt: followUps[0] }),
      action(labels.openSkills, { kind: 'scroll', target: portfolio.sections.skills }),
      action(labels.viewResume, { kind: 'external', target: portfolio.resume.publicPath }),
    ],
    followUps,
    memory: {
      lastTopic: 'skills',
    },
  };
}

function buildContactResponse(portfolio, language = 'en') {
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);

  return {
    text: tpl.contact,
    cards: [createContactCard(portfolio)],
    actions: [
      action(labels.openContact, { kind: 'scroll', target: portfolio.sections.contact }),
      action(labels.openLinkedIn, { kind: 'external', target: portfolio.contact.linkedin }),
    ],
    followUps: contactFollowUps(portfolio, language),
    memory: {
      lastTopic: 'contact',
    },
  };
}

function buildExperienceResponse(portfolio, language = 'en') {
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);
  const followUps = getFollowUps('experience', language);

  return {
    text: tpl.experience,
    actions: [
      action(labels.exploreReportBd, { kind: 'prompt', prompt: followUps[0] }),
      action(labels.openAbout, { kind: 'scroll', target: portfolio.sections.about }),
      action(labels.resumePdf, { kind: 'external', target: portfolio.resume.publicPath }),
    ],
    followUps,
    memory: {
      lastTopic: 'experience',
    },
  };
}

function buildCurrentFocusResponse(portfolio, language = 'en') {
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);
  const followUps = getFollowUps('currentFocus', language);

  return {
    text: tpl.currentFocus,
    cards: portfolio.currentFocus.map((item) => ({
      type: 'focus',
      title: item.title,
      organization: item.organization,
      period: item.period,
      description: item.description,
    })),
    actions: [
      action(labels.openFocus, { kind: 'scroll', target: portfolio.sections.currentFocus }),
      action(labels.viewLatestProject, { kind: 'prompt', prompt: followUps[0] }),
    ],
    followUps,
    memory: {
      lastTopic: 'current_focus',
    },
  };
}

function buildEducationResponse(portfolio, language = 'en') {
  const latest = portfolio.education[0];
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);
  const followUps = getFollowUps('education', language);

  return {
    text: tpl.education(latest),
    actions: [
      action(labels.openEducation, { kind: 'scroll', target: portfolio.sections.education }),
      action(labels.educationTimeline, { kind: 'navigate', target: '/education' }),
    ],
    followUps,
    memory: {
      lastTopic: 'education',
    },
  };
}

function buildCertificationResponse(knowledge, portfolio, language = 'en') {
  const certs = knowledge.getCertifications(4);
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);
  const followUps = getFollowUps('certifications', language);

  return {
    text: tpl.certifications(portfolio.certifications.length),
    cards: certs.map((cert) => ({
      type: 'certification',
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      link: cert.link,
    })),
    actions: [
      action(labels.openCerts, { kind: 'scroll', target: portfolio.sections.certifications }),
      action(labels.viewAllCerts, { kind: 'navigate', target: '/certifications' }),
    ],
    followUps,
    memory: {
      lastTopic: 'certifications',
    },
  };
}

function buildResumeResponse(portfolio, language = 'en') {
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);
  const followUps = getFollowUps('resume', language);

  return {
    text: tpl.resume,
    actions: [
      action(labels.resumePdf, { kind: 'external', target: portfolio.resume.publicPath }),
      action(labels.resumeDrive, { kind: 'external', target: portfolio.resume.driveUrl }),
      action(labels.whyHirePrompt, { kind: 'prompt', prompt: followUps[0] }),
    ],
    followUps,
    memory: {
      lastTopic: 'resume',
    },
  };
}

function buildLlmsTxtResponse(portfolio, language = 'en') {
  const path = portfolio.llmsTxt?.path || '/llms.txt';
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);
  const followUps = getFollowUps('llmsTxt', language);

  return {
    text: tpl.llmsTxt,
    actions: [
      action(labels.openLlmsTxt, { kind: 'external', target: path }),
      action(labels.exploreReportBd, { kind: 'prompt', prompt: followUps[0] }),
      action(labels.contactPrompt, { kind: 'prompt', prompt: followUps[2] }),
    ],
    followUps,
    memory: {
      lastTopic: 'llms_txt',
    },
  };
}

function buildGithubResponse(portfolio, language = 'en') {
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);
  const followUps = getFollowUps('github', language);

  return {
    text: tpl.github,
    actions: [
      action(labels.openGithubStats, { kind: 'scroll', target: portfolio.sections.githubStats }),
      action(labels.openGithubProfile, { kind: 'external', target: portfolio.github.profileUrl }),
    ],
    followUps,
    memory: {
      lastTopic: 'github',
    },
  };
}

function buildGuideResponse(language = 'en') {
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);
  const followUps = getFollowUps('guide', language);

  return {
    text: tpl.guide,
    actions: [
      action(labels.openFullGuide, { kind: 'route', target: '/guide' }),
      action(labels.exploreReportBd, { kind: 'prompt', prompt: followUps[0] }),
    ],
    followUps,
    memory: {
      lastTopic: 'guide',
    },
  };
}

function buildGreetingResponse(portfolio, language = 'en') {
  const tpl = getTemplate(language);
  const labels = getActionLabels(language);
  const followUps = getFollowUps('default', language);

  return {
    text: tpl.greeting(portfolio.name),
    actions: [
      action(labels.reportBdPrompt, { kind: 'prompt', prompt: followUps[0] }),
      action(labels.topProjectsPrompt, { kind: 'prompt', prompt: followUps[1] }),
      action(labels.whyHirePrompt, { kind: 'prompt', prompt: followUps[2] }),
      action(labels.skillsPrompt, { kind: 'prompt', prompt: followUps[3] }),
    ],
    followUps,
  };
}

function buildThanksResponse(language = 'en') {
  const tpl = getTemplate(language);
  const followUps = getFollowUps('whyHire', language);

  return {
    text: tpl.thanks,
    followUps,
  };
}

function buildContextualFollowUp(message, memory, knowledge, conversation = [], language = 'en') {
  const normalizedMessage = message.toLowerCase();

  const recentConversationText = conversation
    .slice(-4)
    .map((turn) => turn.content)
    .join(' ')
    .toLowerCase();

  const hasProjectContext =
    memory.lastProjectId ||
    /project|built|technolog|report|eta|life-os|مشروع|مشاريع|প্রজেক্ট/.test(recentConversationText);

  if (
    (normalizedMessage.includes('backend') ||
      normalizedMessage.includes('api') ||
      normalizedMessage.includes('server') ||
      normalizedMessage.includes('خلفية') ||
      normalizedMessage.includes('سيرفر') ||
      normalizedMessage.includes('ব্যাকএন্ড') ||
      normalizedMessage.includes('এপিআই')) &&
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

      const tpl = getTemplate(language);
      const labels = getActionLabels(language);
      const followUps = getFollowUps('backend', language);

      return {
        text: tpl.contextualBackend(backend.title, backendTechText, architectureText),
        cards: [
          {
            type: 'backend',
            title: backend.title,
            stack: backend.backendTech,
            endpoints: backend.apiPreview,
          },
        ],
        actions: [
          action(labels.caseStudy, { kind: 'route', target: `/projects/${targetId}` }),
          action(labels.whyHirePrompt, { kind: 'prompt', prompt: followUps[0] }),
        ],
        followUps,
      };
    }
  }

  return null;
}

export function generateLocalResponse({
  message,
  knowledge,
  portfolio,
  memory,
  conversation,
  language = 'en',
}) {
  const safeLang = getSafeLanguage(language);
  const contextResponse = buildContextualFollowUp(
    message,
    memory,
    knowledge,
    conversation,
    safeLang
  );

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
      ...buildSingleProjectResponse(queryMatch, portfolio, safeLang),
    };
  }

  const { intent } = detectIntent(message);
  const tpl = getTemplate(safeLang);
  const labels = getActionLabels(safeLang);
  const followUps = getFollowUps('availability', safeLang);

  switch (intent) {
    case 'greeting':
      return { intent, ...buildGreetingResponse(portfolio, safeLang) };
    case 'thanks':
      return { intent, ...buildThanksResponse(safeLang) };
    case 'project_reportbd': {
      const reportBd = knowledge.getProjectById('report-bd') ?? knowledge.getFeaturedProjects(1)[0];
      return { intent: 'projects', ...buildSingleProjectResponse(reportBd, portfolio, safeLang) };
    }
    case 'project_eta': {
      const eta = knowledge.getProjectById('eta-digital-education-platform');
      return { intent: 'projects', ...buildSingleProjectResponse(eta, portfolio, safeLang) };
    }
    case 'project_lifeos': {
      const lifeOs = knowledge.getProjectById('life-os');
      return { intent: 'projects', ...buildSingleProjectResponse(lifeOs, portfolio, safeLang) };
    }
    case 'why_hire':
      return { intent, ...buildWhyHireResponse(portfolio, safeLang) };
    case 'architecture':
      return { intent, ...buildArchitectureResponse(portfolio, safeLang) };
    case 'typescript':
      return { intent, ...buildTypeScriptResponse(portfolio, safeLang) };
    case 'projects':
    case 'react':
    case 'mern':
    case 'ai':
    case 'security':
      return {
        intent,
        ...buildProjectResponse(message, intent, knowledge, portfolio, memory, safeLang),
      };
    case 'skills':
      return { intent, ...buildSkillsResponse(knowledge, portfolio, safeLang) };
    case 'contact':
    case 'social_links':
      return { intent, ...buildContactResponse(portfolio, safeLang) };
    case 'experience':
    case 'about':
      return { intent, ...buildExperienceResponse(portfolio, safeLang) };
    case 'current_focus':
      return { intent, ...buildCurrentFocusResponse(portfolio, safeLang) };
    case 'education':
      return { intent, ...buildEducationResponse(portfolio, safeLang) };
    case 'certifications':
      return { intent, ...buildCertificationResponse(knowledge, portfolio, safeLang) };
    case 'resume':
      return { intent, ...buildResumeResponse(portfolio, safeLang) };
    case 'llms_txt':
      return { intent, ...buildLlmsTxtResponse(portfolio, safeLang) };
    case 'guide':
      return { intent, ...buildGuideResponse(safeLang) };
    case 'github':
      return { intent, ...buildGithubResponse(portfolio, safeLang) };
    case 'availability':
      return {
        intent,
        text: tpl.availability(portfolio.availability),
        actions: [
          action(labels.openContact, { kind: 'scroll', target: portfolio.sections.contact }),
          action(labels.downloadResume, {
            kind: 'external',
            target: portfolio.resume.publicPath,
          }),
        ],
        followUps,
      };
    default:
      return { intent: 'unknown', ...defaultUnknownResponse(safeLang) };
  }
}

export async function generateAIResponse(context) {
  return generateLocalResponse(context);
}

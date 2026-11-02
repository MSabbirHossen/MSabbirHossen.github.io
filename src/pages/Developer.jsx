import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaBuilding,
  FaCheck,
  FaClock,
  FaCode,
  FaCopy,
  FaDiscord,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFacebookF,
  FaGithub,
  FaGlobe,
  FaGraduationCap,
  FaLinkedinIn,
  FaPaperPlane,
  FaStar,
  FaTelegramPlane,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa';
import { HiMiniShieldCheck, HiSparkles } from 'react-icons/hi2';

import { portfolioData } from '../data';
import Typography from '../components/common/Typography';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Reveal from '../components/animations/Reveal';

export const DEVELOPER_CHANNELS = [
  // Direct Contacts
  {
    name: 'WhatsApp',
    handle: '+8801773511874',
    subHandle: 'Direct Chat',
    category: 'Direct Chat',
    role: 'Instant Messaging & Voice',
    description:
      'Direct WhatsApp connection for quick project inquiries, hiring discussions, instant messaging, and consultations.',
    link: 'https://wa.me/+8801773511874',
    color: '#25D366',
    actionLabel: 'Chat on WhatsApp',
    icon: FaWhatsapp,
  },
  {
    name: 'Telegram',
    handle: '@sabb1rhossen',
    subHandle: 'Direct Chat',
    category: 'Direct Chat',
    role: 'Instant Messaging & Community',
    description:
      'Connect directly on Telegram for real-time discussions, dev updates, and community tech chats.',
    link: 'https://t.me/sabb1rhossen',
    color: '#229ED9',
    actionLabel: 'Open Telegram',
    icon: FaTelegramPlane,
  },
  {
    name: 'Email',
    handle: 'mshossen724@gmail.com',
    email: 'mshossen724@gmail.com',
    subHandle: 'Official Mail',
    category: 'Direct Chat',
    role: 'Official & Business Inquiries',
    description:
      'Direct email channel for business proposals, formal recruitment, technical consulting, and collaboration.',
    link: 'mailto:mshossen724@gmail.com',
    isEmail: true,
    color: '#EA4335',
    actionLabel: 'Send Email',
    icon: FaEnvelope,
  },

  // Official Platforms
  {
    name: 'LLMs.txt (AI Profile)',
    handle: 'llms.txt',
    subHandle: 'Machine-Readable Context',
    category: 'Platforms',
    role: 'AI & LLM Structured Context',
    description:
      'Curated plaintext summary of projects, architecture, and skills formatted according to the official llms.txt standard for AI tools and crawlers.',
    link: '/llms.txt',
    color: '#10B981',
    actionLabel: 'Read llms.txt',
    icon: HiSparkles,
  },
  {
    name: 'GitHub',
    handle: 'MSabbirHossen',
    subHandle: 'Code Repository & Monorepos',
    category: 'Platforms',
    role: 'Open-Source & Codebase Evidence',
    description:
      'Inspect production monorepos, atomic git commits, automated tests, and project architectures.',
    link: 'https://github.com/MSabbirHossen',
    color: '#24292E',
    actionLabel: 'Visit GitHub Profile',
    icon: FaGithub,
  },
  {
    name: 'LinkedIn',
    handle: 'in/sabb1rhossen',
    subHandle: 'Professional Network',
    category: 'Platforms',
    role: 'Professional Network & Career',
    description:
      'Career milestones, professional background, developer endorsements, and industry network connections.',
    link: 'https://www.linkedin.com/in/sabb1rhossen/',
    color: '#0A66C2',
    actionLabel: 'Connect on LinkedIn',
    icon: FaLinkedinIn,
  },
  {
    name: 'Official Portfolio',
    handle: 'msabbirhossen.github.io',
    subHandle: 'Full-Stack Showcase',
    category: 'Platforms',
    role: 'Production Web Portfolio',
    description:
      'Comprehensive interactive portfolio showcase highlighting MERN stack projects, skills, education, and credentials.',
    link: 'https://msabbirhossen.github.io/',
    color: '#6366F1',
    actionLabel: 'Explore Homepage',
    icon: FaGlobe,
  },

  // Ventures & Flagships
  {
    name: 'Report BD (BPS Report)',
    handle: 'Flagship MERN Monorepo',
    subHandle: 'Incident Reporting & Mentorship',
    category: 'Ventures',
    role: 'Institutional Mentorship Platform',
    description:
      'Multi-tenant personal reporting and mentorship platform built with TypeScript, React 19, Express, MongoDB Atlas, Firebase Auth, and Zod.',
    link: 'https://personalreport-iota.vercel.app/',
    isUpcoming: false,
    color: '#059669',
    actionLabel: 'Live App',
    icon: FaCode,
  },
  {
    name: 'Exploratory Training Academy',
    handle: 'ETA LMS Platform',
    subHandle: 'EdTech Institute',
    category: 'Ventures',
    role: 'Tech Training & Mentorship',
    description:
      'Complete digital education management platform (LMS) with multi-role dashboards, interactive quizzes, video tracking, and Redux Toolkit state.',
    link: 'https://eta-web-omega.vercel.app/',
    isUpcoming: false,
    color: '#0284C7',
    actionLabel: 'Visit ETA',
    icon: FaGraduationCap,
  },
  {
    name: 'Part-time Coder',
    handle: 'Software Studio',
    subHandle: 'Tech Studio & Products',
    category: 'Ventures',
    role: 'Software Studio & Products',
    description:
      'Engineering scalable software systems, personal productivity suites, and bespoke digital solutions for intentional growth.',
    link: null,
    isUpcoming: true,
    statusText: 'Coming Soon',
    color: '#4F46E5',
    actionLabel: 'Coming Soon',
    icon: FaBuilding,
  },

  // Social & Community
  {
    name: 'YouTube',
    handle: '@sabb1rhossen',
    subHandle: 'Tech Videos & Tutorials',
    category: 'Social Media',
    role: 'Tutorials & Development Logs',
    description:
      'Practical software engineering walkthroughs, web development tutorials, and architectural breakdown videos.',
    link: 'https://youtube.com/@sabb1rhossen',
    color: '#FF0000',
    actionLabel: 'Subscribe on YouTube',
    icon: FaYoutube,
  },
  {
    name: 'Facebook',
    handle: 'sabb1rhossen',
    subHandle: 'Social Updates',
    category: 'Social Media',
    role: 'Social & Life Updates',
    description:
      'Casual updates, community conversations, and life milestones from Md. Sabbir Hossen.',
    link: 'https://web.facebook.com/sabb1rhossen/',
    color: '#1877F2',
    actionLabel: 'Follow on Facebook',
    icon: FaFacebookF,
  },
  {
    name: 'Discord Community',
    handle: 'sabb1rhossen',
    subHandle: 'Dev Chat',
    category: 'Social Media',
    role: 'Developer Collaboration & Chat',
    description:
      'Connect on Discord for developer banter, code reviews, tech discussions, and collaborative hacking.',
    link: 'https://discord.com/users/1330872545330860154',
    color: '#5865F2',
    actionLabel: 'Connect on Discord',
    icon: FaDiscord,
  },
];

const CORE_TOOLKIT = [
  'React 19',
  'TypeScript',
  'Node.js',
  'Express 4',
  'MongoDB Atlas',
  'Tailwind CSS v4',
  'Zod Validation',
  'Redux Toolkit',
  'TanStack Query',
  'Framer Motion',
  'Firebase Auth',
  'Git Workspaces',
];

export default function DeveloperPage() {
  const { personalInfo } = portfolioData;
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const siteUrl = personalInfo.website.replace(/\/$/, '');
  const canonicalUrl = `${siteUrl}/developer`;
  const pageTitle = `Developer & Creator Hub | ${personalInfo.name}`;
  const pageDescription =
    'Official developer hub, direct communication channels, venture platforms, and social profiles of Md. Sabbir Hossen (Part-Time Coder), creator of Report BD, ETA, and Life OS.';
  const socialImage = `${siteUrl}/og-image.svg`;

  const handleCopyProfile = () => {
    navigator.clipboard.writeText('https://msabbirhossen.github.io/developer');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyEmail = (email = personalInfo.email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getWhatsAppUrl = (text) => {
    const trimmed = text?.trim();
    return trimmed
      ? `https://wa.me/+8801773511874?text=${encodeURIComponent(trimmed)}`
      : 'https://wa.me/+8801773511874';
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const url = getWhatsAppUrl(feedbackText);
    window.open(url, '_blank', 'noopener,noreferrer');
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackText('');
      setFeedbackSent(false);
    }, 4000);
  };

  const filteredLinks = useMemo(() => {
    if (filterCategory === 'All') return DEVELOPER_CHANNELS;
    return DEVELOPER_CHANNELS.filter((item) => item.category === filterCategory);
  }, [filterCategory]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="profile" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={socialImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={socialImage} />
      </Helmet>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Navigation & Header */}
        <div className="mb-10 sm:mb-12">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <Button
                as={Link}
                to="/"
                variant="ghost"
                size="sm"
                icon={FaArrowLeft}
                className="px-0 text-secondary hover:text-accent-primary"
              >
                Back to Home
              </Button>
              <Badge variant="outline" size="sm">
                ✦ Creator &amp; Channels
              </Badge>
            </div>
          </Reveal>

          <div className="space-y-3">
            <Reveal delay={0.05}>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-primary/25 bg-accent-primary/10 px-3 py-1 text-xs font-semibold text-accent-primary">
                <HiSparkles className="h-3.5 w-3.5" />
                <span>Developer &amp; Community Hub</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Typography
                variant="h1"
                className="text-balance text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary"
              >
                Connect with Md. Sabbir Hossen
              </Typography>
            </Reveal>

            <Reveal delay={0.15}>
              <Typography
                variant="body"
                className="max-w-3xl text-sm sm:text-base leading-relaxed text-secondary"
              >
                Junior MERN Stack Developer, software builder, and creator of Report BD, Exploratory
                Training Academy (ETA), and Life OS. Reach out directly via WhatsApp, explore
                developer profiles, inspect machine-readable AI context, or share collaboration
                ideas.
              </Typography>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Button
                  size="sm"
                  variant="primary"
                  icon={FaWhatsapp}
                  onClick={() =>
                    window.open('https://wa.me/+8801773511874', '_blank', 'noopener,noreferrer')
                  }
                  className="shadow-sm shadow-accent-primary/20"
                >
                  WhatsApp
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  icon={copiedEmail ? FaCheck : FaCopy}
                  onClick={() => handleCopyEmail(personalInfo.email)}
                >
                  {copiedEmail ? 'Email Copied!' : 'Copy Email'}
                </Button>
                <Button size="sm" variant="ghost" icon={FaGlobe} onClick={handleCopyProfile}>
                  {copiedLink ? 'Link Copied!' : 'Share Profile'}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  icon={HiSparkles}
                  as="a"
                  href="/llms.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  llms.txt (AI Profile)
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Hero Showcase Card */}
        <Reveal delay={0.25}>
          <Card
            spotlight
            className="relative mb-12 overflow-hidden rounded-3xl border border-accent-primary/25 bg-gradient-to-br from-accent-primary/10 via-surface to-surface p-6 sm:p-8 shadow-xl shadow-black/5"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative shrink-0">
                  <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-accent-primary via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-accent-primary/20">
                    <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-surface text-2xl font-black text-primary sm:text-3xl">
                      MS
                    </div>
                  </div>
                  <span
                    className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-surface bg-emerald-500 animate-pulse"
                    title="Active Developer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Typography
                      variant="h2"
                      className="text-2xl font-black text-primary sm:text-3xl"
                    >
                      Md. Sabbir Hossen
                    </Typography>
                    <Badge
                      variant="outline"
                      size="sm"
                      className="border-accent-primary/30 text-accent-primary"
                    >
                      Part-Time Coder
                    </Badge>
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-500">
                      <HiMiniShieldCheck className="h-3.5 w-3.5" /> Available for Hire
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-accent-primary">
                    Junior MERN Stack Developer • Creator of Report BD &amp; ETA
                  </p>
                  <p className="max-w-2xl text-xs font-medium leading-relaxed text-secondary">
                    Engineering reliable full-stack applications with React 19, TypeScript, Express,
                    and MongoDB Atlas. Focused on multi-tenant architecture, data integrity, schema
                    validation with Zod, and security-aware web development.
                  </p>

                  {/* Direct Contact Badges Strip */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-semibold">
                    <a
                      href="mailto:mshossen724@gmail.com"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-default bg-surface/80 px-2.5 py-1 text-primary transition-colors hover:border-accent-primary/40 hover:text-accent-primary"
                    >
                      <FaEnvelope className="h-3 w-3 text-[#EA4335]" />
                      <span>{personalInfo.email}</span>
                    </a>
                    <a
                      href="https://wa.me/+8801773511874"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-default bg-surface/80 px-2.5 py-1 text-primary transition-colors hover:border-[#25D366]/40 hover:text-[#25D366]"
                    >
                      <FaWhatsapp className="h-3 w-3 text-[#25D366]" />
                      <span>WhatsApp: +8801773511874</span>
                    </a>
                    <a
                      href="https://t.me/sabb1rhossen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-default bg-surface/80 px-2.5 py-1 text-primary transition-colors hover:border-[#229ED9]/40 hover:text-[#229ED9]"
                    >
                      <FaTelegramPlane className="h-3 w-3 text-[#229ED9]" />
                      <span>Telegram: @sabb1rhossen</span>
                    </a>
                    <a
                      href="/llms.txt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-default bg-surface/80 px-2.5 py-1 text-primary transition-colors hover:border-emerald-500/40 hover:text-emerald-500"
                    >
                      <HiSparkles className="h-3 w-3 text-emerald-500" />
                      <span>llms.txt (AI Profile)</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex w-full shrink-0 flex-row gap-2 sm:w-auto md:flex-col">
                <Button
                  as={Link}
                  to="/"
                  variant="secondary"
                  size="sm"
                  icon={FaGlobe}
                  className="flex-1 sm:flex-none"
                >
                  Home Portfolio
                </Button>
                <Button
                  as="a"
                  href="https://github.com/MSabbirHossen"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="sm"
                  icon={FaStar}
                  className="flex-1 sm:flex-none"
                >
                  Star on GitHub
                </Button>
              </div>
            </div>

            {/* Core Toolkit Chips */}
            <div className="mt-6 border-t border-default/70 pt-5 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted mr-1">
                Core Toolkit:
              </span>
              {CORE_TOOLKIT.map((tech) => (
                <span
                  key={tech}
                  className="rounded-xl border border-default bg-surface/80 px-2.5 py-1 text-[11px] font-semibold text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        </Reveal>

        {/* Channels & Ventures Grid */}
        <div className="mb-14 space-y-6">
          <Reveal delay={0.3}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Typography variant="h2" className="text-xl sm:text-2xl font-bold tracking-tight">
                  Connect Across Channels &amp; Ventures
                </Typography>
                <p className="mt-0.5 text-xs font-medium text-secondary">
                  Direct communication lines, official profiles, and production initiatives.
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap self-start rounded-xl border border-default bg-surface/80 p-1 sm:self-auto gap-1">
                {['All', 'Direct Chat', 'Platforms', 'Ventures', 'Social Media'].map((cat) => {
                  const isActive = filterCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFilterCategory(cat)}
                      className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
                        isActive
                          ? 'bg-accent-primary text-white shadow-md shadow-accent-primary/20'
                          : 'text-secondary hover:text-primary hover:bg-surface'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLinks.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.name} delay={0.05 * (index % 6)}>
                  <Card
                    spotlight
                    hover
                    className="flex h-full flex-col justify-between border-default transition-all duration-200 hover:border-accent-primary/40 p-5"
                  >
                    <div className="space-y-3.5">
                      {/* Header Row */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm transition-transform group-hover:scale-105"
                            style={{ backgroundColor: item.color }}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-bold text-primary">{item.name}</h3>
                            <span className="block truncate text-xs font-semibold text-accent-primary">
                              {item.handle}
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0">
                          {item.isUpcoming ? (
                            <Badge variant="outline" size="xs">
                              <FaClock className="mr-1 h-2.5 w-2.5 text-amber-500" />
                              Soon
                            </Badge>
                          ) : item.isEmail ? (
                            <button
                              type="button"
                              onClick={() => handleCopyEmail(item.email)}
                              className="cursor-pointer rounded-xl p-1.5 text-muted transition-colors hover:bg-accent-primary/10 hover:text-accent-primary"
                              title="Copy Email"
                            >
                              {copiedEmail ? (
                                <FaCheck className="h-4 w-4 text-emerald-500" />
                              ) : (
                                <FaCopy className="h-4 w-4" />
                              )}
                            </button>
                          ) : (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex rounded-xl p-1.5 text-muted transition-colors hover:bg-accent-primary/10 hover:text-accent-primary"
                              title={`Open ${item.name}`}
                            >
                              <FaExternalLinkAlt className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      <div>
                        <Badge variant="outline" size="xs" className="mb-1.5">
                          {item.role}
                        </Badge>
                        <p className="text-xs font-medium leading-relaxed text-secondary">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-default/60 pt-3 text-xs">
                      <span className="text-[11px] font-semibold text-muted">{item.subHandle}</span>
                      {item.isUpcoming ? (
                        <span className="text-xs font-semibold italic text-muted">
                          {item.statusText || 'Coming Soon'}
                        </span>
                      ) : item.isEmail ? (
                        <button
                          type="button"
                          onClick={() => handleCopyEmail(item.email)}
                          className="cursor-pointer inline-flex items-center gap-1 text-xs font-bold text-accent-primary hover:underline"
                        >
                          {copiedEmail ? 'Copied' : 'Copy Email'} <FaCopy className="h-3 w-3" />
                        </button>
                      ) : (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-accent-primary hover:underline"
                        >
                          {item.actionLabel} <FaExternalLinkAlt className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Feedback & Collaboration Section via WhatsApp */}
        <Reveal delay={0.35}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Vision & Info Card */}
            <Card spotlight className="border-default p-6 lg:col-span-1" hover={false}>
              <div className="space-y-4 text-xs font-medium leading-relaxed text-secondary">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                    <FaCode className="h-4 w-4" />
                  </span>
                  <h3 className="text-sm font-bold text-primary">Direct Creator Channel</h3>
                </div>

                <p>
                  Whether you are a recruiter looking for a disciplined full-stack engineer, a
                  founder seeking custom web platforms, or a fellow developer with ideas, Sabbir
                  welcomes conversations.
                </p>

                <div className="rounded-2xl border border-default bg-surface/80 p-3.5 space-y-1">
                  <span className="block text-[11px] font-bold text-primary">
                    Fastest Response: WhatsApp
                  </span>
                  <span className="block text-[11px] text-muted">
                    Messages submitted through the form open directly on WhatsApp with your topic
                    pre-filled for prompt replies.
                  </span>
                </div>
              </div>
            </Card>

            {/* Direct Message Form */}
            <Card spotlight className="border-default p-6 lg:col-span-2" hover={false}>
              <h3 className="text-sm font-bold text-primary">Send a Note to Sabbir Hossen</h3>
              <p className="mt-0.5 text-xs text-muted">
                Pre-fill your message and deliver it directly via WhatsApp.
              </p>

              {feedbackSent ? (
                <div className="my-4 flex flex-col items-center justify-center space-y-2 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/30">
                    <FaCheck className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-primary">Opening WhatsApp...</h4>
                  <p className="max-w-sm text-xs text-secondary">
                    Your message has been pre-formatted for Md. Sabbir Hossen (+8801773511874).
                  </p>
                  <a
                    href={getWhatsAppUrl(feedbackText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-emerald-500 hover:underline"
                  >
                    Click here if WhatsApp didn’t launch automatically{' '}
                    <FaExternalLinkAlt className="h-3 w-3" />
                  </a>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="mt-4 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      '🚀 Project Inquiry',
                      '🤝 Full-Time / Hire',
                      '💡 Collaboration Idea',
                      '💬 General Feedback',
                    ].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          setFeedbackText((prev) =>
                            prev ? `${prev}\n[Topic: ${tag}] ` : `[Topic: ${tag}] `
                          )
                        }
                        className="cursor-pointer rounded-xl border border-default bg-surface/80 px-2.5 py-1 text-xs font-semibold text-secondary transition-all hover:border-accent-primary/40 hover:bg-surface hover:text-primary"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Share project details, inquiry topics, or say hello..."
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      className="w-full resize-none rounded-2xl border border-default bg-surface px-4 py-3 text-sm text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs text-muted">
                      Delivered straight to Sabbir’s WhatsApp (+8801773511874)
                    </span>
                    <Button type="submit" variant="primary" size="md" icon={FaPaperPlane}>
                      Send via WhatsApp
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </Reveal>
      </div>
    </>
  );
}

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaBookOpen,
  FaChevronDown,
  FaChevronUp,
  FaCode,
  FaCompass,
  FaEnvelope,
  FaExternalLinkAlt,
  FaEye,
  FaGithub,
  FaGraduationCap,
  FaKeyboard,
  FaLaptopCode,
  FaQuestionCircle,
  FaRocket,
  FaRoute,
  FaSlidersH,
  FaSun,
  FaTools,
  FaUniversalAccess,
  FaUserTie,
  FaWhatsapp,
} from 'react-icons/fa';
import { HiMiniBolt, HiMiniShieldCheck, HiSparkles } from 'react-icons/hi2';

import { portfolioData } from '../data';
import Typography from '../components/common/Typography';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Reveal from '../components/animations/Reveal';
import { usePortfolioGuide } from '../contexts/PortfolioGuideContext';

const GUIDE_SECTIONS = [
  { id: 'welcome', title: '01. Welcome & Introduction', icon: FaCompass, badge: 'Overview' },
  { id: 'quick-start', title: '02. Quick Start Paths', icon: FaRocket, badge: 'Fast Track' },
  { id: 'navigation', title: '03. Navigating the Portfolio', icon: FaRoute, badge: 'Structure' },
  { id: 'projects', title: '04. Discovering Projects', icon: FaCode, badge: 'Case Studies' },
  { id: 'skills', title: '05. Skills & Technologies', icon: FaLaptopCode, badge: 'Tech Stack' },
  {
    id: 'background',
    title: '06. Background & Credentials',
    icon: FaGraduationCap,
    badge: 'Timeline',
  },
  { id: 'interactive', title: '07. Interactive Features', icon: FaSlidersH, badge: 'Tools' },
  { id: 'contact', title: '08. Contact & Communication', icon: FaWhatsapp, badge: 'Connect' },
  { id: 'faq', title: '09. Frequently Asked Questions', icon: FaQuestionCircle, badge: 'FAQ' },
  {
    id: 'accessibility',
    title: '10. Accessibility & Tips',
    icon: FaUniversalAccess,
    badge: 'A11y',
  },
  { id: 'troubleshooting', title: '11. Troubleshooting', icon: FaTools, badge: 'Support' },
];

function Accordion({ title, children, defaultOpen = false, badge = null, icon: Icon = null }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-default bg-surface/80 transition-all duration-200 hover:border-accent-primary/40">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between p-4 text-left sm:p-5"
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
              <Icon className="h-4 w-4" />
            </span>
          )}
          <span className="text-sm font-bold text-primary sm:text-base">{title}</span>
          {badge && (
            <span className="hidden sm:inline-block rounded-full border border-accent-primary/20 bg-accent-primary/5 px-2 py-0.5 text-[10px] font-semibold text-accent-primary">
              {badge}
            </span>
          )}
        </div>
        <span className="shrink-0 rounded-lg p-1 text-muted transition-colors hover:bg-surface-hover hover:text-primary">
          {isOpen ? (
            <FaChevronUp className="h-3.5 w-3.5" />
          ) : (
            <FaChevronDown className="h-3.5 w-3.5" />
          )}
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-default/60 px-4 pb-5 pt-3 text-xs leading-relaxed text-secondary sm:px-5 sm:text-sm">
          {children}
        </div>
      )}
    </div>
  );
}

export default function GuidePage() {
  const { personalInfo, projects, skills, certifications } = portfolioData;
  const { openGuide } = usePortfolioGuide();
  const [activeSection, setActiveSection] = useState('welcome');
  const [scrollProgress, setScrollProgress] = useState(0);

  const siteUrl = personalInfo.website.replace(/\/$/, '');
  const canonicalUrl = `${siteUrl}/guide`;
  const pageTitle = `Interactive Portfolio Guide | ${personalInfo.name}`;
  const pageDescription =
    "Complete interactive walkthrough and user guide for exploring the projects, skills, architecture, and features of Md. Sabbir Hossen's MERN stack portfolio.";
  const socialImage = `${siteUrl}/og-image.svg`;

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      const sectionElements = GUIDE_SECTIONS.map((sec) => document.getElementById(sec.id)).filter(
        Boolean
      );

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const rect = sectionElements[i].getBoundingClientRect();
        if (rect.top <= 200) {
          setActiveSection(GUIDE_SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const triggerAIAssistant = () => {
    if (typeof window !== 'undefined' && window.KeyboardEvent) {
      window.dispatchEvent(
        new window.KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true })
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={socialImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={socialImage} />
      </Helmet>

      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-surface-hover">
        <div
          className="h-full bg-gradient-to-r from-accent-primary to-indigo-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Top Breadcrumb & Actions */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Button as={Link} to="/" variant="ghost" size="sm" icon={FaArrowLeft} className="px-0">
            Back to Home
          </Button>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={FaCompass}
              onClick={() => openGuide(0)}
              title="Launch Guided Onboarding Tour (8 Steps)"
              className="shadow-sm shadow-accent-primary/20"
            >
              Start Interactive Tour
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={HiSparkles}
              onClick={triggerAIAssistant}
              title="Launch AI Portfolio Assistant (Ctrl+K)"
            >
              Ask AI Guide
            </Button>
            <Badge variant="outline" size="sm">
              ✦ Interactive Companion
            </Badge>
          </div>
        </div>

        {/* Hero Banner */}
        <Reveal delay={0.05}>
          <div className="relative mb-12 overflow-hidden rounded-3xl border border-accent-primary/25 bg-gradient-to-br from-accent-primary/10 via-surface to-surface p-6 sm:p-10 shadow-xl shadow-black/5">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent-primary/30 bg-accent-primary/10 px-3 py-1 text-xs font-bold text-accent-primary">
                  <FaBookOpen className="h-3.5 w-3.5" />
                  <span>Interactive Walkthrough &amp; Guide</span>
                </div>

                <Typography
                  variant="h1"
                  className="text-balance text-3xl font-black text-primary sm:text-4xl md:text-5xl"
                >
                  Portfolio User Guide
                </Typography>

                <Typography variant="lead" className="text-secondary text-sm sm:text-base">
                  Welcome! This interactive guide walks you through every section, production
                  project, architectural pattern, and accessibility feature across Md. Sabbir
                  Hossen’s MERN stack portfolio. Designed to help recruiters, engineering leads, and
                  visitors get the most out of their exploration.
                </Typography>

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-secondary">
                  <span className="flex items-center gap-1.5 rounded-lg border border-default bg-surface-hover px-2.5 py-1 text-primary">
                    <HiMiniShieldCheck className="h-4 w-4 text-emerald-500" />
                    Verified Active Build
                  </span>
                  <span className="flex items-center gap-1.5 rounded-lg border border-default bg-surface-hover px-2.5 py-1 text-primary">
                    <FaCode className="h-3.5 w-3.5 text-accent-primary" />
                    React 19 &amp; Tailwind v4
                  </span>
                  <span className="flex items-center gap-1.5 rounded-lg border border-default bg-surface-hover px-2.5 py-1 text-primary">
                    <HiSparkles className="h-3.5 w-3.5 text-amber-500" />
                    AI Assistant Enabled
                  </span>
                </div>
              </div>

              {/* Fast Jump Card */}
              <Card spotlight className="shrink-0 border-default p-5 lg:w-80">
                <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
                  Quick Navigation
                </p>
                <div className="space-y-2">
                  <Button
                    as={Link}
                    to="/projects"
                    variant="outline"
                    size="sm"
                    icon={FaCode}
                    className="w-full justify-start text-xs"
                  >
                    Explore Projects ({projects.length})
                  </Button>
                  <Button
                    as={Link}
                    to="/experience"
                    variant="outline"
                    size="sm"
                    icon={FaUserTie}
                    className="w-full justify-start text-xs"
                  >
                    View Experience Timeline
                  </Button>
                  <Button
                    as={Link}
                    to="/developer"
                    variant="outline"
                    size="sm"
                    icon={FaWhatsapp}
                    className="w-full justify-start text-xs"
                  >
                    Developer Hub &amp; Channels
                  </Button>
                  <Button
                    as="a"
                    href="/llms.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    size="sm"
                    icon={HiSparkles}
                    className="w-full justify-start text-xs"
                  >
                    Read llms.txt (AI Profile)
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Reveal>

        {/* Main Content Layout with Sticky Sidebar */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Table of Contents Sticky Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <Card spotlight className="sticky top-24 space-y-4 border-default p-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-default pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Guide Sections
                </span>
                <span className="text-[11px] font-semibold text-accent-primary">
                  {Math.round(scrollProgress)}% Read
                </span>
              </div>

              <nav className="space-y-1 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
                {GUIDE_SECTIONS.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;

                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-accent-primary text-white shadow-sm'
                          : 'text-secondary hover:bg-surface-hover hover:text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{sec.title}</span>
                      </div>
                      <span
                        className={`text-[10px] rounded px-1.5 py-0.5 font-mono ${
                          isActive ? 'bg-white/20 text-white' : 'bg-surface-hover text-muted'
                        }`}
                      >
                        {sec.badge}
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="border-t border-default pt-3 space-y-2">
                <Button
                  variant="primary"
                  size="sm"
                  icon={FaCompass}
                  onClick={() => openGuide(0)}
                  className="w-full text-xs shadow-sm shadow-accent-primary/20"
                >
                  Start Interactive Tour
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={HiSparkles}
                  onClick={triggerAIAssistant}
                  className="w-full text-xs"
                >
                  Ask AI Portfolio Guide
                </Button>
              </div>
            </Card>
          </aside>

          {/* Guide Sections Content */}
          <main className="space-y-12 lg:col-span-8 xl:col-span-9">
            {/* 01. Welcome & Introduction */}
            <section id="welcome" className="scroll-mt-28 space-y-4">
              <Reveal>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-primary">
                  <FaCompass className="h-4 w-4" />
                  <span>Section 01</span>
                </div>
                <Typography
                  variant="h2"
                  className="mt-1 text-2xl font-black text-primary sm:text-3xl"
                >
                  Welcome to the Portfolio
                </Typography>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-secondary">
                  <p>
                    This web application is the central showcase for{' '}
                    <strong>Md. Sabbir Hossen</strong>, a{' '}
                    <strong>Junior MERN Stack Developer</strong> based in Medina, Saudi Arabia
                    (originally from Bangladesh).
                  </p>
                  <p>
                    Rather than presenting conceptual templates, this portfolio is built around
                    <strong> verified, full-stack production software</strong> with strict
                    architectural separation, shared validation packages, robust database schemas,
                    and end-to-end type safety.
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2">
                    <Card className="border-default p-4" hover={false}>
                      <span className="text-xl">🚀</span>
                      <h4 className="mt-2 text-xs font-bold text-primary">Practical Engineering</h4>
                      <p className="mt-1 text-xs text-muted">
                        Full request-response lifecycles, structured error envelopes, and monorepo
                        discipline.
                      </p>
                    </Card>
                    <Card className="border-default p-4" hover={false}>
                      <span className="text-xl">🛡️</span>
                      <h4 className="mt-2 text-xs font-bold text-primary">Defensive Security</h4>
                      <p className="mt-1 text-xs text-muted">
                        Zero-trust authentication, optimistic revision locking, and recursive audit
                        log sanitization.
                      </p>
                    </Card>
                    <Card className="border-default p-4" hover={false}>
                      <span className="text-xl">⚡</span>
                      <h4 className="mt-2 text-xs font-bold text-primary">Modern Web Stack</h4>
                      <p className="mt-1 text-xs text-muted">
                        React 19, TypeScript, Node.js/Express, MongoDB Atlas, and Tailwind CSS v4.
                      </p>
                    </Card>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* 02. Quick Start Paths */}
            <section id="quick-start" className="scroll-mt-28 space-y-4">
              <Reveal>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-primary">
                  <FaRocket className="h-4 w-4" />
                  <span>Section 02</span>
                </div>
                <Typography
                  variant="h2"
                  className="mt-1 text-2xl font-black text-primary sm:text-3xl"
                >
                  Quick Start — Explore in Minutes
                </Typography>
                <p className="text-sm text-secondary">
                  Choose the path that fits your current objective for the fastest, highest-impact
                  review:
                </p>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Card className="flex flex-col justify-between border-default p-5 hover:border-accent-primary/40">
                    <div className="space-y-2">
                      <span className="inline-block rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-500">
                        2-Minute Skim
                      </span>
                      <h4 className="text-sm font-bold text-primary">Recruiter Fast Track</h4>
                      <p className="text-xs text-secondary leading-relaxed">
                        Review top featured MERN projects, inspect skills, download resume, and
                        connect on WhatsApp.
                      </p>
                    </div>
                    <div className="mt-4 space-y-1.5 pt-2 border-t border-default/60">
                      <Button
                        as={Link}
                        to="/projects/report-bd"
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                      >
                        View Report BD
                      </Button>
                      <Button
                        as={Link}
                        to="/developer"
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs"
                      >
                        Direct Contact
                      </Button>
                    </div>
                  </Card>

                  <Card className="flex flex-col justify-between border-default p-5 hover:border-accent-primary/40">
                    <div className="space-y-2">
                      <span className="inline-block rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-bold text-indigo-500">
                        5-Minute Deep Dive
                      </span>
                      <h4 className="text-sm font-bold text-primary">Technical Architect Path</h4>
                      <p className="text-xs text-secondary leading-relaxed">
                        Examine monorepo boundaries, Zod schema validation, optimistic concurrency
                        control, and API design.
                      </p>
                    </div>
                    <div className="mt-4 space-y-1.5 pt-2 border-t border-default/60">
                      <Button
                        as={Link}
                        to="/projects/report-bd#architecture"
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                      >
                        Monorepo Architecture
                      </Button>
                      <Button
                        as="a"
                        href="https://github.com/MSabbirHossen/personalreport"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs"
                      >
                        Inspect Source Code
                      </Button>
                    </div>
                  </Card>

                  <Card className="flex flex-col justify-between border-default p-5 hover:border-accent-primary/40">
                    <div className="space-y-2">
                      <span className="inline-block rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-500">
                        3-Minute Review
                      </span>
                      <h4 className="text-sm font-bold text-primary">Credentials &amp; Timeline</h4>
                      <p className="text-xs text-secondary leading-relaxed">
                        Verify Bachelor of Science at Islamic University of Madinah and verified
                        professional credentials from Programming Hero and Udemy.
                      </p>
                    </div>
                    <div className="mt-4 space-y-1.5 pt-2 border-t border-default/60">
                      <Button
                        as={Link}
                        to="/certifications"
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                      >
                        All Certifications
                      </Button>
                      <Button
                        as={Link}
                        to="/education"
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs"
                      >
                        Education Record
                      </Button>
                    </div>
                  </Card>
                </div>
              </Reveal>
            </section>

            {/* 03. Navigating the Portfolio */}
            <section id="navigation" className="scroll-mt-28 space-y-4">
              <Reveal>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-primary">
                  <FaRoute className="h-4 w-4" />
                  <span>Section 03</span>
                </div>
                <Typography
                  variant="h2"
                  className="mt-1 text-2xl font-black text-primary sm:text-3xl"
                >
                  Navigating the Portfolio
                </Typography>
                <p className="text-sm text-secondary">
                  The portfolio is structured as a client-side Single Page Application (SPA)
                  combining a cohesive homepage with specialized deep-dive routes:
                </p>

                <div className="overflow-x-auto rounded-2xl border border-default bg-surface mt-4">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="border-b border-default bg-surface-hover text-muted">
                      <tr>
                        <th className="p-3 sm:p-4">Route URL</th>
                        <th className="p-3 sm:p-4">Purpose &amp; Content</th>
                        <th className="p-3 sm:p-4">Direct Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-default/60 text-secondary">
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-primary">/</td>
                        <td className="p-3 sm:p-4">
                          Full interactive homepage (Hero, Projects, Skills, Timeline, Contact)
                        </td>
                        <td className="p-3 sm:p-4">
                          <Link
                            to="/"
                            className="text-accent-primary hover:underline font-semibold"
                          >
                            Visit Home
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-primary">/projects</td>
                        <td className="p-3 sm:p-4">
                          Categorized projects catalog with multi-tag filtering
                        </td>
                        <td className="p-3 sm:p-4">
                          <Link
                            to="/projects"
                            className="text-accent-primary hover:underline font-semibold"
                          >
                            View Catalog
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-primary">
                          /projects/:slug
                        </td>
                        <td className="p-3 sm:p-4">
                          Deep case studies (e.g. /projects/report-bd) with architecture &amp;
                          metrics
                        </td>
                        <td className="p-3 sm:p-4">
                          <Link
                            to="/projects/report-bd"
                            className="text-accent-primary hover:underline font-semibold"
                          >
                            Report BD
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-primary">/experience</td>
                        <td className="p-3 sm:p-4">
                          Chronological developer experience and project milestones
                        </td>
                        <td className="p-3 sm:p-4">
                          <Link
                            to="/experience"
                            className="text-accent-primary hover:underline font-semibold"
                          >
                            Experience
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-primary">/education</td>
                        <td className="p-3 sm:p-4">
                          Bachelor of Science in Computer Science &amp; Information details
                        </td>
                        <td className="p-3 sm:p-4">
                          <Link
                            to="/education"
                            className="text-accent-primary hover:underline font-semibold"
                          >
                            Education
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-primary">
                          /certifications
                        </td>
                        <td className="p-3 sm:p-4">
                          7 verified technical credentials with credential links
                        </td>
                        <td className="p-3 sm:p-4">
                          <Link
                            to="/certifications"
                            className="text-accent-primary hover:underline font-semibold"
                          >
                            Certifications
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-primary">/developer</td>
                        <td className="p-3 sm:p-4">
                          Developer &amp; Community Hub with WhatsApp note pre-filler
                        </td>
                        <td className="p-3 sm:p-4">
                          <Link
                            to="/developer"
                            className="text-accent-primary hover:underline font-semibold"
                          >
                            Developer Hub
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-primary">/guide</td>
                        <td className="p-3 sm:p-4">Interactive Portfolio Guide (this page)</td>
                        <td className="p-3 sm:p-4 font-semibold text-emerald-500">Current Page</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-primary">/llms.txt</td>
                        <td className="p-3 sm:p-4">
                          Standardized plaintext context file for LLMs &amp; AI crawlers
                        </td>
                        <td className="p-3 sm:p-4">
                          <a
                            href="/llms.txt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-primary hover:underline font-semibold"
                          >
                            Open llms.txt
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </section>

            {/* 04. Discovering Projects */}
            <section id="projects" className="scroll-mt-28 space-y-4">
              <Reveal>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-primary">
                  <FaCode className="h-4 w-4" />
                  <span>Section 04</span>
                </div>
                <Typography
                  variant="h2"
                  className="mt-1 text-2xl font-black text-primary sm:text-3xl"
                >
                  Discovering Projects
                </Typography>
                <p className="text-sm text-secondary">
                  All projects are ranked and categorized to demonstrate practical problem solving,
                  scalable MERN stack development, and production software patterns:
                </p>

                <div className="space-y-4 mt-4">
                  {/* Report BD Showcase Card */}
                  <Card className="border-default p-6 hover:border-accent-primary/40">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="rounded-full bg-accent-primary/10 border border-accent-primary/25 px-2.5 py-0.5 text-xs font-bold text-accent-primary">
                            🌟 Top Featured Flagship Project
                          </span>
                          <span className="text-xs text-muted font-mono">featuredOrder: 1</span>
                        </div>
                        <h3 className="text-lg font-bold text-primary">Report BD (BPS Report)</h3>
                        <p className="text-xs sm:text-sm text-secondary leading-relaxed max-w-2xl">
                          A multi-tenant, mobile-first personal reporting and institutional
                          mentorship platform built as an npm workspace monorepo with TypeScript,
                          Node.js/Express, MongoDB Atlas, React 19, and Firebase Authentication.
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-semibold text-muted">
                          <span className="rounded bg-surface-hover px-2 py-0.5 text-primary">
                            TypeScript
                          </span>
                          <span className="rounded bg-surface-hover px-2 py-0.5 text-primary">
                            React 19
                          </span>
                          <span className="rounded bg-surface-hover px-2 py-0.5 text-primary">
                            Express 4 API
                          </span>
                          <span className="rounded bg-surface-hover px-2 py-0.5 text-primary">
                            MongoDB Atlas
                          </span>
                          <span className="rounded bg-surface-hover px-2 py-0.5 text-primary">
                            Zod Validation
                          </span>
                          <span className="rounded bg-surface-hover px-2 py-0.5 text-primary">
                            Firebase Auth
                          </span>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-row md:flex-col gap-2">
                        <Button
                          as={Link}
                          to="/projects/report-bd"
                          variant="primary"
                          size="sm"
                          className="text-xs"
                        >
                          Case Study
                        </Button>
                        <Button
                          as="a"
                          href="https://personalreport-iota.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outline"
                          size="sm"
                          icon={FaExternalLinkAlt}
                          className="text-xs"
                        >
                          Live Demo
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-default/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-primary mb-1">
                          Key Architectural Highlights
                        </h4>
                        <ul className="text-xs text-secondary space-y-1 list-disc pl-4">
                          <li>
                            Shared calculation engine (
                            <code className="text-primary font-mono text-[11px]">
                              @reportbd/shared
                            </code>
                            )
                          </li>
                          <li>
                            Optimistic revision locking prevents stale writes with HTTP 409 Conflict
                          </li>
                          <li>Multi-tenant RBAC (4 system roles, 7 membership tiers)</li>
                          <li>Administrative audit log with recursive payload sanitization</li>
                        </ul>
                      </div>
                      <div className="rounded-xl overflow-hidden border border-default bg-surface-hover">
                        <img
                          src="/screenshots/reportbd-daily-flow.png"
                          alt="Report BD Daily Reporting Flow"
                          className="w-full h-auto object-cover max-h-40"
                          loading="lazy"
                        />
                        <p className="p-2 text-[10px] text-muted text-center font-medium">
                          Figure 1: Report BD Daily Workflow &amp; Performance Summary
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* ETA Showcase Card */}
                  <Card className="border-default p-6 hover:border-accent-primary/40">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="rounded-full bg-sky-500/10 border border-sky-500/25 px-2.5 py-0.5 text-xs font-bold text-sky-500">
                            🎓 Featured Project 02
                          </span>
                          <span className="text-xs text-muted font-mono">featuredOrder: 2</span>
                        </div>
                        <h3 className="text-lg font-bold text-primary">
                          Exploratory Training Academy (ETA)
                        </h3>
                        <p className="text-xs sm:text-sm text-secondary leading-relaxed max-w-2xl">
                          A comprehensive digital education management platform (LMS) consolidating
                          curriculum authoring, anti-cheat assessment engines, live attendance
                          recording, and multi-role dashboards into a modern web system.
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-semibold text-muted">
                          <span className="rounded bg-surface-hover px-2 py-0.5 text-primary">
                            React 19
                          </span>
                          <span className="rounded bg-surface-hover px-2 py-0.5 text-primary">
                            Redux Toolkit
                          </span>
                          <span className="rounded bg-surface-hover px-2 py-0.5 text-primary">
                            Node.js
                          </span>
                          <span className="rounded bg-surface-hover px-2 py-0.5 text-primary">
                            Express
                          </span>
                          <span className="rounded bg-surface-hover px-2 py-0.5 text-primary">
                            MongoDB
                          </span>
                          <span className="rounded bg-surface-hover px-2 py-0.5 text-primary">
                            Framer Motion
                          </span>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-row md:flex-col gap-2">
                        <Button
                          as={Link}
                          to="/projects/eta-digital-education-platform"
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          Case Study
                        </Button>
                        <Button
                          as="a"
                          href="https://eta-web-omega.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outline"
                          size="sm"
                          icon={FaExternalLinkAlt}
                          className="text-xs"
                        >
                          Live Demo
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-default/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-primary mb-1">
                          Key Platform Highlights
                        </h4>
                        <ul className="text-xs text-secondary space-y-1 list-disc pl-4">
                          <li>Modular academic hierarchy (Programs, Courses, Cohorts)</li>
                          <li>
                            Server-authoritative timer expiry and anti-cheat test serialization
                          </li>
                          <li>Weighted GPA gradebook with cryptographic publishing locks</li>
                          <li>Bilingual (English / Arabic RTL) layout system</li>
                        </ul>
                      </div>
                      <div className="rounded-xl overflow-hidden border border-default bg-surface-hover">
                        <img
                          src="/screenshots/eta-dashboard.png"
                          alt="ETA LMS Dashboard"
                          className="w-full h-auto object-cover max-h-40"
                          loading="lazy"
                        />
                        <p className="p-2 text-[10px] text-muted text-center font-medium">
                          Figure 2: ETA LMS Academic Cohort Dashboard
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </Reveal>
            </section>

            {/* 05. Understanding Skills & Technologies */}
            <section id="skills" className="scroll-mt-28 space-y-4">
              <Reveal>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-primary">
                  <FaLaptopCode className="h-4 w-4" />
                  <span>Section 05</span>
                </div>
                <Typography
                  variant="h2"
                  className="mt-1 text-2xl font-black text-primary sm:text-3xl"
                >
                  Skills &amp; Technology Stack
                </Typography>
                <p className="text-sm text-secondary">
                  Skills in this portfolio are backed by verifiable codebases. Rather than
                  superficial progress bars, each technology is demonstrated in active projects:
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
                  {skills.map((category) => (
                    <Card
                      key={category.category}
                      className="border-default p-5 space-y-3"
                      hover={false}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-primary">{category.category}</h3>
                        <span className="text-[10px] font-semibold text-muted bg-surface-hover px-2 py-0.5 rounded">
                          {category.items.length} Technologies
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {category.items.map((item) => (
                          <span
                            key={item.name}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-default bg-surface-hover px-2.5 py-1 text-xs font-semibold text-secondary"
                          >
                            <span>{item.name}</span>
                          </span>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* 06. About, Experience & Education */}
            <section id="background" className="scroll-mt-28 space-y-4">
              <Reveal>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-primary">
                  <FaGraduationCap className="h-4 w-4" />
                  <span>Section 06</span>
                </div>
                <Typography
                  variant="h2"
                  className="mt-1 text-2xl font-black text-primary sm:text-3xl"
                >
                  About, Experience &amp; Education
                </Typography>
                <p className="text-sm text-secondary">
                  Sabbir pairs structured academic foundations with self-driven problem solving and
                  ongoing mentorship:
                </p>

                <div className="space-y-4 mt-4">
                  <Card className="border-default p-5 space-y-3" hover={false}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-primary">Academic Foundation</h3>
                        <p className="text-xs text-muted">
                          Bachelor of Science in Computer Science &amp; Information
                        </p>
                      </div>
                      <span className="text-xs font-mono font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                        In Progress · Undergrad
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                      Studying at <strong>Islamic University of Madinah</strong>, building rigorous
                      foundations in computing theory, software engineering, systems design, and
                      analytical problem solving.
                    </p>
                    <div className="pt-2">
                      <Button
                        as={Link}
                        to="/education"
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        View Full Academic Record
                      </Button>
                    </div>
                  </Card>

                  <Card className="border-default p-5 space-y-3" hover={false}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-primary">Verified Certifications</h3>
                        <p className="text-xs text-muted">
                          {certifications.length} Credentials Issued
                        </p>
                      </div>
                      <span className="text-xs font-mono font-semibold text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded">
                        Programming Hero &amp; Udemy Verified
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                      Rigorous credential achievements including the{' '}
                      <em>Complete Web Development Course</em>,<em>Master Git &amp; GitHub</em>,{' '}
                      <em>Full-Stack JavaScript</em>, and competitive programming fundamentals.
                    </p>
                    <div className="pt-2">
                      <Button
                        as={Link}
                        to="/certifications"
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        Explore All Certifications
                      </Button>
                    </div>
                  </Card>
                </div>
              </Reveal>
            </section>

            {/* 07. Interactive Features & Personalization */}
            <section id="interactive" className="scroll-mt-28 space-y-4">
              <Reveal>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-primary">
                  <FaSlidersH className="h-4 w-4" />
                  <span>Section 07</span>
                </div>
                <Typography
                  variant="h2"
                  className="mt-1 text-2xl font-black text-primary sm:text-3xl"
                >
                  Interactive Features &amp; Personalization
                </Typography>
                <p className="text-sm text-secondary">
                  The portfolio includes several thoughtful, user-focused interactive utilities:
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
                  <Card className="border-default p-5 space-y-2.5" hover={false}>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                      <FaSun className="h-4 w-4 text-amber-500" />
                      <span>Theme System (Dark / Light / System)</span>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed">
                      Toggle themes smoothly from the header button. Preferences synchronize with
                      your system color scheme and persist in localStorage without flash on reload.
                    </p>
                  </Card>

                  <Card className="border-default p-5 space-y-2.5" hover={false}>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                      <HiSparkles className="h-4 w-4 text-accent-primary" />
                      <span>AI Portfolio Guide (Ctrl+K)</span>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed">
                      Instant floating assistant answering queries about projects, architectural
                      decisions, and skills. Streamed responses, interactive cards, and zero
                      external trackers.
                    </p>
                  </Card>

                  <Card className="border-default p-5 space-y-2.5" hover={false}>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                      <FaGithub className="h-4 w-4 text-purple-400" />
                      <span>GitHub Analytics Engine</span>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed">
                      Real statistics rendered from{' '}
                      <code className="text-primary font-mono text-[11px]">public/stats.json</code>,
                      updated periodically via automated GitHub Actions for reliable load times.
                    </p>
                  </Card>

                  <Card className="border-default p-5 space-y-2.5" hover={false}>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                      <HiMiniBolt className="h-4 w-4 text-emerald-400" />
                      <span>Machine-Readable /llms.txt</span>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed">
                      Standardized plaintext context file enabling LLM coding agents, ChatGPT, and
                      Claude to ingest the entire portfolio structure in milliseconds.
                    </p>
                  </Card>
                </div>
              </Reveal>
            </section>

            {/* 08. Contact & Connect */}
            <section id="contact" className="scroll-mt-28 space-y-4">
              <Reveal>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-primary">
                  <FaWhatsapp className="h-4 w-4" />
                  <span>Section 08</span>
                </div>
                <Typography
                  variant="h2"
                  className="mt-1 text-2xl font-black text-primary sm:text-3xl"
                >
                  Contact &amp; Communication Channels
                </Typography>
                <p className="text-sm text-secondary">
                  Direct communication channels are configured with no third-party email routing
                  middlemen:
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
                  <div className="rounded-2xl border border-[#25D366]/30 bg-[#25D366]/5 p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366] text-white">
                        <FaWhatsapp className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-primary">Direct WhatsApp</h4>
                        <p className="text-xs text-muted">+8801773511874</p>
                      </div>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed">
                      The fastest response channel for quick hiring chats, project inquiries, and
                      consultations.
                    </p>
                    <Button
                      as="a"
                      href="https://wa.me/+8801773511874"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="sm"
                      icon={FaWhatsapp}
                      className="w-full text-xs"
                    >
                      Chat on WhatsApp
                    </Button>
                  </div>

                  <div className="rounded-2xl border border-default bg-surface p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EA4335] text-white">
                        <FaEnvelope className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-primary">Email Inquiries</h4>
                        <p className="text-xs text-muted">mshossen724@gmail.com</p>
                      </div>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed">
                      Formal proposals, contract reviews, and detailed job specification
                      discussions.
                    </p>
                    <Button
                      as="a"
                      href="mailto:mshossen724@gmail.com"
                      variant="outline"
                      size="sm"
                      icon={FaEnvelope}
                      className="w-full text-xs"
                    >
                      Send Direct Email
                    </Button>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* 09. Frequently Asked Questions */}
            <section id="faq" className="scroll-mt-28 space-y-4">
              <Reveal>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-primary">
                  <FaQuestionCircle className="h-4 w-4" />
                  <span>Section 09</span>
                </div>
                <Typography
                  variant="h2"
                  className="mt-1 text-2xl font-black text-primary sm:text-3xl"
                >
                  Frequently Asked Questions
                </Typography>
                <p className="text-sm text-secondary">
                  Direct answers to common recruiter and technical inquiries:
                </p>

                <div className="space-y-3 mt-4">
                  <Accordion
                    title="Can I inspect the full source code for the projects?"
                    defaultOpen={true}
                  >
                    Yes! Every project listed in the portfolio links directly to its public GitHub
                    repository. For example, Report BD’s monorepo is available at{' '}
                    <a
                      href="https://github.com/MSabbirHossen/personalreport"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-primary hover:underline font-bold"
                    >
                      github.com/MSabbirHossen/personalreport
                    </a>{' '}
                    and ETA at{' '}
                    <a
                      href="https://github.com/MSabbirHossen/ETA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-primary hover:underline font-bold"
                    >
                      github.com/MSabbirHossen/ETA
                    </a>
                    .
                  </Accordion>

                  <Accordion title="Is Sabbir currently available for full-time employment or internships?">
                    Yes. Sabbir is actively open to Junior Full-Stack Developer, Junior MERN
                    Developer, Frontend, and Backend roles, as well as software engineering
                    internships and freelance opportunities.
                  </Accordion>

                  <Accordion title="What is the architecture behind the flagship project (Report BD)?">
                    Report BD is designed as an npm workspaces monorepo separating shared domain
                    packages (
                    <code className="font-mono text-primary text-xs">@reportbd/shared</code>), an
                    Express 4 REST API, and a Vite React 19 SPA. It features optimistic revision
                    locking (HTTP 409 Conflict), zero-trust Firebase token verification,
                    multi-tenant RBAC (4 roles, 7 tiers), and trilingual RTL/LTR support.
                  </Accordion>

                  <Accordion title="Why does the portfolio feature an /llms.txt file?">
                    <code className="font-mono text-primary text-xs">/llms.txt</code> follows the
                    emerging web standard for LLMs. It provides a curated, lightweight plaintext
                    document that AI coding assistants (ChatGPT, Claude, Gemini, Antigravity) can
                    instantly read to understand Sabbir’s skills and project implementations without
                    parsing heavy HTML.
                  </Accordion>

                  <Accordion title="How does the contact form work?">
                    To ensure 100% deliverability without third-party mailer quotas or spam filters,
                    the contact form formats your note into a structured message and launches it
                    directly into WhatsApp (+8801773511874) with one click.
                  </Accordion>

                  <Accordion title="Are the certifications formally verified?">
                    Yes. All 7 certificates include verification links and credential IDs issued by
                    recognized educational platforms, including Programming Hero’s intensive
                    Complete Web Development Track and Udemy.
                  </Accordion>
                </div>
              </Reveal>
            </section>

            {/* 10. Helpful Tips & Accessibility */}
            <section id="accessibility" className="scroll-mt-28 space-y-4">
              <Reveal>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-primary">
                  <FaUniversalAccess className="h-4 w-4" />
                  <span>Section 10</span>
                </div>
                <Typography
                  variant="h2"
                  className="mt-1 text-2xl font-black text-primary sm:text-3xl"
                >
                  Helpful Tips &amp; Accessibility
                </Typography>
                <p className="text-sm text-secondary">
                  The portfolio was engineered following WCAG guidelines to ensure everyone can
                  navigate smoothly:
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
                  <Card className="border-default p-5 space-y-3" hover={false}>
                    <div className="flex items-center gap-2 font-bold text-sm text-primary">
                      <FaKeyboard className="h-4 w-4 text-accent-primary" />
                      <span>Keyboard Navigation Shortcuts</span>
                    </div>
                    <ul className="text-xs text-secondary space-y-2">
                      <li className="flex items-center justify-between">
                        <span>Open AI Guide anywhere:</span>
                        <kbd className="rounded border border-default bg-surface-hover px-1.5 py-0.5 font-mono text-[10px]">
                          Ctrl + K / ⌘ + K
                        </kbd>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Close open modal / dialog:</span>
                        <kbd className="rounded border border-default bg-surface-hover px-1.5 py-0.5 font-mono text-[10px]">
                          Escape
                        </kbd>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Navigate focusable links:</span>
                        <kbd className="rounded border border-default bg-surface-hover px-1.5 py-0.5 font-mono text-[10px]">
                          Tab / Shift+Tab
                        </kbd>
                      </li>
                    </ul>
                  </Card>

                  <Card className="border-default p-5 space-y-3" hover={false}>
                    <div className="flex items-center gap-2 font-bold text-sm text-primary">
                      <FaEye className="h-4 w-4 text-emerald-500" />
                      <span>Inclusive UX Design</span>
                    </div>
                    <ul className="text-xs text-secondary space-y-1.5 list-disc pl-4">
                      <li>
                        Semantic HTML5 landmarks (
                        <code className="text-primary font-mono text-[11px]">&lt;main&gt;</code>,{' '}
                        <code className="text-primary font-mono text-[11px]">&lt;nav&gt;</code>,{' '}
                        <code className="text-primary font-mono text-[11px]">&lt;section&gt;</code>)
                      </li>
                      <li>High contrast color ratios meeting WCAG AA standards</li>
                      <li>Respects OS reduced-motion preferences via Framer Motion hooks</li>
                      <li>Touch targets calibrated to a minimum of 44x44px for mobile devices</li>
                    </ul>
                  </Card>
                </div>
              </Reveal>
            </section>

            {/* 11. Troubleshooting */}
            <section id="troubleshooting" className="scroll-mt-28 space-y-4">
              <Reveal>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-primary">
                  <FaTools className="h-4 w-4" />
                  <span>Section 11</span>
                </div>
                <Typography
                  variant="h2"
                  className="mt-1 text-2xl font-black text-primary sm:text-3xl"
                >
                  Troubleshooting &amp; Support
                </Typography>
                <p className="text-sm text-secondary">
                  Quick resolutions for common client-side browsing scenarios:
                </p>

                <div className="space-y-3 mt-4">
                  <Accordion title="External demo or repository did not open in a new tab">
                    Modern browsers occasionally block automated popup triggers. Ensure popup
                    permissions are allowed for{' '}
                    <code className="text-primary font-mono text-xs">msabbirhossen.github.io</code>{' '}
                    or right-click the link and select &quot;Open link in new tab&quot;.
                  </Accordion>

                  <Accordion title="Theme preference didn't save across sessions">
                    The theme state relies on browser{' '}
                    <code className="text-primary font-mono text-xs">localStorage</code>. If you are
                    using strict private/incognito browsing or have storage disabled, the site will
                    default to your operating system’s theme setting.
                  </Accordion>

                  <Accordion title="WhatsApp did not launch on desktop">
                    If WhatsApp Desktop is not installed on your computer, your browser will open
                    WhatsApp Web. Simply log in via QR code or use the direct phone number{' '}
                    <code className="text-primary font-mono text-xs">+8801773511874</code> on your
                    phone.
                  </Accordion>
                </div>
              </Reveal>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

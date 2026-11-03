import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import Highlights from '../components/sections/Highlights';
import About from '../components/about/About';
import { useTranslation } from '../i18n';

const Skills = lazy(() => import('../components/skills/Skills'));
const Experience = lazy(() => import('../components/experience/Experience'));
const Projects = lazy(() => import('../components/projects/Projects'));
const GitHubStats = lazy(() => import('../components/github/GitHubStats'));
const Education = lazy(() => import('../components/sections/Education'));
const Certifications = lazy(() => import('../components/sections/Certifications'));
const Contact = lazy(() => import('../components/sections/Contact'));

export default function Home() {
  const { t } = useTranslation();
  const pageTitle = t('home.pageTitle');
  const pageDescription = t('home.pageDescription');
  const canonicalUrl = 'https://msabbirhossen.github.io/';
  const socialImage = 'https://msabbirhossen.github.io/og-image.svg';

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Md. Sabbir Hossen Portfolio',
    url: canonicalUrl,
    description: pageDescription,
    author: {
      '@type': 'Person',
      name: 'Md. Sabbir Hossen',
      jobTitle: 'Junior MERN Stack Developer',
    },
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Md. Sabbir Hossen',
    jobTitle: 'Junior MERN Stack Developer',
    url: canonicalUrl,
    sameAs: ['https://github.com/MSabbirHossen', 'https://www.linkedin.com/in/sabb1rhossen/'],
    knowsAbout: [
      'React',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Firebase',
      'Tailwind CSS',
    ],
    subjectOf: {
      '@type': 'DigitalDocument',
      name: 'llms.txt',
      url: `${canonicalUrl}llms.txt`,
      encodingFormat: 'text/plain',
      description:
        'Machine-readable developer summary and project index for AI agents, LLMs, and search engines.',
    },
  };

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="LLM-readable portfolio summary"
        />
        <link rel="llms-txt" type="text/plain" href="/llms.txt" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={socialImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={socialImage} />

        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      </Helmet>

      {/* 1. Hero & Professional Introduction */}
      <Hero />

      {/* 2. Professional Highlights Proof Points */}
      <Highlights />

      {/* 3. Featured Projects (Primary Evidence) */}
      <Suspense fallback={<div className="sr-only">{t('home.loadingProjects')}</div>}>
        <Projects />
      </Suspense>

      {/* 4. About Sabbir & Practical Experience */}
      <About />

      {/* 5. Chronological Experience & Milestones */}
      <Suspense fallback={<div className="sr-only">Loading Experience...</div>}>
        <Experience limit={3} />
      </Suspense>

      {/* 6. Technical Stack & Evidence-Based Competencies */}
      <Suspense fallback={<div className="sr-only">Loading Skills...</div>}>
        <Skills />
      </Suspense>

      {/* 7. Academic Foundations & Degrees */}
      <Suspense fallback={<div className="sr-only">Loading Education...</div>}>
        <Education limit={2} />
      </Suspense>

      {/* 8. Professional Certifications & Training */}
      <Suspense fallback={<div className="sr-only">Loading Certifications...</div>}>
        <Certifications limit={2} />
      </Suspense>

      {/* 9. GitHub Activity & Verified Metrics */}
      <Suspense fallback={<div className="sr-only">Loading GitHub Metrics...</div>}>
        <GitHubStats />
      </Suspense>

      {/* 10. Direct Contact & Collaboration Form */}
      <Suspense fallback={<div className="sr-only">Loading Contact...</div>}>
        <Contact />
      </Suspense>
    </div>
  );
}

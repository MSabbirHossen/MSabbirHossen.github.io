import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';

import About from '../components/about/About';
import Projects from '../components/projects/Projects';
import Skills from '../components/skills/Skills';
import Experience from '../components/experience/Experience';
import Contact from '../components/sections/Contact';
import CurrentFocus from '../components/current-focus/CurrentFocus';

const GitHubStats = lazy(() => import('../components/github/GitHubStats'));
const Education = lazy(() => import('../components/sections/Education'));
const Certifications = lazy(() => import('../components/sections/Certifications'));

export default function Home() {
  const pageTitle = 'Md. Sabbir Hossen | MERN Stack Developer Portfolio';
  const pageDescription =
    'AI-powered full-stack developer portfolio showcasing MERN projects, React engineering skills, and secure development practices.';
  const canonicalUrl = 'https://msabbirhossen.github.io/';
  const socialImage = 'https://msabbirhossen.github.io/og-image.svg';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Md. Sabbir Hossen',
    jobTitle: 'MERN Stack Developer',
    url: canonicalUrl,
    sameAs: ['https://github.com/MSabbirHossen', 'https://www.linkedin.com/in/ms-hossen/'],
    knowsAbout: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Cybersecurity'],
  };

  return (
    <div className="space-y-24 py-8">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />

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
      </Helmet>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Suspense fallback={<div className="sr-only">Loading supporting portfolio sections...</div>}>
        <GitHubStats />
        <Education />
        <Certifications />
      </Suspense>
      <CurrentFocus compact />
      <Contact />
    </div>
  );
}

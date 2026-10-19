import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import About from '../components/about/About';

const Skills = lazy(() => import('../components/skills/Skills'));
const Experience = lazy(() => import('../components/experience/Experience'));
const Projects = lazy(() => import('../components/projects/Projects'));
const GitHubStats = lazy(() => import('../components/github/GitHubStats'));
const Education = lazy(() => import('../components/sections/Education'));
const Certifications = lazy(() => import('../components/sections/Certifications'));
const CurrentFocus = lazy(() => import('../components/current-focus/CurrentFocus'));
const Contact = lazy(() => import('../components/sections/Contact'));

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
    sameAs: ['https://github.com/MSabbirHossen', 'https://www.linkedin.com/in/sabb1rhossen/'],
    knowsAbout: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Cybersecurity'],
  };

  return (
    <div className="flex flex-col">
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
      <Suspense fallback={null}>
        <Projects />
      </Suspense>
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
      <Suspense fallback={null}>
        <Skills />
      </Suspense>
      <Suspense fallback={<div className="sr-only">Loading supporting portfolio sections...</div>}>
        <Education />
        <Certifications />
        <GitHubStats />
      </Suspense>
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
      <Suspense fallback={null}>
        <CurrentFocus />
      </Suspense>
    </div>
  );
}

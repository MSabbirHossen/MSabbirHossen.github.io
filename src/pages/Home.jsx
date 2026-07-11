import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';

const About = lazy(() => import('../components/about/About.jsx'));
const Skills = lazy(() => import('../components/sections/Skills'));
const Projects = lazy(() => import('../components/sections/Projects'));
const Certifications = lazy(() => import('../components/sections/Certifications'));
const Education = lazy(() => import('../components/sections/Education'));
const GitHubStats = lazy(() => import('../components/github/GitHubStats'));
const Contact = lazy(() => import('../components/sections/Contact'));

export default function Home() {
  return (
    <div className="space-y-24 py-8">
      <Helmet>
        <title>Md. Sabbir Hossen — Portfolio</title>
        <meta
          name="description"
          content="Production-ready portfolio of Md. Sabbir Hossen, an AI-powered MERN stack developer and cybersecurity learner."
        />
      </Helmet>
      <Hero />
      <Suspense fallback={null}>
        <About />
        <GitHubStats />
        <Projects />
        <Skills />
        <Certifications />
        <Education />
        <Contact />
      </Suspense>
    </div>
  );
}

import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';

import About from '../components/about/About';
import GitHubStats from '../components/github/GitHubStats';
import Projects from '../components/projects/Projects';
import Skills from '../components/skills/Skills';
import Certifications from '../components/sections/Certifications';
import Education from '../components/sections/Education';
import CurrentFocus from '../components/current-focus/CurrentFocus';
import Contact from '../components/sections/Contact';
// const About = lazy(() => import('../components/about/About.jsx'));
// const Skills = lazy(() => import('../components/skills/Skills.jsx'));
// const Projects = lazy(() => import('../components/projects/Projects.jsx'));
// const Certifications = lazy(() => import('../components/sections/Certifications'));
// const Education = lazy(() => import('../components/sections/Education'));
// const GitHubStats = lazy(() => import('../components/github/GitHubStats'));
// const CurrentFocus = lazy(() => import('../components/current-focus/CurrentFocus.jsx'));
// const Experience = lazy(() => import('../components/experience/Experience'));
// // const Contact = lazy(() => import('../components/contact/Contact.jsx));
// const Contact = lazy(() => import('../components/sections/Contact'));

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
      <About />
      <GitHubStats />
      <Projects />
      <Skills />
      <Contact />
      {/* <Certifications /> */}
      {/* <Education /> */}
      <CurrentFocus />
    </div>
  );
}

import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';

import About from '../components/about/About';
import Projects from '../components/projects/Projects';
import Skills from '../components/skills/Skills';
import CurrentFocus from '../components/current-focus/CurrentFocus';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <div className="space-y-24 py-8">
      <Helmet>
        <title>Md. Sabbir Hossen — Portfolio</title>
        <meta
          name="description"
          content="Production-ready portfolio of Md. Sabbir Hossen, a Junior MERN stack developer and cybersecurity learner."
        />
      </Helmet>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <CurrentFocus />
    </div>
  );
}

import { digitalLifeLessons } from './digitalLifeLessons';
import { gameHub } from './gameHub';
import { importExportHub } from './importExportHub';
import { personalAppStore } from './personalAppStore';

export const projects = [
  digitalLifeLessons,
  importExportHub,
  gameHub,
  personalAppStore,

  ///////////////////////////////////////////////
  // {{
  //   id: 'portfolio-website',
  //   title: 'Production Portfolio',
  //   category: 'MERN Stack',
  //   overview:
  //     'My official online brand portfolio, built from scratch using React 19, Tailwind CSS v4, and Framer Motion. This site acts as the hub of my identity.',
  //   technologies: [
  //     'React 19',
  //     'Vite',
  //     'Tailwind CSS v4',
  //     'Framer Motion',
  //     'React Helmet Async',
  //     'React Hook Form',
  //   ],
  //   architecture: [
  //     'Component-based architecture following modular directories (pages, layouts, components, data, hooks).',
  //     'State management using native React Context (ThemeContext for dark/light mode toggle).',
  //     'SEO tags managed dynamically using React Helmet Async.',
  //   ],
  //   challenges:
  //     'Configuring Tailwind CSS v4 alongside Vite with optimal tree-shaking while maintaining dark/light class toggles natively on the body without causing layout shifts.',
  //   lessonsLearned:
  //     'Mastered the new Tailwind v4 @theme configuration pipeline and learned how to implement clean dark mode switches with zero dependencies.',
  //   futureImprovements:
  //     'Integrate the floating AI Portfolio Assistant to read and speak in real-time, pulling details from the portfolio database.',
  //   featured: false,
  //   githubUrl: 'https://github.com',
  //   liveUrl: 'https://sabbir.dev',
  //   screenshots: ['/screenshots/portfolio-hero.png'],
  //   difficulty: 'Advanced',
  //   featuredOrder: 5,
  // },
  // {
  //   id: 'exploratory-lab',
  //   title: 'Exploratory Lab',
  //   category: 'AI Integration',
  //   overview:
  //     'A digital playground where I experiment with LLMs, prompt engineering, and node integrations. It serves as a sandbox for building smaller proof-of-concept AI apps.',
  //   technologies: ['React', 'Node.js', 'Express', 'Gemini API', 'Markdown Renderers'],
  //   architecture: [
  //     'React frontend styled with Tailwind CSS glassmorphism cards.',
  //     'Express backend handling proxy requests and API rate-limiting to prevent misuse.',
  //   ],
  //   challenges:
  //     'Handling streaming markdown chunks from LLMs cleanly in React while updating state without rendering stutter.',
  //   lessonsLearned:
  //     'Deepened my understanding of SSE (Server-Sent Events) and how to parse streams dynamically in the browser.',
  //   futureImprovements:
  //     'Add local browser vector storage (vector database) to support RAG (Retrieval-Augmented Generation) on user-uploaded documents.',
  //   githubUrl: 'https://github.com',
  //   liveUrl: 'https://lab.sabbir.dev',
  //   screenshots: ['/screenshots/lab-interface.png'],
  //   difficulty: 'Advanced',
  //   featuredOrder: 6,
  //   featured: false,
  // },
  // {
  //   id: 'learning-tracker',
  //   title: 'Learning Tracker',
  //   category: 'MERN Stack',
  //   overview:
  //     'A specialized dashboard to track programming skills, hours studied, cybersecurity terms, and Arabic vocabulary learning. Helps maintain a consistent learning discipline.',
  //   technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Chart.js', 'JWT Auth'],
  //   architecture: [
  //     'Model-View-Controller (MVC) pattern implemented in Express backend.',
  //     'RESTful API serving dashboard telemetry statistics.',
  //     'JWT tokens stored securely for session management.',
  //   ],
  //   challenges:
  //     'Structuring MongoDB charts aggregation queries to efficiently return monthly summaries of learning time by category.',
  //   lessonsLearned:
  //     'Mastered MongoDB aggregation pipelines ($match, $group, $project) and normalized time logging datatypes.',
  //   futureImprovements:
  //     'Implement email reports to send a weekly summary of learning accomplishments directly to my inbox.',
  //   githubUrl: 'https://github.com',
  //   liveUrl: 'https://tracker.sabbir.dev',
  //   screenshots: ['/screenshots/tracker-dashboard.png'],
  //   difficulty: 'Advanced',
  //   featuredOrder: 7,
  //   featured: false,
  // },}
];

import {
  FaDatabase,
  FaShieldAlt,
  FaTachometerAlt,
  SiAxios,
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiNodedotjs,
  SiReact,
  SiReactrouter,
  SiTailwindcss,
  SiVite,
} from '../icons';

export const importExportHub = {
  id: 'export-import-project',
  title: 'Import Export Hub',
  category: 'MERN Stack',
  overview:
    'Built a full-stack marketplace for connecting exporters and importers, covering product management, import workflows, and authenticated access. Implemented with React, Node.js/Express, MongoDB Atlas, Firebase, and security middleware to demonstrate MVC architecture, secure API design, and production-focused deployment.',
  technologies: [
    {
      name: 'MongoDB Atlas',
      icon: SiMongodb,
    },
    {
      name: 'Express.js',
      icon: SiExpress,
    },
    {
      name: 'React 18',
      icon: SiReact,
    },
    {
      name: 'Node.js',
      icon: SiNodedotjs,
    },
    {
      name: 'Mongoose',
      icon: FaDatabase,
    },
    {
      name: 'Firebase Admin SDK',
      icon: SiFirebase,
    },
    {
      name: 'Vite',
      icon: SiVite,
    },
    {
      name: 'React Router',
      icon: SiReactrouter,
    },
    {
      name: 'Tailwind CSS',
      icon: SiTailwindcss,
    },
    {
      name: 'Helmet',
      icon: FaShieldAlt,
    },
    {
      name: 'Express Rate Limit',
      icon: FaTachometerAlt,
    },
    {
      name: 'Axios',
      icon: SiAxios,
    },
  ],
  architecture: [
    'Frontend uses a modular React + Vite structure in import-export-hub-client/ with reusable components and custom hooks for data flow.',
    'State management uses useProducts, useImports, and useAuth to separate fetching logic from presentation.',
    'Backend uses an Express REST API with MVC boundaries across routes, controllers, and Mongoose models.',
    'Firebase JWT verification middleware protects authenticated requests and keeps client and server authorization aligned.',
    'Deployment uses MongoDB Atlas for data, Firebase for authentication, Vercel for the frontend, and Render or Railway for backend hosting.',
    'Security hardening includes Helmet headers, CORS whitelisting, rate limiting, and MongoDB IP restrictions.',
  ],
  challenges: [
    'Integrating Firebase authentication tokens with the Express backend was challenging because secure requests had to be verified before any marketplace action could proceed.',
    'Configuring Mongoose schemas for product and import relationships required careful data modeling to keep the workflow consistent.',
    'Coordinating MongoDB and Firebase initialization timing was important so authentication and data access stayed reliable.',
    'Implementing full-stack error handling helped keep failures visible instead of letting them break the user flow silently.',
  ],
  lessonsLearned: [
    'Improved Firebase Admin SDK usage for JWT verification and secure request handling.',
    'Reinforced MVC architecture in Express by separating routes, controllers, and models.',
    'Built a clearer understanding of cloud database integration with Mongoose ODM and MongoDB Atlas.',
    'Applied security practices such as Helmet, CORS, and rate limiting across the stack.',
    'Saw how documentation improves maintainability on full-stack projects.',
  ],
  futureImprovements: [
    'Add bulk import operations for large datasets',
    'Implement real-time notifications using WebSockets',
    'Add advanced search and filtering with pagination',
    'Create an admin dashboard for system analytics',
    'Add payment integration for premium features',
    'Implement AI-powered product recommendations',
  ],
  githubUrl: 'https://github.com/MSabbirHossen/export-import-project',
  liveUrl: 'https://import-export-hub-client.vercel.app/',
  featured: true,
  screenshots: ['/screenshots/import-export-hub-hero.png'],
  status: 'Completed',
  year: '2026',
  role: 'Solo Developer',
  duration: '2 Weeks',
  teamSize: '1',
  client: 'Personal',
  difficulty: 'Advanced',
  featuredOrder: 2,
};

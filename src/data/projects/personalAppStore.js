import {
  FaChartArea,
  FaIcons,
  SiDaisyui,
  SiFirebase,
  SiReact,
  SiReactrouter,
  SiTailwindcss,
  SiVite,
} from '../icons';

export const personalAppStore = {
  id: 'personal-app-store',
  title: 'Personal App Store',
  category: 'React + Firebase',
  overview:
    'Built a responsive app discovery platform with search, sorting, protected routes, and persistent installation tracking. Implemented with React 19, Vite, Firebase Auth, React Router, Tailwind CSS, and DaisyUI to demonstrate client-side state management and multi-provider authentication workflows.',
  technologies: [
    {
      name: 'Vite 7.2',
      icon: SiVite,
    },
    {
      name: 'React 19.2',
      icon: SiReact,
    },
    {
      name: 'Firebase 12.12',
      icon: SiFirebase,
    },
    {
      name: 'React Router 7.12',
      icon: SiReactrouter,
    },
    {
      name: 'Tailwind CSS 4.1',
      icon: SiTailwindcss,
    },
    {
      name: 'DaisyUI 5.5',
      icon: SiDaisyui,
    },
    {
      name: 'Recharts 3.6',
      icon: FaChartArea,
    },
    {
      name: 'React Icons 5.5',
      icon: FaIcons,
    },
    {
      name: 'React Toastify 11.0',
      icon: SiReact,
    },
  ],
  architecture: [
    'Component-based architecture uses modular directories for components, pages, provider, context, and Firebase utilities.',
    'Firebase Authentication supports email/password, Google OAuth, and GitHub OAuth sign-in flows.',
    'Context API powers global auth state with AuthProvider and PrivateRoute protection.',
    'localStorage preserves app installation state across sessions without a backend dependency.',
    'React Router v7 handles protected routes and dynamic app data loading with appsLoader.',
  ],
  challenges: [
    'Integrating Firebase authentication with multiple OAuth providers required careful state persistence across sign-in methods.',
    'Protecting routes while preserving app installation data across refreshes was difficult without a backend, so localStorage had to stay reliable.',
  ],
  lessonsLearned: [
    'Improved React 19 and Vite workflow choices for a fast client-side experience.',
    'Strengthened protected route patterns with Context API state management.',
    'Built a better understanding of client-side persistence with localStorage when no database is involved.',
  ],
  futureImprovements: [
    'Complete the profile page with user data editing',
    'Implement a banner slider with auto-rotating content',
    'Add a newsletter signup section',
    'Integrate advanced animations with Framer Motion',
    'Deploy to Firebase Hosting with production domain setup',
  ],
  githubUrl: 'https://github.com/MSabbirHossen/Personal_App-Store_Authentication',
  liveUrl: 'https://personal-app-store-89cac.web.app/',
  featured: false,
  screenshots: ['/screenshots/app-store-hero.png'],
  status: 'Completed',
  year: '2026',
  role: 'Solo Developer',
  duration: '3 Weeks',
  teamSize: '1',
  client: 'Personal',
  difficulty: 'Advanced',
  featuredOrder: 4,
};

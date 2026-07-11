// Simple Icons
import {
  SiAxios,
  SiDaisyui,
  SiEslint,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiNodedotjs,
  SiNpm,
  SiPostman,
  SiPrettier,
  SiReact,
  SiReactrouter,
  SiRender,
  SiStripe,
  SiTailwindcss,
  SiVercel,
  SiVite,
} from 'react-icons/si';

// Font Awesome
import {
  FaBell,
  FaBrain,
  FaDatabase,
  FaExclamationTriangle,
  FaIcons,
  FaLock,
  FaPlayCircle,
  FaSearch,
  FaServer,
  FaShieldAlt,
  FaTachometerAlt,
  FaGithub,
  FaGlobe,
  FaArrowRight,
  FaArrowsAltH,
  FaCalendarAlt,
  FaCss3,
  FaChartArea,
} from 'react-icons/fa';

// VS Code
import { VscVscodeInsiders } from 'react-icons/vsc';

export const portfolioData = {
  personalInfo: {
    name: 'Md. Sabbir Hossen',
    title: 'AI-Powered MERN Stack Developer',
    secondaryTitle: 'Cybersecurity Learner',
    brandName: 'Part-time Coder',
    brandTagline: 'Ignite Your Curiosity and See the Possibilities ✨',
    mission: 'Learner by heart, dreamer by soul — ',
    tagline: 'Building a future where faith, knowledge, and technology empower the Ummah.',
    location: 'Medina, Saudi Arabia (Originally from Bangladesh)',
    studyingAt: 'Islamic University of Madinah',
    email: 'mshossen724@gmail.com',
    github: 'https://github.com/MSabbirHossen',
    linkedin: 'https://www.linkedin.com/in/ms-hossen/',
    facebook: 'https://web.facebook.com/sabb1rhossen/',
    resumeUrl: 'https://drive.google.com/file/d/1BjOd3cSea8D16ljYYM8A_LS9g4H3PuAl/view?usp=sharing',
    languages: [
      {
        name: 'Bengali',
        level: 'Native',
        percentage: 100,
      },
      {
        name: 'English',
        level: 'Fluent',
        percentage: 85,
      },
      {
        name: 'Arabic',
        level: 'Conversational',
        percentage: 75,
      },
      {
        name: 'Urdu',
        level: 'Conversational',
        percentage: 65,
      },
      {
        name: 'Hindi',
        level: 'Conversational',
        percentage: 60,
      },
    ],
    values: [
      { title: 'Faith', desc: 'Guiding decisions and building tools that bring positive value.' },
      {
        title: 'Continuous Learning',
        desc: 'Every day is an opportunity to learn new things and expand skills.',
      },
      {
        title: 'Problem Solving',
        desc: 'Solving real-world problems with structured code and clean solutions.',
      },
      {
        title: 'Professionalism',
        desc: 'Delivering production-ready code and respecting deadlines.',
      },
      {
        title: 'Empowering Others',
        desc: 'Helping the Ummah by building open-source and educational tools.',
      },
    ],
    vision: [
      'Become a professional Full Stack MERN Developer specializing in AI-powered applications.',
      'Transition into Cybersecurity to protect and audit software systems.',
      'Build scalable educational platforms for the Ummah.',
      'Launch my own software company.',
    ],
    journey:
      'My programming journey started with HTML and CSS, which ignited my curiosity about the web. I quickly progressed into JavaScript, building interactive user interfaces. Today, I am learning and mastering the MERN Stack (MongoDB, Express.js, React, and Node.js) while integrating AI endpoints and exploring Cybersecurity, OSINT, and safe secure coding practices.',
  },

  skills: [
    {
      category: 'Frontend',
      items: [
        { name: 'React 19', icon: SiReact },
        { name: 'Vite', icon: SiVite },
        { name: 'Tailwind CSS v4', icon: SiTailwindcss },
        { name: 'HTML5', icon: SiHtml5 },
        { name: 'CSS3', icon: FaCss3 },
        { name: 'JavaScript (ES6+)', icon: SiJavascript },
        { name: 'Framer Motion', icon: SiFramer },
      ],
    },
    {
      category: 'Backend & Database',
      items: [
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'Express.js', icon: SiExpress },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'REST APIs', icon: FaServer },
        { name: 'JWT Authentication', icon: SiJsonwebtokens },
      ],
    },

    {
      category: 'Tools & Workflows',
      items: [
        { name: 'Git', icon: SiGit },
        { name: 'GitHub', icon: SiGithub },
        { name: 'VS Code', icon: VscVscodeInsiders },
        { name: 'npm', icon: SiNpm },
        { name: 'Vercel', icon: SiVercel },
        { name: 'ESLint', icon: SiEslint },
        { name: 'Prettier', icon: SiPrettier },
        // { name: 'Render', icon: SiRender },
        // { name: 'Postman', icon: SiPostman },
        // {name: 'Railway', icon: FaServer },
      ],
    },
    {
      category: 'Deployment & Hosting',
      items: [
        { name: 'Vercel', icon: SiVercel },
        // { name: 'Railway', icon: FaServer },
        { name: 'Netlify', icon: FaServer },
        // { name: 'Render', icon: SiRender },
        { name: 'Firebase Hosting', icon: SiFirebase },
      ],
    },
    {
      category: 'Testing & Debugging',
      items: [
        { name: 'Postman', icon: SiPostman },
        { name: 'ESLint', icon: SiEslint },
        { name: 'Prettier', icon: SiPrettier },
        { name: 'Chrome DevTools', icon: FaSearch },
      ],
    },
    {
      category: 'Collaboration & Productivity',
      items: [
        { name: 'Git', icon: SiGit },
        { name: 'GitHub', icon: SiGithub },
        { name: 'VS Code', icon: VscVscodeInsiders },
        { name: 'Vercel', icon: SiVercel },
      ],
    },

    {
      category: 'Cybersecurity & OSINT',
      items: [
        { name: 'Secure Coding Principles', icon: FaShieldAlt },
        { name: 'OSINT Research', icon: FaSearch },
        { name: 'Basic Network Security', icon: FaShieldAlt },
        { name: 'OWASP Top 10 Awareness', icon: FaShieldAlt },
      ],
    },
    {
      category: 'AI & Data Science',
      items: [
        { name: 'LLM API Integration', icon: FaBrain },
        { name: 'Prompt Engineering', icon: FaBrain },
        { name: 'AI Coding Assistants', icon: FaBrain },
      ],
    },
  ],

  education: [
    {
      period: 'Present',
      institution: 'Islamic University of Madinah',
      degree: 'Bachelor’s in Computer Science',
      desc: 'Pursuing a Bachelor’s degree in Computer Science with a focus on software development, cybersecurity, and information technology.',
    },
    {
      period: 'Completed',
      institution: 'Islamic University of Madinah',
      degree: 'Arabic Language for Non-Native Speakers',
      desc: 'Completed the first and second semesters while developing advanced Arabic language proficiency for academic and Islamic studies.Deep study of classical Arabic grammar, literature, and communication in Medina, Saudi Arabia',
    },
    // {
    //   // {
    //   //   period: '2021 – 2027',
    //   //   institution: 'Islami Arabic University',
    //   //   degree: 'Bachelor of Honors in Al-Quran and Islamic Studies',
    //   //   desc: 'First year completed. Pursuing undergraduate studies in Quranic and Islamic sciences alongside technical education.',
    //   // },
    //   // {
    //   //   period: 'Present',
    //   //   institution: 'Oakland English Research Centre (UK)',
    //   //   degree: 'Diploma in English (Online)',
    //   //   desc: 'Currently improving English communication skills through a structured online diploma program.',
    //   // },
    // },
    {
      period: '2021',
      institution: 'Ta’mirul Millat Kamil Madrasah, Tongi, Gazipur',
      degree: 'Higher Secondary Certificate (Alim) – Science',
      desc: 'Graduated with GPA 5.00/5.00, building a strong academic foundation in science and Islamic education.',
    },
    {
      period: '2019',
      institution: 'Setabgonj Kamil Madrasah, Dinajpur',
      degree: 'Secondary School Certificate (Dakhil) – Science',
      desc: 'Graduated with GPA 5.00/5.00, demonstrating consistent academic excellence.',
    },
    {
      period: '2016',
      institution: 'Chandipur M. Dakhil Madrasah',
      degree: 'Junior Dakhil Certificate (JDC)',
      desc: 'Completed junior secondary education with GPA 5.00/5.00.',
    },
  ],

  certifications: [
    {
      title: 'Complete Web Development Course',
      issuer: 'Programming Hero',
      date: '2026',
      id: 'WEB12-3517',
      link: 'https://drive.google.com/file/d/1TXbu_27BV0e6ttHZ5iOIk0iH6GrYfZYi/view?usp=sharing',
    },
    {
      title: 'Master HTML and CSS by Building Real-World Projects',
      issuer: 'Udemy',
      date: '2025',
      id: 'UC-a15ae6ed-80b0-4d97-a5e9-2151cab255d4',
      link: 'https://www.udemy.com/certificate/UC-a15ae6ed-80b0-4d97-a5e9-2151cab255d4/',
    },
    {
      title: 'Master Git and GitHub - Beginner to Expert',
      issuer: 'Udemy',
      date: '2024',
      id: 'b1ec25ee-3cce-4c6c-b922-efda23d0fc13',
      link: 'https://www.udemy.com/certificate/UC-b1ec25ee-3cce-4c6c-b922-efda23d0fc13/',
    },
    {
      title: 'VScode shortcuts & Extensions for Web Developer',
      issuer: 'Udemy',
      date: '2024',
      id: 'UC-827bbc34-b709-4213-bbc0-3dc50b8c6b33',
      link: 'https://www.udemy.com/certificate/UC-827bbc34-b709-4213-bbc0-3dc50b8c6b33/',
    },
    {
      title: 'Spreadsheets for Beginners using Google Sheets',
      issuer: 'Bangladeshi Students Community, Islamic University of Madinah',
      date: '2025',
      id: 'Not-available for this course',
      link: 'https://drive.google.com/file/d/1r8K7y5FjHu3nPL9AxtILtfgzrNnhuu6O/view?usp=sharing',
    },
    // {
    //   // {
    //   //   title: 'IELTS Preparation Course',
    //   //   issuer: 'MA Rashid Foundation',
    //   //   date: '2023',
    //   //   id: 'ielts-preparation-2023',
    //   //   link: '',
    //   // },
    //   // {
    //   //   title: 'Basic IT Course',
    //   //   issuer: 'Career Education Development Foundation (CED Foundation)',
    //   //   date: '2025',
    //   //   id: 'Not-available for this course',
    //   //   link: '',
    //   // },
    // },
  ],

  experience: [
    {
      period: 'Future-Ready',
      role: 'Full Stack MERN Developer & Security Auditor',
      company: 'Freelance & Open Source Projects',
      desc: 'Actively building MERN stack projects, contributing to open-source tools, and auditing code for cybersecurity safety.',
    },
  ],
  currentFocus: [
    {
      title: 'Full Stack MERN Development',
      organization: 'Personal & Open Source Projects',
      period: '2025 – Present',
      description:
        'Building scalable full-stack web applications using MongoDB, Express.js, React, and Node.js while following modern development practices.',
      icon: 'code',
    },
    {
      title: 'AI Engineering',
      organization: 'Independent Learning',
      period: 'Ongoing',
      description:
        'Learning prompt engineering, LLM integration, AI APIs, and practical AI-powered application development.',
      icon: 'ai',
    },
    {
      title: 'Cybersecurity & OSINT',
      organization: 'Independent Study',
      period: 'Ongoing',
      description:
        'Developing skills in web security, secure coding, penetration testing fundamentals, and OSINT methodologies.',
      icon: 'security',
    },
    {
      title: 'Open Source',
      organization: 'GitHub',
      period: 'Ongoing',
      description:
        'Publishing projects publicly, improving documentation, and contributing to the open-source ecosystem.',
      icon: 'github',
    },
  ],

  projects: [
    {
      id: 'digital-life-lessons',
      title: 'Digital Life Lessons',
      category: 'MERN Stack',
      overview:
        'A comprehensive full-stack platform for creating, sharing, and discovering meaningful life lessons with integrated authentication, premium payments, and admin moderation. Built with React, Node.js/Express, MongoDB, Firebase, and Stripe.',
      technologies: [
        {
          name: 'MongoDB',
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
          name: 'Vite',
          icon: SiVite,
        },
        {
          name: 'Tailwind CSS v3',
          icon: SiTailwindcss,
        },
        {
          name: 'Firebase Auth',
          icon: SiFirebase,
        },
        {
          name: 'Firebase Admin SDK',
          icon: FaLock,
        },
        {
          name: 'Stripe API',
          icon: SiStripe,
        },
        {
          name: 'React Router v6',
          icon: SiReactrouter,
        },
        {
          name: 'Axios',
          icon: SiAxios,
        },
        {
          name: 'React Toastify',
          icon: FaBell,
        },
        {
          name: 'SweetAlert2',
          icon: FaExclamationTriangle,
        },
        {
          name: 'Lottie React',
          icon: FaPlayCircle,
        },
      ],
      architecture: [
        'Modular MERN structure with separate client/ and server/ directories.',
        'Frontend: Component-based React app (pages, components, hooks, context, services, config).',
        'Backend: Express REST API with controllers, routes, models, middleware, and configuration.',
        'State management using React Context API (AuthContext) and custom hooks (useLessons, useFavorites, useInteractions).',
        'Authentication: Firebase Auth (client-side) + Firebase Admin SDK (server-side token validation).',
        'Database: MongoDB with Mongoose schemas for Users, Lessons, Comments, Favorites, and Reports.',
        'Security: Helmet for headers, CORS configuration, rate limiting, input validation.',
      ],
      challenges:
        'Integrating Firebase authentication across client and server, managing premium content access control with Stripe webhooks, implementing admin moderation systems, and handling real-time UI updates across multiple user roles.',
      lessonsLearned:
        'Mastered MERN full-stack development with third-party integrations (Firebase, Stripe), role-based access control, complex state management patterns, and secure API design with token validation and rate limiting.',
      futureImprovements:
        'Real-time lesson notifications, lesson recommendations using AI, comment threading and nested discussions, lesson statistics dashboard, social sharing analytics, and mobile app development.',
      githubUrl: 'https://github.com/MSabbirHossen/Digital-Life-Lessons',
      liveUrl: 'https://digital-life-lessons-client.vercel.app/',
      screenshots: ['/screenshots/digital-life-lessons-hero.png'],
      features: [
        'Lesson CRUD operations with public/private visibility',
        'Lesson reporting system',
        'Free/Premium access levels with Stripe integration',
        'Social interactions (likes, comments, favorites)',
        'User authentication (Email/Password + Google OAuth)',
        'Search, filter, and sort lessons',
        'Admin dashboard for content moderation and user management',
        'Role-based access control (Free User, Premium User, Admin)',
        'Responsive design (Mobile, Tablet, Desktop)',
        'Toast notifications and error handling',
      ],
      apiEndpoints: [
        'POST /api/auth/register - Register new user',
        'GET /api/auth/me - Get current user (Protected)',
        'GET /api/lessons/public - Get all public lessons',
        'POST /api/lessons - Create lesson (Protected)',
        'GET /api/lessons/:id - Get single lesson',
        'POST /api/lessons/:id/like - Like/unlike lesson (Protected)',
        'POST /api/lessons/:id/comment - Add comment (Protected)',
        'POST /api/stripe/create-checkout-session - Create checkout (Protected)',
        'GET /api/auth/admin/users - List all users (Admin)',
      ],
    },
    {
      id: 'export-import-project',
      title: 'Import Export Hub',
      category: 'MERN Stack',
      overview:
        'A full-stack MERN marketplace platform connecting exporters and importers. Features product management, import system, Firebase authentication, and real-time notifications with production-ready architecture and comprehensive documentation.',
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
        'Modular MERN structure: frontend in import-export-hub-client/ (React + Vite), backend in backend/ (Express + Node.js).',
        'Component-based React UI with custom hooks (useProducts, useImports, useAuth) for data fetching and state management.',
        'Express REST API with MVC pattern: routes → controllers → models (Mongoose) with Firebase JWT verification middleware.',
        'Cloud infrastructure: MongoDB Atlas for database, Firebase for authentication, Vercel for frontend, Render/Railway options for backend.',
        'Security layer: Helmet headers, CORS with frontend whitelist, rate limiting, Firebase JWT token verification, MongoDB IP whitelist.',
      ],
      challenges:
        'Integrating Firebase authentication tokens with Express backend for secure API communication, configuring Mongoose schemas for complex product/import relationships, coordinating MongoDB and Firebase initialization timing, implementing proper error handling across full stack.',
      lessonsLearned:
        'Mastered Firebase Admin SDK for JWT verification, learned MVC pattern architecture in Express, understood cloud database integration with Mongoose ODM, implemented security best practices (Helmet, CORS, rate limiting), discovered importance of comprehensive documentation for full-stack projects.',
      futureImprovements:
        'Add bulk import operations for large datasets, implement real-time notifications using WebSockets, add advanced search and filtering with pagination, create admin dashboard for system analytics, add payment integration for premium features, implement AI-powered product recommendations.',
      githubUrl: 'https://github.com/MSabbirHossen/export-import-project',
      liveUrl: 'https://import-export-hub-client.vercel.app/',
      screenshots: ['/screenshots/import-export-hub-hero.png'],
    },
    {
      id: 'online-game-library',
      title: 'GameHub - Online Game Library',
      category: 'React + Firebase',
      overview:
        'A vibrant, urban-themed web application for discovering, exploring, and downloading indie games and AAA titles. GameHub provides an engaging platform for gamers to browse games, view detailed information, and connect with gaming communities.',
      technologies: [
        { name: 'Vite 7.2.4', icon: SiVite },
        { name: 'React 19.2.0', icon: SiReact },
        { name: 'Firebase 12.12.1', icon: SiFirebase },
        { name: 'React Router 7.13.0', icon: SiReactrouter },
        { name: 'React Toastify 11.0.5', icon: FaBell },
        { name: 'React Fast Marquee 1.6.5', icon: FaArrowsAltH },
        { name: 'React Icons 5.5.0', icon: FaIcons },
        { name: 'Tailwind CSS 4.2.4', icon: SiTailwindcss },
        { name: 'DaisyUI 5.5.14', icon: SiDaisyui },
        { name: 'Framer Motion 12.0.0', icon: SiFramer },
        { name: 'Date-fns 4.1.0', icon: FaCalendarAlt },
      ],
      architecture: [
        'State management using React Context (AuthContext) for user authentication.',
        'Protected routes with authentication guards on sensitive pages.',
        'Firestore integration for game database and user profiles.',
        'Component-based architecture with modular directories (components, pages, context).',
        'Client-side routing using React Router for seamless SPA navigation.',
      ],
      challenges:
        'Implementing secure Firebase authentication with protected routes, real-time game filtering with search/category functionality, and maintaining responsive design with glassmorphism effects across all devices.',
      lessonsLearned:
        'Mastered Firebase authentication flow (email/password and Google OAuth), implemented advanced filtering/search patterns in React, and created modern UI with Tailwind CSS v4 and glassmorphism effects.',
      futureImprovements:
        'Integrate real-time game library updates from API, add user game library/wishlist feature, implement social features (reviews, ratings, community discussions), and optimize performance with code splitting.',
      githubUrl: 'https://github.com/MSabbirHossen/Online-Game-Library',
      liveUrl: 'https://online-game-library.web.app/',
      screenshots: ['/screenshots/game-library-hero.png'],
      keyFeatures: [
        'Browse comprehensive game library with indie and AAA titles',
        'Advanced search and category filtering with real-time results',
        'Secure user authentication (email/password and Google OAuth)',
        'Protected game details and user profile pages',
        'User profile customization with photo uploads',
        'Newsletter subscription for game updates',
        'Fully responsive design (mobile, tablet, desktop)',
        'Vibrant urban theme with neon cyan, orange, and electric yellow colors',
        'Glassmorphism effects with smooth Framer Motion animations',
        'WCAG 2.1 Level A accessibility compliance',
        'Touch-friendly UI with 44px minimum touch targets',
        'Dark mode by default with excellent contrast',
      ],
      deployment: 'Firebase Hosting (with Netlify and Vercel as alternatives)',
      performanceMetrics: {
        lighthousePerformance: '~90+',
        lighthouseAccessibility: '~95+',
        lighthouseBestPractices: '~92+',
        lighthouseSEO: '~90+',
      },
    },
    {
      id: 'personal-app-store',
      title: 'Personal App Store',
      category: 'React + Firebase',
      overview:
        'A modern, responsive web application for discovering, browsing, and managing applications. Built with React 19 and Vite, featuring real-time search, sorting, and local app installation tracking with Firebase authentication.',
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
        'Component-based architecture with modular directories (components, pages, provider, context, Firebase)',
        'Firebase Authentication with email/password, Google OAuth, and GitHub OAuth support',
        'Context API for global auth state management with AuthProvider and PrivateRoute protection',
        'localStorage integration for app installation persistence across sessions',
        'React Router v7 with protected routes and dynamic app data loading via appsLoader',
      ],
      challenges:
        'Integrating Firebase authentication with multiple OAuth providers while managing auth state persistence, protecting routes, and maintaining app installation data across page refreshes without backend.',
      lessonsLearned:
        'Mastered React 19 with Vite build optimization, implemented protected route patterns with context API, and learned effective localStorage management for client-side data persistence without a database.',
      futureImprovements:
        'Complete Profile page with user data editing, implement banner slider with auto-rotating content, add newsletter signup section, integrate advanced animations with Framer Motion, and deploy to Firebase Hosting with production domain setup.',
      githubUrl: 'https://github.com/MSabbirHossen/Personal_App-Store_Authentication',
      liveUrl: 'https://personal-app-store-89cac.web.app/',
      screenshots: ['/screenshots/app-store-hero.png'],
    },

    // {
    //   /////////////////////////////////////////////////
    //   // {
    //   //   id: 'portfolio-website',
    //   //   title: 'Production Portfolio',
    //   //   category: 'MERN Stack',
    //   //   overview:
    //   //     'My official online brand portfolio, built from scratch using React 19, Tailwind CSS v4, and Framer Motion. This site acts as the hub of my identity.',
    //   //   technologies: [
    //   //     'React 19',
    //   //     'Vite',
    //   //     'Tailwind CSS v4',
    //   //     'Framer Motion',
    //   //     'React Helmet Async',
    //   //     'React Hook Form',
    //   //   ],
    //   //   architecture: [
    //   //     'Component-based architecture following modular directories (pages, layouts, components, data, hooks).',
    //   //     'State management using native React Context (ThemeContext for dark/light mode toggle).',
    //   //     'SEO tags managed dynamically using React Helmet Async.',
    //   //   ],
    //   //   challenges:
    //   //     'Configuring Tailwind CSS v4 alongside Vite with optimal tree-shaking while maintaining dark/light class toggles natively on the body without causing layout shifts.',
    //   //   lessonsLearned:
    //   //     'Mastered the new Tailwind v4 @theme configuration pipeline and learned how to implement clean dark mode switches with zero dependencies.',
    //   //   futureImprovements:
    //   //     'Integrate the floating AI Portfolio Assistant to read and speak in real-time, pulling details from the portfolio database.',
    //   //   githubUrl: 'https://github.com',
    //   //   liveUrl: 'https://sabbir.dev',
    //   //   screenshots: ['/screenshots/portfolio-hero.png'],
    //   // },
    //   // {
    //   //   id: 'exploratory-lab',
    //   //   title: 'Exploratory Lab',
    //   //   category: 'AI Integration',
    //   //   overview:
    //   //     'A digital playground where I experiment with LLMs, prompt engineering, and node integrations. It serves as a sandbox for building smaller proof-of-concept AI apps.',
    //   //   technologies: ['React', 'Node.js', 'Express', 'Gemini API', 'Markdown Renderers'],
    //   //   architecture: [
    //   //     'React frontend styled with Tailwind CSS glassmorphism cards.',
    //   //     'Express backend handling proxy requests and API rate-limiting to prevent misuse.',
    //   //   ],
    //   //   challenges:
    //   //     'Handling streaming markdown chunks from LLMs cleanly in React while updating state without rendering stutter.',
    //   //   lessonsLearned:
    //   //     'Deepened my understanding of SSE (Server-Sent Events) and how to parse streams dynamically in the browser.',
    //   //   futureImprovements:
    //   //     'Add local browser vector storage (vector database) to support RAG (Retrieval-Augmented Generation) on user-uploaded documents.',
    //   //   githubUrl: 'https://github.com',
    //   //   liveUrl: 'https://lab.sabbir.dev',
    //   //   screenshots: ['/screenshots/lab-interface.png'],
    //   // },
    //   // {
    //   //   id: 'learning-tracker',
    //   //   title: 'Learning Tracker',
    //   //   category: 'MERN Stack',
    //   //   overview:
    //   //     'A specialized dashboard to track programming skills, hours studied, cybersecurity terms, and Arabic vocabulary learning. Helps maintain a consistent learning discipline.',
    //   //   technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Chart.js', 'JWT Auth'],
    //   //   architecture: [
    //   //     'Model-View-Controller (MVC) pattern implemented in Express backend.',
    //   //     'RESTful API serving dashboard telemetry statistics.',
    //   //     'JWT tokens stored securely for session management.',
    //   //   ],
    //   //   challenges:
    //   //     'Structuring MongoDB charts aggregation queries to efficiently return monthly summaries of learning time by category.',
    //   //   lessonsLearned:
    //   //     'Mastered MongoDB aggregation pipelines ($match, $group, $project) and normalized time logging datatypes.',
    //   //   futureImprovements:
    //   //     'Implement email reports to send a weekly summary of learning accomplishments directly to my inbox.',
    //   //   githubUrl: 'https://github.com',
    //   //   liveUrl: 'https://tracker.sabbir.dev',
    //   //   screenshots: ['/screenshots/tracker-dashboard.png'],
    //   // },
    // },
  ],
  preferredCollaboration: [
    'Open to freelance projects, collaborations, and full-time opportunities.',
    'Available for remote work and flexible schedules.',
    'Happy to discuss ideas, provide feedback, or mentor.',
  ],
};

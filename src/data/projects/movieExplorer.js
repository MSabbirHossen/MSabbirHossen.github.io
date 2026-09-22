import { FaArrowsAltH, FaDatabase, FaServer, SiReact, SiTailwindcss, SiVite } from '../icons';

export const movieExplorer = {
  id: 'movie-explorer',
  title: 'MovieExplorer — Discover TV Shows & Movies',
  category: 'React + API Integration',
  overview:
    'A modern, responsive, and feature-rich Movie & TV Show Explorer application built with React 19, Vite, and Tailwind CSS, powered by the TVMaze API. Users can browse thousands of titles, search dynamically, filter by genre and status, sort results, view rich details in a glassmorphic modal, and manage a persistent watchlist.',
  technologies: [
    {
      name: 'React',
      icon: SiReact,
    },
    {
      name: 'Vite',
      icon: SiVite,
    },
    {
      name: 'Tailwind CSS',
      icon: SiTailwindcss,
    },
    {
      name: 'TVMaze API',
      icon: FaServer,
    },
    {
      name: 'Context API',
      icon: FaArrowsAltH,
    },
    {
      name: 'localStorage',
      icon: FaDatabase,
    },
  ],
  architecture: [
    'Built with React 19 and Vite for a fast development experience and optimized production builds.',
    'Uses a dedicated MovieContext (Context API) to manage global state for movies, filters, search results, and watchlist favorites.',
    'A services layer (tvmazeApi.js) encapsulates all TVMaze REST API calls, keeping data-fetching logic separate from UI components.',
    'Component-driven architecture with reusable pieces such as MovieCard, MovieModal, SearchBar, FeaturedShows, and WatchlistView.',
    'Client-side persistence for the watchlist is handled via browser localStorage, requiring no backend or database.',
    'Styled entirely with Tailwind CSS v4, including custom glassmorphism effects and micro-animations defined in index.css.',
  ],
  challenges: [
    'Implementing a live, debounced search experience against the TVMaze search API while keeping the UI responsive and avoiding excessive network requests.',
    'Designing rich filtering and sorting (by genre, status, rating, release date, and title) that works smoothly together with paginated "load more" browsing.',
    'Building an accessible, glassmorphic details modal that supports closing via the close button, backdrop click, and the Escape key, while locking background scroll.',
    'Sanitizing and formatting raw HTML synopsis data returned by the TVMaze API for safe, clean display.',
  ],
  lessonsLearned: [
    'Using the Context API effectively for a mid-sized app can eliminate the need for heavier state management libraries while still keeping state predictable.',
    'Debouncing search input and managing loading states significantly improves perceived performance and user experience.',
    'Persisting user preferences like a watchlist in localStorage is a simple yet effective way to add app-like continuity without a backend.',
    'Careful component decomposition (Navbar, HeroBanner, MovieCard, MovieModal, etc.) makes a feature-rich UI much easier to maintain and extend.',
  ],
  futureImprovements: [
    'Add backend/user authentication to sync watchlists across devices instead of relying solely on localStorage.',
    'Introduce infinite scroll as an alternative to the "Load More" button for catalog browsing.',
    'Add episode-level browsing and tracking using the embedded episodes data already available from the TVMaze API.',
    'Improve accessibility further with more comprehensive keyboard navigation and ARIA support across all interactive components.',
  ],
  githubUrl: 'https://github.com/MSabbirHossen/movieExplorer',
  liveUrl: 'https://movieexplorer-pink.vercel.app',
  screenshots: ['/screenshots/movie-explorer-hero.png'],
  featured: true,
  status: 'Completed',
  year: '2026',
  role: 'Solo Developer',
  duration: '2 Weeks',
  teamSize: '1',
  client: 'Personal',
  difficulty: 'Intermediate',
  featuredOrder: 1,
  features: [
    'Browse a paginated catalog of TV shows and movies with rich poster imagery and ratings.',
    'Search titles dynamically with debounced TVMaze API requests for a responsive experience.',
    'Filter by genre and status, sort by rating, release date, or title, and load more results on demand.',
    'Open accessible show details with cast, episodes, sanitized synopsis content, and keyboard-friendly dismissal.',
    'Save favorite titles to a persistent watchlist backed by browser localStorage.',
  ],
  keyFeatures: [
    'Debounced API-powered search',
    'Multi-criteria filtering and sorting',
    'Accessible glassmorphic details modal',
    'Persistent local watchlist',
  ],
  apiEndpoints: [
    'GET https://api.tvmaze.com/shows?page=:page - Fetch paginated show catalog',
    'GET https://api.tvmaze.com/search/shows?q=:query - Search shows by query',
    'GET https://api.tvmaze.com/shows/:id?embed[]=cast&embed[]=episodes - Fetch show details with cast and episodes',
  ],
  deployment: 'Vercel',
};

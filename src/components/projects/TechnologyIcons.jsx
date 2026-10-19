import { FaCode } from 'react-icons/fa';

const BRAND_COLORS = {
  // Languages & Core
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  HTML: '#E34F26',
  HTML5: '#E34F26',
  CSS: '#1572B6',
  CSS3: '#1572B6',

  // Frontend frameworks & libraries
  'React 19': '#61DAFB',
  'React 18': '#61DAFB',
  React: '#61DAFB',
  'React Router': '#CA4245',
  'React Router v7': '#CA4245',
  'React Icons': '#E91E63',
  'React Toastify': '#FF5F56',
  'React Fast Marquee': '#00D2D3',
  'React Hook Form': '#EC5990',
  'React Helmet Async': '#FFD166',
  'Context API': '#61DAFB',
  'Next.js': '#0070F3',
  Nextjs: '#0070F3',
  Redux: '#764ABC',
  'Tailwind CSS': '#06B6D4',
  'Tailwind CSS v4': '#06B6D4',
  DaisyUI: '#1AD1A5',
  'Framer Motion': '#0055FF',
  Recharts: '#22C55E',
  'Lucide React': '#F56565',
  Lucide: '#F56565',

  // Backend & Databases
  'Node.js': '#5FA04E',
  Node: '#5FA04E',
  'Express.js': '#68A063',
  Express: '#68A063',
  PostgreSQL: '#4169E1',
  'MongoDB Atlas': '#47A248',
  MongoDB: '#47A248',
  Mongoose: '#880000',
  Docker: '#2496ED',
  'Firebase Admin SDK': '#FFA611',
  'Firebase Auth': '#FFCA28',
  Firestore: '#FFCA28',
  Firebase: '#FFCA28',
  Vercel: '#00DF8F',

  // Tooling & APIs
  Vite: '#646CFF',
  Git: '#F05032',
  GitHub: '#8957E5',
  'Stripe API': '#635BFF',
  Stripe: '#635BFF',
  'JWT Auth': '#D63AFF',
  JWT: '#D63AFF',
  'RESTful API': '#009688',
  'REST API': '#009688',
  Postman: '#FF6C37',
  'Chart.js': '#FF6384',
  'TVMaze API': '#3C948B',
  localStorage: '#E34F26',
  Axios: '#5A29E4',
  Helmet: '#FFD166',
  'Express Rate Limit': '#68A063',
  bcrypt: '#2B5B84',
};

const sortedBrandKeys = Object.keys(BRAND_COLORS).sort((a, b) => b.length - a.length);

function getBrandColor(techName) {
  if (!techName) return '#6366F1';
  if (BRAND_COLORS[techName]) return BRAND_COLORS[techName];

  const lower = techName.toLowerCase();
  for (const key of sortedBrandKeys) {
    const keyLower = key.toLowerCase();
    if (lower === keyLower || lower.includes(keyLower)) {
      return BRAND_COLORS[key];
    }
  }
  return '#6366F1';
}

function TechIconItem({ tech }) {
  const Icon = tech.icon ?? FaCode;
  const brandColor = tech.color || getBrandColor(tech.name);

  return (
    <div
      className="tech-icon-wrapper"
      style={{
        '--brand-color': brandColor,
        '--brand-bg': `${brandColor}18`,
        '--brand-border': `${brandColor}80`,
        '--brand-shadow': `${brandColor}35`,
      }}
    >
      {/* Tooltip Popup */}
      <div
        role="tooltip"
        className="tech-icon-tooltip"
        style={{
          borderColor: `${brandColor}55`,
          boxShadow: `0 10px 25px -5px ${brandColor}35, 0 8px 10px -6px ${brandColor}25`,
        }}
      >
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-2 w-2 rounded-full shrink-0"
            style={{ backgroundColor: brandColor }}
          />
          <span className="tracking-wide text-slate-100">{tech.name}</span>
        </span>
        <span
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 border-r border-b"
          style={{
            backgroundColor: '#0f172a',
            borderColor: `${brandColor}55`,
          }}
        />
      </div>

      {/* Icon Button */}
      <div
        aria-label={tech.name}
        className="tech-icon-btn border border-default bg-surface/80 text-secondary shadow-sm"
      >
        <Icon className="text-xl transition-transform duration-300" />
      </div>
    </div>
  );
}

export default function TechnologyIcons({ project, maxIcons }) {
  const { technologies } = project;
  const visibleTech = maxIcons ? technologies.slice(0, maxIcons) : technologies;
  const remaining = technologies.length - visibleTech.length;

  return (
    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
      {visibleTech.map((tech, index) => (
        <TechIconItem key={`${tech.name}-${index}`} tech={tech} />
      ))}

      {remaining > 0 && (
        <div
          title={`${remaining} more technologies`}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-dashed border-default bg-surface/70 text-sm font-semibold text-secondary"
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}

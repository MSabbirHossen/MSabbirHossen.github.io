import Reveal from '../animations/Reveal';
import { FaBook, FaCodeBranch, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import Card from '../common/Card';
import Typography from '../common/Typography';

const REFERENCE_NOW = Date.now();

export default function RecentRepos({ repos }) {
  if (!repos?.length) return null;

  const colors = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#264de4',
    Python: '#3776ab',
    Java: '#f89820',
  };

  function timeAgo(date) {
    const diff = REFERENCE_NOW - new Date(date).getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Updated today';

    if (days === 1) return 'Updated yesterday';

    if (days < 30) return `Updated ${days} days ago`;

    const months = Math.floor(days / 30);

    return `Updated ${months} month${months > 1 ? 's' : ''} ago`;
  }

  return (
    <div className="mt-10">
      <Typography variant="h3" className="mb-6 text-center text-primary">
        Recent Repositories
      </Typography>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {repos.map((repo, index) => (
          <Reveal key={repo.name} delay={index * 0.08}>
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${repo.name} repository in a new tab`}
            >
              <Card className="group flex h-full flex-col justify-between border border-default p-6 transition-all duration-300 hover:border-accent-primary/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                    <FaBook />
                  </div>

                  <Typography variant="subtitle" className="font-semibold text-primary">
                    {repo.name}
                  </Typography>
                </div>

                <Typography variant="body" className="mt-2 line-clamp-2 text-secondary">
                  {repo.description || 'No description provided.'}
                </Typography>

                <div className="mt-6 flex items-end justify-between">
                  <div className="mt-4 flex items-center gap-3 text-sm">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold"
                      style={{
                        backgroundColor: `${colors[repo.language] || '#3B82F6'}22`,
                        color: colors[repo.language] || '#3B82F6',
                      }}
                    >
                      {repo.language}
                    </span>

                    <span className="flex items-center gap-1 text-secondary">
                      <FaStar />
                      {repo.stars}
                    </span>

                    <span className="flex items-center gap-1 text-secondary">
                      <FaCodeBranch />
                      {repo.forks}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-accent-primary transition-transform group-hover:translate-x-1">
                    View Repository
                    <FaExternalLinkAlt className="text-xs" />
                  </div>
                </div>
                <Typography variant="caption" className="mx-auto mt-4 text-muted">
                  {timeAgo(repo.updated)}
                </Typography>
              </Card>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

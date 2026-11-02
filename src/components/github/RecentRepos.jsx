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
          <Reveal key={repo.name} delay={index * 0.08} className="h-full">
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${repo.name} repository in a new tab`}
              className="block h-full"
            >
              <Card
                spotlight
                hover
                className="group flex h-full flex-col justify-between border-default p-5 sm:p-6 transition-all duration-300 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                      <FaBook />
                    </div>

                    <Typography
                      variant="subtitle"
                      className="font-semibold text-primary truncate text-sm sm:text-base"
                    >
                      {repo.name}
                    </Typography>
                  </div>

                  <Typography
                    variant="body"
                    className="mt-3 line-clamp-2 text-xs sm:text-sm text-secondary"
                  >
                    {repo.description || 'No description provided.'}
                  </Typography>
                </div>

                <div className="mt-5 border-t border-default/40 pt-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="rounded-md px-2 py-0.5 text-[11px] font-bold"
                        style={{
                          backgroundColor: `${colors[repo.language] || '#3B82F6'}22`,
                          color: colors[repo.language] || '#3B82F6',
                        }}
                      >
                        {repo.language}
                      </span>

                      {repo.stars > 0 && (
                        <span className="flex items-center gap-1 text-secondary text-xs">
                          <FaStar className="text-accent-warning" />
                          <span>{repo.stars}</span>
                        </span>
                      )}

                      {repo.forks > 0 && (
                        <span className="flex items-center gap-1 text-secondary text-xs">
                          <FaCodeBranch />
                          <span>{repo.forks}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 font-medium text-accent-primary text-xs transition-transform group-hover:translate-x-1">
                      <span>View Repo</span>
                      <FaExternalLinkAlt className="text-[10px]" />
                    </div>
                  </div>

                  <Typography
                    variant="caption"
                    className="mt-2 block text-center text-[11px] text-muted"
                  >
                    {timeAgo(repo.updated)}
                  </Typography>
                </div>
              </Card>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { FaCheck, FaCopy } from 'react-icons/fa';
import Card from '../common/Card';
import Typography from '../common/Typography';
import Badge from '../common/Badge';

const METHOD_STYLES = {
  GET: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  POST: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
  PUT: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
  PATCH: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
  DELETE: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
};

const parseEndpoint = (raw) => {
  const match = raw.match(
    /^(GET|POST|PUT|PATCH|DELETE)\s+([^\s-]+(?:\s+[^\s-]+)*?)(?:\s*-\s*(.+))?$/i
  );
  if (!match) {
    return {
      method: null,
      path: raw,
      description: null,
    };
  }

  return {
    method: match[1].toUpperCase(),
    path: match[2].trim(),
    description: match[3]?.trim() || null,
  };
};

const EndpointItem = ({ endpoint }) => {
  const [copied, setCopied] = useState(false);
  const { method, path, description } = parseEndpoint(endpoint);

  const handleCopy = () => {
    navigator.clipboard.writeText(path);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const methodClass =
    (method && METHOD_STYLES[method]) ||
    'bg-accent-primary/10 text-accent-primary border-accent-primary/30';

  return (
    <div className="group relative rounded-xl border border-default bg-surface/60 p-3 sm:p-3.5 transition-all duration-200 hover:border-accent-primary/40 hover:bg-surface/90">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          {method && (
            <span
              className={`inline-flex shrink-0 items-center justify-center rounded-md border px-2 py-0.5 font-mono text-xs font-bold tracking-wider ${methodClass}`}
            >
              {method}
            </span>
          )}
          <code className="min-w-0 truncate font-mono text-xs font-medium text-primary sm:text-sm">
            {path}
          </code>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-default bg-surface/80 text-muted opacity-80 transition-all hover:border-accent-primary hover:text-accent-primary group-hover:opacity-100"
          aria-label={copied ? 'Copied' : `Copy endpoint ${path}`}
          title={copied ? 'Copied!' : 'Copy path'}
        >
          {copied ? (
            <FaCheck className="h-3 w-3 text-emerald-500" />
          ) : (
            <FaCopy className="h-3 w-3" />
          )}
        </button>
      </div>

      {description && (
        <p className="mt-2 text-xs leading-relaxed text-secondary sm:text-sm">{description}</p>
      )}
    </div>
  );
};

const ProjectApiEndpoints = ({ endpoints }) => {
  if (!endpoints?.length) return null;

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Typography variant="subtitle">API Surface</Typography>
        <Badge variant="outline" size="sm">
          {endpoints.length} {endpoints.length === 1 ? 'Endpoint' : 'Endpoints'}
        </Badge>
      </div>

      <div className="space-y-2.5" role="list" aria-label="API endpoints">
        {endpoints.map((endpoint) => (
          <EndpointItem key={endpoint} endpoint={endpoint} />
        ))}
      </div>
    </Card>
  );
};

export default ProjectApiEndpoints;

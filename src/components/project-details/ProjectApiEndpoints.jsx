import Card from '../common/Card';
import Typography from '../common/Typography';

const ProjectApiEndpoints = ({ endpoints }) => {
  if (!endpoints?.length) return null;

  return (
    <Card className="space-y-4">
      <Typography variant="subtitle">API Surface</Typography>

      <ul className="space-y-3" aria-label="API endpoints">
        {endpoints.map((endpoint) => (
          <li key={endpoint}>
            <pre className="overflow-x-auto rounded-xl border border-default bg-surface/80 p-3">
              <code className="block whitespace-pre-wrap break-words font-mono text-xs text-secondary sm:text-sm">
                {endpoint}
              </code>
            </pre>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ProjectApiEndpoints;

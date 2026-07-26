import { FaExternalLinkAlt } from 'react-icons/fa';
import Card from '../common/Card';
import Typography from '../common/Typography';

export default function ProjectLinkCard({ icon: Icon, title, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} (opens in a new tab)`}
      className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg"
    >
      <Card className="group mt-3 flex items-center justify-between rounded-xl border-default p-4 light:hover:border-accent-primary/40">
        <div className="flex items-center gap-3">
          <Icon className="text-xl text-accent-primary transition-colors duration-300 group-hover:text-accent-secondary" />

          <Typography
            variant="body"
            className="font-medium text-secondary transition-colors group-hover:text-primary"
          >
            {title}
          </Typography>
        </div>

        <FaExternalLinkAlt className="text-sm text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent-primary" />
      </Card>
    </a>
  );
}

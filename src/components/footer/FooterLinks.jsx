import Typography from '../common/Typography';
import { FOOTER_LINKS } from '../../data/navigation';

const FooterLinks = () => {
  return (
    <div>
      <Typography variant="subtitle" className="mb-4 text-slate-800 dark:text-slate-100">
        Explore
      </Typography>

      <ul className="space-y-3">
        {FOOTER_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="
                rounded-md
                text-slate-500
                transition-colors
                hover:text-accent-primary
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-accent-primary
                focus-visible:ring-offset-2
                dark:text-slate-400
                dark:focus-visible:ring-offset-slate-900
                dark:hover:text-accent-primary
              "
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;

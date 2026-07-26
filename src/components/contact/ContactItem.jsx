import Typography from '../common/Typography';

export default function ContactItem({ icon: Icon, title, children, href }) {
  return (
    <div className="group flex items-start gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-accent-primary/10">
      <Icon
        className="mt-1 h-5 w-5 text-accent-secondary transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      />

      <div>
        <Typography variant="subtitle" className="text-primary">
          {title}
        </Typography>

        {href ? (
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="break-all text-secondary transition-colors hover:text-accent-secondary"
          >
            {children}
          </a>
        ) : (
          <p className="text-secondary">{children}</p>
        )}
      </div>
    </div>
  );
}

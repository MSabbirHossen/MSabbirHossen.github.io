import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Typography from '../components/common/Typography';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <Helmet>
        <title>Page Not Found | Md. Sabbir Hossen</title>
        <meta name="description" content="The page you are looking for could not be found." />
      </Helmet>

      <Typography variant="h2">404 - Page not found</Typography>
      <Typography variant="body" className="mt-4 text-secondary">
        The page you requested does not exist or may have been moved.
      </Typography>

      <Link
        to="/"
        className="mt-8 inline-flex items-center rounded-xl border border-default px-4 py-2 text-sm font-medium text-accent-primary transition-colors hover:text-accent-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg"
      >
        Go back home
      </Link>
    </section>
  );
}

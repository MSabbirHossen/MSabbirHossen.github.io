import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Typography from '../components/common/Typography';
import { useTranslation } from '../i18n';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <Helmet>
        <title>{t('notFound.metaTitle')}</title>
        <meta name="description" content={t('notFound.metaDesc')} />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <Typography variant="h2">{t('notFound.heading')}</Typography>
      <Typography variant="body" className="mt-4 text-secondary">
        {t('notFound.description')}
      </Typography>

      <Link
        to="/"
        className="mt-8 inline-flex items-center rounded-xl border border-default px-4 py-2 text-sm font-medium text-accent-primary transition-colors hover:text-accent-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg"
      >
        {t('notFound.goHome')}
      </Link>
    </section>
  );
}

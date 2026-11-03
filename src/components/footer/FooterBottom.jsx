import { Link } from 'react-router-dom';
import { portfolioData } from '../../data';
import FooterSocials from './FooterSocials';
import { useTranslation } from '../../i18n';

export default function FooterBottom() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const { personalInfo } = portfolioData;

  return (
    <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-5 border-t border-default/60 px-6 pt-8 text-xs text-muted sm:flex-row">
      <div className="text-center sm:text-left rtl:sm:text-right space-y-1">
        <p className="leading-relaxed">
          &copy; {currentYear}{' '}
          <Link
            to="/developer"
            className="font-semibold text-primary transition-colors hover:text-accent-primary"
            title="View Developer & Community Hub"
          >
            {personalInfo.brandName}
          </Link>
          . {t('footer.rightsReserved')}
        </p>
        <p className="text-muted/80">
          {t('footer.subTagline')}{' '}
          <Link
            to="/developer"
            className="inline-flex items-center gap-1 font-medium text-muted transition-colors hover:text-accent-primary"
            title="Developer Info & Community Hub"
          >
            <span className="text-accent-primary">✦</span> {t('footer.developerHub')}
          </Link>
        </p>
      </div>

      <div className="sm:pr-24 rtl:sm:pr-0 rtl:sm:pl-24">
        <FooterSocials />
      </div>
    </div>
  );
}

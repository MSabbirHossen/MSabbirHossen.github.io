import { portfolioData } from '../../data/portfolioData';
import FooterSocials from './FooterSocials';

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();
  const { personalInfo } = portfolioData;
  return (
    <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-default px-6 pt-6 text-xs text-muted sm:flex-row">
      <div>
        <p className="text-center sm:text-left">
          Designed & Developed by{' '}
          <a
            href={personalInfo.website}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent-primary transition-colors hover:text-accent-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg"
          >
            {personalInfo.name}
          </a>
          <br /> &copy; {currentYear} {personalInfo.brandName}. All rights reserved.
        </p>
      </div>
      <div>
        <FooterSocials />
      </div>
    </div>
  );
};

export default FooterBottom;

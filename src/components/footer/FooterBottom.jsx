import { portfolioData } from '../../data';
import FooterSocials from './FooterSocials';

export default function FooterBottom() {
  const currentYear = new Date().getFullYear();
  const { personalInfo } = portfolioData;

  return (
    <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-default/60 px-6 pt-8 text-xs text-muted sm:flex-row">
      <div className="text-center sm:text-left">
        <p className="leading-relaxed">
          &copy; {currentYear}{' '}
          <span className="font-semibold text-primary">{personalInfo.brandName}</span>. All rights
          reserved.
        </p>
        <p className="mt-0.5 text-muted/80">
          Designed & developed with modern React & Tailwind CSS.
        </p>
      </div>

      <div className="sm:pr-24">
        <FooterSocials />
      </div>
    </div>
  );
}

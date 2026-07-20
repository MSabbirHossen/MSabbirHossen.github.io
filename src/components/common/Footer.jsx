import FooterBrand from '../footer/FooterBrand';
import FooterBottom from '../footer/FooterBottom';
import FooterLinks from '../footer/FooterLinks';
import FooterResources from '../footer/FooterResources';
import FooterSocials from '../footer/FooterSocials';
import BackToTopButton from '../footer/BackToTopButton';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12 transition-colors dark:border-slate-800 dark:bg-[#080b13]">
      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
        <div className="space-y-6">
          <FooterBrand />
        </div>

        <FooterLinks />

        <FooterResources />
      </div>
      <FooterSocials />
      {/* Bottom */}
      <FooterBottom />
      <BackToTopButton />
    </footer>
  );
}

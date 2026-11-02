import FooterBrand from '../footer/FooterBrand';
import FooterBottom from '../footer/FooterBottom';
import FooterLinks from '../footer/FooterLinks';
import FooterResources from '../footer/FooterResources';
import FooterMore from '../footer/FooterMore';
import BackToTopButton from '../footer/BackToTopButton';

export default function Footer() {
  return (
    <footer className="border-t border-default/70 surface py-12 sm:py-16 transition-colors">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-6">
          <FooterBrand />
        </div>

        <FooterLinks />

        <FooterResources />

        <FooterMore />
      </div>
      <FooterBottom />
      <BackToTopButton />
    </footer>
  );
}

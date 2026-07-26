import FooterBrand from '../footer/FooterBrand';
import FooterBottom from '../footer/FooterBottom';
import FooterLinks from '../footer/FooterLinks';
import FooterResources from '../footer/FooterResources';
import BackToTopButton from '../footer/BackToTopButton';

export default function Footer() {
  return (
    <footer className="border-default border-t surface py-12 transition-colors">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
        <div className="space-y-6">
          <FooterBrand />
        </div>

        <FooterLinks />

        <FooterResources />
      </div>
      <FooterBottom />
      <BackToTopButton />
    </footer>
  );
}

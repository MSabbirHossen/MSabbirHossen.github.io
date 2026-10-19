import Reveal from '../animations/Reveal';
import ContactForm from '../contact/ContactForm';
import ContactInfo from '../contact/ContactInfo';
import SectionWrapper from '../common/SectionWrapper';

export default function Contact() {
  return (
    <SectionWrapper id="contact" title="Get In Touch">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 lg:grid-cols-2 items-stretch">
          <Reveal y={18} className="h-full">
            <ContactForm />
          </Reveal>

          <Reveal y={18} duration={0.5} delay={0.08} amount={0.2} className="h-full">
            <ContactInfo />
          </Reveal>
        </div>
      </div>
    </SectionWrapper>
  );
}

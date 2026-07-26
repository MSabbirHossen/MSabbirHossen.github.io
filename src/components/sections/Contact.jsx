import Reveal from '../animations/Reveal';
import ContactForm from '../contact/ContactForm';
import ContactInfo from '../contact/ContactInfo';
import SectionWrapper from '../common/SectionWrapper';

export default function Contact() {
  return (
    <SectionWrapper
      id="contact"
      eyebrow="Get In Touch"
      title="Contact Me"
      description="Whether you have a project, an opportunity, or just want to connect, I'd love to hear from you."
      className="py-20 glass"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal y={18}>
            <ContactForm />
          </Reveal>

          <Reveal y={18} duration={0.5} delay={0.08} amount={0.2}>
            <ContactInfo />
          </Reveal>
        </div>
      </div>
    </SectionWrapper>
  );
}

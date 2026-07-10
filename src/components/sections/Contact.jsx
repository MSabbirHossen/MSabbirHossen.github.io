import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import Typography from '../common/Typography';
import Button from '../common/Button';
import Card from '../common/Card';
import Input from '../common/Input';
import emailjs from '@emailjs/browser';
import Reveal from '../animations/Reveal';

export default function Contact() {
  const { personalInfo } = portfolioData;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          time: new Date().toLocaleString(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success('Message sent! Thank you for reaching out.');
      reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900 glass">
      <div className="mx-auto max-w-6xl px-4">
        <Typography
          variant="h2"
          className="mb-8 text-center text-primary-600 dark:text-primary-400"
        >
          Contact Me
        </Typography>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal y={18} duration={0.5} amount={0.2}>
            <Card className="h-full space-y-6">
              <div>
                <Typography variant="subtitle" className="text-slate-100">
                  Send a message
                </Typography>
                <Typography variant="body" className="mt-2 text-slate-400">
                  For collaboration, feedback, or opportunities, use the form below.
                </Typography>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <Input
                  label="Name"
                  placeholder="Your full name"
                  error={errors.name?.message}
                  required
                  {...register('name', { required: 'Name is required' })}
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  error={errors.email?.message}
                  helperText="I’ll reply directly to this address."
                  required
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: 'Invalid email address',
                    },
                  })}
                />

                <Input
                  label="Message"
                  placeholder="Tell me about your idea, project, or question."
                  error={errors.message?.message}
                  multiline
                  rows={5}
                  required
                  {...register('message', { required: 'Message is required' })}
                />

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  icon={FaPaperPlane}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </Reveal>

          <Reveal y={18} duration={0.5} delay={0.08} amount={0.2}>
            <Card className="h-full space-y-5">
              <Typography variant="subtitle" className="text-slate-100">
                Contact details
              </Typography>

              <div className="space-y-4 text-slate-400">
                <div className="flex items-start gap-3">
                  <FaEnvelope className="mt-1 h-4 w-4 text-accent-secondary" />
                  <div>
                    <p className="text-sm font-medium text-slate-100">Email</p>
                    <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 h-4 w-4 text-accent-secondary" />
                  <div>
                    <p className="text-sm font-medium text-slate-100">Location</p>
                    <p>{personalInfo.location}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-medium text-slate-100">Preferred collaboration</p>
                  <ul className="mt-2 text-sm text-slate-400">
                    {/* <li>Open to freelance projects, collaborations, and full-time opportunities.</li>
                    <li>Available for remote work and flexible schedules.</li>
                    <li>Happy to discuss ideas, provide feedback, or mentor.</li> */}
                    {portfolioData.preferredCollaboration.map((item, index) => (
                      <li className="pl-6" key={index}>
                        {' '}
                        - {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

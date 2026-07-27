import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaPaperPlane } from 'react-icons/fa';
import Typography from '../common/Typography';
import Button from '../common/Button';
import Card from '../common/Card';
import Input from '../common/Input';
import emailjs from '@emailjs/browser';
import Reveal from '../animations/Reveal';

const ContactForm = () => {
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
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      toast.success('Message sent! Thank you for reaching out.');
      reset();

      window.scrollTo({
        top: document.getElementById('contact').offsetTop,
        behavior: 'smooth',
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Please try again later.');
    }
  };
  return (
    <div>
      <Reveal y={18} duration={0.5} amount={0.2}>
        <Card className="h-full space-y-10">
          <div>
            <Typography variant="subtitle" className="text-primary">
              Send a message
            </Typography>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-7">
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
    </div>
  );
};

export default ContactForm;

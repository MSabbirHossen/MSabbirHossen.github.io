import { useState } from 'react';
import { FaCheck, FaExternalLinkAlt, FaUserCheck, FaPaperPlane } from 'react-icons/fa';
import Typography from '../common/Typography';
import Button from '../common/Button';
import Card from '../common/Card';

const WHATSAPP_NUMBER = '8801773511874';

const TOPIC_OPTIONS = [
  { label: 'Freelance / Hire', emoji: '🤝' },
  { label: 'Job Opportunity', emoji: '💼' },
  { label: 'Project Collab', emoji: '🚀' },
  { label: 'General Feedback', emoji: '💡' },
];

const ContactForm = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const getWhatsAppUrl = (text, name = '', email = '') => {
    const lines = [];
    if (name.trim()) lines.push(`*From:* ${name.trim()}`);
    if (email.trim()) lines.push(`*Contact:* ${email.trim()}`);
    if (lines.length > 0) {
      lines.push('');
    }
    lines.push(text.trim());
    const fullMessage = lines.join('\n');
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    const url = getWhatsAppUrl(feedbackText, senderName, senderEmail);
    window.open(url, '_blank', 'noopener,noreferrer');
    setFeedbackSent(true);
  };

  const handleTopicClick = (label, emoji) => {
    setSelectedTopic(label);
    setFeedbackText((prev) => {
      const topicPrefix = `[Topic: ${emoji} ${label}] `;
      if (!prev) return topicPrefix;
      if (/^\[Topic: [^\]]+\]\s*/.test(prev)) {
        return prev.replace(/^\[Topic: [^\]]+\]\s*/, topicPrefix);
      }
      return `${topicPrefix}${prev}`;
    });
  };

  return (
    <Card hover className="h-full flex flex-col justify-between space-y-5">
      {/* Symmetrical Top Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-default/50">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary shrink-0">
            <FaPaperPlane className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <Typography variant="subtitle" className="text-primary font-bold text-base truncate">
              Send a Note to MS Hossen
            </Typography>
            <p className="text-xs text-secondary truncate">
              Direct inquiries delivered straight via WhatsApp
            </p>
          </div>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/25">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          WhatsApp Direct
        </span>
      </div>

      {feedbackSent ? (
        <div className="my-auto p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
            <FaCheck className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-primary">Opening WhatsApp...</h4>
          <p className="text-xs text-secondary max-w-sm">
            Your message is ready to send directly to Sabbir Hossen (
            <strong className="text-primary font-semibold">sabb1rhossen</strong>).
          </p>
          <a
            href={getWhatsAppUrl(feedbackText, senderName, senderEmail)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-xs font-bold text-emerald-500 hover:underline flex items-center gap-1.5"
          >
            Click here if WhatsApp didn&apos;t open automatically{' '}
            <FaExternalLinkAlt className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={() => {
              setFeedbackSent(false);
              setFeedbackText('');
              setSenderName('');
              setSenderEmail('');
              setSelectedTopic(null);
            }}
            className="mt-3 text-xs text-secondary hover:text-primary transition-colors underline cursor-pointer"
          >
            Send another note
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleFeedbackSubmit}
          className="space-y-4 flex-1 flex flex-col justify-between"
        >
          <div className="space-y-4">
            {/* Symmetrical 2x2 Topic Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-wider">
                  Select a Topic
                </label>
                {selectedTopic && (
                  <span className="text-[11px] text-accent-primary font-medium">
                    {selectedTopic}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {TOPIC_OPTIONS.map((topic) => {
                  const isSelected = selectedTopic === topic.label;
                  return (
                    <button
                      key={topic.label}
                      type="button"
                      onClick={() => handleTopicClick(topic.label, topic.emoji)}
                      className={`group flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-accent-primary/20 border-accent-primary text-primary shadow-sm shadow-accent-primary/20'
                          : 'border-default bg-surface/60 hover:bg-surface hover:border-accent-primary/40 text-secondary hover:text-primary'
                      }`}
                    >
                      <span className="text-sm shrink-0">{topic.emoji}</span>
                      <span className="truncate">{topic.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Symmetrical 2-Column Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">
                  Your Name{' '}
                  <span className="text-muted text-[10px] font-normal normal-case">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full rounded-xl border border-default bg-surface/70 px-3.5 py-2.5 text-sm text-primary placeholder:text-muted focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">
                  Email / Handle{' '}
                  <span className="text-muted text-[10px] font-normal normal-case">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. alex@example.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full rounded-xl border border-default bg-surface/70 px-3.5 py-2.5 text-sm text-primary placeholder:text-muted focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">
                Your Message / Inquiry <span className="text-accent-secondary">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Share your thoughts, project inquiries, request collaboration, or say hello..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full rounded-xl border border-default bg-surface/70 px-4 py-3 text-sm text-primary placeholder:text-muted focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 outline-none transition-all resize-y"
              />
            </div>
          </div>

          {/* Symmetrical Bottom Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-default/50">
            <div className="flex items-center gap-2 text-xs text-secondary font-medium">
              <FaUserCheck className="w-4 h-4 text-[#25D366]" />
              <span>Direct Creator Channel via WhatsApp</span>
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={FaPaperPlane}
              className="shadow-sm shadow-accent-primary/20 w-full sm:w-auto"
            >
              Send Note to Developer
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
};

export default ContactForm;

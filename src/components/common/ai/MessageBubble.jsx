import { memo } from 'react';
import {
  FaCopy,
  FaDownload,
  FaExternalLinkAlt,
  FaGithub,
  FaLink,
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa';
import Button from '../Button';
import Card from '../Card';

function ResponseCard({ card, onAction }) {
  if (card.type === 'project') {
    return (
      <Card className="mt-3 space-y-3 border-default p-4" hover={false}>
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-semibold text-primary">{card.title}</h4>
          {card.badge && (
            <span className="shrink-0 rounded-full border border-accent-primary/25 bg-accent-primary/10 px-2 py-0.5 text-[10px] font-semibold text-accent-primary">
              {card.badge}
            </span>
          )}
        </div>
        <p className="text-xs leading-relaxed text-secondary">{card.description}</p>
        {card.highlights && card.highlights.length > 0 && (
          <ul className="space-y-1 pl-3 text-[11px] leading-relaxed text-secondary list-disc">
            {card.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}
        <p className="text-xs text-muted">
          <span className="font-semibold text-secondary">Tech:</span> {card.techStack.join(', ')}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAction({ kind: 'route', target: card.links.details })}
          >
            Case Study
          </Button>
          {card.links.live && (
            <Button
              size="sm"
              variant="ghost"
              icon={FaExternalLinkAlt}
              onClick={() => onAction({ kind: 'external', target: card.links.live })}
            >
              Live Demo
            </Button>
          )}
          {card.links.github && (
            <Button
              size="sm"
              variant="ghost"
              icon={FaGithub}
              onClick={() => onAction({ kind: 'external', target: card.links.github })}
            >
              GitHub Code
            </Button>
          )}
        </div>
      </Card>
    );
  }

  if (card.type === 'skill') {
    return (
      <Card className="mt-3 space-y-2 border-default p-4" hover={false}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-primary">{card.category}</p>
          <span className="text-[10px] font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            {card.proficiency}
          </span>
        </div>
        <p className="text-xs font-medium text-secondary">{card.tools.join(', ')}</p>
        <p className="text-[11px] text-muted">{card.years}</p>
      </Card>
    );
  }

  if (card.type === 'contact') {
    return (
      <Card className="mt-3 space-y-3 border-default p-4" hover={false}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-primary">Get in Touch with Sabbir</p>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-500">
            Available for Hire
          </span>
        </div>
        <div className="space-y-1 text-xs text-secondary">
          <p>
            <span className="font-medium text-muted">Email:</span> {card.email}
          </p>
          {card.whatsapp && (
            <p>
              <span className="font-medium text-muted">WhatsApp:</span> {card.whatsapp}
            </p>
          )}
          {card.location && (
            <p>
              <span className="font-medium text-muted">Location:</span> {card.location}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {card.whatsappUrl && (
            <Button
              size="sm"
              variant="outline"
              icon={FaWhatsapp}
              className="text-[#25D366] hover:border-[#25D366]/40 hover:text-[#25D366]"
              onClick={() => onAction({ kind: 'external', target: card.whatsappUrl })}
            >
              WhatsApp
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            icon={FaCopy}
            onClick={() => onAction({ kind: 'copy-email', value: card.email })}
          >
            Copy Email
          </Button>
          <Button
            size="sm"
            variant="ghost"
            icon={FaLinkedin}
            onClick={() => onAction({ kind: 'external', target: card.linkedin })}
          >
            LinkedIn
          </Button>
          <Button
            size="sm"
            variant="ghost"
            icon={FaDownload}
            onClick={() => onAction({ kind: 'external', target: card.resumePath })}
          >
            Resume (PDF)
          </Button>
        </div>
      </Card>
    );
  }

  if (card.type === 'certification') {
    return (
      <Card className="mt-3 space-y-2 border-default p-4" hover={false}>
        <p className="text-sm font-semibold text-primary">{card.title}</p>
        <p className="text-xs text-secondary">{card.issuer}</p>
        <p className="text-xs text-muted">{card.date}</p>
        {card.link && (
          <Button
            size="sm"
            variant="ghost"
            icon={FaExternalLinkAlt}
            onClick={() => onAction({ kind: 'external', target: card.link })}
          >
            Verify Credential
          </Button>
        )}
      </Card>
    );
  }

  if (card.type === 'backend') {
    return (
      <Card className="mt-3 space-y-2 border-default p-4" hover={false}>
        <p className="text-sm font-semibold text-primary">{card.title} Backend Architecture</p>
        <p className="text-xs text-secondary">{card.stack.join(', ')}</p>
        {!!card.endpoints?.length && (
          <div className="pt-1">
            <p className="text-[11px] font-semibold text-muted">Sample API Endpoints:</p>
            <ul className="mt-1 space-y-1 font-mono text-[11px] text-secondary">
              {card.endpoints.map((endpoint) => (
                <li key={endpoint} className="rounded bg-subtle px-1.5 py-0.5">
                  {endpoint}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    );
  }

  if (card.type === 'focus') {
    return (
      <Card className="mt-3 space-y-2 border-default p-4" hover={false}>
        <p className="text-sm font-semibold text-primary">{card.title}</p>
        <p className="text-xs text-secondary">{card.organization}</p>
        <p className="text-xs text-muted">{card.period}</p>
        <p className="text-xs leading-relaxed text-secondary">{card.description}</p>
      </Card>
    );
  }

  return null;
}

function MessageBubble({ message, onAction, showInteractiveControls = false }) {
  const isUser = message.role === 'user';
  const hasCards = Array.isArray(message.cards) && message.cards.length > 0;
  const actions = Array.isArray(message.actions) ? message.actions : [];
  const followUps = Array.isArray(message.followUps) ? message.followUps : [];
  const suggestedItems = [...actions, ...followUps].slice(0, 4);

  return (
    <article className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser ? 'bg-accent-primary text-white' : 'surface border border-default text-secondary'
        }`}
      >
        {message.content && (
          <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
        )}

        {hasCards &&
          message.cards.map((card) => (
            <ResponseCard
              key={`${message.id}-${card.type}-${card.title ?? card.category ?? 'card'}`}
              card={card}
              onAction={onAction}
            />
          ))}

        {showInteractiveControls && suggestedItems.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestedItems.map((item, index) => {
              const isAction =
                typeof item === 'object' &&
                (actions.includes(item) || (item.action && item.action.kind !== 'prompt'));
              const label = typeof item === 'string' ? item : item.label;
              const action =
                typeof item === 'object'
                  ? (item.action ?? item)
                  : { kind: 'prompt', prompt: item, label: item };

              return (
                <button
                  key={`${message.id}-${label}-${index}`}
                  type="button"
                  onClick={() => onAction(action)}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/35 ${
                    isAction
                      ? 'bg-accent-primary text-white hover:bg-accent-primary-dark'
                      : 'border border-default/80 text-muted hover:border-accent-primary/40 hover:text-accent-primary'
                  }`}
                >
                  {!isAction && <FaLink className="h-2.5 w-2.5" aria-hidden="true" />}
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}

export default memo(MessageBubble);

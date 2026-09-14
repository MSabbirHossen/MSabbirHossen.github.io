import { memo } from 'react';
import {
  FaCopy,
  FaDownload,
  FaExternalLinkAlt,
  FaGithub,
  FaLink,
  FaLinkedin,
} from 'react-icons/fa';
import Button from '../Button';
import Card from '../Card';

function ResponseCard({ card, onAction }) {
  if (card.type === 'project') {
    return (
      <Card className="mt-3 space-y-3 border-default p-4" hover={false}>
        <h4 className="text-sm font-semibold text-primary">{card.title}</h4>
        <p className="text-xs leading-relaxed text-secondary">{card.description}</p>
        <p className="text-xs text-muted">
          <span className="font-semibold">Tech:</span> {card.techStack.join(', ')}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAction({ kind: 'route', target: card.links.details })}
          >
            View Project
          </Button>
          {card.links.github && (
            <Button
              size="sm"
              variant="ghost"
              icon={FaGithub}
              onClick={() => onAction({ kind: 'external', target: card.links.github })}
            >
              GitHub
            </Button>
          )}
          {card.links.live && (
            <Button
              size="sm"
              variant="ghost"
              icon={FaExternalLinkAlt}
              onClick={() => onAction({ kind: 'external', target: card.links.live })}
            >
              Case Study
            </Button>
          )}
        </div>
      </Card>
    );
  }

  if (card.type === 'skill') {
    return (
      <Card className="mt-3 space-y-2 border-default p-4" hover={false}>
        <p className="text-sm font-semibold text-primary">{card.category}</p>
        <p className="text-xs text-secondary">{card.tools.join(', ')}</p>
        <p className="text-xs text-muted">Years: {card.years}</p>
        <p className="text-xs text-muted">Proficiency: {card.proficiency}</p>
      </Card>
    );
  }

  if (card.type === 'contact') {
    return (
      <Card className="mt-3 space-y-3 border-default p-4" hover={false}>
        <p className="text-sm font-semibold text-primary">Contact Options</p>
        <div className="space-y-1 text-xs text-secondary">
          <p>Email: {card.email}</p>
          <p>LinkedIn: {card.linkedin}</p>
          <p>GitHub: {card.github}</p>
        </div>
        <div className="flex flex-wrap gap-2">
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
            Resume
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
            Verify
          </Button>
        )}
      </Card>
    );
  }

  if (card.type === 'backend') {
    return (
      <Card className="mt-3 space-y-2 border-default p-4" hover={false}>
        <p className="text-sm font-semibold text-primary">{card.title} Backend</p>
        <p className="text-xs text-secondary">{card.stack.join(', ')}</p>
        {!!card.endpoints?.length && (
          <ul className="space-y-1 text-xs text-muted">
            {card.endpoints.map((endpoint) => (
              <li key={endpoint}>{endpoint}</li>
            ))}
          </ul>
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
  const suggestedItems = [...actions, ...followUps].slice(0, 3);

  return (
    <article className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser ? 'bg-accent-primary text-white' : 'surface border border-default text-secondary'
        }`}
      >
        <p>{hasCards ? "Here's a closer look:" : message.content}</p>

        {hasCards &&
          message.cards.map((card) => (
            <ResponseCard
              key={`${message.id}-${card.type}-${card.title ?? card.category ?? 'card'}`}
              card={card}
              onAction={onAction}
            />
          ))}

        {showInteractiveControls && suggestedItems.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
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
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/35 ${isAction ? 'bg-accent-primary text-white hover:bg-accent-primary-dark' : 'border border-default/80 text-muted hover:border-accent-primary/40 hover:text-accent-primary'}`}
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

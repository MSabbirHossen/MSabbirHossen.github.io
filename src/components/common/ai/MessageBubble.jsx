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

  return null;
}

function MessageBubble({ message, onAction, showInteractiveControls = false }) {
  const isUser = message.role === 'user';

  return (
    <article className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser ? 'bg-accent-primary text-white' : 'surface border border-default text-secondary'
        }`}
      >
        <p>{message.content}</p>

        {Array.isArray(message.cards) &&
          message.cards.map((card) => (
            <ResponseCard
              key={`${message.id}-${card.type}-${card.title ?? card.category ?? 'card'}`}
              card={card}
              onAction={onAction}
            />
          ))}

        {showInteractiveControls &&
          Array.isArray(message.actions) &&
          message.actions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {message.actions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onAction(item)}
                  className="rounded-full border border-default px-3 py-1 text-xs font-medium text-secondary transition-colors hover:border-accent-primary/50 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

        {showInteractiveControls &&
          Array.isArray(message.followUps) &&
          message.followUps.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.followUps.map((followUp) => (
                <button
                  key={`${message.id}-${followUp}`}
                  type="button"
                  onClick={() => onAction({ kind: 'prompt', prompt: followUp, label: followUp })}
                  className="inline-flex items-center gap-1 rounded-full border border-default/80 px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-accent-primary/40 hover:text-accent-primary"
                >
                  <FaLink className="h-2.5 w-2.5" aria-hidden="true" />
                  {followUp}
                </button>
              ))}
            </div>
          )}
      </div>
    </article>
  );
}

export default memo(MessageBubble);

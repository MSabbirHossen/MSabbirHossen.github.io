import { portfolioData } from '../../data';
import Typography from '../common/Typography';
import { FaCheckCircle, FaHandshake } from 'react-icons/fa';

const CollaborationCard = () => {
  const { preferredCollaboration } = portfolioData;
  return (
    <div className="rounded-xl border border-default bg-surface/60 p-3.5">
      <Typography
        variant="subtitle"
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary mb-2"
      >
        <FaHandshake className="h-4 w-4 text-accent-secondary" />
        Preferred Collaboration
      </Typography>
      <div className="flex flex-wrap gap-1.5">
        {preferredCollaboration.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1.5 rounded-lg border border-default bg-surface/80 px-2.5 py-1 text-xs text-secondary font-medium"
          >
            <FaCheckCircle className="h-3 w-3 text-accent-secondary shrink-0" />
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default CollaborationCard;

import { portfolioData } from '../../data/portfolioData';
import Typography from '../common/Typography';
import { FaCheckCircle, FaHandshake } from 'react-icons/fa';

const CollaborationCard = () => {
  const { preferredCollaboration } = portfolioData;
  return (
    <div>
      <div className="rounded-2xl border border-default bg-surface/70 p-4">
        <Typography
          variant="subtitle"
          className="flex items-center gap-3 text-sm font-medium text-primary"
        >
          <FaHandshake className="h-5 w-5 text-accent-secondary" />
          Preferred Collaboration
        </Typography>
        <ul className="mt-3 space-y-2 text-sm text-secondary">
          {preferredCollaboration.map((item, index) => (
            <li className="flex items-center gap-2 break-all text-secondary" key={index}>
              <FaCheckCircle className="h-4 w-4 shrink-0 text-accent-secondary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollaborationCard;

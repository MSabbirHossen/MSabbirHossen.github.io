import Typography from '../common/Typography';
import { portfolioData } from '../../data';

export default function FooterBrand() {
  const { personalInfo } = portfolioData;

  return (
    <div className="space-y-4">
      <Typography variant="h4" className="text-primary">
        {personalInfo.name}
      </Typography>

      <Typography variant="body" className="max-w-sm text-secondary">
        {personalInfo.brandTagline}
      </Typography>
    </div>
  );
}

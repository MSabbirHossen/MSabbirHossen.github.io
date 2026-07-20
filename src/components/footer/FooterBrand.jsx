import Typography from '../common/Typography';
import { portfolioData } from '../../data/portfolioData';

export default function FooterBrand() {
  const { personalInfo } = portfolioData;

  return (
    <div className="space-y-4">
      <Typography variant="caption" className="uppercase tracking-[0.2em] text-accent-primary">
        MS's Personal Brand
      </Typography>

      <Typography variant="h4" className="text-slate-900 dark:text-slate-100">
        {personalInfo.brandName}
      </Typography>

      <Typography variant="body" className="max-w-sm text-slate-500 dark:text-slate-400">
        {personalInfo.brandTagline}
      </Typography>
    </div>
  );
}

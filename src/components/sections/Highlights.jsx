import { portfolioData } from '../../data';
import SectionWrapper from '../common/SectionWrapper';
import Card from '../common/Card';
import Typography from '../common/Typography';
import Badge from '../common/Badge';
import Reveal from '../animations/Reveal';
import { FaLaptopCode, FaGraduationCap, FaUsers, FaCertificate } from 'react-icons/fa';
import { scrollToSection } from '../../lib/navigation';

const HIGHLIGHT_ICONS = {
  projects: FaLaptopCode,
  education: FaGraduationCap,
  community: FaUsers,
  certifications: FaCertificate,
};

export default function Highlights() {
  const { highlights } = portfolioData.personalInfo;

  if (!highlights || highlights.length === 0) return null;

  const handleCardClick = (category) => {
    if (category === 'projects') scrollToSection('projects');
    if (category === 'education') scrollToSection('education');
    if (category === 'certifications') scrollToSection('certifications');
    if (category === 'community') scrollToSection('experience');
  };

  return (
    <SectionWrapper
      id="highlights"
      eyebrow="PROVEN TRACK RECORD"
      title="Professional Highlights"
      description="Verified milestones across practical full-stack software delivery, computer science academics, and community leadership."
      className="mx-auto max-w-6xl px-4 sm:px-6"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item, idx) => {
          const Icon = HIGHLIGHT_ICONS[item.category] || FaLaptopCode;
          const isInteractive = ['projects', 'education', 'certifications', 'community'].includes(
            item.category
          );

          return (
            <Reveal key={item.title} delay={idx * 0.08} duration={0.45} className="h-full">
              <Card
                spotlight
                hover
                onClick={() => handleCardClick(item.category)}
                role={isInteractive ? 'button' : undefined}
                tabIndex={isInteractive ? 0 : undefined}
                onKeyDown={(e) => {
                  if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleCardClick(item.category);
                  }
                }}
                className={`group flex h-full flex-col justify-between border-default p-6 transition-all duration-300 hover:border-accent-primary/40 ${
                  isInteractive ? 'cursor-pointer' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent-primary/20 bg-accent-primary/10 text-accent-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>

                    {item.badge && (
                      <Badge variant="neutral" className="text-[11px] font-medium">
                        {item.badge}
                      </Badge>
                    )}
                  </div>

                  <Typography
                    variant="h2"
                    className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl"
                  >
                    {item.metric}
                  </Typography>

                  <Typography
                    variant="h4"
                    className="mt-2 text-base font-bold text-primary sm:text-lg"
                  >
                    {item.title}
                  </Typography>
                </div>

                <div className="mt-4 border-t border-default/40 pt-3">
                  <Typography variant="body" className="text-xs leading-relaxed text-muted">
                    {item.desc}
                  </Typography>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

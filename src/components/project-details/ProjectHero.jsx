import { FaArrowLeft, FaChevronRight, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProjectMeta from '../projects/ProjectMeta';
import Typography from '../common/Typography';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Card from '../common/Card';
import Reveal from '../animations/Reveal';

const ProjectHero = ({ project }) => {
  const heroTech = project.technologies?.slice(0, 6) ?? [];
  const heroImage = project.screenshots?.[0];
  const imageSrc = heroImage
    ? heroImage.startsWith('http')
      ? heroImage
      : `${import.meta.env.BASE_URL}${heroImage.replace(/^\//, '')}`
    : null;

  return (
    <div className="mb-10 sm:mb-14">
      {/* Breadcrumb Navigation */}
      <Reveal>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted">
            <Link to="/" className="hover:text-accent-primary transition-colors">
              Home
            </Link>
            <FaChevronRight className="h-2.5 w-2.5 opacity-60" />
            <Link to="/#projects" className="hover:text-accent-primary transition-colors">
              Projects
            </Link>
            <FaChevronRight className="h-2.5 w-2.5 opacity-60" />
            <span className="text-secondary font-medium">{project.title}</span>
          </nav>

          <Button
            as={Link}
            to="/#projects"
            state={{ scrollToSection: 'projects' }}
            variant="ghost"
            size="sm"
            className="text-xs text-secondary hover:text-accent-primary px-2.5 py-1"
          >
            <FaArrowLeft className="mr-1.5 h-3 w-3" />
            Back to Projects
          </Button>
        </div>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
        <div className="min-w-0 space-y-5">
          <Reveal delay={0.05}>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" className="px-3 py-1 text-xs font-semibold">
                {project.category}
              </Badge>
              {project.status && (
                <span className="inline-flex items-center rounded-full border border-default bg-surface/80 px-2.5 py-0.5 text-xs text-muted">
                  {project.status}
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Typography
              variant="h1"
              className="text-balance text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary"
            >
              {project.title}
            </Typography>
          </Reveal>

          <Reveal delay={0.15}>
            <ProjectMeta project={project} />
          </Reveal>

          {heroTech.length > 0 && (
            <Reveal delay={0.25}>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {heroTech.map((tech) => {
                  const TechIcon = tech.icon;
                  return (
                    <Badge
                      key={tech.name}
                      variant="neutral"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium"
                    >
                      {TechIcon && <TechIcon className="h-3 w-3 text-accent-primary" />}
                      <span>{tech.name}</span>
                    </Badge>
                  );
                })}
              </div>
            </Reveal>
          )}

          {(project.liveUrl || project.githubUrl) && (
            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-3 pt-2">
                {project.liveUrl && (
                  <Button
                    href={project.liveUrl}
                    variant="primary"
                    size="md"
                    icon={FaExternalLinkAlt}
                    iconPosition="right"
                    className="w-full sm:w-auto shadow-md shadow-accent-primary/25"
                  >
                    Live Application
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    href={project.githubUrl}
                    variant="outline"
                    size="md"
                    icon={FaGithub}
                    className="w-full sm:w-auto"
                  >
                    Source Code
                  </Button>
                )}
              </div>
            </Reveal>
          )}
        </div>

        {imageSrc && (
          <Reveal delay={0.2}>
            <Card
              spotlight
              hover
              className="group overflow-hidden p-0 border-default shadow-xl shadow-black/10"
            >
              <img
                src={imageSrc}
                alt={`${project.title} banner preview`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </Card>
          </Reveal>
        )}
      </div>
    </div>
  );
};

export default ProjectHero;

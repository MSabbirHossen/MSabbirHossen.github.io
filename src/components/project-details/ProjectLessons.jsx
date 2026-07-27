import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProjectMeta from '../projects/ProjectMeta';
import Typography from '../common/Typography';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Card from '../common/Card';
import Reveal from '../animations/Reveal';

const ProjectHero = ({ project }) => {
  const shortDescription =
    project.overview.length > 220 ? `${project.overview.slice(0, 220)}...` : project.overview;
  const heroTech = project.technologies?.slice(0, 8) ?? [];
  const heroImage = project.screenshots?.[0];

  return (
    <div className="mb-12">
      <Reveal>
        <Button as={Link} to="/projects" variant="ghost" size="sm" className="mb-8 px-0">
          <FaArrowLeft />
          Back to Projects
        </Button>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
        <div className="min-w-0 space-y-5">
          <Reveal delay={0.05}>
            <Badge variant="primary" className="px-3 py-1 text-sm">
              {project.category}
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <Typography variant="h1" className="text-balance text-3xl sm:text-4xl md:text-5xl">
              {project.title}
            </Typography>
          </Reveal>

          <Reveal delay={0.15}>
            <Typography variant="lead" className="max-w-3xl text-muted">
              {shortDescription}
            </Typography>
          </Reveal>

          <Reveal delay={0.2}>
            <ProjectMeta project={project} />
          </Reveal>

          {heroTech.length > 0 && (
            <Reveal delay={0.25}>
              <div className="flex flex-wrap items-center gap-2">
                {heroTech.map((tech) => (
                  <Badge key={tech.name} variant="neutral" className="px-3 py-1">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </Reveal>
          )}

          {(project.liveUrl || project.githubUrl) && (
            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-3 pt-1">
                {project.liveUrl && (
                  <Button
                    href={project.liveUrl}
                    variant="primary"
                    size="md"
                    icon={FaExternalLinkAlt}
                    iconPosition="right"
                    className="w-full sm:w-auto"
                  >
                    Live Demo
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
                    View Source
                  </Button>
                )}
              </div>
            </Reveal>
          )}
        </div>

        {heroImage && (
          <Reveal delay={0.2}>
            <Card className="group overflow-hidden p-0">
              <img
                src={heroImage}
                alt={`${project.title} banner preview`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[16/10] w-full object-cover transition-all duration-500 group-hover:scale-[1.02] group-hover:contrast-105"
              />
            </Card>
          </Reveal>
        )}
      </div>
    </div>
  );
};

export default ProjectHero;

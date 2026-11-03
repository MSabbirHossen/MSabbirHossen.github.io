import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaBriefcase, FaComments, FaInfoCircle } from 'react-icons/fa';

import { portfolioData } from '../data';
import Card from '../components/common/Card';
import Typography from '../components/common/Typography';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Reveal from '../components/animations/Reveal';
import { useTranslation } from '../i18n';

import ProjectHero from '../components/project-details/ProjectHero';
import ProjectLinks from '../components/project-details/ProjectLinks';
import ProjectPreview from '../components/project-details/ProjectPreview';
import ProjectNotFound from '../components/project-details/ProjectNotFound';
import ProjectTechStack from '../components/project-details/ProjectTechStack';
import ProjectBulletList from '../components/project-details/ProjectBulletList';
import ProjectApiEndpoints from '../components/project-details/ProjectApiEndpoints';

export default function ProjectDetails() {
  const { slug } = useParams();
  const { t, isRTL } = useTranslation();

  const allProjects = portfolioData.projects;
  const project = allProjects.find((item) => item.id === slug);

  if (!project) {
    return <ProjectNotFound />;
  }

  const currentIndex = allProjects.findIndex((item) => item.id === project.id);
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const siteUrl = portfolioData.personalInfo.website.replace(/\/$/, '');
  const canonicalUrl = `${siteUrl}/projects/${project.id}`;
  const pageTitle = `${project.title} | Projects | Md. Sabbir Hossen`;
  const metaDescription =
    project.overview.length > 160 ? `${project.overview.slice(0, 157)}...` : project.overview;
  const socialImage = project.screenshots?.[0]
    ? `${siteUrl}${project.screenshots[0]}`
    : `${siteUrl}/screenshots/portfolio-preview.png`;

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    applicationCategory: 'WebApplication',
    operatingSystem: 'All',
    description: metaDescription,
    url: canonicalUrl,
    author: {
      '@type': 'Person',
      name: 'Md. Sabbir Hossen',
      jobTitle: 'Junior MERN Stack Developer',
      url: siteUrl,
    },
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    ...(project.liveUrl ? { installUrl: project.liveUrl } : {}),
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={socialImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={socialImage} />
        <script type="application/ld+json">{JSON.stringify(projectSchema)}</script>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <ProjectHero project={project} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-8">
          <article className="min-w-0 space-y-6" aria-label={`${project.title} project details`}>
            <Reveal>
              <Card spotlight hover className="space-y-4 border-default p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-default/50 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                      <FaInfoCircle className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <Typography
                      variant="subtitle"
                      className="text-base font-bold text-primary sm:text-lg"
                    >
                      {t('projectDetails.projectOverview')}
                    </Typography>
                  </div>
                  <Badge variant="neutral" className="text-xs">
                    {t('projectDetails.caseStudyBadge')}
                  </Badge>
                </div>
                <Typography
                  variant="body"
                  className="text-sm sm:text-base leading-relaxed text-secondary"
                >
                  {project.overview}
                </Typography>
              </Card>
            </Reveal>

            <Reveal delay={0.05}>
              <ProjectTechStack technologies={project.technologies} />
            </Reveal>

            <Reveal delay={0.1}>
              <ProjectBulletList
                title={t('projectDetails.keyFeatures')}
                items={project.features}
                columns
              />
            </Reveal>

            <Reveal delay={0.15}>
              <ProjectBulletList
                title={t('projectDetails.architecture')}
                items={project.architecture}
              />
            </Reveal>

            <Reveal delay={0.2}>
              <ProjectBulletList
                title={t('projectDetails.challengesSolutions')}
                items={project.challenges}
              />
            </Reveal>

            {project.developmentProcess?.length > 0 && (
              <Reveal delay={0.25}>
                <ProjectBulletList
                  title={t('projectDetails.developmentProcess')}
                  items={project.developmentProcess}
                />
              </Reveal>
            )}

            <Reveal delay={0.3}>
              <ProjectBulletList
                title={t('projectDetails.lessonsLearned')}
                items={project.lessonsLearned}
              />
            </Reveal>

            <Reveal delay={0.35}>
              <ProjectApiEndpoints endpoints={project.apiEndpoints} />
            </Reveal>
          </article>

          <aside className="min-w-0 space-y-6" aria-label="Project links, roadmap, and preview">
            <Reveal delay={0.05}>
              <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
            </Reveal>

            {project.futureImprovements?.length > 0 && (
              <Reveal delay={0.1}>
                <ProjectBulletList
                  title={t('projectDetails.futureImprovements')}
                  items={project.futureImprovements}
                />
              </Reveal>
            )}

            <Reveal delay={0.15} className="md:hidden">
              <ProjectPreview title={project.title} screenshots={project.screenshots} />
            </Reveal>
          </aside>
        </div>

        {/* Case Study Navigation */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-default/60">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {prevProject && (
                <Link
                  to={`/projects/${prevProject.id}`}
                  className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  aria-label={`View previous project: ${prevProject.title}`}
                >
                  <Card
                    spotlight
                    hover
                    className="flex h-full flex-col justify-between border-default p-5 transition-all duration-300 group-hover:border-accent-primary/40"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted group-hover:text-accent-primary transition-colors">
                      <FaArrowLeft
                        className={`h-3 w-3 transition-transform duration-200 ${
                          isRTL
                            ? 'rotate-180 group-hover:translate-x-1'
                            : 'group-hover:-translate-x-1'
                        }`}
                      />
                      <span>{t('projectDetails.previousProject')}</span>
                    </div>
                    <div className="mt-3">
                      <Typography
                        variant="h3"
                        className="text-base sm:text-lg font-bold text-primary group-hover:text-accent-primary transition-colors"
                      >
                        {prevProject.title}
                      </Typography>
                      <p className="mt-1 text-xs text-muted">{prevProject.category}</p>
                    </div>
                  </Card>
                </Link>
              )}

              {nextProject && (
                <Link
                  to={`/projects/${nextProject.id}`}
                  className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  aria-label={`View next project: ${nextProject.title}`}
                >
                  <Card
                    spotlight
                    hover
                    className={`flex h-full flex-col justify-between border-default p-5 transition-all duration-300 group-hover:border-accent-primary/40 ${
                      isRTL ? 'text-left sm:items-start' : 'text-right sm:items-end'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 text-xs font-semibold text-muted group-hover:text-accent-primary transition-colors ${
                        isRTL ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <span>{t('projectDetails.nextProject')}</span>
                      <FaArrowRight
                        className={`h-3 w-3 transition-transform duration-200 ${
                          isRTL
                            ? 'rotate-180 group-hover:-translate-x-1'
                            : 'group-hover:translate-x-1'
                        }`}
                      />
                    </div>
                    <div className="mt-3">
                      <Typography
                        variant="h3"
                        className="text-base sm:text-lg font-bold text-primary group-hover:text-accent-primary transition-colors"
                      >
                        {nextProject.title}
                      </Typography>
                      <p className="mt-1 text-xs text-muted">{nextProject.category}</p>
                    </div>
                  </Card>
                </Link>
              )}
            </div>
          </Reveal>
        </div>

        {/* Recruiter Conversion CTA */}
        <Reveal delay={0.1}>
          <Card
            spotlight
            className="mt-8 border-accent-primary/30 bg-gradient-to-br from-surface via-surface to-accent-primary/5 p-6 sm:p-8"
          >
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row text-center md:text-left rtl:md:text-right">
              <div className="space-y-2">
                <Badge variant="primary" className="text-xs">
                  {t('projectDetails.readyToCollaborate')}
                </Badge>
                <Typography variant="h2" className="text-xl sm:text-2xl font-bold text-primary">
                  {t('projectDetails.interestedTitle')}
                </Typography>
                <Typography variant="body" className="max-w-2xl text-xs sm:text-sm text-secondary">
                  {t('projectDetails.interestedDesc')}
                </Typography>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <Button
                  as={Link}
                  to="/contact"
                  variant="primary"
                  size="md"
                  icon={FaComments}
                  className="shadow-md shadow-accent-primary/20"
                >
                  {t('projectDetails.discussBtn')}
                </Button>
                <Button as={Link} to="/recruiter" variant="outline" size="md" icon={FaBriefcase}>
                  {t('projectDetails.recruiterDossierBtn')}
                </Button>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </>
  );
}

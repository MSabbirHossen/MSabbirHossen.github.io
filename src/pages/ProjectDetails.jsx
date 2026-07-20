import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

import { portfolioData } from '../data/portfolioData';

import Card from '../components/common/Card';
import Typography from '../components/common/Typography';
import ProjectNotFound from '../components/project-details/ProjectNotFound';
import ProjectHero from '../components/project-details/ProjectHero';
import ProjectTechStack from '../components/project-details/ProjectTechStack';
import ProjectPreview from '../ProjectPreview';

export default function ProjectDetails() {
  const { slug } = useParams();

  const project = portfolioData.projects.find((item) => item.id === slug);
  // console.log('portfolioData.projects', portfolioData.projects.screenshots);
  console.log('Selected Project:', project.screenshots); // Debugging line to check the project object

  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Md. Sabbir Hossen</title>
        <meta name="description" content={project.overview} />
      </Helmet>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <ProjectHero project={project} />

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* LEFT */}

          <div className="space-y-8">
            {/* Technologies */}
            <ProjectTechStack technologies={project.technologies} />

            {/* Architecture */}

            <Card>
              <Typography variant="subtitle" className="mb-5">
                Architecture
              </Typography>

              <ul className="space-y-3">
                {project.architecture.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-600 dark:text-slate-400">
                    <span className="mt-2 h-2 w-2 rounded-full bg-indigo-500" />

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Challenges */}

            <Card>
              <Typography variant="subtitle" className="mb-4">
                Challenges
              </Typography>

              <Typography variant="body">{project.challenges}</Typography>
            </Card>

            {/* Lessons */}

            <Card>
              <Typography variant="subtitle" className="mb-4">
                Lessons Learned
              </Typography>

              <Typography variant="body">{project.lessonsLearned}</Typography>
            </Card>

            {/* Features */}

            {project.features && (
              <Card>
                <Typography variant="subtitle" className="mb-5">
                  Key Features
                </Typography>

                <ul className="grid gap-3 md:grid-cols-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-slate-600 dark:text-slate-400">
                      <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* API */}

            {project.apiEndpoints && (
              <Card>
                <Typography variant="subtitle" className="mb-5">
                  API Endpoints
                </Typography>

                <div className="space-y-3">
                  {project.apiEndpoints.map((endpoint) => (
                    <code
                      key={endpoint}
                      className="block rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-800"
                    >
                      {endpoint}
                    </code>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* RIGHT */}

          <div className="space-y-8">
            {/* Links */}

            <Card className="space-y-5">
              <Typography variant="subtitle">Project Links</Typography>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border p-4 transition hover:border-indigo-500"
                >
                  <div className="flex items-center gap-3">
                    <FaGithub className="text-xl" />

                    <span>GitHub Repository</span>
                  </div>

                  <FaExternalLinkAlt />
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border p-4 transition hover:border-indigo-500"
                >
                  <div className="flex items-center gap-3">
                    <FaExternalLinkAlt className="text-xl" />

                    <span>Live Website</span>
                  </div>

                  <FaExternalLinkAlt />
                </a>
              )}
            </Card>

            {/* Future */}

            <Card>
              <Typography variant="subtitle" className="mb-4">
                Future Improvements
              </Typography>

              <Typography variant="body">{project.futureImprovements}</Typography>
            </Card>

            {/* Screenshot */}

            <ProjectPreview title={project.title} screenshots={project.screenshots} />
          </div>
        </div>
      </div>
    </>
  );
}

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import Typography from '../common/Typography';
import Badge from '../common/Badge';
import Card from '../common/Card';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCode, FaGithub, FaGlobe } from 'react-icons/fa';
import Reveal from '../animations/Reveal';

export default function Projects() {
  const { projects } = portfolioData;
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...new Set(projects.map((project) => project.category))],
    [projects]
  );

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900 glass">
      <div className="mx-auto max-w-5xl px-4">
        <Typography
          variant="h2"
          className="mb-8 text-center text-primary-600 dark:text-primary-400"
        >
          Featured Projects
        </Typography>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filteredProjects.map((proj, index) => (
              <Reveal
                key={proj.id}
                y={18}
                duration={0.45}
                delay={index * 0.06}
                amount={0.2}
                whileHover={{ y: -4 }}
              >
                <Card className="flex h-full flex-col justify-between space-y-5 bg-white p-6 shadow-md dark:bg-gray-800">
                  <div className="space-y-3">
                    <Typography variant="subtitle" className="text-slate-900 dark:text-slate-100">
                      {proj.title}
                    </Typography>
                    <Typography variant="body" className="text-slate-700 dark:text-slate-300">
                      {proj.overview.length > 120
                        ? `${proj.overview.substring(0, 120)}...`
                        : proj.overview}
                    </Typography>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {(() => {
                      const visibleTech = proj.technologies.slice(0, 4);
                      const remaining = proj.technologies.length - visibleTech.length;

                      return (
                        <>
                          {visibleTech.map((tech, techIndex) => {
                            const Icon = tech.icon ?? FaCode;

                            return (
                              <div
                                key={tech.name + techIndex}
                                title={tech.name}
                                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800"
                              >
                                <Icon className="text-xl transition-transform duration-300 group-hover:scale-110" />
                              </div>
                            );
                          })}

                          {remaining > 0 && (
                            <div
                              title={`${remaining} more technologies`}
                              className="flex h-11 w-11 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm font-semibold text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
                            >
                              +{remaining}
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-3 justify-between items-center text-slate-700 dark:text-slate-300">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center gap-2 font-medium text-accent-primary hover:underline"
                      >
                        <FaGithub></FaGithub>
                        GitHub
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center gap-2 font-medium text-accent-primary hover:underline"
                      >
                        <FaGlobe></FaGlobe>
                        Live Demo
                      </a>
                    )}
                    <Link
                      to={`/projects/${proj.id}`}
                      className="text-sm flex items-center gap-2 font-medium text-accent-primary hover:underline"
                    >
                      Details
                      <FaArrowRight></FaArrowRight>
                    </Link>
                  </div>
                </Card>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

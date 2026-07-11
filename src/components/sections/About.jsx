import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import Typography from '../common/Typography';
import Badge from '../common/Badge';
import Card from '../common/Card';
import CountUp from 'react-countup';
import AboutStats from '../about/AboutStats';
import LanguageProgress from '../about/LanguageProgress';

export default function About() {
  const { personalInfo } = portfolioData;
  const { mission, journey, values, vision, languages, title, studyingAt, location } = personalInfo;

  const containerVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  // const stats = [
  //   {
  //     value: 4,
  //     suffix: '+',
  //     label: 'Projects',
  //   },
  //   {
  //     value: 8,
  //     suffix: '+',
  //     label: 'Certificates',
  //   },
  //   {
  //     value: 30,
  //     suffix: '+',
  //     label: 'Technologies',
  //   },
  //   {
  //     value: 5,
  //     suffix: '',
  //     label: 'Languages',
  //   },
  // ];

  const stats = [
    {
      value: '4+',
      label: 'Projects',
    },
    {
      value: '5+',
      label: 'Certificates',
    },
    {
      value: '30+',
      label: 'Technologies',
    },
    {
      value: '5',
      label: 'Languages',
    },
  ];
  return (
    <motion.section
      id="about"
      className="py-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div variants={itemVariants} className="mx-auto mb-14 max-w-3xl text-center">
          <Typography variant="h2" className="mb-5 text-primary-600 dark:text-primary-400">
            About Me
          </Typography>

          <Typography variant="body" className="text-lg leading-relaxed text-slate-300">
            {mission} <br /> Building a future where faith, knowledge, and technology empower the
            Ummah.
          </Typography>
        </motion.div>

        {/* Journey + Profile */}
        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          {/* Journey */}

          <motion.div variants={itemVariants}>
            <Card className="h-full space-y-5">
              <Typography variant="subtitle" className="text-slate-100">
                🚀 My Journey
              </Typography>

              <Typography variant="body" className="leading-8 text-slate-400 md:text-justify">
                {journey}
              </Typography>
            </Card>
          </motion.div>

          {/* Quick Facts */}

          <motion.div variants={itemVariants}>
            <Card className="space-y-5">
              <Typography variant="subtitle" className="text-slate-100">
                👨 Quick Facts
              </Typography>

              <div className="space-y-4 text-slate-300">
                <div>
                  <p className="text-sm text-slate-500">Role</p>
                  <p>{title}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Studying At</p>
                  <p>{studyingAt}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Location</p>
                  <p>{location}</p>
                </div>

                {/* <div>
                  <p className="text-sm text-slate-500">Languages</p>
                  <p>{languages.length} Languages</p>
                </div> */}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Stats */}
        {/* <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border p-6 text-center">
              <h3 className="text-3xl font-bold text-primary-400">{stat.value}</h3>

              <p>{stat.label}</p>
            </div>
          ))}
        </div> */}
        <AboutStats stats={stats} />

        {/* Values */}

        {/* <motion.div variants={itemVariants} className="mt-8">
          <Typography variant="subtitle" className="mb-5 text-slate-100">
            ⭐ Core Values
          </Typography>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {values.map((value) => (
              <Card
                key={value.title}
                className="space-y-3 transition hover:-translate-y-1 hover:border-primary-500"
              >
                <Typography variant="subtitle" className="text-primary-400">
                  {value.title}
                </Typography>

                <Typography variant="body" className="text-sm text-slate-400">
                  {value.desc}
                </Typography>
              </Card>
            ))}
          </div>
        </motion.div> */}

        {/* Vision */}

        {/* <motion.div variants={itemVariants} className="mt-10">
          <Typography variant="subtitle" className="mb-5 text-slate-100">
            🎯 Long-Term Vision
          </Typography>

          <Card>
            <ul className="grid gap-4 md:grid-cols-2">
              {vision.map((goal) => (
                <li key={goal} className="flex items-start gap-3 rounded-xl bg-slate-800/50 p-4">
                  <span className="text-primary-400">✓</span>

                  <span className="text-slate-300">{goal}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div> */}

        {/* Languages */}
{/* 
        <motion.div variants={itemVariants} className="mt-10">
          <Typography variant="subtitle" className="mb-5 text-slate-100">
            🌍 Languages
          </Typography>

          <Card>
            <div className="space-y-5">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium text-slate-200">{lang.name}</span>

                    <span className="text-sm text-primary-400">{lang.level}</span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-cyan-500 transition-all duration-700"
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div> */}
        <LanguageProgress languages={languages} />
      </div>
    </motion.section>
  );
}

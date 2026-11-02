import {
  FaCompass,
  FaRoute,
  FaCode,
  FaLaptopCode,
  FaBriefcase,
  FaGraduationCap,
  FaUserTie,
  FaWhatsapp,
} from 'react-icons/fa';
import { portfolioData } from './index';

export const getGuideSteps = () => {
  const { personalInfo, projects, skills, education, certifications } = portfolioData;

  const topProjects = projects.slice(0, 3);
  const coreSkills = skills.slice(0, 4);
  const primaryDegree = education[0];

  return [
    // Step 0: Welcome
    {
      id: 'welcome',
      stepNumber: 1,
      badge: 'Welcome',
      title: 'Welcome to My Portfolio',
      subtitle: `${personalInfo.title} • Crafting Full-Stack JavaScript Systems`,
      icon: FaCompass,
      description:
        'Explore verified production web applications, architectural case studies, multi-tenant monorepos, and academic credentials built by Md. Sabbir Hossen.',
      intentShortcuts: [
        {
          label: 'Recruiter Fast-Track',
          badge: '2 Min',
          stepIndex: 6,
          icon: FaUserTie,
          color: 'emerald',
        },
        {
          label: 'Explore Architecture',
          badge: 'Case Studies',
          stepIndex: 2,
          icon: FaCode,
          color: 'indigo',
        },
        {
          label: 'View Credentials',
          badge: 'B.Sc & Certs',
          stepIndex: 5,
          icon: FaGraduationCap,
          color: 'cyan',
        },
      ],
      primaryAction: {
        label: 'Start Guided Tour',
        type: 'next',
      },
      secondaryAction: {
        label: 'Skip Tour',
        type: 'close',
      },
    },

    // Step 1: Navigation Architecture
    {
      id: 'navigation',
      stepNumber: 2,
      badge: 'Architecture',
      title: 'Navigating the Portfolio',
      subtitle: 'Single Page Cohesion + Specialized In-Depth Routes',
      icon: FaRoute,
      description:
        'This portfolio is structured as a client-side SPA combining a cohesive homepage with dedicated deep-dive pages for projects, credentials, and recruitment.',
      highlights: [
        {
          route: '/#projects',
          label: 'Featured Projects Grid',
          desc: 'Interactive case studies with live filtering and technology badges.',
        },
        {
          route: '/recruiter',
          label: 'Recruiter Candidate Dossier',
          desc: 'Condensed technical overview, CV download, and role suitability matrix.',
        },
        {
          route: '/experience',
          label: 'Engineering Journey Timeline',
          desc: 'Chronological timeline of verified systems and community mentorship.',
        },
        {
          route: '/education & /certifications',
          label: 'Academic & Training Pages',
          desc: 'Computer Science degree details and verifiable public credentials.',
        },
      ],
      primaryAction: {
        label: 'Next: Featured Projects',
        type: 'next',
      },
      destinationLink: {
        to: '/projects',
        label: 'Browse All Projects Catalog',
      },
    },

    // Step 2: Featured Projects
    {
      id: 'projects',
      stepNumber: 3,
      badge: 'Case Studies',
      title: 'Flagship MERN Monorepos & Projects',
      subtitle: 'Engineered for Performance, Multi-Tenancy & Data Integrity',
      icon: FaCode,
      description:
        'Rather than superficial toy apps, these projects feature real architecture decisions, Zod schema validation, optimistic concurrency, and automated builds.',
      items: topProjects.map((p) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        role: p.role,
        overview: p.overview,
        technologies: p.technologies?.slice(0, 4).map((t) => t.name) || [],
        link: `/projects/${p.id}`,
      })),
      primaryAction: {
        label: 'Next: Technical Skills',
        type: 'next',
      },
      destinationLink: {
        to: '/projects/report-bd',
        label: 'Inspect Flagship: Report BD',
      },
    },

    // Step 3: Technical Skills
    {
      id: 'skills',
      stepNumber: 4,
      badge: 'Tech Stack',
      title: 'Evidence-Driven Technical Stack',
      subtitle: 'Connected to Active Codebases, Not Arbitrary Percentages',
      icon: FaLaptopCode,
      description:
        'Technical capabilities verified across completed and active production projects. Selecting any technology highlights genuine repositories using that tool.',
      skillCategories: coreSkills.map((cat) => ({
        category: cat.category,
        count: cat.items.length,
        items: cat.items.slice(0, 5).map((i) => i.name),
      })),
      primaryAction: {
        label: 'Next: Experience & Mentorship',
        type: 'next',
      },
      destinationLink: {
        to: '/#skills',
        label: 'Test Interactive Skills Grid',
      },
    },

    // Step 4: Experience & Leadership
    {
      id: 'experience',
      stepNumber: 5,
      badge: 'Timeline',
      title: 'Engineering Journey & Leadership',
      subtitle: 'Full-Stack Deliveries & High-Impact Community Mentorship',
      icon: FaBriefcase,
      description:
        'Sabbir combines technical craftsmanship with large-scale community leadership and collaborative developer communication.',
      highlights: [
        {
          title: 'Full-Stack JavaScript Engineering',
          desc: 'Architecting RESTful APIs, React 19 UIs, MongoDB Atlas databases, and clean Git workflows.',
        },
        {
          title: 'Community Leadership & Mentorship',
          desc: 'Admin & mentor in a scholarship community of 8,000+ members. Guided 350+ applicants in the 2026 cycle (51 primary selections, 15 final acceptances).',
        },
      ],
      primaryAction: {
        label: 'Next: Academic Qualifications',
        type: 'next',
      },
      destinationLink: {
        to: '/experience',
        label: 'View Engineering Timeline',
      },
    },

    // Step 5: Education & Certifications
    {
      id: 'education-certifications',
      stepNumber: 6,
      badge: 'Qualifications',
      title: 'Academic Foundations & Credentials',
      subtitle: 'Computer Science Degree & Verifiable Certifications',
      icon: FaGraduationCap,
      description:
        'Academic discipline at the Islamic University of Madinah complemented by rigorous full-stack web certifications.',
      highlights: [
        {
          title: primaryDegree?.degree || 'Bachelor of Science in Computer Science',
          institution: primaryDegree?.institution || 'Islamic University of Madinah',
          status: 'In Progress · Undergraduate Degree',
        },
        {
          title: 'Verified Technical Certifications',
          institution: `${certifications.length} Credentials • Programming Hero & Udemy`,
          status: '100% Verifiable with Public Links',
        },
      ],
      primaryAction: {
        label: 'Next: Recruiter Fast-Track',
        type: 'next',
      },
      destinationLink: {
        to: '/certifications',
        label: 'Browse Verified Certifications',
      },
    },

    // Step 6: Recruiter Quick Access
    {
      id: 'recruiter',
      stepNumber: 7,
      badge: 'Recruiter Portal',
      title: 'Recruiter Fast-Track & Candidate Dossier',
      subtitle: 'Evaluate Suitability & Review Technical Credentials in 2 Minutes',
      icon: FaUserTie,
      description:
        'Designed specifically for hiring managers and technical recruiters. Includes role alignment, skills matrix, CV download, and immediate contact lines.',
      highlights: [
        {
          title: 'Target Roles',
          desc: 'Junior MERN Stack Developer, Junior Full-Stack Developer, Frontend Engineer (React/TypeScript).',
        },
        {
          title: 'Direct Resume Download',
          desc: 'One-click PDF download for ATS screening and technical review.',
        },
      ],
      primaryAction: {
        label: 'Next: Direct Contact',
        type: 'next',
      },
      destinationLink: {
        to: '/recruiter',
        label: 'Open Recruiter Candidate Dossier',
      },
    },

    // Step 7: Contact & Collaboration
    {
      id: 'contact',
      stepNumber: 8,
      badge: 'Connect',
      title: 'Let’s Build Something Meaningful',
      subtitle: 'Available for Full-Time Roles, Remote Positions & Relocation',
      icon: FaWhatsapp,
      description:
        'Reach out directly to discuss job openings, technical inquiries, or full-stack web development collaborations.',
      directChannels: [
        {
          label: 'WhatsApp (Fastest Response)',
          handle: personalInfo.whatsapp,
          link: personalInfo.whatsappUrl,
          icon: FaWhatsapp,
        },
        {
          label: 'Direct Email',
          handle: personalInfo.email,
          link: `mailto:${personalInfo.email}`,
        },
      ],
      primaryAction: {
        label: 'Finish & Explore Portfolio',
        type: 'finish',
      },
      destinationLink: {
        to: '/#contact',
        label: 'Open Contact Form',
      },
    },
  ];
};

# Portfolio Data Schema

This file is the reference for adding or updating content in `src/data/`. Keep the existing export names and field names so the components continue to work without changes.

## Rules

- Use one module per domain and export the name expected by `src/data/index.js`.
- Keep collection data as arrays and add new records with the same object shape as nearby records.
- Use empty arrays (`[]`) for optional list fields instead of `null`.
- Use a real public URL for links and a site-relative path for local files such as screenshots or resumes.
- Project `id` values must be unique and stable because project detail routes use them.
- Icons are React icon components imported from `../icons` or the matching relative path. Do not store icon names as strings in skill items.
- `navigation.js` is UI configuration, not portfolio content. Update it only when a section or external resource changes.

## Data tree

```text
src/data/
|-- index.js                         # Public exports and portfolioData object
|-- assistantPortfolioData.js        # Derived data used by the AI assistant
|-- navigation.js                    # Header and footer navigation data
|-- personal/
|   |-- personalInfo.js
|   |-- languages.js
|   |-- values.js
|   `-- vision.js
|-- skills/
|   |-- index.js
|   |-- frontend.js
|   |-- backend.js
|   |-- tools.js
|   |-- softSkills.js
|   `-- learning.js
|-- education/education.js
|-- experience/experience.js
|-- certifications/certifications.js
|-- focus/currentFocus.js
|-- collaboration/preferredCollaboration.js
`-- projects/
    |-- index.js
    |-- digitalLifeLessons.js
    |-- importExportHub.js
    |-- gameHub.js
    `-- personalAppStore.js
```

## Top-level portfolio data

`src/data/index.js` combines these exports into the object used throughout the app:

```js
export const portfolioData = {
  personalInfo,
  skills,
  education,
  certifications,
  experience,
  currentFocus,
  projects,
  preferredCollaboration,
};
```

When adding a new domain, import and export it in `index.js`, then add it to `portfolioData` if components need it.

## Personal information

File: `personal/personalInfo.js`

```js
import { languages } from './languages';
import { values } from './values';
import { vision } from './vision';

export const personalInfo = {
  name: 'Your full name',
  title: 'Your primary title',
  secondaryTitle: 'Your secondary specialty or focus',
  availability: ['Full-time', 'Freelance'],
  brandName: 'Name shown in the brand area',
  brandTagline: 'Short sentence shown with the brand',
  mission: 'One-sentence professional mission.',
  tagline: 'A longer personal or professional tagline.',
  location: 'City, Country',
  studyingAt: 'School or university',
  email: 'you@example.com',
  github: 'https://github.com/username',
  linkedin: 'https://www.linkedin.com/in/username/',
  facebook: 'https://www.facebook.com/username/',
  resumeUrl: '/resume/Your_Name_Resume.pdf',
  website: 'https://your-domain.example/',
  hero: {
    focusTitle: 'Currently focused on',
    focusItems: ['Focus one', 'Focus two', 'Focus three'],
  },
  languages,
  values,
  vision,
  journey: 'A paragraph describing your background and professional journey.',
};
```

### Languages

File: `personal/languages.js`

```js
export const languages = [
  {
    name: 'English',
    level: 'Fluent',
    percentage: 85, // Use a number from 0 to 100.
  },
];
```

### Values

File: `personal/values.js`

```js
export const values = [
  {
    title: 'Continuous Learning',
    desc: 'Short explanation of this value.',
  },
];
```

### Vision

File: `personal/vision.js`

```js
export const vision = ['A future goal written as a complete sentence.'];
```

## Skills

Each skill category is an object in the `skills` array. Skill items may include an icon; soft skills currently omit icons.

```js
import { SiReact } from '../icons';

export const exampleSkillCategory = {
  category: 'Frontend',
  items: [{ name: 'React', icon: SiReact }, { name: 'Communication' }],
};
```

To add a category:

1. Create `skills/myCategory.js` and export a category object.
2. Import it in `skills/index.js`.
3. Add it to the exported `skills` array.

## Education

File: `education/education.js`

```js
export const education = [
  {
    period: '2024 - Present',
    institution: 'Institution name',
    degree: 'Degree or qualification',
    desc: 'What you studied, achieved, or are currently pursuing.',
  },
];
```

Use a readable value such as `Present`, `Completed`, a year, or a year range for `period`.

## Experience

File: `experience/experience.js`

```js
export const experience = [
  {
    period: '2026 - 3-month build',
    role: 'Full Stack Developer',
    company: 'Company or project name',
    desc: 'Short description of your responsibility and the work completed.',
    outcomes: [
      'A measurable result or delivered outcome.',
      'Another result, responsibility, or learning outcome.',
    ],
  },
];
```

## Certifications

File: `certifications/certifications.js`

```js
export const certifications = [
  {
    title: 'Certificate or course title',
    issuer: 'Issuing organization',
    date: '2026',
    id: 'Certificate ID or Not available for this course',
    link: 'https://example.com/verify-certificate',
  },
];
```

## Current focus

File: `focus/currentFocus.js`

```js
export const currentFocus = [
  {
    title: 'Focus area',
    organization: 'Organization, community, or Self-Directed Learning',
    period: 'Ongoing',
    description: 'What you are learning or building in this area.',
    icon: 'code', // Supported values are interpreted by the focus UI.
  },
];
```

Use the existing icon values (`code`, `ai`, `security`, or `github`) unless the focus component is updated to support another value.

## Preferred collaboration

File: `collaboration/preferredCollaboration.js`

```js
export const preferredCollaboration = ['MERN Development', 'Open Source', 'AI Projects'];
```

This is a simple list of collaboration topics. Add one string per topic.

## Projects

Each project is exported from its own file and added to the `projects` array in `projects/index.js`.

### Standard project template

```js
import { SiReact } from '../icons';

export const myProject = {
  id: 'unique-project-slug',
  title: 'Project title',
  category: 'MERN Stack',
  overview: 'A concise description of what the project does and why it matters.',
  technologies: [
    {
      name: 'React',
      icon: SiReact,
    },
  ],
  architecture: ['Describe the frontend, backend, state management, or deployment architecture.'],
  challenges: ['Describe an important technical challenge.'],
  lessonsLearned: ['Describe a concrete lesson from the project.'],
  futureImprovements: ['Describe a possible next feature or improvement.'],
  githubUrl: 'https://github.com/username/repository',
  liveUrl: 'https://project.example.com/',
  screenshots: ['/screenshots/project-hero.png'],
  featured: false,
  status: 'Completed',
  year: '2026',
  role: 'Solo Developer',
  duration: '2 Weeks',
  teamSize: '1',
  client: 'Personal',
  difficulty: 'Advanced',
  featuredOrder: 5,
};
```

### Project fields

| Field                | Type     | Required      | Notes                                                      |
| -------------------- | -------- | ------------- | ---------------------------------------------------------- |
| `id`                 | string   | Yes           | Unique URL-safe identifier. Keep it stable.                |
| `title`              | string   | Yes           | Display title.                                             |
| `category`           | string   | Yes           | Group such as `MERN Stack` or `React + Firebase`.          |
| `overview`           | string   | Yes           | Main project summary.                                      |
| `technologies`       | array    | Yes           | Objects with `name` and optional React `icon`.             |
| `architecture`       | string[] | Yes           | Architecture decisions or structure.                       |
| `challenges`         | string[] | Yes           | Technical or product challenges.                           |
| `lessonsLearned`     | string[] | Yes           | Lessons gained from the work.                              |
| `futureImprovements` | string[] | Yes           | Planned or possible improvements.                          |
| `githubUrl`          | string   | Yes           | Repository URL.                                            |
| `liveUrl`            | string   | Yes           | Deployed application URL.                                  |
| `screenshots`        | string[] | Yes           | Public paths beginning with `/screenshots/`.               |
| `featured`           | boolean  | Yes           | Controls whether the project appears in featured sections. |
| `status`             | string   | Recommended   | For example, `Completed` or `In Progress`.                 |
| `year`               | string   | Recommended   | Keep it as a string for ranges or labels.                  |
| `role`               | string   | Recommended   | Your role on the project.                                  |
| `duration`           | string   | Recommended   | For example, `2 Weeks`.                                    |
| `teamSize`           | string   | Recommended   | String allows values such as `1` or `4 developers`.        |
| `client`             | string   | Recommended   | For example, `Personal` or a client name.                  |
| `difficulty`         | string   | Recommended   | For example, `Intermediate` or `Advanced`.                 |
| `featuredOrder`      | number   | When featured | Lower numbers appear first in assistant featured results.  |

### Optional project variations

Some existing projects also use these fields. Add them only when they describe the project and the related UI supports them:

```js
const optionalProjectFields = {
  features: ['Use this field for detailed feature descriptions.'],
  keyFeatures: ['Some older project data uses this name for feature lists.'],
  apiEndpoints: ['GET /api/example - Describe the endpoint.'],
  deployment: 'Firebase Hosting',
  performanceMetrics: {
    lighthousePerformance: '~90+',
    lighthouseAccessibility: '~95+',
    lighthouseBestPractices: '~92+',
    lighthouseSEO: '~90+',
  },
};
```

Prefer `features` for new projects when the consuming project detail component supports it. Keep `keyFeatures` for compatibility with existing project records unless the component is migrated.

After creating a project file, add it to `projects/index.js`:

```js
import { myProject } from './myProject';

export const projects = [myProject];
```

## Navigation data

File: `navigation.js`. Navigation entries use section IDs, not URLs.

```js
export const NAV_LINKS = [{ name: 'Projects', href: 'projects' }];

export const FOOTER_LINKS = [{ name: 'Projects', href: 'projects', icon: FaStar }];

export const FOOTER_MORE_LINKS = [
  { label: 'Current Focus', href: 'current-focus', icon: FaLightbulb },
];

export const resources = [
  {
    label: 'GitHub',
    href: 'https://github.com/username',
    external: true,
    icon: FaGithub,
  },
  {
    label: 'Email',
    href: 'mailto:you@example.com',
    icon: FaEnvelope,
  },
];
```

- `NAV_LINKS` uses `name` and `href`.
- `FOOTER_LINKS` uses `name`, `href`, and an icon component.
- `FOOTER_MORE_LINKS` uses `label`, `href`, and an icon component.
- `resources` uses `label`, `href`, an optional `external` boolean, and an icon component.

## AI assistant data

File: `assistantPortfolioData.js`. This object is derived from the main data and should normally not be edited when adding content. New projects, skills, education, experience, certifications, and focus items flow into it through `portfolioData`.

It exposes this shape:

```js
export const assistantPortfolioData = {
  name: personalInfo.name,
  headline: `${personalInfo.title} | ${personalInfo.secondaryTitle}`,
  summary: personalInfo.mission,
  about: personalInfo.journey,
  skills,
  topSkillNames,
  projects,
  featuredProjects,
  education,
  experience,
  certifications,
  currentFocus,
  contact: {
    email: personalInfo.email,
    github: personalInfo.github,
    linkedin: personalInfo.linkedin,
    location: personalInfo.location,
  },
  resume: {
    publicPath: '/resume/Your_Name_Resume.pdf',
    driveUrl: personalInfo.resumeUrl,
  },
  github: {
    profileUrl: personalInfo.github,
    statsRoute: '/github-stats',
  },
  linkedin: personalInfo.linkedin,
  availability: 'Short availability statement.',
  sections: {
    home: 'hero',
    about: 'about',
    projects: 'projects',
    skills: 'skills',
    education: 'education',
    certifications: 'certifications',
    githubStats: 'github-stats',
    contact: 'contact',
    currentFocus: 'current-focus',
  },
};
```

`topSkillNames` and `featuredProjects` are calculated values. Do not manually duplicate them.

## Adding a new data domain

1. Create a module under the matching `src/data/` domain folder.
2. Export the data using the established name.
3. Add the import and re-export in `src/data/index.js`.
4. Add the value to `portfolioData` when it is shared application data.
5. Update the consuming component if the new shape is not already supported.
6. Run `npm run lint` and `npm run build`.

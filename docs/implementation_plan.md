# AI Project Specification – Production-Ready Personal Portfolio Implementation Plan

This implementation plan outlines the setup, architecture, and step-by-step execution roadmap for building a production‑ready personal portfolio website from scratch for **Md. Sabbir Hossen**.

## Goal Description

We will build a high‑performance, responsive, accessible, and SEO‑optimized portfolio website using React 19, Vite, and Tailwind CSS. The website will feature a modern, minimalist dark‑default design, modular feature‑based folder structure, clean routing, interactive animations (Framer Motion), and future‑ready hooks for AI integration.

To ensure the repository has a clean, developer‑friendly Git history, each stage of implementation will be committed separately with meaningful conventional commit messages.

---

## Folder Structure Design

We propose a feature‑based scalable architecture:

```
src/
├── assets/          # Static assets (images, icons, resumes)
├── components/      # Reusable UI components (Button, Card, Input, ThemeToggle)
│   └── common/      # Generic UI building blocks
│   └── sections/    # Page‑level sections (Hero, About, Skills, …)
├── config/          # Global application configs (routing, helmet, constants)
├── contexts/        # React Contexts (ThemeContext, ChatContext)
├── data/            # Local data models/objects containing portfolio content
├── hooks/           # Custom reusable hooks (useTheme, useActiveSection, useGitHubStats)
├── layouts/         # Main app shell and layouts (MainLayout)
├── pages/           # Page‑level components (Home, ProjectDetails)
├── services/        # Service clients (GitHub API integration, Mock AI service)
├── utils/           # Pure utility/helper functions
└── index.css        # Global CSS / Tailwind directives
```

---

## Technical Stack & Library Choices

- **React 19 & Vite** – Modern React framework with high‑speed bundler.
- **Tailwind CSS v4** – Utility‑first styling with CSS‑variables.
- **React Router v6** – Client‑side routing.
- **Framer Motion** – Smooth, high‑performance web animations.
- **React Icons** – Icon system (Lucide / Simple Icons).
- **React Helmet Async** – SEO management.
- **React Hook Form & Yup/Zod** – Form validation for Contact.
- **React Toastify** – Alerts/toast notifications.

---

## User Review Required

> [!IMPORTANT]
> **JavaScript vs. TypeScript** – The current codebase is in JavaScript (`jsx`). Confirm if you would like to migrate to TypeScript now or keep JavaScript.

> [!NOTE]
> **Tailwind Version** – Using Tailwind CSS v4 (zero‑config in Vite).

---

## Open Questions

> [!IMPORTANT]
>
> 1. Do you prefer a UI framework library (e.g., shadcn/ui) or fully custom Tailwind components? (Custom is recommended.)
> 2. Do you have a CV/resume PDF to include in `assets/` or should we add a placeholder?
> 3. Should the GitHub integration use a personal access token (higher rate‑limit) or remain unauthenticated?

---

## Proposed Roadmap

### Phase 1: Project Initialization & Foundations

- Initialize Vite + React project.
- Install Tailwind, React Router, React Helmet Async, Framer Motion, ESLint, Prettier.
- Set up Theme Context (dark‑default, toggle).
- Base layout with `<Header/>`, `<Footer/>` and `<Outlet/>`.
- **Git commit**: `feat: initialize project structure and base configuration`

### Phase 2: Design Tokens, Core UI & Data

- Define design tokens (colors, spacing, shadows, typography).
- Create `src/data/portfolioData.js` with all personal content.
- Build common UI components: `Button`, `Link`, `Card`, `Badge`, `ThemeToggle`, `Typography`.
- Navigation (desktop & mobile) with scroll‑spy.
- **Git commit**: `feat: implement core UI components and portfolio dataset`

### Phase 3: Home Page Sections

- **Hero** – Animated headline, subtitle, CTA buttons, social icons.
- **About** – Personal mission, journey, values, vision, language badges.
- **Skills** – Categorised skill badges.
- **Education** – Timeline cards.
- **Certifications** – Grid of certification cards.
- **Projects** – Featured project grid with tag filters.
- **Contact** – Form with validation, toast feedback.
- **GitHubStats** – Public repos, followers, following (already added).
- **Git commit**: `feat: implement main sections (hero, about, skills, education, certifications, projects, contact, github‑stats)`

### Phase 4: Project Details & Filtering

- Project detail pages (dynamic route `/projects/:slug`).
- Tag‑based filtering with smooth animations.
- SEO meta tags per project.
- **Git commit**: `feat: implement project grid with filtering and detail pages`

### Phase 5: AI Assistant Stub & Enhancements

- UI placeholder for future AI chatbot (floating button, modal).
- Hook `useAIChat` (stubbed, returns mock responses).
- **Git commit**: `feat: add AI assistant UI stub`

### Phase 6: Polish, Accessibility, Performance

- Run Lighthouse audit – fix FCP, TTI, CLS.
- Add `alt` text, ARIA attributes, focus management.
- Optimize images (WebP, lazy‑load).
- Minify, code‑split, enable pre‑rendering for SEO.
- Update `package.json` lint script to target only `src/`.
- **Git commit**: `perf: optimize assets and perform accessibility audit`

---

## Verification Plan

### Automated Tests

- `npm run lint` – ensure no ESLint errors.
- `npm run build` – production build succeeds.
- Unit tests (if any) with Jest – basic component rendering.

### Manual Verification

- Open the site on desktop, tablet, mobile – verify responsive layout.
- Test dark‑mode toggle and preserve preference.
- Verify all navigation links, scroll‑spy, and hash‑routing.
- Submit contact form – ensure validation and toast messages.
- Check GitHub stats load correctly.
- Verify SEO meta tags via view‑source.

---

## Next Steps

1. **Confirm open questions** (JS vs TS, UI lib preference, resume file, GitHub token).
2. Once confirmed, execute Phase 1–Phase 6 in order, committing after each phase.
3. After each commit, run the verification plan.

Please review the plan and let me know any adjustments or approvals so we can start the implementation.

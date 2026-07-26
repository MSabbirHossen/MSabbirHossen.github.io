# AGENTS.md

## Purpose

Instructions for AI coding agents working in this portfolio repository. Keep changes minimal, preserve the existing design language, and prefer updating existing patterns over introducing new ones.

## Project Snapshot

- Stack: React 19, Vite 8, Tailwind CSS v4, Framer Motion, React Router, React Helmet Async.
- App type: client-side portfolio SPA with section-based homepage and project detail pages.
- Data source: most content comes from [README.md](README.md) runtime data in `src/data/portfolioData.js`.

## Commands

- Dev server: `npm run dev`
- Production build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format`
- Preview production build: `npm run preview`
- Refresh GitHub stats JSON: `npm run update-stats`

## Key Files

- App content and project data: `src/data/portfolioData.js`
- Global theme tokens and semantic utilities: `src/index.css`
- Theme state and dark/light/system handling: `src/contexts/ThemeContext.jsx`
- Shared UI primitives: `src/components/common/`
- Section components: `src/components/sections/`
- Feature components: `src/components/{hero,about,skills,github,projects,contact,footer,layout}/`
- Main roadmap and architecture notes: [implementation_plan.md](implementation_plan.md)
- Progress tracker and completed phases: [task.md](task.md)

## Architecture

- Routes are defined in `src/App.jsx` and page entry points live in `src/pages/`.
- `src/layouts/MainLayout.jsx` provides the shared shell.
- Most homepage sections render through `SectionWrapper` and compose feature-specific child components.
- `portfolioData.js` is the single source of truth for personal info, projects, education, certifications, skills, and related content.

## Working Conventions

- Preserve the current premium portfolio design language. Polish and refactor; do not redesign unless explicitly asked.
- Prefer semantic theme utilities over hardcoded colors:
  - text: `text-primary`, `text-secondary`, `text-muted`
  - surfaces: `surface`, `glass`, `surface-hover`, `border-default`
- Reuse shared primitives before creating new ones:
  - `Typography`, `Button`, `Card`, `Badge`, `Input`, `SectionWrapper`
- Keep dark, light, and system themes working. Do not introduce styling that only works in dark mode.
- Preserve Framer Motion behavior unless the task is specifically about animation or reduced-motion handling.
- Keep section changes local. If a section was already completed in the current workflow, do not revisit it unless explicitly asked.
- Prefer updating data in `portfolioData.js` rather than hardcoding repeated content in components.

## Validation Expectations

- Always run `npm run build` after code changes when feasible.
- Run `npm run lint` for lint-oriented or broader refactors.
- There is no test runner configured in this repo; do not claim test coverage.

## Repo-Specific Pitfalls

- Tailwind uses v4 patterns and theme tokens defined in `src/index.css`; follow existing semantic utility conventions.
- Contact form delivery is client-side via EmailJS in `src/components/contact/ContactForm.jsx`; required env vars must already exist.
- GitHub analytics are rendered from `public/stats.json`, not fetched from GitHub live at runtime.
- Project details depend on route params matching entries in `portfolioData.js`; keep fallback behavior intact when editing project pages.
- This repo currently favors small, focused commits by section rather than broad refactors.

## Documentation Strategy

- Link to existing docs instead of duplicating them.
- Use [implementation_plan.md](implementation_plan.md) for original architecture intent.
- Use [task.md](task.md) to see completed phases and avoid redoing finished work.

## When Unsure

- Choose the smallest change that matches current patterns.
- Prefer consistency with nearby components over introducing a new abstraction.
- If multiple files could own a behavior, edit the one that directly controls rendering or state for that behavior.

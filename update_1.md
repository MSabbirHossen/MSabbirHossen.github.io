## 0. Context (do not skip)

This is a **React 19 + Vite + Tailwind CSS v4 + Framer Motion** portfolio for a
MERN stack developer job search. Key facts about the current codebase:

- Home page lives at `src/pages/Home.jsx` and renders sections in-place (scroll anchors), not separate routes.
- `src/App.jsx` ALSO defines standalone routes for `/about`, `/skills`, `/education`, `/certifications`, `/github-stats`, `/contact`, `/projects` that render the same components full-page, disconnected from Home.
- `src/components/footer/FooterLinks.jsx` uses React Router `<Link to="/education">` etc. — meaning footer nav currently sends visitors AWAY from the one-page portfolio into thin, isolated pages with no other content around them.
- `src/components/layout/NavLinks.jsx` (header nav) uses **scroll-based anchor navigation** (`hero`, `about`, `skills`, `projects`, `contact`) — it does NOT include `current-focus`, `education`, `certifications`, or `github-stats`, even though some of those exist as data.
- `src/components/experience/Experience.jsx` is an **unfinished stub**: `<h1>Experience</h1>` and nothing else. It's imported nowhere.
- `src/data/experience/experience.js` has one entry with `period: 'Future-Ready'` — needs a real rewrite (see Task 3).
- `src/components/hero/HeroContent.jsx` destructures `secondaryTitle` from `personalInfo`, but that field is commented out in `src/data/personal/index.js` — the hero eyebrow line is currently rendering blank/undefined. Fix this.
- Resume: `resources` array in `src/data/navigation.js` points to `/resume/Md_Sabbir_Hossen_Resume.pdf`, but `personalInfo.resumeUrl` in `src/data/personal/index.js` points to a Google Drive link, and there's also a `public/resume-placeholder.pdf`. These three must be reconciled into ONE real, current, self-hosted PDF.

---

## 1. Non-negotiable constraints

- Do not delete any real content (project case studies, education history, certifications, values, vision) — only relocate, condense, or restyle it.
- Preserve dark/light theme support (`html.light` variants) and the existing design token system in `src/index.css` — extend it, don't replace it wholesale.
- Preserve `prefers-reduced-motion` handling already present in Framer Motion components.
- Keep all existing project detail pages (`/projects/:slug`) and their SEO/Helmet metadata intact.
- Every change must keep `npm run lint` and `npm run build` passing.
- At the end, output a summary of every file changed/added/removed and any assumptions made (e.g., placeholder text where real content is still needed from me).

---

## 2. Task: Fix existing bugs first

1. In `src/data/personal/index.js`, uncomment/add a real `secondaryTitle` (e.g. `"MERN Stack Developer · AI Integration · Security-Aware Development"`) so `HeroContent.jsx` renders correctly.
2. Reconcile resume links: host one final PDF at `public/resume/Md_Sabbir_Hossen_Resume.pdf`, delete `resume-placeholder.pdf`, and point BOTH `personalInfo.resumeUrl` and the `resources` array to that single local path. Do not use a Google Drive link.
3. Delete or fully rewrite `src/components/experience/Experience.jsx` — it must render real content from `src/data/experience/experience.js` (see Task 3 for the content rewrite), styled consistently with other sections (use `SectionWrapper`, `Card`, `Reveal` like `About.jsx`/`Skills.jsx` do).
4. Verify `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` are referenced correctly in `ContactForm.jsx` and add a `.env.example` file documenting them if one doesn't exist, so the contact form doesn't silently fail in production.
5. Confirm every `liveUrl` and `githubUrl` in `src/data/projects/*.js` is still reachable; flag any that 404.

---

## 3. Task: Rewrite weak content

- **Experience section copy**: Replace the `'Future-Ready'` / vague framing in `src/data/experience/experience.js` with concrete, dated entries. Frame freelance/open-source/self-initiated project work as real experience using this pattern per entry: `role`, `company/context`, `period` (real dates, not "Future-Ready"), and a `desc` that states what was delivered and for whom, using action verbs and outcomes (e.g. "Built and deployed X, resulting in Y" rather than "actively building"). If real dated experience doesn't exist yet, use the actual project build timeframes from `src/data/projects/*.js` (`year`, `duration`) as the basis instead of inventing dates.
- **Hero CTA copy**: In `HeroContent.jsx`, rename the `"Open to Opportunities"` button to `"Let's Talk"` or `"Hire Me"` and keep it as the primary CTA scrolling to `#contact`. Keep `"View Resume"` as the secondary/outline CTA.
- **Hero headline**: Add one quantified/impact line under the name+title (e.g. number of shipped full-stack apps, stack, and availability) — pull this from real data already in `src/data/projects` (count of `status: 'Completed'` projects) rather than a hardcoded string, so it stays accurate as projects are added.

---

## 4. Task: Restructure the Home page

Current order in `src/pages/Home.jsx`:
`Hero → About → Skills → Projects → Contact → CurrentFocus`

This is wrong for a hiring-manager scan: `Contact` (the conversion action) appears
_before_ `CurrentFocus`, burying the CTA in the middle of the page, and three
whole content areas (Experience, Education, Certifications, GitHub activity)
never appear on the homepage at all despite having real data and components.

**Rebuild `Home.jsx` to render sections in this order:**

1. `Hero` — first impression, CTA to contact + resume
2. `About` — condensed identity/value proposition (see Task 5 for what moves out of this)
3. `Skills`
4. `Experience` — newly rebuilt component (Task 2.3), sits right after Skills since employers look for skills → proof of applied skills in sequence
5. `Projects` — the main proof-of-work section
6. `GitHubStats` (currently orphaned at route `/github-stats`) — bring it inline here, right after Projects, as live proof of ongoing activity/commit consistency backing up the project claims
7. `Education` (currently orphaned at route `/education`) — timeline component already exists, just needs to render inline here
8. `Certifications` (currently orphaned at route `/certifications`) — card grid already exists, render inline here
9. `CurrentFocus` — condensed to a compact 2–3 item strip (not a full-height section — see Task 5), signals forward momentum right before the ask
10. `Contact` — always last. This is the conversion point; nothing should follow it except the footer.

Update `src/App.jsx`: remove the now-redundant standalone routes
(`/about`, `/skills`, `/education`, `/certifications`, `/github-stats`) since
their content now lives inline on `/`. Keep only routes that deserve to be
真正 standalone pages: `/projects/:slug` (case studies), `/contact` can stay
as a redirect to `/#contact` for old links/bookmarks, `/*` NotFound.

Update `src/components/layout/NavLinks.jsx` / `src/data/navigation.js`
`NAV_LINKS` to include anchors for the newly-inlined sections
(`experience`, `github-stats` or fold it under a broader `proof` label,
`education`, `certifications`) OR group them under fewer top-level nav items
if 9 nav links is too many for the header — use your judgment, but the header
must let a visitor jump directly to Projects, Experience, and Contact at minimum.

---

## 5. Task: Redistribute content between Home and Footer

**Move OUT of the main Home flow (condense or relocate to Footer):**

- The full `Languages` proficiency list (currently likely rendered as a
  full-width card in `About`/`LanguagesCard.jsx`) — condense to a single line
  of language names in `About`, and move the detailed percentage breakdown
  into a compact "Languages" list in the Footer's `FooterBrand` or a new
  small footer column, since it's a nice-to-know detail, not a primary
  hiring signal.
- `CurrentFocus` full section → condense to a 2–3 chip inline strip near the
  bottom of Home (per Task 4, step 9) rather than a full dedicated section;
  it's supporting content, not a primary section.
- `Facebook` link — deprioritize from Hero's `HeroActions` (keep only
  GitHub + LinkedIn there as those are what employers check) and keep
  Facebook only in the Footer's `resources`/social list, since it's a
  personal rather than professional-facing profile.

**Bring INTO the Home page (from currently-orphaned footer-only routes):**

- `Education` — per Task 4, now section 7 on Home.
- `Certifications` — per Task 4, now section 8 on Home.
- `GitHubStats` — per Task 4, now section 6 on Home.
- `Experience` — newly built, now section 4 on Home.

**Footer (`src/components/footer/Footer.jsx` and children) after this change should contain:**

- `FooterBrand`: name + tagline + condensed language list (see above).
- `FooterLinks` ("Explore"): convert these from React Router page links into
  **smooth-scroll anchor links to the Home sections** (matching the pattern
  already used in `NavLinks.jsx`'s `onNavigate` handler) instead of
  `<Link to="/education">` etc., since those are no longer separate pages.
  Reuse the same scroll-to-section utility the header uses so behavior is
  consistent whether the user clicks a footer link or a nav link.
- `FooterResources` ("Connect with Me"): Resume PDF, GitHub, LinkedIn,
  Facebook, Email — keep as-is, these are appropriately secondary here.
- `FooterSocials`: GitHub, LinkedIn, Email icon row + location — keep as-is.
- `FooterBottom`: copyright, keep as-is.

---

## 6. Task: Visual/premium polish (apply while restructuring, not as a separate pass)

- Pair the existing `Plus Jakarta Sans` body font with a distinct display
  typeface for section titles only (e.g. `Space Grotesk` or `Clash Display`)
  to break the "generic Tailwind template" look — add via the same
  `@theme`/`--font-*` pattern already in `src/index.css`.
- Reserve the `.gradient-text` / `.glow-primary` / gradient-border treatment
  from `src/index.css` for 1–2 hero elements maximum; the current CSS makes
  all three available everywhere, so audit component usage and pull gradient
  effects back to accents only (H1 name in Hero, maybe one CTA button).
- Add a scroll-cue affordance in the Hero using the already-defined
  `.animate-float` utility (currently unused) — a small "scroll to explore"
  indicator with a down arrow.
- On `ProjectCard.jsx`, add a hover state (image scale/zoom + tech tag reveal)
  using Framer Motion, consistent with the reveal-on-scroll pattern already
  used elsewhere via `Reveal.jsx`.
- Design a proper Open Graph share image (not a reused project screenshot) —
  name+title+gradient background at 1200×630 — and update `index.html` and
  `Home.jsx`'s Helmet `og:image`/`twitter:image` to point to it.
- Add an availability status badge near the Hero or Header
  (e.g. "Open to: Full-time · Internship · Freelance") sourced from a new
  `personalInfo.availability` field so it's data-driven and easy to update.

---

## 7. Task: Performance, SEO, accessibility pass

- Lazy-load `AIChatModal.jsx` and any below-the-fold sections (Certifications,
  Education) using `React.lazy`/`Suspense`, matching the pattern already used
  for `ProjectDetails` in `App.jsx`.
- Compress/convert images in `public/screenshots` to WebP; verify total page
  weight after the change.
- Run a Lighthouse audit against the built output and fix anything scoring
  below 90 on Performance and Accessibility — pay particular attention to
  color contrast in both themes and alt text on all project screenshots.
- Ensure every newly-inlined section (`Education`, `Certifications`,
  `GitHubStats`, `Experience`) has proper heading hierarchy (`h2` per
  section, not `h1`) now that they're sub-sections of one page rather than
  standalone page roots.

---

## 8. Deliverable format

When done, provide:

1. A list of every file added, modified, or deleted, grouped by task number above.
2. The final Home page section order as implemented.
3. Any content still needing real input from me (e.g. dated experience entries, OG image asset, availability status).
4. Confirmation that `npm run lint` and `npm run build` both pass.

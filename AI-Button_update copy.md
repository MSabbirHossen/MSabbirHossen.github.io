## 0. Context (verified from the actual code — do not re-derive, just act on it)

- `AIChatButton` (`src/components/common/AIChatButton.jsx` → `ai/AIButton.jsx`)
is commented out in `src/layouts/MainLayout.jsx`.
- The chat pipeline is: `useAIChat.js` (state/actions) →
`responseBuilder.js` (`generateLocalResponse`) → `intentMatcher.js`
(regex keyword scoring across ~18 intents) → `knowledgeEngine.js`
(search/filter helpers) → `assistantPortfolioData.js` (flattened data).
- **There is no LLM/API call anywhere in this pipeline.** It is a fully
local, deterministic, rule-based system. `generateAIResponse` in
`responseBuilder.js` is an `async` function that awaits nothing and
calls the synchronous `generateLocalResponse`.
- Two floating action buttons currently collide at the same screen
position on desktop: `AIButton.jsx` (`fixed bottom-5 right-4 z-40 sm:bottom-6 sm:right-6`) and `BackToTopButton.jsx` (`fixed bottom-6 right-6 z-50`). Once a user scrolls past 350px, both occupy
`bottom-6 right-6` and the back-to-top button (higher z-index) sits on
top of/blocks the AI button.
- `assistantPortfolioData.js` has a `routes` object pointing to
`/education`, `/certifications`, `/github-stats` — standalone pages.
If the Home-page restructure prompt has already been run, these no
longer exist as separate pages and must become in-page scroll anchors.
- Accessibility is already well implemented in `AIWindow.jsx` (focus
trap, Escape handling, `aria-live` region, scroll lock, focus
restoration) — preserve all of this, do not simplify it away while
restyling.

---

## 1. Non-negotiable constraints

- Do not remove the accessibility behaviors already in `AIWindow.jsx`
(focus trap, `role="dialog"`, `aria-live` announcements, Escape to
close, reduced-motion handling).
- Do not silently claim the assistant uses a live LLM if it still
doesn't after this pass — see Task 2 for the two honest options.
- Keep the existing message/action/card data shape (`role`, `content`,
`cards`, `actions`, `followUps`) so `MessageBubble.jsx` doesn't need a
rewrite — extend it, don't replace it.
- `npm run lint` and `npm run build` must pass at the end.
- Output a summary of every file changed/added/removed and any
assumptions made.

---

## 2. Task: Decide and implement the assistant's real capability level

Pick ONE of these two paths and implement it fully — do not leave it
half-labeled as "AI" while behaving as a rule-based FAQ:

**Option A — Keep it local (recommended for a static GitHub Pages site,
zero ongoing cost, zero API key exposure risk):**

- Rename user-facing copy from "AI Portfolio Assistant" to something
accurate and still confident, e.g. **"Portfolio Guide"** or
**"Ask about my work"** — update the title in `AIWindow.jsx`
(`ai-chat-title`), the button label in `AIButton.jsx`
("AI Assistant" → "Portfolio Guide"), and the welcome message in
`useAIChat.js`. Keep the robot icon or swap for a chat-bubble icon —
your call — but stop implying a general-purpose LLM.
- Substantially improve `intentMatcher.js` matching quality: add a
small synonym map per intent (e.g. `projects` should also catch
"shipped", "delivered", "made"; `about` should catch "background",
"who are you", "tell me about yourself"), and add a fallback fuzzy
check (simple Levenshtein distance ≤2 on individual words, or a
small library) so common typos don't fall through to the unknown
response.
- Vary the simulated "thinking" delay in `useAIChat.js` slightly
(e.g. random 400–900ms based on response length) instead of a flat
550ms, so it doesn't read as obviously scripted.

**Option B — Wire up a real LLM (higher effort, ongoing cost, needs a backend):**

- GitHub Pages is static hosting; a real LLM call requires a serverless
proxy (e.g. a small Cloudflare Worker or Vercel Edge Function) that
holds the API key server-side and forwards `{ message, context }` to
an LLM API, returning a structured JSON response matching the
existing `{ text, cards, actions, followUps }` shape so the rest of
the UI needs no changes.
- Feed the LLM the same `assistantPortfolioData.js` content as system
context (or the `llms.txt` file from Task 4 below — reuse it) so
answers stay grounded in real portfolio data and don't hallucinate.
- Add a loading/error fallback path that degrades to the existing local
`generateLocalResponse` logic if the API call fails or times out, so
the assistant never goes fully silent.
- Add basic rate limiting/abuse protection at the proxy layer since the
endpoint will be public.

If unsure which to pick, default to **Option A** — it matches the
project's current zero-backend architecture and is safer to ship
correctly in one pass.

---

## 3. Task: Activate the button and fix layout/visual issues

1. Uncomment `<AIChatButton onClick={chat.toggleChat} isOpen={chat.isOpen} />`
in `src/layouts/MainLayout.jsx`.
2. Fix the position collision with `BackToTopButton`: give the AI button
its own lane — e.g. move `AIButton` to `bottom-6 left-4 sm:left-6`
(opposite corner from back-to-top), OR stack them vertically with a
fixed gap and conditionally shift the AI button up when
`BackToTopButton` is visible. Pick whichever fits the design better,
but they must never visually overlap at any viewport width.
3. Add a subtle **unread/attention pulse** the first time a visitor
loads the site (e.g. a single soft pulse animation on the button
after a 3–5s delay, once per session via `sessionStorage`) so
first-time visitors notice it's interactive without being annoying
on repeat visits.
4. Restyle `AIWindow.jsx` header to feel more like a modern product chat
(e.g. Intercom/Crisp-style): a small avatar/icon chip next to the
title, an online/status dot, and keep the existing close button and
description line.
5. In `InputArea.jsx`, add a small visual affordance showing the
`Ctrl/Cmd+K` shortcut (e.g. a `<kbd>` hint) near the input or in the
button tooltip, since the shortcut already works via `useAIChat.js`
but is currently undiscoverable.
6. Confirm the modal's max-height and mobile safe-area handling
(`AIWindow.jsx` already sets `env(safe-area-inset-bottom)`) still
works correctly after any restyling — test at a narrow (375px)
viewport.

---

## 4. Task: Fix data/route consistency with the Home page restructure

Check whether `src/pages/Home.jsx` currently renders Education,
Certifications, and GitHub Stats as inline sections (from the earlier
restructure prompt) or as still-separate routes:

- **If they are now inline Home sections**: update
`assistantPortfolioData.js`'s `routes` object to instead reference the
section IDs (e.g. `sections.education: 'education'`), and update
`responseBuilder.js`'s `buildEducationResponse`,
`buildCertificationResponse`, and `buildGithubResponse` to use
`action('Open Education', { kind: 'scroll', target: portfolio.sections.education })`
instead of `kind: 'route'`.
- **If they are still separate routes**: leave `routes` as-is, no change needed.

Either way, add a small integration check: click every action button
the assistant can generate (Open Projects, Open Skills, Open Contact,
Open Education, Open Certifications, Open GitHub Stats, Copy Email,
Download Resume, external GitHub/LinkedIn links) and confirm each one
actually navigates/scrolls/opens correctly with no dead links.

---

## 5. Task: Generate an `llms.txt` for AI agents (new capability)

Add a plain-markdown ground-truth file so external AI tools (ChatGPT,
Claude, Perplexity, etc.) can accurately summarize the portfolio when
someone pastes the URL, instead of scraping rendered HTML.

1. Create `public/llms.txt` following the community `llms.txt`
convention (see llmstxt.org for the format if you need to verify
current spec) — a concise markdown document with:

- H1: Name + one-line role/positioning.
- A short "About" paragraph (2–4 sentences, not the full mission
statement).
- An H2 "Skills" section listing skill categories and top tools.
- An H2 "Projects" section — for each featured project: name, one-line
description, tech stack, and links (live + GitHub + case study).
- An H2 "Experience" section with real entries (post the Task 3
rewrite from the earlier prompt).
- An H2 "Education" and H2 "Certifications" section.
- An H2 "Contact" section with email, LinkedIn, GitHub, and
availability status.
- A closing note: "Full interactive portfolio: [https://msabbirhossen.github.io/](https://msabbirhossen.github.io/)"
2. **Do not hand-write this file as static content that will drift out
of sync.** Instead, write a small Node build script
(`scripts/generate-llms-txt.mjs` or similar) that imports the same
`portfolioData` (`src/data/index.js`) already used by the site and
the chat assistant, and generates `public/llms.txt` from it as a
build step (e.g. wired into the existing `npm run build` via a
`prebuild` script in `package.json`). This guarantees the assistant's
knowledge, the live site content, and the AI-agent file never
disagree with each other.
3. Reference the file from `index.html` with a discovery link, e.g.
`<link rel="llms-txt" href="/llms.txt" />`, and list it in
`public/robots.txt` as an explicitly allowed path if a robots file
already exists (check first — don't create conflicting rules).
4. Add a one-line mention of the file's existence in the repo's
`README.md` under a short "For AI agents" heading, so it's
discoverable to anyone reading the repository too.

---

## 6. Deliverable format

When done, provide:

1. Every file added/modified/deleted, grouped by task number above.
2. Which option was implemented for Task 2 (A or B) and why.
3. Confirmation that all assistant action buttons were click-tested per Task 4.
4. The generated `public/llms.txt` output for review.
5. Confirmation `npm run lint` and `npm run build` pass.
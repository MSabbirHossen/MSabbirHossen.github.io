## 0. Confirmed root causes (verified in code — fix these specifically)

**Clutter — multiple redundant action surfaces render simultaneously:**

- `MessageList.jsx`'s `EmptyState` renders FOUR separate stacked clusters
before any conversation starts: the full 8-item `QuickActions` list,
a 2-button "Open Resume / GitHub Highlights" row, a "Featured
projects" chip row, and a "Recent work" chip row — each with its own
heading.
- `AIWindow.jsx` renders `QuickActions` a second time in a persistent
bar once `hasConversation` is true, duplicating options already
offered in the empty state and in per-message actions.
- `MessageBubble.jsx` renders up to three more elements per assistant
message: the reply sentence, a `ResponseCard` (which repeats the same
description text), a `message.actions` row, and a `message.followUps`
row — four content blocks per single reply.
- If a previous edit pass added new visual elements (avatar chip, status
dot, restyled cards, etc.) without removing any of the above, all of
it is now rendering at once. Audit for this specifically — diff
against the structure described above and remove anything left over
that duplicates a surface already covered by the new design.

**Broken/mismatched follow-ups — two confirmed logic bugs:**

1. In `responseBuilder.js`, `buildProjectResponse`'s `intentBuckets`
object is missing a `projects` key (`{ react, mern, ai, security }`
only). When the resolved intent is the general `projects` intent,
`intentBuckets['projects']` is `undefined`, so the function ignores
`memory.lastProjectId` and falls through to an unrelated project
list instead of continuing the conversation about the project just
discussed.
2. `intentMatcher.js`'s `INTENT_RULES` has no rule for "focus" /
"current focus" at all, yet `buildExperienceResponse` and
`buildEducationResponse` both hand out a followUp literally labeled
`"Show current focus"`. Clicking it always falls through to
`defaultUnknownResponse` since nothing matches.
3. Command-phrased followUps (`"Copy email"`, `"Download resume"`,
`"Open LinkedIn"`) are always dispatched as `{ kind: 'prompt' }` free
text in `MessageBubble.jsx`, re-entering the intent matcher instead
of directly running the real action (`copy-email`, `external`).
Clicking them re-opens a contact/resume card the user must click
again, instead of performing the implied action immediately.

---

## 1. Non-negotiable constraints

- Do not remove the accessibility behavior in `AIWindow.jsx` (focus
trap, `aria-live`, Escape handling, reduced-motion support).
- Keep backward compatibility with the existing message shape consumers
(`MessageBubble.jsx` props) unless you are updating all call sites in
the same pass.
- `npm run lint` and `npm run build` must pass at the end.
- Summarize every file changed and why.

---

## 2. Task: Consolidate to ONE action-surface pattern

Redesign so there is exactly one place the user sees suggested actions
at any given time, not several:

1. **Empty state (before first message):** Collapse the four separate
clusters in `MessageList.jsx`'s `EmptyState` into a single, compact
grid of at most 4–6 top-level starter prompts (pick the highest-value
ones: Best Projects, Skills, Experience, Contact — drop Resume/GitHub
as separate rows and fold them into the Contact/Projects flows
instead). Remove the separate "Featured projects" and "Recent work"
chip rows from the empty state entirely — that content already
surfaces naturally once the user asks about projects or current work.
2. **Persistent top bar in `AIWindow.jsx`:** Remove the `QuickActions`
bar that renders when `hasConversation` is true — it duplicates the
per-message actions/followUps already shown with the latest reply.
Suggested starter prompts belong only in the empty state.
3. **Per-message actions and followUps in `MessageBubble.jsx`:** Merge
`message.actions` and `message.followUps` into a single row instead
of two stacked rows. Cap the total number of chips shown per message
to 3, prioritizing structural actions (open section, external link)
over generic follow-up questions. Style actions (things that
navigate/open/copy) visually differently from followUps (things that
ask another question) — e.g. solid pill for actions, outlined/ghost
pill for follow-up questions — so the two purposes are visually
distinct even in one row.
4. **Reduce text duplication between bubble and card:** When a
`ResponseCard` is present, shorten the bubble's `text` to a short
lead-in (e.g. "Here's a closer look:") instead of a full sentence
that restates the card's own description field.
5. Re-test the modal at both empty and multi-turn states after this
pass and confirm it now shows at most one action surface at a time
with a clear visual hierarchy (reply text → card if present →
one capped action row).

---

## 3. Task: Fix the follow-up/action logic bugs

1. In `responseBuilder.js`, add `projects: knowledge.getProjectsByTopic ? [...]` — specifically, add a `projects` key to `intentBuckets` in
`buildProjectResponse`. When intent is the general `projects` intent
AND `memory.lastProjectId` is set, prioritize re-surfacing that exact
project (via `knowledge.getProjectById(memory.lastProjectId)`) before
falling back to featured/topic lists, so continuation questions like
"show full project details" stay on the same project instead of
jumping to an unrelated one.
2. Add a `current_focus` intent to `intentMatcher.js`'s `INTENT_RULES`
(terms like `'focus'`, `'current focus'`, `'currently working on'`,
`'learning'`), and add a corresponding `buildCurrentFocusResponse`
in `responseBuilder.js` that surfaces `portfolio.currentFocus` items
(there's already a `currentFocus` field on `assistantPortfolioData`
and a `FocusCard` component pattern to mirror for card shape). Wire
it into the `switch` in `generateLocalResponse`.
3. Fix command-phrased followUps to run the real action instead of
re-entering the intent matcher: change the `followUps` data shape
from plain strings to `{ label, action }` objects wherever the
followUp implies a direct action (Copy Email, Download Resume, Open
LinkedIn) — e.g. `{ label: 'Copy email', action: { kind: 'copy-email', value: portfolio.contact.email } }` —
and update `MessageBubble.jsx`'s followUp rendering to call
`onAction(followUp.action ?? { kind: 'prompt', prompt: followUp.label ?? followUp })`
so it stays backward compatible with any remaining plain-string
followUps that are genuinely just conversational (e.g. "What about
security?") while direct-action followUps now actually perform the
action on first click.
4. Audit every `followUps` array across `responseBuilder.js` for any
other phrase that has no matching `INTENT_RULES` entry (grep the verb
nouns against the rule terms) and either add the missing intent rule
or reword the followUp to match an intent that already exists.
5. Add one automated smoke test (or a manual test checklist in your PR
description if no test setup exists) that walks every followUp/action
currently produced by `responseBuilder.js` and confirms each one
either navigates/scrolls/copies correctly or returns a response whose
content actually matches what the chip promised.

---

## 4. Deliverable format

When done, provide:

1. Every file changed, grouped by task number above.
2. A before/after description of the empty-state and per-message layout
(surface count reduced from N to 1).
3. Confirmation each of the three logic bugs in Section 0 is fixed, with
the specific code change referenced.
4. The full list of followUps audited in Task 3.4, and what changed for
any that were previously dead-ends.
5. Confirmation `npm run lint` and `npm run build` pass.
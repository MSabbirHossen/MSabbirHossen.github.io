# Master Prompt: Git Commit Guidelines, Conventional Commits & Development Discipline

## 1. Objective

Follow a disciplined, transparent, and professional Git workflow throughout every development task in this repository.

Every logical code change must be properly validated, reviewed, staged, and committed using the **Conventional Commits specification**.

The Git history must serve as a reliable development record, allowing me or another developer to understand:

- What changed.
- Why it changed.
- Which part of the application was affected.
- How the project evolved over time.
- Which features, fixes, and improvements were introduced.

**Core principle: Small, meaningful, independently understandable commits are mandatory.**

Do not treat Git commits as a final administrative step. Git discipline must be part of the entire development workflow.

---

## 2. Conventional Commits Specification

Every commit message MUST follow this structure:

```text
<type>(<scope>): <short summary>
```

The scope is recommended and should be included whenever a meaningful scope can be identified.

### Allowed Commit Types

| Type | Purpose |
|---|---|
| `feat` | Introduces new functionality or a user-facing feature. |
| `fix` | Resolves a bug or incorrect behavior. |
| `refactor` | Restructures code without changing external behavior. |
| `style` | Changes formatting, CSS, visual styling, or code presentation without functional changes. |
| `docs` | Updates documentation, README, guides, or comments. |
| `test` | Adds, modifies, or fixes tests. |
| `chore` | Handles maintenance, tooling, configuration, or dependencies. |
| `perf` | Improves application performance or resource efficiency. |

Choose the type that best represents the actual purpose of the change.

Do not misuse commit types to make the history appear more impressive.

### Commit Message Examples

```text
feat(projects): add featured project showcase

feat(guide): introduce interactive portfolio onboarding

fix(navigation): resolve mobile menu overflow

refactor(projects): centralize project metadata

style(guide): improve modal spacing and transitions

test(projects): verify featured project ordering

docs(readme): document current portfolio architecture

chore(deps): update development dependencies

perf(images): optimize project thumbnail loading
```

### Commit Message Writing Rules

- Use present-tense, imperative-style summaries.
- Start the summary with a lowercase letter.
- Keep summaries concise and descriptive.
- Identify the affected feature or module through the scope.
- Explain the actual change rather than the development activity.
- Avoid unnecessary punctuation at the end.
- Never include vague or meaningless summaries.

---

## 3. Atomic Commit Discipline

Every commit must represent one logical, independently understandable change.

### Mandatory Rules

1. Never combine unrelated changes into a single commit.
2. Avoid massive commits containing multiple unrelated features.
3. Separate implementation, bug fixes, refactoring, tests, and documentation when they represent distinct logical changes.
4. Group tightly coupled changes together when separating them would leave the project in an inconsistent or broken state.
5. Every commit should be understandable without examining unrelated commits.

### Example: Portfolio Project Integration

Instead of creating one giant commit:

```text
feat(portfolio): update everything
```

Break the work into logical commits:

```text
feat(projects): register latest portfolio project

feat(projects): prioritize new project in featured ordering

feat(technologies): add project technology icons

style(projects): improve featured project presentation

docs(readme): document latest featured project

docs(llms): update portfolio project discovery metadata

test(projects): verify project registration and ordering
```

The actual number and scope of commits must reflect the real implementation. Do not artificially split tightly coupled changes merely to increase commit counts.

---

## 4. Mandatory Development Workflow

Follow this workflow for every meaningful implementation task.

### Step 1 — Inspect Repository State

Before making changes:

```bash
git status
git branch --show-current
git log -5 --oneline
```

Understand:

- Current branch.
- Existing uncommitted changes.
- Recent commit-message conventions.
- Repository state.
- Whether previous work is incomplete.

**Never assume the working tree is clean.**

Do not overwrite, discard, reset, or commit pre-existing user changes without authorization.

### Step 2 — Implement One Logical Change

- Make a focused modification.
- Follow existing architecture and coding conventions.
- Avoid unrelated refactoring.
- Keep the change independently reviewable.

### Step 3 — Validate the Change

Run relevant checks before committing.

Depending on the change, this may include:

- Unit tests.
- Integration tests.
- Linting.
- Type checking.
- Production build.
- Relevant manual verification.

Do not claim a check passed unless it was actually executed successfully.

### Step 4 — Inspect the Diff

Before staging:

```bash
git diff
git status
```

Review for:

- Unintended modifications.
- Unrelated files.
- Debugging statements.
- Temporary files.
- Exposed credentials or secrets.
- Generated artifacts.
- Formatting inconsistencies.
- Incomplete implementation.

For staged changes, also inspect:

```bash
git diff --cached
```

### Step 5 — Stage Intentionally

Prefer explicitly staging relevant files:

```bash
git add <file-path>
```

Avoid blindly staging the entire repository with:

```bash
git add .
```

Especially when unrelated or user-owned changes are present.

### Step 6 — Commit

Create a descriptive Conventional Commit:

```bash
git commit -m "feat(projects): add featured project showcase"
```

Each commit must represent a validated logical change.

### Step 7 — Verify the Commit

After committing:

```bash
git status
git log -1 --oneline
```

Confirm:

- The intended files were committed.
- The commit message follows the specification.
- No unrelated changes were included.
- The working tree remains in the expected state.

Then proceed to the next logical change.

---

## 5. Git History Quality Standards

Maintain a clean and transparent development history.

The Git log should communicate project progress naturally.

### Good History

```text
feat(guide): introduce interactive onboarding flow
feat(guide): add contextual portfolio navigation
style(guide): improve responsive modal presentation
test(guide): verify onboarding navigation behavior
docs(guide): update portfolio guide documentation
```

### Bad History

```text
update
changes
final
done
fix stuff
more updates
phase complete
latest changes
```

Never use vague messages, even for small changes.

### History Integrity

- Do not rewrite existing shared history without authorization.
- Do not amend previous commits unless explicitly requested or clearly authorized.
- Do not force-push.
- Do not delete branches or tags without authorization.
- Do not use `git reset --hard` or destructive cleanup commands to resolve ordinary working-tree issues.
- Do not hide failed checks or incomplete changes.
- Do not fabricate commits or commit hashes in reports.

---

## 6. Handling Existing User Changes

This is a critical safety requirement.

Before modifying or committing anything, inspect the existing working tree.

If unrelated modifications already exist:

1. Identify them.
2. Preserve them.
3. Do not include them in your commits.
4. Work only on the files and changes relevant to the current task.
5. Report any conflicts that prevent safe implementation.

Never assume all uncommitted changes belong to the current task.

If a task requires modifying a file that already contains user changes, preserve those changes and inspect the complete diff before proceeding.

---

## 7. Commit Scope Guidelines

Use meaningful scopes based on the actual portfolio architecture.

Examples:

| Scope | Typical usage |
|---|---|
| `projects` | Project registry, cards, details, ordering |
| `guide` | Portfolio Guide and onboarding |
| `technologies` | Technology registry and icons |
| `skills` | Skills and expertise sections |
| `navigation` | Navbar, routing, navigation |
| `ui` | Shared UI components |
| `animations` | Motion and transition systems |
| `i18n` | Localization and language support |
| `seo` | Metadata and search optimization |
| `docs` | General documentation |
| `readme` | README.md |
| `llms` | llms.txt |
| `config` | Application configuration |
| `tests` | General test infrastructure |

These are examples, not a mandatory fixed list. Use the most accurate scope for each change.

---

## 8. Testing and Commit Boundaries

A commit must not knowingly introduce a broken application state.

### Required discipline

- Run focused tests after implementing each logical feature.
- Run broader tests when changes affect shared functionality.
- Run the production build after major implementation tasks.
- Keep tests synchronized with relevant functionality.
- Do not commit knowingly failing or incomplete code as a completed feature.

If an existing unrelated test fails:

1. Identify whether the failure predates your changes.
2. Do not silently modify unrelated functionality.
3. Document the failure.
4. Clearly distinguish pre-existing failures from newly introduced failures.

If a change cannot be fully validated, report that limitation honestly before proceeding.

---

## 9. Documentation and Git Consistency

Documentation changes must also follow Conventional Commits.

Examples:

```text
docs(readme): update project showcase
docs(llms): synchronize featured project information
docs(architecture): document component structure
docs(guide): describe onboarding experience
```

When implementation changes affect documented functionality, update relevant documentation in the appropriate logical commit.

Avoid committing documentation that describes features not yet implemented.

---

## 10. Remote Repository Safety

Unless explicitly authorized:

- Do not push commits to GitHub.
- Do not merge branches.
- Do not create pull requests.
- Do not publish releases.
- Do not modify remote repository settings.
- Do not force-push or rewrite remote history.

Local commits are permitted as part of the authorized development workflow, provided existing user changes remain protected.

If remote synchronization is necessary, explain why and request authorization.

---

## 11. Final Git Report

At the end of every development task, provide a concise Git summary.

Include:

### A. Commits Created

| Commit | Type | Description |
|---|---|---|
| Actual short hash | `feat` | Actual commit summary |
| Actual short hash | `fix` | Actual commit summary |

Only report commits that actually exist.

### B. Validation

- Tests: Passed / Failed / Not run.
- Lint: Passed / Failed / Not run.
- Type checking: Passed / Failed / Not run.
- Production build: Passed / Failed / Not run.

### C. Repository State

- Current branch.
- Working tree status.
- Any remaining uncommitted changes.
- Whether commits were pushed.

### D. Outstanding Issues

Clearly identify:

- Failed checks.
- Uncommitted work.
- Pre-existing modifications.
- Any manual actions required.

---

# Non-Negotiable Rules

1. Every commit MUST follow Conventional Commits.
2. Every commit MUST represent a meaningful logical change.
3. Every meaningful change MUST be validated before committing.
4. Always inspect diffs before staging and committing.
5. Never commit unrelated user changes.
6. Never use vague commit messages.
7. Never hide errors or failing tests.
8. Never rewrite history or perform destructive Git operations without authorization.
9. Never push to the remote repository without explicit authorization.
10. Maintain a readable, auditable, professional Git history.

# Definition of Done

A development task is not considered fully completed until:

- Implementation is complete.
- Relevant checks have been executed.
- Changes have been reviewed.
- Logical changes have been committed separately.
- All commit messages follow Conventional Commits.
- Existing user changes remain protected.
- The final Git state is accurately reported.

**Final instruction: Work like a disciplined senior software engineer. Treat every commit as a permanent piece of project history. Prioritize clarity, traceability, code quality, and repository safety over commit speed.**
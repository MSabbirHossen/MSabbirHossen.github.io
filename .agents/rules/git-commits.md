# Master Prompt: Git Commit Discipline & Conventional Commits Enforcement

## 1. Objective

Maintain a clean, professional, transparent, and auditable Git history throughout the entire development lifecycle.

Every meaningful change must be reviewed, staged, and committed separately using the **Conventional Commits specification**.

Do not treat Git commits as a final cleanup activity. Git discipline must be an integral part of the development workflow, from the first modification to the final delivery.

**Core principle: One logical change = One atomic commit.**

The Git history should clearly communicate what changed, why it changed, and how the project evolved.

---

## 2. Mandatory Conventional Commits Format

Every commit message MUST follow this structure:

```text
<type>(<scope>): <short summary in imperative present tense>
```

### Allowed Commit Types

| Type       | Purpose                                                                              |
| ---------- | ------------------------------------------------------------------------------------ |
| `feat`     | Introduce a new feature or functionality                                             |
| `fix`      | Correct a bug or unintended behavior                                                 |
| `refactor` | Restructure code without changing external behavior                                  |
| `style`    | Modify UI styling, formatting, or visual presentation without changing functionality |
| `docs`     | Update documentation, README, guides, or comments                                    |
| `test`     | Add, update, or fix tests                                                            |
| `chore`    | Update tooling, dependencies, configuration, or maintenance tasks                    |
| `perf`     | Improve application performance                                                      |

### Commit Message Examples

```text
feat(projects): add featured project details

feat(guide): introduce interactive onboarding steps

fix(navigation): preserve active route after modal dismissal

refactor(projects): centralize project metadata

style(guide): improve responsive modal layout

test(projects): verify featured project ordering

docs(readme): document portfolio architecture

chore(deps): update development dependencies

perf(images): optimize project thumbnail loading
```

### Commit Message Requirements

- Use lowercase commit types and scopes.
- Use a clear, specific scope representing the affected module or functionality.
- Write concise, meaningful summaries.
- Use imperative present-tense wording.
- Start the summary with an action verb where practical.
- Avoid unnecessary punctuation at the end.
- Keep messages understandable without inspecting the source code.
- Never use vague or generic messages.

### Prohibited Commit Messages

Never use:

```text
update
changes
final
done
fix stuff
misc
cleanup
phase complete
latest update
bug fixes
```

These messages do not communicate meaningful development history.

---

## 3. File-by-File Staging Discipline

**Every file must be reviewed and staged individually.**

Do not blindly stage the entire working directory using:

```bash
git add .
git add -A
git commit -am "update"
```

Instead, follow this process:

1. Inspect the modified files.
2. Identify the logical purpose of each change.
3. Review the contents of each file.
4. Stage individual files using explicit paths.
5. Verify the staged changes.
6. Commit the corresponding logical change.

Example:

```bash
git status --short

git diff -- src/data/projects.js

git add src/data/projects.js

git diff --cached

git commit -m "feat(projects): register latest portfolio project"
```

Repeat this process for other files.

**Important distinction:** File-by-file staging does not mean every file must automatically receive its own commit.

Files that collectively implement one coherent logical change may belong in the same atomic commit, but each file must be individually reviewed and explicitly staged.

If a single file contains multiple unrelated changes, use interactive staging (`git add -p`) to separate the logical changes where practical.

---

## 4. Atomic Commit Rules

Every meaningful change must be committed separately.

### What qualifies as a meaningful change?

Examples include:

- Adding a new component.
- Introducing a new feature.
- Updating project metadata.
- Adding a technology or icon definition.
- Changing featured project ordering.
- Improving a modal or page layout.
- Fixing responsive behavior.
- Updating application navigation.
- Refactoring shared utilities.
- Updating documentation.
- Adding or modifying tests.
- Changing build or deployment configuration.

### Atomic Commit Principles

- One commit should represent one coherent purpose.
- Do not combine unrelated frontend, backend, documentation, and configuration changes.
- Do not accumulate multiple completed tasks into one giant commit.
- Do not create artificial commits for trivial changes that are inseparable from their parent task.
- Preserve dependencies between commits so the history remains understandable.
- Ensure each commit leaves the repository in a valid, understandable state.

If a feature requires several independent steps, commit those steps separately in their natural implementation order.

---

## 5. Mandatory Development Workflow

Follow this workflow continuously.

### Step 1 — Inspect

Before starting a logical task:

```bash
git status --short
git branch --show-current
```

Understand existing modifications before making new ones.

Never overwrite, discard, or commit unrelated user changes without authorization.

### Step 2 — Implement a Small Logical Change

Make one focused modification.

Avoid mixing unrelated tasks.

### Step 3 — Validate

Run the most relevant checks for the change:

- Unit tests.
- Integration tests.
- Linting.
- Type checking.
- Build checks.
- Relevant manual verification.

Do not run unnecessary expensive checks after every tiny edit if a focused check is sufficient. Run the complete required validation before final delivery.

### Step 4 — Review the Diff

Inspect both unstaged and staged changes:

```bash
git diff
git diff --check
git status --short
```

Check for:

- Unintended modifications.
- Debugging statements.
- Temporary files.
- Secrets or credentials.
- Unnecessary formatting changes.
- Unrelated changes.
- Incomplete implementations.

### Step 5 — Stage Files Individually

Explicitly stage each intended file:

```bash
git add path/to/file1
git add path/to/file2
```

Do not stage files that belong to unrelated work.

### Step 6 — Review the Staged Changes

```bash
git diff --cached
git diff --cached --check
git status --short
```

Confirm that the staged changes represent exactly one logical purpose.

### Step 7 — Commit

Create a descriptive Conventional Commit:

```bash
git commit -m "type(scope): describe the meaningful change"
```

### Step 8 — Verify

After committing:

```bash
git status --short
git log -1 --oneline
```

Confirm that the commit succeeded and no unintended changes were included.

Then proceed to the next logical task.

---

## 6. Documentation and Non-Code Changes

Documentation changes must also follow atomic commit discipline.

Examples:

```text
docs(readme): document current portfolio features

docs(llms): describe featured projects and technologies

docs(guide): update portfolio onboarding instructions
```

Do not combine unrelated documentation updates with application feature commits unless they are inseparable parts of the same change.

---

## 7. Git Safety and Repository Protection

The following rules are mandatory:

1. Never use destructive Git commands without explicit authorization.
2. Never overwrite existing uncommitted user work.
3. Never reset, rebase, amend, force-push, or delete branches without authorization.
4. Never commit `.env` files, credentials, private keys, or sensitive information.
5. Respect the existing branch and repository workflow.
6. Do not silently skip failing tests or checks.
7. Do not push to the remote repository unless explicitly authorized.
8. Never rewrite existing commit history merely to make it look cleaner.
9. If unexpected changes appear, investigate before proceeding.
10. If a commit contains an error, report it and follow a safe corrective workflow rather than silently rewriting history.

---

## 8. Handling Multiple Changes and Dependencies

When a task involves multiple files or modules:

1. Identify all affected files.
2. Group them by logical functionality.
3. Determine implementation dependencies.
4. Establish a sensible commit sequence.
5. Implement and validate one logical group at a time.
6. Stage the relevant files individually.
7. Commit each meaningful change separately.

Example: Integrating a new featured project.

```text
feat(projects): register latest portfolio project
feat(projects): add project detail metadata
feat(technologies): register project technology icons
style(projects): enhance featured project presentation
test(projects): verify featured project ordering
docs(readme): document latest featured project
docs(llms): add latest project information
```

These are illustrative commit boundaries. Adapt the actual commits to the real architecture and changes.

Do not create empty or artificial commits just to match an example.

---

## 9. Git History Quality Standards

The Git log must function as a readable development timeline.

A developer, reviewer, or project manager should be able to understand:

- What functionality was introduced.
- Which bugs were corrected.
- Which modules were refactored.
- Which visual improvements were made.
- Which tests were added.
- Which documentation was updated.

The history should demonstrate disciplined engineering practices rather than a collection of arbitrary snapshots.

---

## 10. Final Delivery Report

At the end of the development task, provide:

### A. Commit Summary

List every commit created during the task:

| Commit   | Type    | Scope      | Description                   |
| -------- | ------- | ---------- | ----------------------------- |
| `<hash>` | `feat`  | `projects` | Register latest project       |
| `<hash>` | `style` | `projects` | Improve featured presentation |
| `<hash>` | `docs`  | `readme`   | Update project documentation  |

Use actual commit hashes and messages.

### B. Validation Summary

Report:

- Tests executed and results.
- Lint status.
- Type-check status.
- Production build status.
- Any unresolved issues.

### C. Repository Status

Confirm:

- Current branch.
- Whether the working tree is clean.
- Whether any pre-existing changes remain uncommitted.
- Whether commits were pushed.

Never claim a clean working tree if unrelated or intentionally uncommitted modifications remain.

---

# Non-Negotiable Rules

1. Every meaningful change must be committed separately.
2. Every file must be reviewed and explicitly staged by path.
3. Every commit must follow Conventional Commits.
4. Every commit must have a meaningful, specific message.
5. Never accumulate unrelated work into a giant commit.
6. Review the diff before every commit.
7. Validate changes before committing.
8. Preserve existing user changes.
9. Never push without authorization.
10. Maintain a transparent and understandable Git history.

## Final Instruction

Treat Git discipline as part of the implementation itself, not an optional final step.

**Work incrementally. Review every file. Stage explicitly. Test appropriately. Commit every meaningful logical change separately.**

The quality of the Git history must reflect the same engineering standards as the application code.

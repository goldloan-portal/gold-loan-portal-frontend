# AI Log — gold-loan-portal-frontend

Required by the assignment brief (see `PRODUCT.md` → Submission Deliverables). This log is updated per ticket as work lands (see `CLAUDE.md` → AI Workflow & Prompt Logging), not per message.

## AI tools used

- Claude Code (Sonnet 5), used interactively for the entirety of this repo's work so far.

## Required: 2 exact prompts (form state management or backend validation rules)

**Pending.** No form exists yet — `GLA-2` and `GLA-3` were tooling/documentation tickets (husky, CLAUDE.md, `.claude/` automation), not feature work. This section will be filled in with the exact prompt text once a ticket implementing the 3-step loan intake form (React Hook Form + Zod, per `CLAUDE.md` → Coming soon) lands.

## Required: 1 instance of flawed AI-generated code, caught and fixed

**Pending**, for the same reason — flagged here rather than left silent so it isn't forgotten once real feature work starts.

## Ticket Log

### Pre-ticket — Initial scaffolding

- Prompt: Initialize a frontend React application with TypeScript and Vitest (and a companion Express backend in the sibling repo), before any Jira tickets existed for this project.
- Key decisions: scaffolded via `npm create vite@latest -- --template react-ts`, then added Vitest configured for `jsdom` with `globals: true`; `@testing-library/*` deliberately skipped for now at the user's explicit instruction, to be added once there's a real component worth testing.
- Files: `package.json`, `vite.config.ts`, `tsconfig.app.json`, `src/sample.test.ts`.

### GLA-2 — Setup Husky + lint-staged + commit hooks

- Prompt: Set up Husky pre-commit hooks (lint-staged with ESLint `--fix` + Prettier, plus a whole-project typecheck) in both repos, following the acceptance criteria on the Jira ticket and the conventions found in a pair of reference production repos.
- Key decisions: switched the repo from npm to pnpm and from the Vite-scaffolded `oxlint` to ESLint, to match the reference repos' tooling — both confirmed with the user rather than assumed.
- Files: `package.json`, `eslint.config.mjs`, `.prettierrc`, `.prettierignore`, `.husky/*`, `scripts/*.sh`, `CHANGELOG.md`.

### GLA-3 — Setup CLAUDE.md + AI workflow conventions

- Prompt: Write `CLAUDE.md` documenting stack, component/state-management conventions, and form validation patterns for AI-assisted coding, informed by the same reference repos and by another project's memory of a similar Jira-driven, multi-repo workflow; then extend it with `.claude/` skills (`commit-gla`, `pr-gla`), commands (`/validate`, `/release`, `/test-branch-ui`), instructions files extracted from the reference repo's prose conventions, ADR scaffolding, and a `PRODUCT.md` capturing the actual assignment brief once it was shared.
- Key decisions: TanStack Query (server state), Zustand (client state), and React Hook Form + Zod (forms) are documented as "coming soon" and were deliberately not installed ahead of the ticket that needs them, per explicit user choice — same call made on the backend for Zod/Prisma. After GLA-2's PRs merged, the user explicitly rejected deleting the now-merged branches — branches are kept unless told otherwise.
- Files: `CLAUDE.md`, `.claude/skills/*`, `.claude/commands/*`, `.claude/instructions/*`, `docs/adr/*`, `PRODUCT.md`, `CHANGELOG.md`.

### GLA-6 — Initialize frontend repo (React, TanStack, Zustand, nuqs, zod)

- Prompt: Install and wire up the stack `CLAUDE.md` had documented as "coming soon" (TanStack Query, nuqs, Zustand, React Hook Form + Zod), and add `.env.example`/README setup instructions, per the ticket's acceptance criteria.
- Key decisions: the ticket text listed a folder structure of `src/pages`, which conflicts with `CLAUDE.md`'s already-established feature-based structure (`src/features/<feature>/`, no `pages/`) and its stated policy against creating folders before a real feature needs them. Confirmed with the user rather than guessing: followed `CLAUDE.md` — only `src/lib/queryClient.ts` was created, no empty placeholder folders for `components/ui`, `features`, `hooks`, or `types`. Zustand and React Hook Form + Zod are installed but have no store/schema yet, since none is needed until a real feature lands — consistent with the same "don't build ahead of the ticket that needs it" call made in GLA-3.
- Files: `package.json`, `pnpm-lock.yaml`, `src/main.tsx`, `src/lib/queryClient.ts`, `.env.example`, `.gitignore`, `README.md`, `CLAUDE.md`, `.claude/instructions/state-management.md`, `.claude/instructions/forms.md`, `CHANGELOG.md`.

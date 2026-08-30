# AI Log — gold-loan-portal-frontend

Required by the assignment brief (see `PRODUCT.md` → Submission Deliverables). This log is updated per ticket as work lands (see `CLAUDE.md` → AI Workflow & Prompt Logging), not per message.

## AI tools used

- Claude Code (Sonnet 5), used interactively for the entirety of this repo's work so far.

## Required: 2 exact prompts (form state management or backend validation rules)

1. "Using the dev workflow and the worktree, implement GLA-19" — the Jira ticket (`Step 1 — Customer & Gold Details Form`, covering `GLA-20`) supplied the field list and validation rules; the AI fetched both tickets, read the backend's `createLeadSchema` (`gold-loan-portal-api/src/schemas/lead.schema.ts`) to mirror its validation exactly, and implemented the form with React Hook Form + Zod.
2. "Use shadcn ui components and improve the UI" — mid-implementation redirect from a hand-rolled `TextField`/`SelectField` pair to shadcn/ui's `Input`/`Label`/`Select`/`Form` primitives, which required installing Tailwind CSS v4 and shadcn/ui and reworking the form and page layout on top of them.

## Required: 1 instance of flawed AI-generated code, caught and fixed

`z.coerce.number()` fields (`grossWeightGrams`, `netWeightGrams`, `purityKarat`) broke `useForm`'s type inference: the schema's _input_ type (pre-coercion, effectively `unknown`) and _output_ type (post-coercion `number`) diverged, and passing a single inferred type to `useForm` produced `tsc` errors on the resolver and `onSubmit` handler. Fixed by exporting both `CustomerGoldDetailsFormInput` (`z.input<...>`) and `CustomerGoldDetailsFormValues` (`z.output<...>`) from the schema file and wiring `useForm<Input, unknown, Values>`'s three generics accordingly — caught immediately by `tsc -b --noEmit` failing, not by manual inspection.

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

### GLA-19 — Step 1: Customer & Gold Details Form (covers GLA-20)

- Prompt: Implement the first step of the loan intake flow (customer name, mobile number, gross/net weight, purity dropdown) via the worktree-based ticket workflow, validated client-side to mirror the backend's Zod rules; mid-session, redirected to rebuild the UI on shadcn/ui instead of hand-rolled form components, then to wire up React Router with a per-feature `pages/` folder.
- Key decisions: read the backend's `createLeadSchema` directly to mirror its validation messages and rules (10-digit mobile regex, positive weights, 18/22/24 purity) plus an added `netWeightGrams <= grossWeightGrams` cross-field check for the "blocks progression" acceptance criterion. Initially built hand-rolled `TextField`/`SelectField` primitives plus Testing Library coverage; the user then asked to drop tests for now (removed, along with the Testing Library install and Vitest `setupFiles` wiring, rather than leaving now-unused devDependencies/config around) and to rework the UI on shadcn/ui — installed Tailwind CSS v4 + shadcn/ui (`radix-nova` style, Radix base), replaced the hand-rolled fields with shadcn's `Input`/`Label`/`Select`/`Form`/`Card`/`Button`, and set a gold/amber `--primary` brand token. shadcn's CLI `init`/`add` workspace-detection failed under this repo's nested worktree path (`worktrees/GLA-19/...`) with "Could not load the workspace config"; worked around it by adding the `@/*` alias to the root `tsconfig.json` (not just `tsconfig.app.json`) rather than fighting the CLI further, and hand-wrote `src/components/ui/form.tsx` (RHF/Zod `Form` wrapper) since `shadcn add form` silently resolved to nothing on this CLI version. Added a scoped `eslint.config.mjs` override disabling `react-refresh/only-export-components` for `src/components/ui/**`, since shadcn's own generated files co-locate variant/hook exports with components by convention. Moved the `shadcn` CLI package to `devDependencies` (the init command had added it to `dependencies`) since it's only ever invoked via `pnpm dlx`/`pnpm exec`, never imported at runtime. Installed `react-router` (the unified v8 package, not the separate `react-router-dom`) and moved the page content out of `App.tsx` into `src/features/lead-intake/pages/CustomerGoldDetailsPage.tsx` — `App.tsx` is now only the `BrowserRouter`/`Routes` shell — establishing `features/<feature>/pages/` as the convention for route-level screens, documented in `CLAUDE.md`.
- Files: `src/features/lead-intake/`, `src/components/ui/`, `src/App.tsx`, `src/index.css`, `src/lib/utils.ts`, `components.json`, `eslint.config.mjs`, `tsconfig.json`, `tsconfig.app.json`, `vite.config.ts`, `package.json`, `pnpm-lock.yaml`, `CLAUDE.md`, `CHANGELOG.md`.

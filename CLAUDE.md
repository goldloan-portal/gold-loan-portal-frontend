# gold-loan-portal-frontend

Vite + React 19 + TypeScript SPA for the Gold Loan Portal. This document is the reference for AI-assisted coding (Claude Code, Cursor, Copilot) on this repo — read it before generating code so the output matches how the rest of the codebase is built. Read [PRODUCT.md](PRODUCT.md) first for what's actually being built — the assignment brief, domain formulas, and the 3-step frontend flow.

## Stack

- Vite, React 19, TypeScript (`~6.0.2`).
- Vitest (`jsdom` environment, `globals: true`) for tests — see `vite.config.ts`. Test files are colocated as `*.test.ts`/`*.test.tsx` next to the code they cover.
- Package manager: **pnpm** (pinned via `packageManager` in `package.json`). Don't use `npm`/`yarn` in this repo.
- Lint/format/hooks: ESLint (flat config, React hooks + refresh plugins), Prettier, Husky, lint-staged. See `.husky/*` and `CHANGELOG.md` for what's enforced.
- **Server state: TanStack Query.** `QueryClientProvider` wraps the app in `main.tsx`, backed by the single `queryClient` instance in `src/lib/queryClient.ts`. Anything that comes from the API — loan records, customer lookups, gold rate data — is a query or mutation, never fetched in a `useEffect` and stored in local/component state. Query keys live in one `queryKeys.ts` per feature (once a feature exists). One mutations file per feature centralizes invalidations — a mutation that changes data must invalidate every query it affects.
- **URL query-param state: nuqs.** `NuqsAdapter` wraps the app in `main.tsx`, inside the query client provider.
- **Client state: Zustand.** Reserved for state that isn't server data and isn't local to one component — e.g. the active branch/session, a multi-step form's in-progress values. If it comes from the API, it's a query, not a store. If it's only used by one component and its children, it's `useState`, not a store. No store exists yet — add the first one in the ticket that actually needs global client state.
- **Forms: React Hook Form + Zod**, via `@hookform/resolvers`. Schema colocated with the feature (`<feature>/<feature>.schema.ts`), shared with the corresponding API call's expected shape where the two overlap. Mapping form values to an API payload is a small function in the feature's own service/mapper file — not inline in the component or the submit handler. No form exists yet — add the first schema in the ticket that needs it.

### Coming soon (not installed yet)

Committed choices, not yet wired up. Add each in the ticket that actually needs it rather than ahead of time, and follow the convention below from that point on.

- **Testing Library** (`@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`) — add these once there's an actual component worth testing beyond a sanity check; Vitest itself is already configured and ready.

## Folder Structure

Right now everything lives flat in `src/` (`App.tsx`, `main.tsx`, one sample test) — there's no real feature yet. Once one lands, components are organized by feature, not by file type:

```
src/
  components/
    ui/                        # small shared primitives (Button, Input, Modal) with no feature logic
  features/
    <feature>/
      components/               # components used only by this feature
      <feature>.schema.ts        # Zod schemas for this feature's forms/inputs
      <feature>.service.ts       # API calls + form-to-payload mapping for this feature
      queryKeys.ts                # TanStack Query keys for this feature (once added)
      use<Feature>Mutations.ts    # mutation hooks + their invalidations (once added)
  hooks/                        # hooks shared across more than one feature
  lib/                          # API client instance, other cross-cutting setup
  types/                        # shared TS types not owned by a single feature
  App.tsx
  main.tsx
```

A feature component never makes an API call directly — it goes through that feature's `.service.ts`, called from a query/mutation hook.

## Patterns Claude Must Follow

Granular, enforced conventions live in `.claude/instructions/*.md` — treat them as mandatory for every edit to a matching file.

@.claude/instructions/component-conventions.md
@.claude/instructions/state-management.md
@.claude/instructions/forms.md
@.claude/instructions/date-display.md

## Environment Variables

Vite env vars are prefixed `VITE_` and read via `import.meta.env`. Keep `.env.example` in sync with every key `.env` defines (no real values in the example file).

## Git, Commits & Releases

- Branch off `dev`: `feature/GLA-<n>-<title>`, `bugfix/GLA-<n>-<title>`, `hotfix/GLA-<n>-<title>`, `chore/GLA-<n>-<title>` (tooling/docs/config, no behavior change).
- Commit messages: `<type>: [GLA-<n>] <description>` on feature/bugfix/hotfix/chore branches — the `commit-msg` hook checks the ticket number also shows up in the branch name. On `main`/`dev` directly, only a conventional type prefix is required (`chore: release v0.2.0`).
- `pnpm lint-staged` + `tsc -b --noEmit` + a CHANGELOG-section check run on every commit; lint + prettier check run on every push. See `.husky/pre-commit` and `.husky/pre-push`.
- Every user-facing change gets a `CHANGELOG.md` entry under `## [Unreleased]`, tagged `[GLA-<n>]`. Never add an entry to an already-released version section.

## PR & Merge Workflow

1. Get the ticket link before running `gh pr create` if it hasn't been given.
2. Branch name and PR title share the ticket number. PR title: `<Category>: GLA-<n> <human-readable title>`, category from the branch prefix (`feature/` → `Feature:`, `bugfix/` → `Bugfix:`, `hotfix/` → `Hotfix:`, `chore/` → `Chore:`).
3. PR description is just a `## Summary` section (bullets), ticket link as the first line above it. No test plan, no checklist, no AI-generated footer.
4. Base branch is `dev`. Assignee is always `--assignee @me`.
5. Merging: pass an explicit conventional-commit `--subject` to `gh pr merge` (don't let GitHub auto-generate the merge title) — `<type>: [GLA-<n>] <imperative title>`, `<type>` mapped the same way as commit types (`Feature:`→`feat`, `Bugfix:`/`Hotfix:`→`fix`, `Chore:`→`chore`). Default to `--merge`; `--squash` only if asked.
6. When a change spans `gold-loan-portal-frontend` and `gold-loan-portal-api`, raise PRs in both with the same GLA number, title, and ticket link. Merge the API first — the frontend consumes its response contract.

## AI Workflow & Prompt Logging

This project is built with AI-assisted coding. To keep an honest record of what the AI actually did (for later compilation into `AI_LOG.md` at the repo root), log one entry per ticket once its work has landed — not per message, per clarifying question, or per read-only exploration.

Entry format (append to `AI_LOG.md` when it is created):

```markdown
### GLA-<n> — <ticket title>

- Tool: Claude Code / Cursor / Copilot
- Prompt: <1-2 sentence paraphrase of what was asked>
- Key decisions: <any non-obvious choice the AI made, or the user directed, worth remembering>
- Files: <top-level paths changed>
```

Only log prompts that produced a change which actually merged. A ticket revisited across multiple sessions gets one entry, updated — not one per session.

## Known Issues / Notes

- No routing library yet — a single `App.tsx` with no navigation. Add one (e.g. React Router) when a second screen exists.
- No API client wired up yet — `VITE_API_BASE_URL` is defined in `.env.example` for when one lands.
- No authentication yet.
- No design system/shared UI primitives yet — `components/ui/` is a placeholder until the first one is needed.

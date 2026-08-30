---
description: gold-loan-portal-frontend verification pipeline — lint, typecheck, build, prettier check, tests. Run before commit-gla/pr-gla, or any time you want evidence the branch is clean.
argument-hint: (no arguments)
allowed-tools: Bash(pnpm:*), Bash(git:*)
---

# /validate — gold-loan-portal-frontend

Canonical health check for this repo. Run every step in order; stop at the first failure and show the exact command + output, don't guess at what broke. Never claim "passes" without the command output to back it.

## Steps

1. **Lint (mutates)**: `pnpm run lint` — runs `eslint . --fix`. This can modify files; re-check `git status` after.
2. **Typecheck**: `pnpm run typecheck` — `tsc -b --noEmit`.
3. **Build**: `pnpm run build` — `tsc -b && vite build`. Delete the resulting `dist/` afterward; it's a build artifact, not something to leave sitting in the working tree.
4. **Format check**: `pnpm run prettier:check`. If it fails, run `pnpm run prettier:format` and re-check — don't hand-fix formatting.
5. **Tests**: `pnpm run test` — `vitest run`. Component tests need `@testing-library/react` etc., which aren't installed yet (see `CLAUDE.md` → Coming soon); until then this only runs whatever plain Vitest specs exist.

## After all steps pass

- `git status` — confirm only the changes you intended are present (lint --fix may have touched files beyond what you edited; review before staging).
- If this branch's diff against `dev` includes anything beyond docs/tooling, confirm `CHANGELOG.md` has a bullet under `## [Unreleased]` before moving on to `commit-gla` / `pr-gla` — `pr-gla` requires it before opening the PR anyway, but catching it here saves a round trip.

## On failure

Fix the root cause in the source, not by loosening a lint rule or adding a suppression comment, unless the rule itself is wrong for the situation — and say so explicitly if you go that route rather than silently adding `// eslint-disable`.

# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Each entry references the Jira ticket (`GLA-XXX`) that introduced the change.

## [Unreleased]

<!-- New entries go here. Never add to a released version section below: a release
     cut while your PR is open renames this heading, and entries written against the
     old one land in a version that never shipped them. -->

### Added

- [GLA-2] Husky pre-commit/commit-msg/pre-push hooks, lint-staged, ESLint, and Prettier set up to enforce code quality and conventional, ticket-tagged commit messages.
- [GLA-3] `CLAUDE.md` documenting stack, folder structure, component conventions, git/PR conventions, and AI prompt-logging conventions.
- [GLA-3] `.claude/skills/commit-gla` and `.claude/skills/pr-gla` — husky-compliant conventional commit and PR-creation automation. `.claude/commands/validate.md` (lint/typecheck/build/prettier/test pipeline) and `.claude/commands/release.md` (dev → main release across both repos).
- [GLA-3] `.claude/commands/test-branch-ui.md` — manual QA checklist generator for the current feature branch, diff-aware, writes no file.
- [GLA-3] `.claude/instructions/` — enforced conventions for component structure, state management (TanStack Query/Zustand), forms (React Hook Form + Zod), and date display, referenced from `CLAUDE.md`.
- [GLA-3] `docs/adr/` — Nygard-template ADR scaffolding (`README.md` index + `0000-template.md`).
- [GLA-4] GitHub Actions CI (`.github/workflows/ci.yaml`): install, lint, prettier check, typecheck, test, build on every PR into `dev`/`main` and every push to `main`. `changelog-guard.yaml` reuses `scripts/check-changelog-section.sh` to gate PRs into `dev`.
- [GLA-4] `README.md` replaced with real setup instructions, script table, and a CI status badge (was still the stock Vite template).
- [GLA-6] TanStack Query, nuqs, Zustand, Zod, React Hook Form, and `@hookform/resolvers` installed and wired up — `QueryClientProvider`/`NuqsAdapter` in `main.tsx`, `queryClient` instance in `src/lib/queryClient.ts`.
- [GLA-6] `.env.example` with `VITE_API_BASE_URL`; `.env` gitignored.
- [GLA-6] `README.md` env setup step and variable table.
- [GLA-19] Step 1 — Customer & Gold Details form (covers GLA-20): customer name, mobile number, gross/net weight, and purity karat fields, validated with React Hook Form + Zod mirroring the backend's `createLeadSchema` rules (10-digit mobile format, net weight ≤ gross weight), blocking progression until every field is valid.
- [GLA-19] Tailwind CSS v4 + shadcn/ui (`radix-nova` style) installed and wired up — `Button`, `Input`, `Label`, `Select`, `Card`, and `Form` primitives in `src/components/ui/`, `@/*` import alias, gold/amber brand accent in `src/index.css`.

### Changed

### Fixed

### Removed

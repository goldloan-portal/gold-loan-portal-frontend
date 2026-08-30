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
- [GLA-19] React Router (`react-router`) installed and wired up — `App.tsx` is now a `BrowserRouter`/`Routes` shell, `/` renders `features/lead-intake/pages/CustomerGoldDetailsPage.tsx`, establishing a `features/<feature>/pages/` convention for route-level screens.
- [GLA-21] Step 2 — Loan Calculator & Scheme Selection (covers GLA-22 + GLA-23), routed at `/loan-calculator`: live pure-gold-weight/max-eligible-loan estimate from `POST /api/v1/leads/calculate` as gross/net/purity change (400ms debounced, backend is the single source of truth — nothing computed client-side), and selectable loan-plan cards fetched from `GET /api/v1/loan-schemes` via TanStack Query. Selection stored in a new `leadIntakeStore` (Zustand) alongside step 1's submitted details, shared across both pages for step 3. Redirects to `/` if step 2 is opened without step 1's data.
- [GLA-21] `src/lib/apiClient.ts` — first API client, thin `fetch` wrapper matching the backend's `{ data }` / `{ error }` envelope, throwing a typed `ApiError`. `.env` created locally from `.env.example` (`VITE_API_BASE_URL`).
- [GLA-21] `src/hooks/useDebouncedValue.ts` — generic debounce hook, first addition to `src/hooks/`.
- [GLA-24] Step 3 — Submit & Confirmation (covers GLA-25 + GLA-26), routed at `/review`: a TanStack Query mutation wired to `POST /api/v1/leads/submit`, showing a review summary before submit and a confirmation view (Application ID, masked mobile, plan, loan amount, "Start a New Application") immediately after success. `400` (field-level `ValidationError`) and `409` (`DuplicateLeadError`) responses are surfaced inline without crashing the app.
- [GLA-24] `Loan Calculator` page gains a "Continue" action (enabled once a plan is selected and a live estimate exists) that carries the last calculation and any in-page weight edits into the shared `leadIntakeStore` for step 3.

### Changed

- [GLA-21] `customerGoldDetailsSchema`'s gross/net/purity fields extracted into a shared `goldWeightFields` object (mirroring the backend's `lead.schema.ts`) so the new `goldCalculatorSchema` can reuse them without drift; the gross/net/purity `FormField` markup itself extracted into `GoldWeightFields`, shared between `CustomerGoldDetailsForm` and the new loan calculator.

### Fixed

### Removed

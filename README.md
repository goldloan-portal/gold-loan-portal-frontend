# gold-loan-portal-frontend

![CI](https://github.com/goldloan-portal/gold-loan-portal-frontend/actions/workflows/ci.yaml/badge.svg)

Vite + React 19 + TypeScript frontend for the Gold Loan Portal. See [PRODUCT.md](PRODUCT.md) for what this application does and [CLAUDE.md](CLAUDE.md) for its technical conventions.

## Prerequisites

- Node.js 24+
- [pnpm](https://pnpm.io/) 10+ (`corepack enable` will pick up the version pinned in `package.json`)

## Setup

```bash
pnpm install
cp .env.example .env
pnpm dev
```

The dev server starts on Vite's default port (`5173`).

## Environment Variables

| Variable            | Purpose                                       |
| ------------------- | --------------------------------------------- |
| `VITE_API_BASE_URL` | Base URL of the `gold-loan-portal-api` server |

Keep `.env.example` in sync with every key `.env` defines — no real values in the example file.

## Running the Full Stack Locally

This app is the UI half of the Gold Loan Portal — it needs the sibling [`gold-loan-portal-api`](../gold-loan-portal-api) repo running alongside it for any screen that hits the network (all of them).

1. Start the API first (see its own `README.md` → Setup) — it defaults to `http://localhost:4000`.
2. Set `VITE_API_BASE_URL` in this repo's `.env` to that same URL (already the default in `.env.example`).
3. Start this app: `pnpm dev` — defaults to `http://localhost:5173`.
4. Open `http://localhost:5173` — step 1 (`/`) is the intake form, `/loan-calculator` and `/review` are steps 2–3, `/admin` is the leads dashboard.

The API's CORS is currently unrestricted (see its `CLAUDE.md` → Known Issues), so no extra configuration is needed to call it from a different port.

## Scripts

| Command                | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `pnpm dev`             | Start the Vite dev server                     |
| `pnpm build`           | Typecheck (`tsc -b`) and build for production |
| `pnpm preview`         | Preview the production build locally          |
| `pnpm test`            | Run the Vitest suite once                     |
| `pnpm test:watch`      | Run Vitest in watch mode                      |
| `pnpm typecheck`       | Typecheck only, no build                      |
| `pnpm lint`            | ESLint, with `--fix`                          |
| `pnpm prettier:check`  | Check formatting without writing              |
| `pnpm prettier:format` | Write formatting fixes                        |

## Development Process

This project was built ticket-by-ticket in Jira (project key `GLA`), following a lightweight Agile workflow: each unit of work is a Jira story/task with its own acceptance criteria, implemented on its own `feature/GLA-<n>-*` branch, and shipped through a dedicated PR back into `dev` — commit messages and CHANGELOG entries are tagged with their ticket number (`[GLA-<n>]`) so any change can be traced back to the ticket that drove it.

## Documentation

- [PRODUCT.md](PRODUCT.md) — the assignment brief this project fulfills: domain formulas, required API surface, evaluation criteria.
- [CLAUDE.md](CLAUDE.md) — stack, folder structure, and conventions for AI-assisted coding on this repo.
- [AI_LOG.md](AI_LOG.md) — log of AI-assisted work on this repo (mandatory assignment deliverable).
- [CHANGELOG.md](CHANGELOG.md) — notable changes, Keep a Changelog format.

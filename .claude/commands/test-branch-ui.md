---
description: Generate a manual QA checklist for the current gold-loan-portal-frontend feature branch — diff-aware, executes nothing, writes no file
argument-hint: (no arguments)
allowed-tools: Bash(git:*), Read, Grep, Glob
---

# Frontend Feature-Branch QA Checklist

This is **not** a test runner — it never opens a browser, never automates a click, and never writes a file. It reads the diff and hands the user a checklist to walk through by hand against the running dev server.

## Overview

1. Diff the current branch against `origin/dev`.
2. Map each changed component/page to the UI states worth checking by hand.
3. Print the checklist in chat.
4. Ask the user to run `pnpm dev` (if not already running) and walk through it.

## Phase A — Scope Discovery

A.1. Confirm working in `gold-loan-portal-frontend`: `git rev-parse --show-toplevel`.

A.2. Capture the diff:

```bash
git branch --show-current
git diff --stat origin/dev...HEAD
git diff --name-only origin/dev...HEAD -- 'src/**'
```

A.3. Read every changed component/page fully (not just a grep excerpt) to understand what actually changed — conditional rendering, new props, new form fields, new states.

## Phase B — Build the Checklist

For each changed component, derive concrete manual-check items from what the diff actually does — don't emit a generic template unrelated to the change. Draw from what's present in the code:

- **New or changed conditional rendering** → one checklist item per branch (loading, empty, error, populated — only the ones the component actually has).
- **New or changed form** → required-field validation messages, submit-disabled state while invalid, what happens on successful submit, what happens on a rejected submit (once mutations exist — see `.claude/instructions/state-management.md`).
- **New or changed props with a default** → one item confirming the default renders sensibly when the prop is omitted.
- **Anything reading `import.meta.env`** → confirm behavior with and without the variable set, if that's a real code path.
- **Layout/CSS-only changes** → visually confirm at a narrow and a wide viewport.

If a changed file has no user-visible surface (a type file, a pure util, a config change), say so and don't manufacture a checklist item for it.

## Phase C — Present

```
━━━ Manual QA Checklist — <branch> ━━━

<Component/page A>
  [ ] <item>
  [ ] <item>

<Component/page B>
  [ ] <item>

Not covered here (needs its own verification):
  - <e.g. anything behind a real backend integration not yet wired up>
```

Ask the user to confirm each item against `pnpm dev` and report back anything that didn't match. Never write this checklist to a file — it's a one-time conversation artifact, not documentation.

## Hard Rules

1. **No browser automation.** No Playwright, no Puppeteer, no headless anything — this command produces a checklist, not a test run.
2. **No file writes.** The checklist lives in chat only.
3. **No generic boilerplate.** Every item traces to something the diff actually changed — if a component's diff is trivial, its checklist is short or empty.

## Example Invocation

```
/test-branch-ui
```

When invoked, move straight to Phase A.

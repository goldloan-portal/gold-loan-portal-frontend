---
description: Displaying date fields from the API — wall-clock stability. Applies once the first date-bearing field lands.
applyTo: 'src/features/**/*.tsx'
---

# Date Display

No date-bearing field is rendered anywhere yet — this is the rule for when one is (a loan's issue date, due date, a gold rate's as-of date), so it isn't improvised per-component later.

## Calendar Dates Must Render Identically for Every Viewer

A calendar date — a loan's issue date or due date — is what someone wrote down, e.g. "10 May 2026." It has no time-of-day and no timezone, and it must look the same on every viewer's screen regardless of their browser's local timezone.

`new Date(iso).toLocaleDateString()` (or `.toLocaleString()`, or reading `.getDate()`/`.getMonth()` off a `Date` built from an ISO string) renders in the _browser's_ local timezone. For a calendar-date value serialized as, say, `2026-05-10T00:00:00.000Z`, a viewer west of UTC can see "9 May" — a real, silent off-by-one.

## Forbidden Patterns

- `someDate.toLocaleDateString()` / `.toLocaleString()` on a calendar-date field.
- `format(new Date(iso), ...)` (date-fns or similar) without first confirming the field is an instant, not a calendar date.
- Any local-TZ accessor (`.getDate()`, `.getMonth()`, `.getDay()`) on a calendar-date value — use the UTC accessor (`.getUTCDate()`, etc.) or slice the ISO string directly, never both a local accessor and a UTC-serialized value.

## Required

Format a calendar-date field from its UTC components (via UTC accessors, or by slicing the `YYYY-MM-DD` prefix directly off the ISO string) — never through a local-timezone formatter. An audit timestamp (`createdAt`, `paidAt`) is a real instant and is fine to render in the viewer's own local timezone — the distinction between the two is the same one drawn in the backend's `.claude/instructions/date-time.md`.

---
description: Server vs client state — TanStack Query vs Zustand, mutation error handling
applyTo: 'src/features/**/*.ts, src/features/**/*.tsx'
---

# State Management

(Applies once TanStack Query and Zustand are installed — see the root `CLAUDE.md` → Coming soon. These are the rules to follow from that point on.)

## Decision Checklist

Before reaching for `useState`, a Zustand store, or a query, ask in this order:

1. **Does it come from the API?** → TanStack Query. Never fetch in a `useEffect` and stash the result in local or Zustand state — that's a second, driftable copy of server data.
2. **Is it used by more than one component that isn't a parent/child pair?** → Zustand.
3. **Otherwise** → local `useState` in the component that owns it.

## Server State

- One `queryKeys.ts` per feature, all of that feature's query keys defined there — don't inline a key array at the call site.
- One `use<Feature>Mutations.ts` per feature centralizing its mutation hooks. Every mutation that changes data invalidates every query it affects — check `queryKeys.ts` before writing a new mutation so nothing is missed.
- PATCH-style mutations send only the changed fields, never the full record.

## Client State (Zustand)

Reserved for state that is genuinely global-but-not-server-owned — e.g. the active branch/session context, an in-progress multi-step form. If it can be derived from a query result, it isn't Zustand state — derive it at render time instead of copying it into a store.

## `mutate` vs `mutateAsync`

`mutate()` never rejects — errors only reach the mutation's own `onError`. `mutateAsync()` routes to `onError` **and** returns a rejected promise; an uncaught rejection becomes an unhandled promise rejection even though the user already saw the error surfaced through `onError`.

Reach for `mutateAsync` only when the resolved value is needed, or a second async call must be sequenced after success. When you do, the rejection must be handled — `try { await mutateAsync(...) } catch (error) { /* handle */ }` — never left to reject silently. `try/finally` does not consume the rejection; `finally` runs and the promise still rejects.

## Toasts, Not `alert()`

Once a toast library is chosen, use it for every user-facing mutation outcome (success and failure). Never `alert()` or a bare `console.error` as the only user-visible feedback for a failed action.

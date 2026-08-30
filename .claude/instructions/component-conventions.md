---
description: Component structure — one component per file, explicit props, composition over flags
applyTo: 'src/**/*.tsx'
---

# Component Conventions

## One Component Per File

A file exports one component. A small subcomponent used only by its parent and never reused can live in the same file; the moment a second place wants it, give it its own file in the same folder.

## Explicit Props

Every component's props are typed with an interface or type alias — never inferred, never `any`.

```typescript
// ✅ Correct
interface LoanCardProps {
  loanId: string;
  amount: number;
  onSelect?: (loanId: string) => void;
}

function LoanCard({ loanId, amount, onSelect }: LoanCardProps) {}

// ❌ Wrong — no prop type
function LoanCard({ loanId, amount, onSelect }) {}
```

## Composition Over Boolean Mode Flags

A boolean prop that switches a component's rendering mode (`isCompact`, `isReadOnly`, `variant: 'a' | 'b'` used to branch the whole render) is a sign the component is doing two jobs. Prefer composing two smaller components, or passing the varying part as `children`/a render prop, over branching internally on a flag.

```typescript
// ❌ Wrong — one component, two render paths gated by a flag
function LoanRow({ loan, isEditable }: { loan: Loan; isEditable: boolean }) {
  return isEditable ? <EditableLoanRow loan={loan} /> : <ReadOnlyLoanRow loan={loan} />;
}

// ✅ Correct — caller picks the component it needs
<EditableLoanRow loan={loan} />
<ReadOnlyLoanRow loan={loan} />
```

A prop that toggles a small, genuinely cosmetic detail (`size="sm" | "lg"` on a shared `Button`) is fine — the rule is about a flag that forks the component's entire rendering logic, not any boolean prop at all.

## Placement

- `components/ui/` — small shared primitives with no feature logic (a `Button`, an `Input`). No feature ever imports from another feature's folder to reuse one of these; if two features need the same primitive, it belongs in `components/ui/`.
- `features/<feature>/components/` — components used only by that feature.
- A component moves from a feature folder to `components/ui/` the moment a second feature needs it — not before, on the guess that it might.

## Check Before Writing

Before creating a new component, check `components/ui/` and the target feature's own `components/` folder for one that already does this.

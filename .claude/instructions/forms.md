---
description: Form conventions — React Hook Form + Zod, where form-to-API mapping lives
applyTo: 'src/features/**/*.ts, src/features/**/*.tsx'
---

# Forms

React Hook Form and Zod are installed — see `CLAUDE.md` → Stack.

## Schema Placement

One Zod schema file per feature (`features/<feature>/<feature>.schema.ts`). Where the form's shape overlaps the API's expected request shape, share the schema rather than hand-duplicating field lists that can drift apart.

## Form → API Mapping Is a Service Concern

A form component or its submit handler never builds the API payload inline. Form values go, as-is, to a small mapper/service function in the feature's own `<feature>.service.ts`; that function returns the payload the mutation actually sends.

```typescript
// ❌ Wrong — payload shaping inline in the component
function onSubmit(values: LoanFormValues) {
  createLoan({ ...values, amount: Number(values.amount) });
}

// ✅ Correct — mapping lives in the feature's service file
function onSubmit(values: LoanFormValues) {
  createLoan(toCreateLoanPayload(values));
}
```

## Partial Updates

An edit form's submit always sends only the fields that changed — never the full form state — once a PATCH-style mutation exists to send it to.

## Filter/Reset State Is `undefined`, Not Empty String

A cleared filter field's value is `undefined`, not `""`. An empty string is a real (if unusual) filter value; `undefined` unambiguously means "no filter." Where a type demands a string, use `undefined as unknown as string` rather than reaching for `""` as the reset value.

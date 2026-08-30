export const leadIntakeQueryKeys = {
  loanSchemes: ['loan-schemes'] as const,
  calculate: (input: unknown) => ['leads', 'calculate', input] as const,
};

const inrCurrencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

export function formatCurrencyINR(amount: number): string {
  return inrCurrencyFormatter.format(amount);
}

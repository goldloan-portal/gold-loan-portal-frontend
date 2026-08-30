const inrCurrencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

export function formatCurrencyINR(amount: number): string {
  return inrCurrencyFormatter.format(amount);
}

export function maskMobileNumber(mobileNumber: string): string {
  return `${mobileNumber.slice(0, 4)}XXXX${mobileNumber.slice(-2)}`;
}

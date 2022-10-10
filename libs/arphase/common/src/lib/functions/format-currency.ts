export function formatCurrency(currency: number): string {
  const dollarUSLocale = Intl.NumberFormat('en-US');
  return `$${dollarUSLocale.format(currency)}`;
}

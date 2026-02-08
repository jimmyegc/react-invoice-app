export function formatCurrency(
  value: number | string,
  currency: 'MXN' | 'USD' | 'EUR' = 'MXN',
  locale: string = 'es-MX'
): string {
  const number = Number(value);

  if (Number.isNaN(number)) return '$0.00';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}

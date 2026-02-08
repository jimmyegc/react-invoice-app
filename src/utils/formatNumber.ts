export function formatNumber(
  value: number | string,
  options?: Intl.NumberFormatOptions,
  locale: string = 'es-MX'
): string {
  const number = Number(value);

  if (Number.isNaN(number)) return '0.00';

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);
}

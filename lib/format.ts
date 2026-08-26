const rub = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

const num = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });

/** Format a value as roubles, e.g. 1 350 000 ₽. */
export function formatPrice(value: number): string {
  return rub.format(Math.round(value));
}

/** Format a plain integer with thin grouping, e.g. 62. */
export function formatNumber(value: number): string {
  return num.format(value);
}

/** Format the low–high price range, e.g. "1 350 000 – 1 640 000 ₽". */
export function formatRange(min: number, max: number): string {
  return `${formatPrice(min)} – ${formatPrice(max)}`;
}

/** Compact roubles for tight UI, e.g. "1,5 млн ₽". */
export function formatCompact(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    const text = m >= 10 ? Math.round(m).toString() : m.toFixed(1).replace(/\.0$/, '');
    return `${text} млн ₽`;
  }
  if (value >= 1_000) {
    return `${Math.round(value / 1000)} тыс ₽`;
  }
  return formatPrice(value);
}

/** Timeline label, e.g. "10–13 недель". */
export function formatTimeline(minWeeks: number, maxWeeks: number): string {
  if (minWeeks === maxWeeks) return `${minWeeks} недель`;
  return `${minWeeks}–${maxWeeks} недель`;
}

/** Round to the nearest thousand roubles. */
export function roundThousands(value: number): number {
  return Math.round(value / 1000) * 1000;
}

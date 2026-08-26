import { EXTRA_WORKS, getApartmentMeta, getCityMeta, getConditionMeta, getRepairMeta } from './constants';
import { formatPrice, formatRange, formatTimeline } from './format';
import type { CalculatorState, CalculationResult, ExtraKey } from './types';

const selectedExtras = (state: CalculatorState): string[] =>
  EXTRA_WORKS.filter((e) => state.extras[e.id as ExtraKey]).map((e) => e.label);

/** Plain-text estimate matching the brief (section 32) copy format. */
export function buildEstimateText(state: CalculatorState, result: CalculationResult): string {
  const lines = [
    'РемСмета — предварительный расчёт',
    '',
    `Тип квартиры: ${getApartmentMeta(state.apartmentType).label}`,
    `Площадь: ${state.area} м²`,
    `Тип ремонта: ${getRepairMeta(state.repairType).label.toLowerCase()}`,
    `Состояние: ${getConditionMeta(state.condition).label.toLowerCase()}`,
    `Город: ${getCityMeta(state.city).label}`,
    `Срочность: ${state.urgent ? 'да' : 'нет'}`,
    '',
    'Дополнительные работы:',
    ...(selectedExtras(state).length ? selectedExtras(state).map((l) => `- ${l}`) : ['- не выбраны']),
    '',
    `Примерная стоимость: ${formatRange(result.minPrice, result.maxPrice)}`,
    `Ориентировочный срок: ${formatTimeline(result.timeline.minWeeks, result.timeline.maxWeeks)}`,
    '',
    'Состав расчёта:',
    ...result.lines.map((l) => `- ${l.label}: ${formatPrice(l.amount)}`),
    `Итого (с учётом коэффициентов): ${formatPrice(result.total)}`,
    '',
    'Расчёт предварительный и не является публичной офертой.',
  ];
  return lines.join('\n');
}

export function buildEstimateJson(state: CalculatorState, result: CalculationResult) {
  return {
    generatedAt: new Date().toISOString(),
    apartment: getApartmentMeta(state.apartmentType).label,
    area: state.area,
    rooms: state.rooms,
    bathrooms: state.bathrooms,
    balconies: state.balconies,
    doors: state.doors,
    repairType: getRepairMeta(state.repairType).label,
    condition: getConditionMeta(state.condition).label,
    city: getCityMeta(state.city).label,
    urgent: state.urgent,
    extras: selectedExtras(state),
    priceRange: { min: result.minPrice, max: result.maxPrice },
    total: result.total,
    timelineWeeks: result.timeline,
    breakdown: result.lines.map((l) => ({ label: l.label, amount: l.amount })),
    contact: state.contact.name
      ? { name: state.contact.name, phone: state.contact.phone, comment: state.contact.comment }
      : null,
  };
}

function triggerDownload(filename: string, content: string, mime: string): void {
  if (typeof window === 'undefined') return;
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadEstimate(
  state: CalculatorState,
  result: CalculationResult,
  format: 'json' | 'txt' = 'txt',
): void {
  if (format === 'json') {
    triggerDownload('remsmeta-raschet.json', JSON.stringify(buildEstimateJson(state, result), null, 2), 'application/json');
  } else {
    triggerDownload('remsmeta-raschet.txt', buildEstimateText(state, result), 'text/plain;charset=utf-8');
  }
}

export async function copyEstimate(state: CalculatorState, result: CalculationResult): Promise<boolean> {
  const text = buildEstimateText(state, result);
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  return false;
}

import {
  BASE_PRICES,
  CITY_FACTORS,
  CONDITION_FACTORS,
  EXTRA_FIXED,
  EXTRA_PER_SQM,
  URGENT_FACTOR,
  getRepairMeta,
} from './constants';
import { formatTimeline, roundThousands } from './format';
import type {
  CalculationLine,
  CalculationResult,
  CalculatorState,
  ExtraKey,
  TimelineResult,
} from './types';

/** Human-readable labels for the per-sqm / fixed extras in the breakdown. */
const EXTRA_LINE_LABELS: Record<ExtraKey, string> = {
  demolition: 'Демонтаж',
  electrical: 'Электрика',
  plumbing: 'Сантехника',
  wallAlignment: 'Выравнивание стен',
  floorReplacement: 'Полы',
  stretchCeiling: 'Потолки',
  bathroomTurnkey: 'Санузел',
  balconyTurnkey: 'Балкон',
  interiorDoors: 'Двери',
};

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Pure cost estimate. Mirrors the formula in the brief (sections 25–26):
 *   base        = area * basePrice
 *   conditioned = base * conditionFactor
 *   extrasSqm   = area * sum(selected per-sqm extras)
 *   extrasFixed = bathrooms*95k + balconies*35k + doors*7.5k
 *   subtotal    = conditioned + extrasSqm + extrasFixed
 *   total       = subtotal * cityFactor * urgentFactor
 *   range       = total*[0.92, 1.12]  (rounded to thousands)
 */
export function calculateEstimate(state: CalculatorState): CalculationResult {
  const { area, repairType, condition, extras, bathrooms, balconies, doors, city, urgent } =
    state;

  const base = area * BASE_PRICES[repairType];
  const conditionPrice = base * CONDITION_FACTORS[condition];

  let extrasPerSqm = 0;
  const selectedPerSqm: ExtraKey[] = [];
  (Object.keys(EXTRA_PER_SQM) as ExtraKey[]).forEach((key) => {
    if (extras[key]) {
      extrasPerSqm += area * (EXTRA_PER_SQM[key] ?? 0);
      selectedPerSqm.push(key);
    }
  });

  let extrasFixed = 0;
  if (extras.bathroomTurnkey) extrasFixed += bathrooms * EXTRA_FIXED.bathroomTurnkey;
  if (extras.balconyTurnkey) extrasFixed += balconies * EXTRA_FIXED.balconyTurnkey;
  if (extras.interiorDoors) extrasFixed += doors * EXTRA_FIXED.interiorDoors;

  const subtotal = conditionPrice + extrasPerSqm + extrasFixed;

  const cityFactor = CITY_FACTORS[city];
  const afterCity = subtotal * cityFactor;
  const cityAdjustment = afterCity - subtotal;

  const urgentFactor = urgent ? URGENT_FACTOR : 1;
  const afterUrgent = afterCity * urgentFactor;
  const urgentAdjustment = afterUrgent - afterCity;

  const total = roundThousands(afterUrgent);
  const minPrice = roundThousands(total * 0.92);
  const maxPrice = roundThousands(total * 1.12);

  const lines: CalculationLine[] = [];
  lines.push({
    key: 'base',
    label: 'Базовые работы',
    amount: roundThousands(conditionPrice),
    emphasis: true,
  });
  selectedPerSqm.forEach((key) => {
    const perSqm = EXTRA_PER_SQM[key] ?? 0;
    lines.push({
      key,
      label: EXTRA_LINE_LABELS[key],
      amount: roundThousands(area * perSqm),
    });
  });
  if (extras.bathroomTurnkey) {
    lines.push({
      key: 'bathroomTurnkey',
      label: `Санузел${bathrooms > 1 ? ` ×${bathrooms}` : ''}`,
      amount: roundThousands(bathrooms * EXTRA_FIXED.bathroomTurnkey),
    });
  }
  if (extras.balconyTurnkey) {
    lines.push({
      key: 'balconyTurnkey',
      label: `Балкон${balconies > 1 ? ` ×${balconies}` : ''}`,
      amount: roundThousands(balconies * EXTRA_FIXED.balconyTurnkey),
    });
  }
  if (extras.interiorDoors) {
    lines.push({
      key: 'interiorDoors',
      label: `Двери${doors > 1 ? ` ×${doors}` : ''}`,
      amount: roundThousands(doors * EXTRA_FIXED.interiorDoors),
    });
  }
  if (city !== 'other' && cityAdjustment > 0) {
    lines.push({
      key: 'city',
      label: 'Городской коэффициент',
      amount: roundThousands(cityAdjustment),
    });
  }
  if (urgent && urgentAdjustment > 0) {
    lines.push({
      key: 'urgent',
      label: 'Срочность (+15%)',
      amount: roundThousands(urgentAdjustment),
    });
  }

  return {
    base: round2(base),
    conditionPrice: roundThousands(conditionPrice),
    extrasPerSqm: roundThousands(extrasPerSqm),
    extrasFixed: roundThousands(extrasFixed),
    subtotal: roundThousands(subtotal),
    cityFactor,
    cityAdjustment: roundThousands(cityAdjustment),
    urgentFactor,
    urgentAdjustment: roundThousands(urgentAdjustment),
    total,
    minPrice,
    maxPrice,
    lines,
    timeline: calculateTimeline(state),
  };
}

/**
 * Timeline estimate (brief section 28).
 * Base weeks by repair type, plus area and option additions.
 */
export function calculateTimeline(state: CalculatorState): TimelineResult {
  const [min, max] = getRepairMeta(state.repairType).weeks;
  let minWeeks = min;
  let maxWeeks = max;

  if (state.area > 80) {
    minWeeks += 1;
    maxWeeks += 1;
  }
  if (state.area > 120) {
    minWeeks += 1;
    maxWeeks += 1;
  }
  if (state.area > 160) {
    minWeeks += 1;
    maxWeeks += 1;
  }
  if (state.extras.bathroomTurnkey) {
    minWeeks += state.bathrooms;
    maxWeeks += state.bathrooms;
  }
  if (state.extras.balconyTurnkey) {
    minWeeks += state.balconies;
    maxWeeks += state.balconies;
  }
  if (state.extras.electrical) {
    minWeeks += 1;
    maxWeeks += 1;
  }

  return { minWeeks, maxWeeks };
}

/** Convenience: formatted timeline string. */
export function timelineLabel(result: CalculationResult): string {
  return formatTimeline(result.timeline.minWeeks, result.timeline.maxWeeks);
}

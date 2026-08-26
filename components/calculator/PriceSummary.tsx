'use client';

import { useCalculator } from '@/hooks/useCalculator';
import { Card } from '@/components/ui/Card';
import {
  ClockIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  PinIcon,
  CalculatorIcon,
  CheckIcon,
} from '@/components/ui/icons';
import {
  getCityMeta,
  getConditionMeta,
  getRepairMeta,
  STEP_TITLES,
} from '@/lib/constants';
import { formatPrice, formatRange, formatTimeline } from '@/lib/format';
import type { CalculationLine } from '@/lib/types';

/**
 * Decide the colour accent for a breakdown line so similar items
 * group visually (base / extras / surcharges).
 */
function lineTone(line: CalculationLine): 'base' | 'extra' | 'surcharge' {
  if (line.emphasis) return 'base';
  if (line.key === 'city' || line.key === 'urgent') return 'surcharge';
  return 'extra';
}

const TONE_DOT: Record<ReturnType<typeof lineTone>, string> = {
  base: 'bg-brand',
  extra: 'bg-graphite-muted',
  surcharge: 'bg-indigo-500',
};

export function PriceSummary() {
  const { state, estimate } = useCalculator();
  const stepHint = STEP_TITLES[state.step]?.title ?? 'Ваш расчёт';

  return (
    <Card
      className="relative overflow-hidden rounded-3xl p-6 shadow-lg sm:p-7"
      role="region"
      aria-label="Предварительный расчёт стоимости"
    >
      {/* Decorative ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-indigo-400/15 blur-3xl"
      />

      {/* Header row */}
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-soft text-brand-dark">
            <CalculatorIcon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-graphite-muted">
              Шаг {state.step} из 5
            </p>
            <p className="truncate text-xs text-graphite-soft">{stepHint}</p>
          </div>
        </div>
      </div>

      {/* Hero price */}
      <div className="relative mt-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-graphite-muted">
          Предварительная стоимость
        </p>
        <p className="mt-1.5 text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-brand-gradient sm:text-4xl">
          {formatRange(estimate.minPrice, estimate.maxPrice)}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-graphite-soft">
            <ClockIcon className="h-3.5 w-3.5 text-graphite-muted" />
            {formatTimeline(estimate.timeline.minWeeks, estimate.timeline.maxWeeks)}
          </span>
          {state.urgent && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand-dark">
              <ArrowTrendingUpIcon className="h-3.5 w-3.5" />
              срочно ×1.15
            </span>
          )}
        </div>
      </div>

      {/* Breakdown header + lines */}
      <div className="relative mt-6">
        <div className="mb-2.5 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-graphite-muted">
            Из чего складывается
          </p>
          {estimate.lines.length > 1 && (
            <span className="text-[11px] font-medium text-graphite-muted">
              {estimate.lines.length} {estimate.lines.length === 1 ? 'пункт' : 'пунктов'}
            </span>
          )}
        </div>

        {estimate.lines.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line-strong bg-white/60 p-4 text-center">
            <SparklesIcon className="mx-auto h-5 w-5 text-graphite-muted" />
            <p className="mt-1.5 text-xs text-graphite-muted">
              Заполните параметры — здесь появится детализация
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-line/80">
            {estimate.lines.map((l) => {
              const tone = lineTone(l);
              return (
                <li
                  key={l.key}
                  className="flex items-center justify-between gap-3 py-2.5"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${TONE_DOT[tone]}`}
                    />
                    <span
                      className={
                        l.emphasis
                          ? 'truncate text-sm font-semibold text-graphite'
                          : 'truncate text-sm text-graphite-soft'
                      }
                    >
                      {l.label}
                    </span>
                  </span>
                  <span
                    className={
                      l.emphasis
                        ? 'shrink-0 text-sm font-bold text-graphite'
                        : tone === 'surcharge'
                          ? 'shrink-0 text-sm font-semibold text-indigo-600'
                          : 'shrink-0 text-sm font-medium text-graphite-soft'
                    }
                  >
                    {formatPrice(l.amount)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Selection chips — what the user has picked */}
      <div className="relative mt-5 border-t border-line pt-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-graphite-muted">
          Ваш выбор
        </p>
        <div className="flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white px-2.5 py-1 text-xs font-medium text-graphite-soft">
            <CheckIcon className="h-3 w-3 text-brand" />
            {getRepairMeta(state.repairType).label}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white px-2.5 py-1 text-xs font-medium text-graphite-soft">
            <CheckIcon className="h-3 w-3 text-brand" />
            {getConditionMeta(state.condition).label}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white px-2.5 py-1 text-xs font-medium text-graphite-soft">
            <PinIcon className="h-3 w-3 text-brand" />
            {getCityMeta(state.city).label}
          </span>
          {state.area > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white px-2.5 py-1 text-xs font-medium text-graphite-soft">
              <CheckIcon className="h-3 w-3 text-brand" />
              {state.area}&nbsp;м² · {state.rooms}-к
            </span>
          )}
          {Object.values(state.extras).filter(Boolean).length > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand-dark">
              + {Object.values(state.extras).filter(Boolean).length}&nbsp;опций
            </span>
          )}
        </div>
      </div>

      {/* Trust footer */}
      <div className="relative mt-5 flex items-center gap-2 rounded-xl bg-success-soft/60 px-3 py-2.5 text-xs text-success">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success text-white">
          <CheckIcon className="h-3 w-3" />
        </span>
        <span>
          Финальная цена фиксируется в&nbsp;договоре и&nbsp;не&nbsp;меняется в&nbsp;процессе.
        </span>
      </div>
    </Card>
  );
}

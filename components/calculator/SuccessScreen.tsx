'use client';

import { useEffect, useState } from 'react';
import { useCalculator } from '@/hooks/useCalculator';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ClockIcon, ShieldCheckIcon } from '@/components/ui/icons';
import { getApartmentMeta, getRepairMeta, getCityMeta } from '@/lib/constants';
import { formatPrice, formatRange, formatTimeline } from '@/lib/format';

/**
 * Generate a human-friendly ticket number, e.g. "#2026-04812".
 * Stable for the lifetime of the component so the user sees the same id.
 */
function makeTicketNumber(): string {
  const year = new Date().getFullYear();
  // 5 digits, zero-padded, range 10000..99999 — looks like a real CRM id.
  const tail = Math.floor(10000 + Math.random() * 90000);
  return `#${year}-${tail}`;
}

export function SuccessScreen({ onReset }: { onReset: () => void }) {
  const { state, estimate } = useCalculator();
  const [ticket, setTicket] = useState<string | null>(null);

  useEffect(() => {
    // Generate after mount to avoid SSR/CSR mismatch on hydration.
    setTicket(makeTicketNumber());
  }, []);

  return (
    <Card
      className="relative origin-top overflow-hidden p-6 sm:p-10 animate-success-expand"
      role="status"
      aria-live="polite"
    >
      {/* Ambient brand glow in the corner — ties the success state to the
          brand palette and rewards the user for completing the wizard. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob animate-float-slow h-72 w-72 bg-brand/15 right-[-6rem] top-[-6rem]" />
        <div className="blob animate-float h-56 w-56 bg-success/10 left-[-4rem] bottom-[-5rem]" />
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
        {/* Animated check medallion */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-success/20 animate-confetti-pop"
              style={{ animationDelay: '0.1s' }}
            />
            <span
              aria-hidden
              className="absolute -inset-2 rounded-full bg-success/10 animate-confetti-pop"
              style={{ animationDelay: '0.2s' }}
            />
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-success-soft text-success shadow-lg shadow-success/20">
              <svg
                viewBox="0 0 24 24"
                className="h-10 w-10"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path
                  d="M5 12.5l4.5 4.5L19 7"
                  pathLength={1}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: 0,
                    animation: 'checkmark 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both',
                  }}
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Headline + status text */}
        <div className="text-center lg:text-left">
          {ticket && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-graphite-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Заявка {ticket}
            </span>
          )}
          <h2 className="mt-3 text-2xl font-bold text-graphite sm:text-3xl">
            Спасибо! Заявка принята.
          </h2>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-graphite-soft lg:max-w-none">
            Мы сохранили ваш расчёт и перезвоним в&nbsp;течение 15&nbsp;минут, чтобы
            уточнить детали и согласовать выезд замерщика.
          </p>

          <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-graphite-muted">
            <ClockIcon className="h-4 w-4" />
            Если не&nbsp;получится — пришлём SMS с&nbsp;напоминанием.
          </p>
        </div>

        {/* Trust badge — small, on the right at lg+ */}
        <div className="hidden lg:flex lg:flex-col lg:items-end lg:gap-1 lg:text-right">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-dark ring-1 ring-brand/20">
            <ShieldCheckIcon className="h-4 w-4" />
            Гарантия по&nbsp;договору
          </span>
          <span className="text-xs text-graphite-muted">3 года на&nbsp;все работы</span>
        </div>
      </div>

      {/* Result summary — full width, 4-up grid for visual rhythm */}
      <div className="mt-8 grid gap-3 rounded-2xl border border-line-strong bg-white/80 p-5 backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-surface px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-graphite-muted">
            Диапазон
          </p>
          <p className="mt-1 text-lg font-bold text-brand">
            {formatRange(estimate.minPrice, estimate.maxPrice)}
          </p>
        </div>
        <div className="rounded-xl bg-surface px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-graphite-muted">
            Итого
          </p>
          <p className="mt-1 text-lg font-bold text-graphite">
            ≈ {formatPrice(estimate.total)}
          </p>
        </div>
        <div className="rounded-xl bg-surface px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-graphite-muted">
            Срок
          </p>
          <p className="mt-1 text-lg font-bold text-graphite">
            {formatTimeline(estimate.timeline.minWeeks, estimate.timeline.maxWeeks)}
          </p>
        </div>
        <div className="rounded-xl bg-surface px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-graphite-muted">
            Объект
          </p>
          <p className="mt-1 text-sm font-semibold text-graphite line-clamp-2">
            {getApartmentMeta(state.apartmentType).label}, {state.area}&nbsp;м²
          </p>
        </div>
      </div>

      {/* Meta row — small details, full width */}
      <div className="mt-4 grid gap-2 text-sm text-graphite-soft sm:grid-cols-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          <span>
            <span className="text-graphite-muted">Ремонт:</span>{' '}
            <span className="font-medium text-graphite">
              {getRepairMeta(state.repairType).label}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          <span>
            <span className="text-graphite-muted">Город:</span>{' '}
            <span className="font-medium text-graphite">
              {getCityMeta(state.city).label}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          <span>
            <span className="text-graphite-muted">Срочность:</span>{' '}
            <span className="font-medium text-graphite">
              {state.urgent ? '+15% (приоритет)' : 'Стандарт'}
            </span>
          </span>
        </div>
      </div>

      {/* Footer actions — only "see examples" + "do again" */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
        <a
          href="#examples"
          className="text-sm font-medium text-brand transition-colors hover:text-brand-dark"
        >
          Посмотреть примеры расчётов →
        </a>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Пройти заново
        </Button>
      </div>
    </Card>
  );
}

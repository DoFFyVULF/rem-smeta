'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { AnimatedIndicator } from './AnimatedIndicator';

type CardMode = 'radio' | 'checkbox';

interface Spec {
  /** Short upper-case eyebrow above the value, e.g. "₽/м² · от". */
  label: string;
  /** Bold value, e.g. "5 500". */
  value: ReactNode;
}

interface OptionCardProps {
  mode: CardMode;
  selected: boolean;
  onToggle: () => void;
  title: string;
  description?: string;
  /**
   * Structured metrics row rendered at the bottom of the card.
   * Always required — the card reserves space for it so all cards in a row
   * share the same height regardless of how many tiles each one has.
   */
  specs: Spec[];
  icon?: ReactNode;
  disabled?: boolean;
  id?: string;
  className?: string;
}

function SpecTile({ label, value }: Spec) {
  return (
    <div
      className={cn(
        'min-w-0 flex-1 rounded-lg border border-line-strong bg-white px-2.5 py-1.5 text-center',
        'transition-colors',
      )}
    >
      <div className="truncate text-sm font-bold leading-tight text-graphite">
        {value}
      </div>
      <div className="mt-0.5 truncate text-[10.5px] font-semibold uppercase tracking-wide text-graphite-muted">
        {label}
      </div>
    </div>
  );
}

/**
 * Unified selectable card for the calculator.
 *
 * Structure is fixed and identical for every card so the row always lines up:
 *
 *   [icon]  Title                          [indicator]
 *           Description (1-2 lines)
 *
 *   [metric]  [metric]  [metric]   <- mt-auto, always at the bottom
 *
 * - `h-full` makes every card in a grid row the same height.
 * - Title and description are clamped to predictable line counts.
 * - The metrics row is reserved via `min-h-[44px]`, so cards with 1, 2 or 3
 *   metrics still share the same total height.
 */
export function OptionCard({
  mode,
  selected,
  onToggle,
  title,
  description,
  specs,
  icon,
  disabled,
  id,
  className,
}: OptionCardProps) {
  const body = (
    <div
      className={cn(
        'group relative flex h-full w-full flex-col gap-3 rounded-2xl border p-4 text-left transition-all duration-200 sm:p-5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        disabled
          ? 'cursor-not-allowed border-line bg-surface/60 opacity-60'
          : selected
            ? 'border-brand bg-brand-soft shadow-md shadow-brand/10 hover:-translate-y-0.5'
            : 'border-line-strong bg-white hover:-translate-y-0.5 hover:border-brand/40 hover:bg-surface hover:shadow-md',
      )}
    >
      {/* Header: icon + title + indicator, all aligned to a fixed row height */}
      <div className="flex items-start gap-3">
        {icon && (
          <span
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors',
              selected
                ? 'icon-chip'
                : 'bg-surface text-graphite-muted group-hover:bg-brand-soft group-hover:text-brand',
            )}
            aria-hidden
          >
            {icon}
          </span>
        )}

        <span className="min-w-0 flex-1 pt-1">
          <span className="block text-[15px] font-semibold leading-tight text-graphite line-clamp-2">
            {title}
          </span>
        </span>

        <span className="shrink-0 pt-2">
          <AnimatedIndicator mode={mode} selected={selected} />
        </span>
      </div>

      {/* Description: clamped to 2 lines so cards align across the row */}
      {description && (
        <p className="text-sm leading-snug text-graphite-muted line-clamp-2">
          {description}
        </p>
      )}

      {/* Metrics row: always reserved, mt-auto pins it to the bottom */}
      <div className="mt-auto flex items-stretch gap-2 pt-1">
        {specs.map((s, i) => (
          <SpecTile key={i} label={s.label} value={s.value} />
        ))}
      </div>
    </div>
  );

  if (mode === 'checkbox' && id) {
    return (
      <label htmlFor={id} className={cn('block h-full', className)}>
        <input
          id={id}
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          disabled={disabled}
          className="sr-only"
        />
        {body}
      </label>
    );
  }

  return (
    <button
      type="button"
      role={mode}
      aria-checked={selected}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={onToggle}
      className={cn('block h-full w-full', className)}
    >
      {body}
    </button>
  );
}

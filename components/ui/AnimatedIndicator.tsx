'use client';

import { cn } from '@/lib/cn';

type IndicatorMode = 'radio' | 'checkbox';

interface AnimatedIndicatorProps {
  /** Visual mode. Checkbox draws a check mark; radio pops a dot. */
  mode: IndicatorMode;
  selected: boolean;
  className?: string;
}

/**
 * Animated selection indicator.
 *
 * When `selected` flips, the empty bar/circle:
 *   1. Fills with the brand colour and gains a subtle "pop" overshoot
 *      (0–220ms via `indicator-fill`).
 *   2. For checkboxes — a check mark is drawn stroke-by-stroke using
 *      `stroke-dashoffset` (100–340ms via `check-draw`).
 *   3. For radios — a dot scales in from 0 with an overshoot
 *      (140–360ms via `dot-pop`).
 *
 * Pure CSS + SVG, no animation library required. The check is normalised
 * with `pathLength="1"` so the dash math works regardless of the real
 * path length.
 */
export function AnimatedIndicator({
  mode,
  selected,
  className,
}: AnimatedIndicatorProps) {
  if (mode === 'checkbox') {
    return (
      <span
        className={cn(
          'relative flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors duration-200',
          selected
            ? 'border-brand bg-brand shadow-sm'
            : 'border-line-strong bg-white',
          className,
        )}
        aria-hidden
      >
        {/* Checkmark — drawn on demand, hidden in the empty state. */}
        <svg
          viewBox="0 0 16 16"
          className={cn(
            'h-3 w-3 transition-opacity duration-150',
            selected ? 'opacity-100' : 'opacity-0',
          )}
        >
          <path
            d="M3.5 8.5l3 3 6-7"
            fill="none"
            stroke="white"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: selected ? 0 : 1,
              animation: selected
                ? 'check-draw 280ms cubic-bezier(0.22, 1, 0.36, 1) 100ms both'
                : 'none',
              transformOrigin: 'center',
            }}
          />
        </svg>

        {/* Soft pop on selection (CSS keyframe) */}
        {selected && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-md"
            style={{ animation: 'check-pop 320ms cubic-bezier(0.22, 1, 0.36, 1) both' }}
          />
        )}
      </span>
    );
  }

  // Radio mode — outer ring + inner dot
  return (
    <span
      className={cn(
        'relative flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-200',
        selected
          ? 'border-brand bg-brand shadow-sm'
          : 'border-line-strong bg-white',
        className,
      )}
      aria-hidden
    >
      <span
        className={cn(
          'h-2 w-2 rounded-full bg-white transition-opacity duration-150',
          selected ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          transformOrigin: 'center',
          animation: selected
            ? 'dot-pop 320ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both'
            : 'none',
        }}
      />
    </span>
  );
}

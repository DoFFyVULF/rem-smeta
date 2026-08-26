import { cn } from '@/lib/cn';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label={`Шаг ${current} из ${total}`}
      >
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-sm font-medium text-graphite-muted">
        Шаг {current} из {total}
      </p>
    </div>
  );
}

/** Compact dot stepper used on mobile. */
export function StepDots({ current, total }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'h-1.5 rounded-full transition-all duration-300',
            i < current ? 'w-6 bg-brand' : 'w-1.5 bg-line-strong',
          )}
        />
      ))}
    </div>
  );
}

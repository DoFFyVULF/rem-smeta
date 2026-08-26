import { cn } from '@/lib/cn';

interface NumberStepperProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  suffix?: string;
  hint?: string;
  icon?: React.ReactNode;
}

/**
 * Compact number stepper. Visual container is identical in shape to the
 * OptionCard so it sits naturally in the same grid.
 */
export function NumberStepper({
  id,
  label,
  value,
  min,
  max,
  onChange,
  suffix,
  hint,
  icon,
}: NumberStepperProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className={cn(
        'flex h-full flex-col gap-3 rounded-2xl border border-line-strong bg-white p-4 sm:p-5',
        'transition-colors hover:border-brand/40',
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <span
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface text-graphite-muted"
          >
            {icon}
          </span>
        )}
        <span className="min-w-0 flex-1 pt-1.5">
          <span className="block text-[15px] font-semibold leading-tight text-graphite">
            {label}
          </span>
          {hint && (
            <span className="mt-1 block text-xs text-graphite-muted">{hint}</span>
          )}
        </span>
      </div>

      <div className="mt-auto flex items-center rounded-xl border border-line-strong bg-surface">
        <button
          type="button"
          onClick={dec}
          disabled={value <= min}
          aria-label={`Уменьшить ${label}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-l-xl text-xl font-semibold text-graphite-soft transition-colors hover:bg-line disabled:opacity-40"
        >
          −
        </button>
        <span className="flex-1 select-none text-center text-lg font-semibold text-graphite">
          {value}
          {suffix && <span className="ml-1 text-sm font-normal text-graphite-muted">{suffix}</span>}
        </span>
        <button
          type="button"
          onClick={inc}
          disabled={value >= max}
          aria-label={`Увеличить ${label}`}
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-r-xl text-xl font-semibold text-graphite-soft transition-colors hover:bg-line disabled:opacity-40',
          )}
        >
          +
        </button>
      </div>
      <span className="sr-only" id={`${id}-value`}>
        {label}: {value}
      </span>
    </div>
  );
}

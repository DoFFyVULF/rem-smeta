import { cn } from '@/lib/cn';
import { CheckIcon } from './icons';

interface StepStepperProps {
  current: number;
  total: number;
}

/** Connected numbered stepper with a brand-gradient progress fill. */
export function StepStepper({ current, total }: StepStepperProps) {
  const fraction = total > 1 ? (current - 1) / (total - 1) : 0;

  return (
    <div className="relative">
      {/* Track base + fill (spans node centres: left-5 / right-5 = half of h-10 node) */}
      <div className="absolute left-5 right-5 top-5 h-1 -translate-y-1/2 rounded-full bg-line" />
      <div
        className="absolute left-5 top-5 h-1 -translate-y-1/2 rounded-full bg-brand-gradient transition-[width] duration-500 ease-out"
        style={{ width: `calc((100% - 2.5rem) * ${fraction})` }}
      />

      <ol className="relative flex items-center justify-between">
        {Array.from({ length: total }).map((_, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          return (
            <li key={n} className="z-10 flex flex-col items-center">
              <span
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300',
                  done && 'border-brand bg-brand text-white',
                  active &&
                    'border-brand bg-white text-brand shadow-brand-sm ring-4 ring-brand/15',
                  !done && !active && 'border-line bg-white text-graphite-muted',
                )}
                aria-current={active ? 'step' : undefined}
              >
                {done ? <CheckIcon className="h-5 w-5" /> : n}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

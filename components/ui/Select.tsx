import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { ChevronDownIcon } from './icons';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  hint?: string;
  error?: string;
  id: string;
  options: Option[];
}

export function Select({ label, hint, error, id, options, className, ...rest }: SelectProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-graphite-soft">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'h-12 w-full appearance-none rounded-xl border bg-white px-3.5 pr-10 text-[15px] text-graphite outline-none transition-colors',
            'focus:ring-2 focus:ring-brand focus:ring-offset-1',
            error ? 'border-danger' : 'border-line-strong focus:border-brand',
            className,
          )}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-graphite-muted" />
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-graphite-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

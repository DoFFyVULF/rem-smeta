import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  /** id used to associate label + error via aria-describedby */
  id: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export function Input({
  label,
  hint,
  error,
  id,
  leading,
  trailing,
  className,
  ...rest
}: InputProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-graphite-soft">
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex items-center rounded-xl border bg-white transition-colors',
          'focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-1',
          error ? 'border-danger' : 'border-line-strong focus-within:border-brand',
        )}
      >
        {leading && <span className="pl-3.5 text-graphite-muted">{leading}</span>}
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'h-12 w-full bg-transparent px-3.5 text-[15px] text-graphite outline-none placeholder:text-graphite-muted',
            leading ? 'pl-2' : undefined,
            trailing ? 'pr-2' : undefined,
            className,
          )}
          {...rest}
        />
        {trailing && <span className="pr-3.5 text-graphite-muted">{trailing}</span>}
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

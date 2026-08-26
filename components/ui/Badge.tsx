import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'brand' | 'neutral' | 'success' | 'danger' | 'muted';

const tones: Record<Tone, string> = {
  brand: 'bg-brand-soft text-brand-dark',
  neutral: 'bg-surface text-graphite-soft',
  success: 'bg-success-soft text-success',
  danger: 'bg-danger-soft text-danger',
  muted: 'bg-line/60 text-graphite-muted',
};

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

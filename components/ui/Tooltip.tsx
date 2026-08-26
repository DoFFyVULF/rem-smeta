import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { InfoIcon } from './icons';

interface TooltipProps {
  text: string;
  children?: ReactNode;
  className?: string;
}

/**
 * CSS-only tooltip. Trigger wraps the content; the bubble appears on
 * hover/focus. Fully keyboard accessible (focusable button trigger).
 */
export function Tooltip({ text, children, className }: TooltipProps) {
  return (
    <span className={cn('group/tt relative inline-flex', className)}>
      <button
        type="button"
        aria-label={text}
        className="inline-flex items-center text-graphite-muted transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 rounded"
      >
        {children ?? <InfoIcon className="h-4 w-4" />}
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-60 -translate-x-1/2 rounded-lg bg-graphite px-3 py-2 text-xs leading-relaxed text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/tt:opacity-100 group-focus-within/tt:opacity-100"
      >
        {text}
        <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-graphite" />
      </span>
    </span>
  );
}

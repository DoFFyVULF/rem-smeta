import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  id?: string;
}

/** Consistent section header: eyebrow label + bold title + supporting subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      id={id}
      className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <span className={cn('eyebrow', align === 'center' && 'justify-center')}>{eyebrow}</span>
      )}
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-graphite text-balance md:text-[2.6rem] md:leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-graphite-soft text-pretty">{subtitle}</p>
      )}
    </div>
  );
}

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'gradient';
type Size = 'sm' | 'md' | 'lg';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
};

interface ButtonAsButton extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> {
  href?: undefined;
}

interface ButtonAsLink extends CommonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand-dark active:bg-brand-dark shadow-sm shadow-brand/20',
  gradient:
    'bg-brand-gradient text-white shadow-brand hover:opacity-95 active:opacity-90',
  secondary:
    'bg-white text-graphite border border-line-strong hover:bg-surface hover:border-graphite-muted',
  ghost: 'bg-transparent text-graphite hover:bg-line/60',
  danger: 'bg-danger text-white hover:bg-red-700',
  success: 'bg-success text-white hover:bg-green-700',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm gap-1.5',
  md: 'h-12 px-5 text-[15px] gap-2',
  lg: 'h-14 px-7 text-base gap-2.5',
};

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth,
    leftIcon,
    rightIcon,
    className,
    children,
  } = props;

  const classes = cn(
    'inline-flex items-center justify-center rounded-xl font-semibold transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  );

  const content = (
    <>
      {leftIcon}
      {children}
      {rightIcon}
    </>
  );

  if ('href' in props && props.href !== undefined) {
    const {
      href,
      variant: _v,
      size: _s,
      fullWidth: _f,
      leftIcon: _l,
      rightIcon: _r,
      className: _c,
      children: _ch,
      ...anchorRest
    } = props;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  const {
    disabled,
    variant: _v2,
    size: _s2,
    fullWidth: _f2,
    leftIcon: _l2,
    rightIcon: _r2,
    className: _c2,
    children: _ch2,
    ...buttonRest
  } = props;
  return (
    <button className={classes} disabled={disabled} {...buttonRest}>
      {content}
    </button>
  );
}

/** Tiny classNames joiner (clsx-lite) — avoids an extra dependency. */
export type ClassValue = string | number | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}

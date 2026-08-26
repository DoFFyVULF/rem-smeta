'use client';

import { useEffect, useState } from 'react';
import {
  ChevronDownIcon,
  ArrowRightIcon,
  PhoneIcon,
  MenuIcon,
  CloseIcon,
} from '@/components/ui/icons';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { cn } from '@/lib/cn';

const NAV = [
  { href: '#how', label: 'Как работает' },
  { href: '#included', label: 'Входит в расчёт' },
  { href: '#examples', label: 'Примеры' },
  { href: '#calculator', label: 'Калькулятор' },
  { href: '#faq', label: 'Вопросы' },
];

/** Section ids that the header observes to highlight the active link. */
const SECTIONS = NAV.map((n) => n.href.slice(1));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add depth to the header once the user scrolls past the very top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /**
   * Scrollspy — determine which section is currently "active" based on
   * scroll position, not IntersectionObserver. The active section is the
   * one whose top has crossed the trigger line (header height + small
   * offset) and whose bottom is still below it. This is more predictable
   * than IO across sections of very different heights and works
   * correctly when the user jumps via hash links.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const HEADER_OFFSET = 96; // h-16 (64) + breathing room (32)
    let frame = 0;

    const compute = () => {
      frame = 0;
      const trigger = window.scrollY + HEADER_OFFSET;

      // Find the last section whose top is <= trigger. That's the active one.
      let current: string | null = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= trigger) current = id;
      }

      // Fallback: if we're at the very top of the page, no section is active.
      if (window.scrollY < 200) current = null;

      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(compute);
    };

    // Initial + after layout (fonts/images may shift section positions).
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    // Re-run once after fonts have loaded.
    if (document.fonts?.ready) {
      document.fonts.ready.then(compute).catch(() => {});
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Close the mobile menu after a link is tapped.
  useEffect(() => {
    if (!menuOpen) return;
    const onHashChange = () => setMenuOpen(false);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b transition-all duration-300',
        scrolled
          ? 'border-line bg-white/90 shadow-md shadow-graphite/5 backdrop-blur-xl'
          : 'border-transparent bg-white/70 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4">
        {/* Brand */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          aria-label="РемСмета — на главную"
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl  shadow-brand-sm">
            <Image
              src="/logo.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              priority
            />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-graphite">
            Рем<span className="text-brand">Смета</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'group relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                      isActive
                        ? 'text-graphite'
                        : 'text-graphite-soft hover:text-graphite',
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        'absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand-gradient transition-transform duration-200',
                        isActive
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100',
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="tel:+78002000600"
            className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-graphite-soft transition-colors hover:text-graphite xl:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" />
            8&nbsp;800&nbsp;2000&nbsp;600
          </a>
          <Button href="#calculator" variant="gradient" size="sm">
            Рассчитать стоимость
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <a
            href="tel:+78002000600"
            aria-label="Позвонить"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-graphite-soft transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <button
            type="button"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-graphite-soft transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {menuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={cn(
          'lg:hidden overflow-hidden border-t border-line bg-white/95 backdrop-blur-xl transition-all duration-300',
          menuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav aria-label="Мобильная навигация" className="mx-auto max-w-6xl px-4 py-3">
          <ul className="flex flex-col">
            {NAV.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-3 py-3 text-base font-semibold transition-colors',
                      isActive
                        ? 'bg-brand-soft text-brand-dark'
                        : 'text-graphite-soft hover:bg-surface hover:text-graphite',
                    )}
                  >
                    {item.label}
                    <ArrowRightIcon
                      className={cn(
                        'h-4 w-4 transition-transform',
                        isActive ? 'text-brand' : 'text-graphite-muted',
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 flex flex-col gap-2 border-t border-line pt-3">
            <Button href="#calculator" variant="gradient" size="md" fullWidth>
              Рассчитать стоимость
            </Button>
            <a
              href="tel:+78002000600"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line-strong bg-white px-5 py-2.5 text-sm font-semibold text-graphite-soft"
            >
              <PhoneIcon className="h-4 w-4" />
              8&nbsp;800&nbsp;2000&nbsp;600
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

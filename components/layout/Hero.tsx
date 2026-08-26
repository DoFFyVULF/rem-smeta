import {
  RulerIcon,
  CheckIcon,
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ClockIcon,
  CalculatorIcon,
  StarIcon,
} from '@/components/ui/icons';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const BENEFITS = [
  'Без звонка менеджеру',
  'Расчёт за 60 секунд',
  'Понятная предварительная смета',
  'Результат сразу на экране',
];

const STATS = [
  { value: '2 400+', label: 'квартир сдано' },
  { value: '8 лет', label: 'на рынке' },
  { value: '4.9', label: 'рейтинг клиентов' },
];

const MOCK_LINES = [
  { label: 'Демонтаж и подготовка', amount: '82 000 ₽', share: 7 },
  { label: 'Черновые работы', amount: '210 000 ₽', share: 18 },
  { label: 'Инженерные сети', amount: '180 000 ₽', share: 15 },
  { label: 'Чистовая отделка', amount: '640 000 ₽', share: 54 },
  { label: 'Расходники и доставка', amount: '78 000 ₽', share: 6 },
];

const TOTAL = '1 350 000 – 1 640 000 ₽';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-surface pt-10 pb-16 md:pt-14 md:pb-24"
    >
      {/* Decorative depth layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob animate-aurora h-[34rem] w-[34rem] bg-brand/30 -left-40 -top-48" />
        <div className="blob animate-float-slow h-[26rem] w-[26rem] bg-indigo-400/20 right-[-12rem] top-8" />
        <div className="blob animate-float h-72 w-72 bg-amber-300/25 bottom-[-7rem] left-1/3" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #0f1420 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Bottom fade so the section blends into the next one */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* --- LEFT: Copy --- */}
        <div>
          <span
            className="inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-line bg-card/80 px-3.5 py-1.5 text-sm font-semibold text-graphite-soft shadow-sm backdrop-blur"
            style={{ animationDelay: '40ms' }}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white">
              <RulerIcon className="h-3 w-3" />
            </span>
            Онлайн-калькулятор стоимости ремонта
          </span>

          <h1
            className="mt-5 animate-fade-in-up text-4xl font-extrabold leading-[1.05] tracking-tight text-graphite text-balance sm:text-5xl md:text-[3.4rem]"
            style={{ animationDelay: '120ms' }}
          >
            Рассчитайте стоимость ремонта{' '}
            <span className="text-brand-gradient">онлайн</span>
          </h1>

          <p
            className="mt-5 max-w-xl animate-fade-in-up text-lg leading-relaxed text-graphite-soft text-pretty"
            style={{ animationDelay: '200ms' }}
          >
            Выберите площадь, тип ремонта и&nbsp;дополнительные работы&nbsp;— и
            калькулятор покажет предварительную стоимость и&nbsp;срок выполнения
            за&nbsp;пару минут.
          </p>

          <div
            className="mt-8 flex animate-fade-in-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: '280ms' }}
          >
            <Button
              href="#calculator"
              variant="gradient"
              size="lg"
              rightIcon={<ArrowRightIcon className="h-5 w-5" />}
            >
              Начать расчёт
            </Button>
            <Button href="#how" variant="secondary" size="lg">
              Как это работает
            </Button>
          </div>

          <ul
            className="mt-8 flex animate-fade-in-up flex-wrap gap-x-6 gap-y-3"
            style={{ animationDelay: '360ms' }}
          >
            {BENEFITS.map((b) => (
              <li
                key={b}
                className="flex items-center gap-2 text-sm font-medium text-graphite-soft"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-soft">
                  <CheckIcon className="h-3.5 w-3.5 text-brand-dark" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          {/* Social proof bar — large numbers, real numbers sell */}
          <div
            className="mt-10 grid animate-fade-in-up grid-cols-3 gap-4 border-t border-line/70 pt-6 sm:gap-8"
            style={{ animationDelay: '440ms' }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold tracking-tight text-graphite sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-0.5 text-xs text-graphite-muted sm:text-sm">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT: Mock estimate card with floating chips --- */}
        <div
          className="relative animate-fade-in-up"
          style={{ animationDelay: '320ms' }}
        >
          {/* Soft glow behind the card */}
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand/20 blur-3xl"
          />

          {/* Floating chip 1 — rating */}
          <div
            className="absolute -left-3 top-6 z-10 hidden animate-fade-in-up rounded-2xl border border-line bg-white px-3 py-2 shadow-lg shadow-graphite/10 sm:flex sm:items-center sm:gap-2"
            style={{ animationDelay: '520ms' }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <StarIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-bold leading-none text-graphite">4.9 / 5</p>
              <p className="text-[10px] text-graphite-muted">312 отзывов</p>
            </div>
          </div>

          {/* Floating chip 2 — guarantee */}
          <div
            className="absolute right-0 -bottom-4 z-10 hidden animate-fade-in-up rounded-2xl border border-line bg-white px-3 py-2 shadow-lg shadow-graphite/10 sm:flex sm:items-center sm:gap-2"
            style={{ animationDelay: '600ms' }}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
              <ShieldCheckIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-bold leading-none text-graphite">3 года</p>
              <p className="text-[10px] leading-none text-graphite-muted">гарантия</p>
            </div>
          </div>

          {/* The main mock card */}
          <Card className="glass relative overflow-hidden p-6 shadow-xl sm:p-7">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm font-semibold text-graphite-muted">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-white">
                  <CalculatorIcon className="h-3.5 w-3.5" />
                </span>
                Пример расчёта
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand-dark">
                <SparklesIcon className="h-3.5 w-3.5" />
                онлайн
              </span>
            </div>

            {/* Hero price */}
            <p className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-graphite sm:text-[2.4rem]">
              {TOTAL}
            </p>
            <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-graphite-muted">
              <ClockIcon className="h-4 w-4" />
              ≈ 8–12 недель · 64 м² · капитальный
            </p>

            {/* Stacked progress bar — visual breakdown */}
            <div
              className="mt-5 flex h-2 w-full overflow-hidden rounded-full bg-line"
              role="img"
              aria-label="Структура расходов"
            >
              {MOCK_LINES.map((l, i) => (
                <span
                  key={l.label}
                  className={
                    i === 0
                      ? 'bg-brand-400'
                      : i === 1
                        ? 'bg-brand-500'
                        : i === 2
                          ? 'bg-indigo-400'
                          : i === 3
                            ? 'bg-brand-dark'
                            : 'bg-amber-400'
                  }
                  style={{ width: `${l.share}%` }}
                />
              ))}
            </div>

            {/* Breakdown list */}
            <ul className="mt-5 space-y-2.5 border-t border-line/70 pt-5">
              {MOCK_LINES.map((l, i) => (
                <li
                  key={l.label}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      aria-hidden
                      className={
                        i === 0
                          ? 'h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400'
                          : i === 1
                            ? 'h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500'
                            : i === 2
                              ? 'h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400'
                              : i === 3
                                ? 'h-1.5 w-1.5 shrink-0 rounded-full bg-brand-dark'
                                : 'h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400'
                      }
                    />
                    <span className="truncate text-graphite-soft">{l.label}</span>
                  </span>
                  <span className="shrink-0 font-semibold text-graphite">
                    {l.amount}
                  </span>
                </li>
              ))}
            </ul>

            {/* Footnote */}
            <p className="mt-4 text-xs text-graphite-muted">
              Предварительный расчёт · финальная цена в&nbsp;договоре
            </p>
          </Card>

          {/* Floating chip 3 — no prepayment */}
          <div
            className="absolute -right-4 -top-3 z-10 hidden animate-fade-in-up rounded-2xl border border-line bg-white px-3 py-2 shadow-lg shadow-graphite/10 sm:flex sm:items-center sm:gap-2"
            style={{ animationDelay: '680ms' }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
              <CheckIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-bold leading-none text-graphite">
                Без предоплаты
              </p>
              <p className="text-[10px] text-graphite-muted">поэтапная оплата</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRightIcon, ClockIcon } from '@/components/ui/icons';

interface Example {
  id: string;
  number: string;
  title: string;
  area: string;
  rooms: string;
  repair: string;
  term: string;
  price: string;
  priceRange: string;
  pricePerSqm: string;
  bestFor: string;
}

const EXAMPLES: Example[] = [
  {
    id: 'studio',
    number: '01',
    title: 'Студия',
    area: '32 м²',
    rooms: '1 комната',
    repair: 'Косметический',
    term: '4–6 недель',
    price: '320 000 ₽',
    priceRange: '280 000 – 360 000',
    pricePerSqm: '8 750 ₽/м²',
    bestFor: 'Под сдачу или первую квартиру',
  },
  {
    id: 'one',
    number: '02',
    title: 'Однокомнатная',
    area: '45 м²',
    rooms: '1 комната',
    repair: 'Капитальный',
    term: '8–12 недель',
    price: '700 000 ₽',
    priceRange: '620 000 – 780 000',
    pricePerSqm: '13 800 ₽/м²',
    bestFor: 'Для пары или одного жильца',
  },
  {
    id: 'two',
    number: '03',
    title: 'Двухкомнатная',
    area: '64 м²',
    rooms: '2 комнаты',
    repair: 'Капитальный',
    term: '8–12 недель',
    price: '1 065 000 ₽',
    priceRange: '950 000 – 1 180 000',
    pricePerSqm: '14 800 ₽/м²',
    bestFor: 'Семейный вариант',
  },
  {
    id: 'three',
    number: '04',
    title: 'Трёхкомнатная',
    area: '88 м²',
    rooms: '3 комнаты',
    repair: 'Дизайнерский',
    term: '12–20 недель',
    price: '2 075 000 ₽',
    priceRange: '1 850 000 – 2 300 000',
    pricePerSqm: '21 000 ₽/м²',
    bestFor: 'Большая семья или премиум',
  },
];

export function Examples() {
  return (
    <section
      id="examples"
      className="relative isolate overflow-hidden bg-surface py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Ориентир по ценам"
          title="Примеры расчётов"
          subtitle="Ориентировочные цифры для типовых квартир. Точная смета — после замера."
        />

        <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EXAMPLES.map((e, i) => (
            <Reveal key={e.id} delay={i * 80} className="h-full">
              <ExampleCard example={e} />
            </Reveal>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-white px-5 py-4 sm:flex-row sm:px-6">
          <p className="flex items-start gap-2 text-xs text-graphite-muted sm:items-center">
            <ClockIcon className="h-4 w-4 shrink-0 text-brand" />
            <span>
              Итоговая цена фиксируется в&nbsp;договоре и&nbsp;не&nbsp;растёт
              в&nbsp;процессе работ.
            </span>
          </p>
          <a
            href="#calculator"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark transition-colors hover:text-brand"
          >
            Получить точный расчёт по&nbsp;своей квартире
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Tech-spec card (Apple product page style).
 * Layout: model number + title header → hairline → hero price → hairline →
 * key/value spec list (each row separated by a hairline) → CTA.
 * Numbers use tabular-nums; palette is restricted to ink greys + a single
 * hairline divider; hover is a barely-there brighten.
 */
function ExampleCard({ example }: { example: Example }) {
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_2px_8px_rgba(15,20,32,0.04),0_8px_24px_rgba(15,20,32,0.06)]"
    >
      {/* ---------- Header: model number + area meta ---------- */}
      <header className="flex items-start justify-between px-6 pt-6">
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-graphite-muted">
          Модель №&thinsp;{example.number}
        </span>
        <span className="text-right">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-graphite-muted">
            Площадь
          </span>
          <span className="mt-1 block font-mono text-sm font-semibold tabular-nums text-graphite">
            {example.area}
          </span>
        </span>
      </header>

      {/* ---------- Title block ---------- */}
      <div className="px-6 pt-5 pb-6">
        <h3 className="text-xl font-semibold leading-tight tracking-tight text-graphite">
          {example.title}
        </h3>
        <p className="mt-1 text-[13px] leading-snug text-graphite-soft">
          {example.bestFor}
        </p>
      </div>

      {/* hairline */}
      <div className="h-px w-full bg-line" />

      {/* ---------- Hero price ---------- */}
      <div className="px-6 pt-8 pb-8 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-graphite-muted">
          Средняя цена работ
        </p>
        <p className="mt-3 font-mono text-[2.25rem] font-medium leading-[0.95] tracking-[-0.02em] tabular-nums text-graphite">
          {example.price}
        </p>
        <p className="mt-2.5 font-mono text-[11px] tabular-nums text-graphite-muted">
          диапазон&nbsp;{example.priceRange}&nbsp;₽
        </p>
      </div>

      {/* hairline */}
      <div className="h-px w-full bg-line" />

      {/* ---------- Spec list (kv) ---------- */}
      <dl className="flex-1 divide-y divide-line">
        <SpecRow label="Планировка" value={example.rooms} />
        <SpecRow label="Ремонт" value={example.repair} />
        <SpecRow label="Срок" value={example.term} />
        <SpecRow label="Цена м²" value={example.pricePerSqm} />
      </dl>

      {/* ---------- CTA ---------- */}
      <a
        href="#calculator"
        className="mt-1 flex items-center justify-center gap-1.5 border-t border-line px-6 py-3.5 text-[13px] font-semibold text-graphite transition-colors duration-200 group-hover:text-brand-dark"
      >
        Рассчитать такую же
        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    </article>
  );
}

/** Key/value spec row inside the tech-spec card. */
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-6 py-3.5">
      <dt className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-graphite-muted">
        {label}
      </dt>
      <dd className="text-right font-mono text-[14px] font-medium tabular-nums text-graphite">
        {value}
      </dd>
    </div>
  );
}

import { HomeIcon, WrenchIcon, CalculatorIcon } from '@/components/ui/icons';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const STEPS = [
  {
    n: 1,
    icon: HomeIcon,
    title: 'Выберите параметры квартиры',
    text: 'Тип жилья, площадь и планировку — за пару кликов.',
  },
  {
    n: 2,
    icon: WrenchIcon,
    title: 'Отметьте нужные работы',
    text: 'Демонтаж, инженерка, отделка — только то, что нужно вам.',
  },
  {
    n: 3,
    icon: CalculatorIcon,
    title: 'Получите предварительный расчёт',
    text: 'Цена вилкой, сроки и состав расчёта сразу на экране.',
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob animate-float-slow h-72 w-72 bg-brand/10 right-[-6rem] top-8" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Процесс"
          title="Как это работает"
          subtitle="Три шага — и вы увидите предварительную смету. Без звонков и ожидания."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.n} delay={i * 100}>
                <Card padded={false} className="card-hover h-full p-7">
                  <div className="flex items-center gap-4">
                    <span className="icon-chip h-12 w-12">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-3xl font-extrabold text-ink-200">0{s.n}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-graphite">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-graphite-soft">{s.text}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

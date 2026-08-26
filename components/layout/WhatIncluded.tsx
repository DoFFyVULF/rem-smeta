import {
  LayersIcon,
  BoltIcon,
  WrenchIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ClockIcon,
} from '@/components/ui/icons';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const ITEMS = [
  {
    icon: LayersIcon,
    title: 'Демонтаж и подготовка',
    text: 'Снос перегородок, вывоз мусора, подготовка поверхностей.',
  },
  {
    icon: BoltIcon,
    title: 'Черновые материалы',
    text: 'Смеси, грунтовки, гидроизоляция, стяжка пола.',
  },
  {
    icon: WrenchIcon,
    title: 'Основные работы',
    text: 'Штукатурка, шпатлёвка, укладка плитки и ламината.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Электрика и сантехника',
    text: 'Разводка, розетки, сантехнические приборы и узлы.',
  },
  {
    icon: SparklesIcon,
    title: 'Чистовая отделка',
    text: 'Покраска, потолки, плинтусы, финишные штрихи.',
  },
  {
    icon: ClockIcon,
    title: 'Организация работ',
    text: 'Бригада, доставка материалов, уборка и контроль качества.',
  },
];

export function WhatIncluded() {
  return (
    <section id="included" className="relative isolate overflow-hidden bg-surface py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob animate-float h-72 w-72 bg-indigo-400/10 left-[-7rem] bottom-0" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Состав расчёта"
          title="Что входит в расчёт"
          subtitle="Калькулятор учитывает основные этапы ремонта под ключ."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.title} delay={(i % 3) * 90}>
                <Card padded={false} className="card-hover h-full p-6">
                  <span className="icon-chip h-11 w-11">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-graphite">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-graphite-soft">{it.text}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

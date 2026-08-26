'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@/components/ui/icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';

const FAQ = [
  {
    q: 'Насколько точный этот расчёт?',
    a: 'Расчёт предварительный. Он помогает сориентироваться по бюджету до выезда замерщика. Точная смета формируется после осмотра объекта.',
  },
  {
    q: 'Нужно ли оставлять телефон?',
    a: 'Нет. Вы можете просто посмотреть цену и скачать расчёт. Телефон нужен только если хотите получить точную смету от специалиста.',
  },
  {
    q: 'Учитываете ли вы материалы?',
    a: 'Калькулятор считает работы с усреднёнными черновыми и расходными материалами. Чистовые материалы (плитка, обои, сантехника) обычно рассчитываются отдельно.',
  },
  {
    q: 'Почему указана вилка цен?',
    a: 'Реальная стоимость зависит от состояния стен, скрытых коммуникаций и выбранных материалов. Вилка показывает диапазон для ваших параметров.',
  },
  {
    q: 'Это бесплатно?',
    a: 'Да, расчёт на сайте бесплатный и ни к чему не обязывает.',
  },
];

export function Faq() {
  // Exclusive accordion: only one panel open at a time (null = all closed).
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative isolate overflow-hidden bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading
          align="center"
          eyebrow="Вопросы и ответы"
          title="Частые вопросы"
          subtitle="Ответы, которые помогут сделать первый шаг к ремонту."
        />

        <div className="mt-12 space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {item.q}
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200',
                      isOpen ? 'bg-brand-soft text-brand-dark' : 'bg-surface text-brand',
                    )}
                  >
                    <ChevronDownIcon
                      className={cn(
                        'h-5 w-5 transition-transform duration-300',
                        isOpen && 'rotate-180',
                      )}
                    />
                  </span>
                </button>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className={cn('accordion-body', isOpen && 'open')}
                >
                  <div className="accordion-inner">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-graphite-soft">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-graphite-muted">
          Расчёт предварительный и не является публичной офертой.
        </p>
      </div>
    </section>
  );
}

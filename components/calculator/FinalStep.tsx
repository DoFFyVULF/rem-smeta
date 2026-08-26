'use client';

import { useCalculator } from '@/hooks/useCalculator';
import { CITIES, CITY_FACTORS } from '@/lib/constants';
import { RadioCard } from '@/components/ui/RadioCard';
import { PinIcon, ClockIcon, AlertIcon } from '@/components/ui/icons';
import type { StepErrors } from '@/lib/validation';
import { LeadForm } from './LeadForm';

export function FinalStep({ errors }: { errors: StepErrors }) {
  const { state, setCity, setUrgent } = useCalculator();
  const designerUrgent = state.repairType === 'designer' && state.urgent;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 text-base font-semibold text-graphite">Город</h3>
        <div className="grid items-stretch gap-3 sm:grid-cols-3">
          {CITIES.map((c) => {
            const factor = CITY_FACTORS[c.id];
            return (
              <RadioCard
                key={c.id}
                name="city"
                selected={state.city === c.id}
                onSelect={() => setCity(c.id)}
                title={c.label}
                description={c.description}
                specs={[
                  { label: 'Коэффициент', value: `×${factor.toFixed(2)}` },
                ]}
                icon={<PinIcon className="h-5 w-5" />}
              />
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-base font-semibold text-graphite">Срочность</h3>
        <div className="grid items-stretch gap-3 sm:grid-cols-2">
          <RadioCard
            name="urgent"
            selected={!state.urgent}
            onSelect={() => setUrgent(false)}
            title="В обычном режиме"
            description="Стандартный график производства работ."
            specs={[
              { label: 'Надбавка', value: 'Без надбавки' },
            ]}
            icon={<ClockIcon className="h-5 w-5" />}
          />
          <RadioCard
            name="urgent"
            selected={state.urgent}
            onSelect={() => setUrgent(true)}
            title="Срочно"
            description="Коэффициент ×1.15 за приоритетную бригаду."
            specs={[
              { label: 'Надбавка', value: '+15%' },
            ]}
            icon={<ClockIcon className="h-5 w-5" />}
          />
        </div>
        {designerUrgent && (
          <p className="mt-3 flex items-start gap-2 rounded-xl bg-danger-soft px-3 py-2 text-sm text-danger">
            <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
            Срочный дизайнерский ремонт сильно ограничивает выбор материалов и бригад — сроки и
            цена могут вырасти сильнее расчётных.
          </p>
        )}
      </div>

      <div className="border-t border-line pt-6">
        <h3 className="mb-4 text-base font-semibold text-graphite">Контакт для точной сметы</h3>
        <LeadForm errors={errors} />
      </div>
    </div>
  );
}

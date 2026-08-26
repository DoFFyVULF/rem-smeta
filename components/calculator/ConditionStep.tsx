'use client';

import { useCalculator } from '@/hooks/useCalculator';
import { CONDITIONS, CONDITION_FACTORS } from '@/lib/constants';
import { RadioCard } from '@/components/ui/RadioCard';
import {
  BuildingIcon,
  WrenchIcon,
  SparklesIcon,
  LayersIcon,
} from '@/components/ui/icons';
import type { ApartmentCondition } from '@/lib/types';

const ICONS: Record<ApartmentCondition, typeof BuildingIcon> = {
  new_no_finish: BuildingIcon,
  white_box: LayersIcon,
  secondary_old: WrenchIcon,
  after_cosmetic: SparklesIcon,
};

export function ConditionStep() {
  const { state, setCondition } = useCalculator();

  return (
    <div className="space-y-4">
      <div className="grid items-stretch gap-3 sm:grid-cols-2">
        {CONDITIONS.map((c) => {
          const Icon = ICONS[c.id];
          const factor = CONDITION_FACTORS[c.id];
          return (
            <RadioCard
              key={c.id}
              name="condition"
              selected={state.condition === c.id}
              onSelect={() => setCondition(c.id)}
              title={c.label}
              description={c.description}
              specs={[
                { label: 'Коэффициент', value: `×${factor.toFixed(2)}` },
              ]}
              icon={<Icon className="h-5 w-5" />}
            />
          );
        })}
      </div>

      <p className="text-sm text-graphite-muted">
        От состояния зависит объём подготовительных работ и список дополнительных опций на
        следующем шаге.
      </p>
    </div>
  );
}

'use client';

import { useCalculator } from '@/hooks/useCalculator';
import { EXTRA_WORKS, isExtraAvailable } from '@/lib/constants';
import { CheckboxCard } from '@/components/ui/CheckboxCard';
import {
  DemolishIcon,
  BoltIcon,
  BathroomIcon,
  WallIcon,
  FloorIcon,
  CeilingIcon,
  BalconyIcon,
  DoorIcon,
} from '@/components/ui/icons';

const EXTRA_ICONS: Record<string, typeof DemolishIcon> = {
  demolition: DemolishIcon,
  electrical: BoltIcon,
  plumbing: BathroomIcon,
  wallAlignment: WallIcon,
  floorReplacement: FloorIcon,
  stretchCeiling: CeilingIcon,
  bathroomTurnkey: BathroomIcon,
  balconyTurnkey: BalconyIcon,
  interiorDoors: DoorIcon,
};

export function ExtrasStep() {
  const { state, toggleExtra } = useCalculator();

  return (
    <div className="space-y-4">
      <p className="text-sm text-graphite-muted">
        Отметьте только то, что нужно. Можно пропустить и перейти к финальному шагу.
      </p>

      <div className="grid items-stretch gap-3 sm:grid-cols-2">
        {EXTRA_WORKS.map((e) => {
          const checked = !!state.extras[e.id];
          const available = isExtraAvailable(e.id, state.condition);
          const description = available
            ? e.description
            : e.id === 'demolition'
              ? 'В новостройке обычно не требуется.'
              : 'Недоступно для выбранного состояния квартиры.';
          const Icon = EXTRA_ICONS[e.id] ?? undefined;

          return (
            <CheckboxCard
              key={e.id}
              id={`extra-${e.id}`}
              checked={checked}
              onChange={() => toggleExtra(e.id)}
              disabled={!available}
              title={e.label}
              description={description}
              specs={[
                { label: 'Стоимость', value: e.priceLabel },
              ]}
              icon={<Icon className="h-5 w-5" />}
            />
          );
        })}
      </div>
    </div>
  );
}

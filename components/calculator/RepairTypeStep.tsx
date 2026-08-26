'use client';

import { useCalculator } from '@/hooks/useCalculator';
import { REPAIR_TYPES } from '@/lib/constants';
import { RadioCard } from '@/components/ui/RadioCard';
import { SparklesIcon, HammerIcon, ShieldCheckIcon, PaletteIcon } from '@/components/ui/icons';
import { InfoIcon } from '@/components/ui/icons';
import { formatNumber } from '@/lib/format';
import type { RepairType } from '@/lib/types';

const ICONS: Record<RepairType, typeof SparklesIcon> = {
  cosmetic: SparklesIcon,
  capital: HammerIcon,
  designer: PaletteIcon,
  turnkey: ShieldCheckIcon,
};

export function RepairTypeStep() {
  const { state, setRepairType } = useCalculator();
  const smallForDesigner = state.repairType === 'designer' && state.area < 30;

  return (
    <div className="space-y-4">
      <div className="grid items-stretch gap-3 sm:grid-cols-2">
        {REPAIR_TYPES.map((r) => {
          const Icon = ICONS[r.id];
          return (
            <RadioCard
              key={r.id}
              name="repairType"
              selected={state.repairType === r.id}
              onSelect={() => setRepairType(r.id)}
              title={r.label}
              description={r.description}
              specs={[
                { label: '₽/м² · от', value: formatNumber(r.priceFrom) },
                { label: 'Срок', value: `${r.weeks[0]}–${r.weeks[1]} нед` },
              ]}
              icon={<Icon className="h-5 w-5" />}
            />
          );
        })}
      </div>

      {smallForDesigner && (
        <p className="flex items-start gap-2 rounded-xl bg-brand-soft px-3 py-2 text-sm text-brand-dark">
          <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
          Дизайнерский ремонт на площади меньше 30 м² редко бывает оправдан — подумайте, не
          достаточно ли капитального.
        </p>
      )}
    </div>
  );
}

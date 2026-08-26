'use client';

import { useCalculator } from '@/hooks/useCalculator';
import { STEP_TITLES } from '@/lib/constants';
import { StepDots } from '@/components/ui/ProgressBar';
import { StepStepper } from '@/components/ui/StepStepper';
import { ApartmentParamsStep } from './ApartmentParamsStep';
import { RepairTypeStep } from './RepairTypeStep';
import { ConditionStep } from './ConditionStep';
import { ExtrasStep } from './ExtrasStep';
import { FinalStep } from './FinalStep';
import type { StepErrors } from '@/lib/validation';

const STEP_COMPONENTS: Record<number, (props: { errors: StepErrors }) => React.ReactElement> = {
  1: ApartmentParamsStep,
  2: RepairTypeStep,
  3: ConditionStep,
  4: ExtrasStep,
  5: FinalStep,
};

export function StepShell({ errors }: { errors: StepErrors }) {
  const { state } = useCalculator();
  const step = state.step;
  const meta = STEP_TITLES[step];
  const StepComponent = STEP_COMPONENTS[step] ?? ApartmentParamsStep;

  return (
    <div>
      <div className="mb-8 hidden sm:block">
        <StepStepper current={step} total={5} />
        <p className="mt-4 text-sm font-medium text-graphite-muted">
          Шаг {step} из 5
        </p>
      </div>
      <div className="mb-6 sm:hidden">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-graphite-muted">Шаг {step} из 5</span>
          <StepDots current={step} total={5} />
        </div>
      </div>

      {meta && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-graphite sm:text-2xl">{meta.title}</h2>
          <p className="mt-1 text-sm text-graphite-soft">{meta.hint}</p>
        </div>
      )}

      <div key={step} className="animate-fade-in-up">
        <StepComponent errors={errors} />
      </div>
    </div>
  );
}

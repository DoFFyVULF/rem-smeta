'use client';

import { useRef, useState } from 'react';
import { useCalculator } from '@/hooks/useCalculator';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeftIcon, ArrowRightIcon, RefreshIcon } from '@/components/ui/icons';
import { StepShell } from './StepShell';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PriceSummary } from './PriceSummary';
import { SuccessScreen } from './SuccessScreen';
import { validateStep, validateContact, type StepErrors } from '@/lib/validation';
import { formatRange, formatTimeline } from '@/lib/format';
import { STEP_COUNT } from '@/lib/constants';

export function CalculatorWizard() {
  const {
    state,
    estimate,
    next,
    prev,
    reset,
    resumeAvailable,
    resume,
    discardDraft,
  } = useCalculator();

  const [phase, setPhase] = useState<'form' | 'success'>('form');
  const [errors, setErrors] = useState<StepErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const step = state.step;
  const isLast = step === STEP_COUNT;

  /**
   * Scroll the **form card** (not the whole section) into view when the
   * step changes. Called explicitly from the user-action handlers below
   * (handleNext / handleBack / handleSubmit) so it never fires on mount
   * or on draft hydration.
   */
  const scrollToForm = () => {
    formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNext = () => {
    const stepErrors = validateStep(state, step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      scrollToForm();
      return;
    }
    setErrors({});
    if (isLast) {
      handleSubmit();
    } else {
      next();
    }
  };

  const handleSubmit = () => {
    const contactErrors = validateContact(state);
    if (Object.keys(contactErrors).length > 0) {
      setErrors(contactErrors);
      scrollToForm();
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Demo-only: simulate a request, then show success. Draft is auto-saved.
    setTimeout(() => {
      setSubmitting(false);
      setPhase('success');
    }, 1200);
  };

  const handleBack = () => {
    setErrors({});
    prev();
  };

  const handleReset = () => {
    reset();
    setErrors({});
    setPhase('form');
  };

  return (
    <section id="calculator" ref={sectionRef} className="scroll-mt-20 relative isolate overflow-hidden bg-surface py-16 md:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob animate-float h-72 w-72 bg-brand/15 left-[-8rem] top-24" />
        <div className="blob animate-float-slow h-80 w-80 bg-indigo-400/10 right-[-10rem] bottom-10" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Онлайн-калькулятор"
          title="Рассчитайте стоимость за 5 шагов"
          subtitle="Ответьте на несколько вопросов — и получите предварительную смету сразу на экране."
        />

        {resumeAvailable && (
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-brand/25 bg-brand-soft/80 p-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-brand-dark">
              Мы сохранили ваш предыдущий расчёт. Продолжить с того же места?
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={resume} leftIcon={<ArrowRightIcon className="h-4 w-4" />}>
                Продолжить
              </Button>
              <Button size="sm" variant="ghost" onClick={discardDraft}>
                Начать заново
              </Button>
            </div>
          </div>
        )}

        {phase === 'success' ? (
          <div className="mt-8">
            <SuccessScreen onReset={handleReset} />
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <Card
              ref={formCardRef}
              className="scroll-mt-24 rounded-3xl p-5 shadow-lg sm:p-7"
            >
              <StepShell errors={errors} />

              <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
                {step > 1 ? (
                  <Button variant="ghost" onClick={handleBack} leftIcon={<ArrowLeftIcon className="h-5 w-5" />}>
                    Назад
                  </Button>
                ) : (
                  <span />
                )}
                <Button
                  className="hidden sm:inline-flex"
                  onClick={handleNext}
                  disabled={submitting}
                  rightIcon={!isLast && !submitting ? <ArrowRightIcon className="h-5 w-5" /> : undefined}
                >
                  {submitting
                    ? 'Отправляем…'
                    : isLast
                      ? 'Получить расчёт'
                      : 'Далее'}
                </Button>
              </div>
            </Card>

            <div className="hidden lg:block">
              <div className="sticky top-24">
                <PriceSummary />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky bar */}
      {phase === 'form' && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 py-3 backdrop-blur sm:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-graphite">
                {formatRange(estimate.minPrice, estimate.maxPrice)}
              </p>
              <p className="text-xs text-graphite-muted">
                {formatTimeline(estimate.timeline.minWeeks, estimate.timeline.maxWeeks)}
              </p>
            </div>
            <Button onClick={handleNext} disabled={submitting} size="sm">
              {submitting ? 'Отправляем…' : isLast ? 'Получить расчёт' : 'Далее'}
            </Button>
          </div>
        </div>
      )}
      {phase === 'form' && <div className="h-20 sm:hidden" aria-hidden />}
    </section>
  );
}

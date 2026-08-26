import { CalculatorProvider } from '@/hooks/useCalculator';
import { Hero } from '@/components/layout/Hero';
import { HowItWorks } from '@/components/layout/HowItWorks';
import { WhatIncluded } from '@/components/layout/WhatIncluded';
import { Examples } from '@/components/layout/Examples';
import { CalculatorWizard } from '@/components/calculator/CalculatorWizard';
import { Faq } from '@/components/layout/Faq';

export default function Home() {
  return (
    <CalculatorProvider>
      <Hero />
      <HowItWorks />
      <WhatIncluded />
      <Examples />
      <CalculatorWizard />
      <Faq />
    </CalculatorProvider>
  );
}

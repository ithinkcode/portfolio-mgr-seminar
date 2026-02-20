'use client';

import { WizardShell } from '@/components/onboarding/WizardShell';
import { AnimatedPage } from '@/components/shared/AnimatedPage';

export default function OnboardingPage() {
  return (
    <AnimatedPage>
      <WizardShell />
    </AnimatedPage>
  );
}

'use client';

import { useOnboardingStore } from '@/stores/onboardingStore';
import { Button } from '@/components/ui/Button';
import { Sparkles } from 'lucide-react';

export function Step0() {
  const { nextStep } = useOnboardingStore();

  return (
    <div>
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 inline-flex rounded-full bg-accent-gold/10 p-4">
          <Sparkles size={28} className="text-accent-gold" />
        </div>
        <h2 className="font-display text-3xl font-bold">Let&apos;s build your portfolio</h2>
        <p className="mt-3 text-text-secondary">
          We&apos;ll walk you through a few simple steps to create your professional portfolio.
          It only takes a few minutes.
        </p>
      </div>

      <div className="flex justify-center">
        <Button variant="primary" size="lg" onClick={nextStep}>
          Get Started
        </Button>
      </div>
    </div>
  );
}

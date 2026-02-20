'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Step0 } from './steps/Step0';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Step4 } from './steps/Step4';
import { Step5 } from './steps/Step5';
import { Step6 } from './steps/Step6';
import { Step7 } from './steps/Step7';
import { Step8 } from './steps/Step8';
import { Step9 } from './steps/Step9';
import { Step10 } from './steps/Step10';

const steps = [Step0, Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Step10];

export function WizardShell() {
  const { currentStep, nextStep, prevStep } = useOnboardingStore();
  const StepComponent = steps[currentStep];

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <StepIndicator currentStep={currentStep} totalSteps={11} className="mb-10" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <StepComponent />
        </motion.div>
      </AnimatePresence>

      {currentStep < 10 && (
        <div className="mt-10 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="gap-1"
          >
            <ChevronLeft size={16} /> Back
          </Button>
          <Button variant="primary" onClick={nextStep} className="gap-1">
            Continue <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}

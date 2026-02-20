'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const stepLabels = [
  'Resume', 'Identity', 'Story', 'Skills', 'Experience',
  'Education', 'Projects', 'Extras', 'Contact', 'Theme', 'Launch',
];

export function StepIndicator({ currentStep, totalSteps, className }: StepIndicatorProps) {
  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>Step {currentStep + 1} of {totalSteps}</span>
        <span className="font-medium text-text-secondary">{stepLabels[currentStep]}</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-surface-border">
        <motion.div
          className="h-full rounded-full bg-accent-gold"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        />
      </div>
    </div>
  );
}

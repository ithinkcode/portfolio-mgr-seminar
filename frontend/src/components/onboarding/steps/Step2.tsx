'use client';

import { useOnboardingStore } from '@/stores/onboardingStore';
import { Textarea } from '@/components/ui/Textarea';

export function Step2() {
  const { summary, updateField } = useOnboardingStore();

  return (
    <div>
      <h2 className="font-display text-3xl font-bold mb-2">Your Story</h2>
      <p className="text-text-secondary mb-8">
        Tell us about yourself in 2-3 paragraphs. What drives you? What do you bring to a team?
      </p>

      <Textarea
        value={summary}
        onChange={(e) => updateField('summary', e.target.value)}
        placeholder="I'm a passionate engineer who loves building things that matter..."
        maxLength={5000}
        showCount
        className="min-h-[240px]"
      />

      <div className="mt-4 rounded-lg bg-surface-overlay/50 p-4 border border-surface-border">
        <p className="text-xs text-text-muted leading-relaxed">
          <strong className="text-text-secondary">Think about:</strong> your technical philosophy,
          what excites you about building software, and what makes you different from other engineers.
        </p>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Sparkles, FileText } from 'lucide-react';

export function Step0() {
  const { nextStep, prefillFromResume } = useOnboardingStore();
  const [resumeText, setResumeText] = useState('');
  const [parsing, setParsing] = useState(false);

  const handleParse = async () => {
    if (!resumeText.trim()) return;
    setParsing(true);
    try {
      const parsed = await api.portfolio.parseResume(resumeText);
      prefillFromResume({
        headline: parsed.headline || '',
        summary: parsed.summary || '',
        skills: parsed.skills || [],
        experience: parsed.experience || [],
        education: parsed.education || [],
        contact: parsed.contact || {},
      });
      toast.success('Resume parsed! We pre-filled your info.');
      nextStep();
    } catch {
      toast.error('Could not parse resume. Try starting fresh.');
    } finally {
      setParsing(false);
    }
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 inline-flex rounded-full bg-accent-gold/10 p-4">
          <Sparkles size={28} className="text-accent-gold" />
        </div>
        <h2 className="font-display text-3xl font-bold">Let&apos;s build your portfolio</h2>
        <p className="mt-3 text-text-secondary">
          Answer questions step by step, or paste your resume to get a head start.
        </p>
      </div>

      <div className="rounded-xl border border-surface-border bg-surface-raised p-6">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={16} className="text-text-muted" />
          <label className="text-sm font-medium text-text-secondary">Paste your resume text (optional)</label>
        </div>
        <Textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume content here..."
          className="min-h-[200px]"
        />
        <div className="mt-4 flex gap-3">
          <Button variant="primary" onClick={handleParse} disabled={!resumeText.trim() || parsing}>
            {parsing ? 'Parsing...' : 'Parse & Pre-fill'}
          </Button>
          <Button variant="ghost" onClick={nextStep}>
            Start Fresh
          </Button>
        </div>
      </div>
    </div>
  );
}

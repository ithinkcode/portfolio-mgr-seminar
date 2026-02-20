'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { slugify } from '@/lib/utils';
import { Rocket, PartyPopper, Link as LinkIcon, Save } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export function Step10() {
  const router = useRouter();
  const store = useOnboardingStore();
  const { save, publish } = usePortfolio();
  const [publishing, setPublishing] = useState(false);
  const [saving, setSaving] = useState(false);

  const slug = store.slug || slugify(`${store.firstName} ${store.lastName}`);

  const buildPayload = () => ({
    headline: store.headline,
    summary: store.summary,
    photoBase64: store.photoBase64,
    skills: store.skills,
    experience: store.experience,
    education: store.education,
    projects: store.projects,
    certifications: store.certifications,
    languages: store.languages,
    contact: store.contact,
    theme: store.theme,
    slug,
  });

  const handlePublish = async () => {
    setPublishing(true);
    try {
      await save(buildPayload());
      await publish();
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      toast.success('Portfolio published!');
      store.reset();
      setTimeout(() => router.push('/dashboard'), 1500);
    } catch {
      toast.error('Failed to publish. Please try again.');
    } finally {
      setPublishing(false);
    }
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      await save(buildPayload());
      toast.success('Saved as draft!');
      store.reset();
      router.push('/dashboard');
    } catch {
      toast.error('Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 inline-flex rounded-full bg-accent-gold/10 p-4">
          <PartyPopper size={28} className="text-accent-gold" />
        </div>
        <h2 className="font-display text-3xl font-bold">Ready to Launch!</h2>
        <p className="mt-2 text-text-secondary">Review your portfolio and go live.</p>
      </div>

      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <LinkIcon size={16} className="text-text-muted" />
          <label className="text-sm font-medium text-text-secondary">Your Portfolio URL</label>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-muted shrink-0">{typeof window !== 'undefined' ? window.location.origin : ''}/p/</span>
          <Input
            value={store.slug || slug}
            onChange={(e) => store.updateField('slug', slugify(e.target.value))}
            className="flex-1"
          />
        </div>
      </Card>

      {/* Summary card */}
      <Card className="mb-8">
        <h3 className="font-display text-lg font-semibold mb-3">Portfolio Summary</h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <span className="text-text-muted">Name</span>
          <span>{store.firstName} {store.lastName}</span>
          <span className="text-text-muted">Headline</span>
          <span>{store.headline || '—'}</span>
          <span className="text-text-muted">Skills</span>
          <span>{store.skills.length} skills</span>
          <span className="text-text-muted">Experience</span>
          <span>{store.experience.length} positions</span>
          <span className="text-text-muted">Projects</span>
          <span>{store.projects.length} projects</span>
          <span className="text-text-muted">Theme</span>
          <span className="capitalize">{store.theme}</span>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button variant="primary" size="lg" onClick={handlePublish} disabled={publishing || saving} className="flex-1 gap-2">
          <Rocket size={18} />
          {publishing ? 'Publishing...' : 'Publish Portfolio'}
        </Button>
        <Button variant="secondary" size="lg" onClick={handleSaveDraft} disabled={publishing || saving} className="gap-2">
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Draft'}
        </Button>
      </div>
    </div>
  );
}

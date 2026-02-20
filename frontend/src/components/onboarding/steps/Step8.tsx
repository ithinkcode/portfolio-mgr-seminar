'use client';

import { useOnboardingStore } from '@/stores/onboardingStore';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Mail, Linkedin, Github, Twitter, Globe } from 'lucide-react';

export function Step8() {
  const { contact, updateField } = useOnboardingStore();
  const { user } = useAuth();

  useEffect(() => {
    if (user && !contact.email) {
      updateField('contact', { ...contact, email: user.email });
    }
  }, [user, contact, updateField]);

  const update = (field: string, value: string) => {
    updateField('contact', { ...contact, [field]: value });
  };

  return (
    <div>
      <h2 className="font-display text-3xl font-bold mb-2">Contact & Links</h2>
      <p className="text-text-secondary mb-8">How can people reach you?</p>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail size={18} className="text-text-muted shrink-0" />
          <Input placeholder="Email" value={contact.email || ''} onChange={(e) => update('email', e.target.value)} />
        </div>
        <div className="flex items-center gap-3">
          <Linkedin size={18} className="text-text-muted shrink-0" />
          <Input placeholder="LinkedIn URL" value={contact.linkedin || ''} onChange={(e) => update('linkedin', e.target.value)} />
        </div>
        <div className="flex items-center gap-3">
          <Github size={18} className="text-text-muted shrink-0" />
          <Input placeholder="GitHub URL" value={contact.github || ''} onChange={(e) => update('github', e.target.value)} />
        </div>
        <div className="flex items-center gap-3">
          <Twitter size={18} className="text-text-muted shrink-0" />
          <Input placeholder="Twitter/X URL" value={contact.twitter || ''} onChange={(e) => update('twitter', e.target.value)} />
        </div>
        <div className="flex items-center gap-3">
          <Globe size={18} className="text-text-muted shrink-0" />
          <Input placeholder="Personal Website" value={contact.website || ''} onChange={(e) => update('website', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

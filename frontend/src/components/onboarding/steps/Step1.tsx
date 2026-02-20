'use client';

import { useEffect, useState } from 'react';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import { FileUpload } from '@/components/ui/FileUpload';

const placeholders = [
  'Full-Stack Developer',
  'Systems Engineer & Problem Solver',
  'Creative Technologist',
  'Backend Architect',
  'Data Engineer & Builder',
];

export function Step1() {
  const { user } = useAuth();
  const { firstName, lastName, headline, photoBase64, updateField } = useOnboardingStore();
  const [phIndex, setPhIndex] = useState(0);

  useEffect(() => {
    if (user && !firstName) updateField('firstName', user.firstName);
    if (user && !lastName) updateField('lastName', user.lastName);
  }, [user, firstName, lastName, updateField]);

  useEffect(() => {
    const timer = setInterval(() => setPhIndex((i) => (i + 1) % placeholders.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h2 className="font-display text-3xl font-bold mb-2">Who are you?</h2>
      <p className="text-text-secondary mb-8">Let&apos;s start with the basics.</p>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm text-text-secondary">First Name</label>
            <Input value={firstName} onChange={(e) => updateField('firstName', e.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm text-text-secondary">Last Name</label>
            <Input value={lastName} onChange={(e) => updateField('lastName', e.target.value)} />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-text-secondary">Professional Headline</label>
          <Input
            value={headline}
            onChange={(e) => updateField('headline', e.target.value)}
            placeholder={placeholders[phIndex]}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-text-secondary">Profile Photo</label>
          <FileUpload value={photoBase64} onChange={(v) => updateField('photoBase64', v)} />
        </div>
      </div>
    </div>
  );
}

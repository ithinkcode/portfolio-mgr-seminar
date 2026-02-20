'use client';

import { useOnboardingStore } from '@/stores/onboardingStore';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Plus, Trash2 } from 'lucide-react';
import type { Certification, Language } from '@/types';

const proficiencyOptions = [
  { value: 'Native', label: 'Native' },
  { value: 'Fluent', label: 'Fluent' },
  { value: 'Advanced', label: 'Advanced' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Basic', label: 'Basic' },
];

export function Step7() {
  const { certifications, languages, updateField } = useOnboardingStore();

  const addCert = () => {
    const item: Certification = { name: '', issuer: '', year: '' };
    updateField('certifications', [...certifications, item]);
  };
  const removeCert = (i: number) => updateField('certifications', certifications.filter((_, idx) => idx !== i));
  const updateCert = (i: number, field: keyof Certification, value: string) => {
    const items = [...certifications];
    items[i] = { ...items[i], [field]: value };
    updateField('certifications', items);
  };

  const addLang = () => {
    const item: Language = { language: '', proficiency: 'Intermediate' };
    updateField('languages', [...languages, item]);
  };
  const removeLang = (i: number) => updateField('languages', languages.filter((_, idx) => idx !== i));
  const updateLang = (i: number, field: keyof Language, value: string) => {
    const items = [...languages];
    items[i] = { ...items[i], [field]: value };
    updateField('languages', items);
  };

  return (
    <div>
      <h2 className="font-display text-3xl font-bold mb-2">Extras</h2>
      <p className="text-text-secondary mb-8">Certifications and languages give your profile more depth.</p>

      <div className="mb-10">
        <h3 className="font-display text-lg font-semibold mb-4">Certifications</h3>
        {certifications.map((cert, i) => (
          <Card key={i} className="mb-2 flex items-center gap-3">
            <Input placeholder="Name" value={cert.name} onChange={(e) => updateCert(i, 'name', e.target.value)} className="flex-1" />
            <Input placeholder="Issuer" value={cert.issuer} onChange={(e) => updateCert(i, 'issuer', e.target.value)} className="flex-1" />
            <Input placeholder="Year" value={cert.year} onChange={(e) => updateCert(i, 'year', e.target.value)} className="w-24" />
            <button onClick={() => removeCert(i)} className="text-text-muted hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
          </Card>
        ))}
        <Button variant="secondary" onClick={addCert} className="mt-2 gap-1 w-full" size="sm">
          <Plus size={14} /> Add Certification
        </Button>
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold mb-4">Languages</h3>
        {languages.map((lang, i) => (
          <Card key={i} className="mb-2 flex items-center gap-3">
            <Input placeholder="Language" value={lang.language} onChange={(e) => updateLang(i, 'language', e.target.value)} className="flex-1" />
            <Select options={proficiencyOptions} value={lang.proficiency} onChange={(e) => updateLang(i, 'proficiency', e.target.value)} className="w-40" />
            <button onClick={() => removeLang(i)} className="text-text-muted hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
          </Card>
        ))}
        <Button variant="secondary" onClick={addLang} className="mt-2 gap-1 w-full" size="sm">
          <Plus size={14} /> Add Language
        </Button>
      </div>
    </div>
  );
}

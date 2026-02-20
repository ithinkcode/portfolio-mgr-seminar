'use client';

import { useOnboardingStore } from '@/stores/onboardingStore';
import { Input } from '@/components/ui/Input';
import { TagInput } from '@/components/ui/TagInput';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Education } from '@/types';

export function Step5() {
  const { education, updateField } = useOnboardingStore();

  const add = () => {
    const newEdu: Education = { institution: '', degree: '', field: '', year: '', achievements: [] };
    updateField('education', [...education, newEdu]);
  };

  const remove = (i: number) => {
    updateField('education', education.filter((_, idx) => idx !== i));
  };

  const update = (i: number, field: keyof Education, value: unknown) => {
    const items = [...education];
    items[i] = { ...items[i], [field]: value };
    updateField('education', items);
  };

  return (
    <div>
      <h2 className="font-display text-3xl font-bold mb-2">Education</h2>
      <p className="text-text-secondary mb-8">Where did you learn your craft?</p>

      <AnimatePresence mode="popLayout">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            layout
          >
            <Card className="mb-3 space-y-3">
              <div className="flex items-start justify-between">
                <div className="grid grid-cols-2 gap-3 flex-1">
                  <Input placeholder="Institution" value={edu.institution} onChange={(e) => update(i, 'institution', e.target.value)} />
                  <Input placeholder="Degree (e.g., B.Sc.)" value={edu.degree} onChange={(e) => update(i, 'degree', e.target.value)} />
                  <Input placeholder="Field of Study" value={edu.field} onChange={(e) => update(i, 'field', e.target.value)} />
                  <Input placeholder="Graduation Year" value={edu.year} onChange={(e) => update(i, 'year', e.target.value)} />
                </div>
                <button onClick={() => remove(i)} className="ml-3 mt-2 text-text-muted hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
              <div>
                <label className="mb-2 block text-xs text-text-muted">Achievements / Honors</label>
                <TagInput tags={edu.achievements} onChange={(v) => update(i, 'achievements', v)} placeholder="Add achievement..." />
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button variant="secondary" onClick={add} className="mt-2 gap-1 w-full">
        <Plus size={14} /> Add Education
      </Button>
    </div>
  );
}

'use client';

import { useOnboardingStore } from '@/stores/onboardingStore';
import { Input } from '@/components/ui/Input';
import { TagInput } from '@/components/ui/TagInput';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Experience } from '@/types';

export function Step4() {
  const { experience, updateField } = useOnboardingStore();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(experience.length > 0 ? 0 : null);

  const add = () => {
    const newExp: Experience = { company: '', role: '', startDate: '', endDate: null, highlights: [] };
    updateField('experience', [...experience, newExp]);
    setExpandedIndex(experience.length);
  };

  const remove = (i: number) => {
    updateField('experience', experience.filter((_, idx) => idx !== i));
    setExpandedIndex(null);
  };

  const update = (i: number, field: keyof Experience, value: unknown) => {
    const items = [...experience];
    items[i] = { ...items[i], [field]: value };
    updateField('experience', items);
  };

  return (
    <div>
      <h2 className="font-display text-3xl font-bold mb-2">Experience</h2>
      <p className="text-text-secondary mb-8">Add your work experience. Most recent first.</p>

      <AnimatePresence mode="popLayout">
        {experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            layout
          >
            <Card className="mb-3">
              <button
                type="button"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <div>
                  <p className="font-medium text-sm">{exp.role || 'New Position'}</p>
                  <p className="text-xs text-text-muted">{exp.company || 'Company'}</p>
                </div>
                {expandedIndex === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              <AnimatePresence>
                {expandedIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-3 border-t border-surface-border pt-4">
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="Company" value={exp.company} onChange={(e) => update(i, 'company', e.target.value)} />
                        <Input placeholder="Role / Title" value={exp.role} onChange={(e) => update(i, 'role', e.target.value)} />
                        <Input placeholder="Start (YYYY-MM)" value={exp.startDate} onChange={(e) => update(i, 'startDate', e.target.value)} />
                        <Input placeholder="End (YYYY-MM or empty for Present)" value={exp.endDate || ''} onChange={(e) => update(i, 'endDate', e.target.value || null)} />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs text-text-muted">Highlights</label>
                        <TagInput tags={exp.highlights} onChange={(v) => update(i, 'highlights', v)} placeholder="Add a highlight and press Enter..." />
                      </div>
                      <button onClick={() => remove(i)} className="flex items-center gap-1 text-xs text-red-400/60 hover:text-red-400 transition-colors">
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button variant="secondary" onClick={add} className="mt-2 gap-1 w-full">
        <Plus size={14} /> Add Experience
      </Button>
    </div>
  );
}

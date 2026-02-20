'use client';

import { useState } from 'react';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { StarRating } from '@/components/ui/StarRating';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Skill } from '@/types';

const categoryOptions = [
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Backend', label: 'Backend' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Data', label: 'Data' },
  { value: 'Design', label: 'Design' },
  { value: 'Other', label: 'Other' },
];

const suggestedSkills = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'Docker', 'AWS', 'CSS'];

export function Step3() {
  const { skills, updateField } = useOnboardingStore();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [proficiency, setProficiency] = useState(3);

  const addSkill = (skillName?: string) => {
    const n = skillName || name.trim();
    if (!n || skills.some((s) => s.name.toLowerCase() === n.toLowerCase())) return;
    updateField('skills', [...skills, { name: n, proficiency, category }]);
    setName('');
    setProficiency(3);
  };

  const removeSkill = (index: number) => {
    updateField('skills', skills.filter((_, i) => i !== index));
  };

  const unusedSuggestions = suggestedSkills.filter((s) => !skills.some((sk) => sk.name.toLowerCase() === s.toLowerCase()));

  return (
    <div>
      <h2 className="font-display text-3xl font-bold mb-2">Your Skills</h2>
      <p className="text-text-secondary mb-8">Add your technical skills and rate your proficiency.</p>

      <div className="rounded-xl border border-surface-border bg-surface-raised p-5 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Skill name" className="flex-1"
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
          />
          <Select options={categoryOptions} value={category} onChange={(e) => setCategory(e.target.value)} className="w-36" />
          <StarRating value={proficiency} onChange={setProficiency} />
          <Button variant="primary" size="sm" onClick={() => addSkill()} className="gap-1">
            <Plus size={14} /> Add
          </Button>
        </div>
      </div>

      {unusedSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs text-text-muted self-center">Quick add:</span>
          {unusedSuggestions.map((s) => (
            <button
              key={s}
              onClick={() => addSkill(s)}
              className="rounded-md border border-surface-border px-2.5 py-1 text-xs text-text-muted hover:text-accent-gold hover:border-accent-gold/30 transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="popLayout">
        {skills.map((skill: Skill, i: number) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            layout
          >
            <Card className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-xs text-text-muted">{skill.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <StarRating value={skill.proficiency} readonly size={14} />
                <button onClick={() => removeSkill(i)} className="text-text-muted hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

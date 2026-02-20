'use client';

import { useOnboardingStore } from '@/stores/onboardingStore';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { TagInput } from '@/components/ui/TagInput';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Plus, Trash2, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/types';

export function Step6() {
  const { projects, updateField } = useOnboardingStore();

  const add = () => {
    const newProj: Project = { title: '', description: '', techStack: [] };
    updateField('projects', [...projects, newProj]);
  };

  const remove = (i: number) => {
    updateField('projects', projects.filter((_, idx) => idx !== i));
  };

  const update = (i: number, field: keyof Project, value: unknown) => {
    const items = [...projects];
    items[i] = { ...items[i], [field]: value };
    updateField('projects', items);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Rocket size={24} className="text-accent-gold" />
          <h2 className="font-display text-3xl font-bold">Projects</h2>
        </div>
        <p className="text-text-secondary">Show off your best work. This is what makes you stand out.</p>
      </div>

      <AnimatePresence mode="popLayout">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            layout
          >
            <Card className="mb-4 space-y-3">
              <div className="flex items-start justify-between">
                <Input placeholder="Project Title" value={proj.title} onChange={(e) => update(i, 'title', e.target.value)} className="flex-1" />
                <button onClick={() => remove(i)} className="ml-3 mt-2 text-text-muted hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
              <Textarea placeholder="What does this project do? What problems does it solve?" value={proj.description} onChange={(e) => update(i, 'description', e.target.value)} className="min-h-[80px]" />
              <TagInput
                tags={proj.techStack}
                onChange={(v) => update(i, 'techStack', v)}
                placeholder="Add technologies..."
                suggestions={['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL']}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Live URL (optional)" value={proj.liveUrl || ''} onChange={(e) => update(i, 'liveUrl', e.target.value)} />
                <Input placeholder="Repo URL (optional)" value={proj.repoUrl || ''} onChange={(e) => update(i, 'repoUrl', e.target.value)} />
              </div>
              {proj.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.techStack.map((t) => (
                    <Badge key={t} variant="gold">{t}</Badge>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button variant="secondary" onClick={add} className="mt-2 gap-1 w-full">
        <Plus size={14} /> Add Project
      </Button>
    </div>
  );
}

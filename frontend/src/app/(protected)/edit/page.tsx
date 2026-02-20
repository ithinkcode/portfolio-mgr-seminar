'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { usePortfolio } from '@/hooks/usePortfolio';
import { AnimatedPage } from '@/components/shared/AnimatedPage';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { TagInput } from '@/components/ui/TagInput';
import { FileUpload } from '@/components/ui/FileUpload';
import { StarRating } from '@/components/ui/StarRating';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Skeleton } from '@/components/ui/Skeleton';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { Portfolio, Skill, Experience, Education, Project, Certification, Language } from '@/types';

const categoryOptions = [
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Backend', label: 'Backend' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Data', label: 'Data' },
  { value: 'Design', label: 'Design' },
  { value: 'Other', label: 'Other' },
];

export default function EditPage() {
  const router = useRouter();
  const { portfolio, isLoading, fetch, save } = usePortfolio();
  const [form, setForm] = useState<Partial<Portfolio>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetch(); }, [fetch]);

  useEffect(() => {
    if (portfolio) {
      setForm({
        headline: portfolio.headline,
        summary: portfolio.summary,
        photoBase64: portfolio.photoBase64,
        skills: portfolio.skills,
        experience: portfolio.experience,
        education: portfolio.education,
        projects: portfolio.projects,
        certifications: portfolio.certifications,
        languages: portfolio.languages,
        contact: portfolio.contact,
        slug: portfolio.slug,
      });
    }
  }, [portfolio]);

  const updateField = useCallback(<K extends keyof Portfolio>(key: K, value: Portfolio[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await save(form);
      toast.success('Portfolio saved!');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  // Array helpers
  const addSkill = () => updateField('skills', [...(form.skills || []), { name: '', proficiency: 3, category: 'Other' }]);
  const removeSkill = (i: number) => updateField('skills', (form.skills || []).filter((_, idx) => idx !== i));
  const updateSkill = (i: number, field: keyof Skill, value: string | number) => {
    const skills = [...(form.skills || [])];
    skills[i] = { ...skills[i], [field]: value };
    updateField('skills', skills);
  };

  const addExperience = () => updateField('experience', [...(form.experience || []), { company: '', role: '', startDate: '', endDate: null, highlights: [] }]);
  const removeExperience = (i: number) => updateField('experience', (form.experience || []).filter((_, idx) => idx !== i));
  const updateExperience = (i: number, field: keyof Experience, value: unknown) => {
    const items = [...(form.experience || [])];
    items[i] = { ...items[i], [field]: value };
    updateField('experience', items);
  };

  const addEducation = () => updateField('education', [...(form.education || []), { institution: '', degree: '', field: '', year: '', achievements: [] }]);
  const removeEducation = (i: number) => updateField('education', (form.education || []).filter((_, idx) => idx !== i));
  const updateEducation = (i: number, field: keyof Education, value: unknown) => {
    const items = [...(form.education || [])];
    items[i] = { ...items[i], [field]: value };
    updateField('education', items);
  };

  const addProject = () => updateField('projects', [...(form.projects || []), { title: '', description: '', techStack: [] }]);
  const removeProject = (i: number) => updateField('projects', (form.projects || []).filter((_, idx) => idx !== i));
  const updateProject = (i: number, field: keyof Project, value: unknown) => {
    const items = [...(form.projects || [])];
    items[i] = { ...items[i], [field]: value };
    updateField('projects', items);
  };

  const addCertification = () => updateField('certifications', [...(form.certifications || []), { name: '', issuer: '', year: '' }]);
  const removeCertification = (i: number) => updateField('certifications', (form.certifications || []).filter((_, idx) => idx !== i));
  const updateCertification = (i: number, field: keyof Certification, value: string) => {
    const items = [...(form.certifications || [])];
    items[i] = { ...items[i], [field]: value };
    updateField('certifications', items);
  };

  const addLanguage = () => updateField('languages', [...(form.languages || []), { language: '', proficiency: '' }]);
  const removeLanguage = (i: number) => updateField('languages', (form.languages || []).filter((_, idx) => idx !== i));
  const updateLanguage = (i: number, field: keyof Language, value: string) => {
    const items = [...(form.languages || [])];
    items[i] = { ...items[i], [field]: value };
    updateField('languages', items);
  };

  if (isLoading || !portfolio) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="space-y-6">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
      </div>
    );
  }

  return (
    <AnimatedPage className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard')}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="font-display text-2xl font-bold">Edit Portfolio</h1>
        </div>
        <Button variant="primary" size="sm" onClick={handleSave} disabled={saving} className="gap-2">
          <Save size={16} />
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </div>

      <div className="space-y-8">
        {/* Basic Info */}
        <section>
          <h2 className="font-display text-lg font-semibold mb-4">Basic Info</h2>
          <Card className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-text-secondary">Headline</label>
              <Input value={form.headline || ''} onChange={(e) => updateField('headline', e.target.value)} />
            </div>
            <div>
              <label className="mb-2 block text-sm text-text-secondary">Summary</label>
              <Textarea value={form.summary || ''} onChange={(e) => updateField('summary', e.target.value)} maxLength={5000} showCount />
            </div>
            <div>
              <label className="mb-2 block text-sm text-text-secondary">Profile Photo</label>
              <FileUpload value={form.photoBase64 || null} onChange={(v) => updateField('photoBase64', v)} />
            </div>
            <div>
              <label className="mb-2 block text-sm text-text-secondary">Slug</label>
              <Input value={form.slug || ''} onChange={(e) => updateField('slug', e.target.value)} />
            </div>
          </Card>
        </section>

        {/* Skills */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">Skills</h2>
            <Button variant="ghost" size="sm" onClick={addSkill} className="gap-1"><Plus size={14} /> Add</Button>
          </div>
          <div className="space-y-3">
            {(form.skills || []).map((skill, i) => (
              <Card key={i} className="flex items-center gap-3">
                <Input placeholder="Skill name" value={skill.name} onChange={(e) => updateSkill(i, 'name', e.target.value)} className="flex-1" />
                <Select options={categoryOptions} value={skill.category} onChange={(e) => updateSkill(i, 'category', e.target.value)} className="w-32" />
                <StarRating value={skill.proficiency} onChange={(v) => updateSkill(i, 'proficiency', v)} size={14} />
                <button onClick={() => removeSkill(i)} className="text-text-muted hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">Experience</h2>
            <Button variant="ghost" size="sm" onClick={addExperience} className="gap-1"><Plus size={14} /> Add</Button>
          </div>
          <div className="space-y-4">
            {(form.experience || []).map((exp, i) => (
              <Card key={i} className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    <Input placeholder="Company" value={exp.company} onChange={(e) => updateExperience(i, 'company', e.target.value)} />
                    <Input placeholder="Role" value={exp.role} onChange={(e) => updateExperience(i, 'role', e.target.value)} />
                    <Input placeholder="Start (YYYY-MM)" value={exp.startDate} onChange={(e) => updateExperience(i, 'startDate', e.target.value)} />
                    <Input placeholder="End (or leave empty)" value={exp.endDate || ''} onChange={(e) => updateExperience(i, 'endDate', e.target.value || null)} />
                  </div>
                  <button onClick={() => removeExperience(i)} className="ml-3 text-text-muted hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
                <TagInput tags={exp.highlights} onChange={(v) => updateExperience(i, 'highlights', v)} placeholder="Add highlights..." />
              </Card>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">Education</h2>
            <Button variant="ghost" size="sm" onClick={addEducation} className="gap-1"><Plus size={14} /> Add</Button>
          </div>
          <div className="space-y-4">
            {(form.education || []).map((edu, i) => (
              <Card key={i} className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    <Input placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(i, 'institution', e.target.value)} />
                    <Input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(i, 'degree', e.target.value)} />
                    <Input placeholder="Field" value={edu.field} onChange={(e) => updateEducation(i, 'field', e.target.value)} />
                    <Input placeholder="Year" value={edu.year} onChange={(e) => updateEducation(i, 'year', e.target.value)} />
                  </div>
                  <button onClick={() => removeEducation(i)} className="ml-3 text-text-muted hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
                <TagInput tags={edu.achievements} onChange={(v) => updateEducation(i, 'achievements', v)} placeholder="Add achievements..." />
              </Card>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">Projects</h2>
            <Button variant="ghost" size="sm" onClick={addProject} className="gap-1"><Plus size={14} /> Add</Button>
          </div>
          <div className="space-y-4">
            {(form.projects || []).map((proj, i) => (
              <Card key={i} className="space-y-3">
                <div className="flex items-start justify-between">
                  <Input placeholder="Title" value={proj.title} onChange={(e) => updateProject(i, 'title', e.target.value)} className="flex-1" />
                  <button onClick={() => removeProject(i)} className="ml-3 text-text-muted hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
                <Textarea placeholder="Description" value={proj.description} onChange={(e) => updateProject(i, 'description', e.target.value)} />
                <TagInput tags={proj.techStack} onChange={(v) => updateProject(i, 'techStack', v)} placeholder="Add tech..." />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Live URL" value={proj.liveUrl || ''} onChange={(e) => updateProject(i, 'liveUrl', e.target.value)} />
                  <Input placeholder="Repo URL" value={proj.repoUrl || ''} onChange={(e) => updateProject(i, 'repoUrl', e.target.value)} />
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">Certifications</h2>
            <Button variant="ghost" size="sm" onClick={addCertification} className="gap-1"><Plus size={14} /> Add</Button>
          </div>
          <div className="space-y-3">
            {(form.certifications || []).map((cert, i) => (
              <Card key={i} className="flex items-center gap-3">
                <Input placeholder="Name" value={cert.name} onChange={(e) => updateCertification(i, 'name', e.target.value)} className="flex-1" />
                <Input placeholder="Issuer" value={cert.issuer} onChange={(e) => updateCertification(i, 'issuer', e.target.value)} className="flex-1" />
                <Input placeholder="Year" value={cert.year} onChange={(e) => updateCertification(i, 'year', e.target.value)} className="w-24" />
                <button onClick={() => removeCertification(i)} className="text-text-muted hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
              </Card>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">Languages</h2>
            <Button variant="ghost" size="sm" onClick={addLanguage} className="gap-1"><Plus size={14} /> Add</Button>
          </div>
          <div className="space-y-3">
            {(form.languages || []).map((lang, i) => (
              <Card key={i} className="flex items-center gap-3">
                <Input placeholder="Language" value={lang.language} onChange={(e) => updateLanguage(i, 'language', e.target.value)} className="flex-1" />
                <Input placeholder="Proficiency" value={lang.proficiency} onChange={(e) => updateLanguage(i, 'proficiency', e.target.value)} className="flex-1" />
                <button onClick={() => removeLanguage(i)} className="text-text-muted hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="font-display text-lg font-semibold mb-4">Contact</h2>
          <Card className="space-y-3">
            <Input placeholder="Email" value={form.contact?.email || ''} onChange={(e) => updateField('contact', { ...form.contact, email: e.target.value })} />
            <Input placeholder="LinkedIn URL" value={form.contact?.linkedin || ''} onChange={(e) => updateField('contact', { ...form.contact, linkedin: e.target.value })} />
            <Input placeholder="GitHub URL" value={form.contact?.github || ''} onChange={(e) => updateField('contact', { ...form.contact, github: e.target.value })} />
            <Input placeholder="Twitter/X URL" value={form.contact?.twitter || ''} onChange={(e) => updateField('contact', { ...form.contact, twitter: e.target.value })} />
            <Input placeholder="Website" value={form.contact?.website || ''} onChange={(e) => updateField('contact', { ...form.contact, website: e.target.value })} />
          </Card>
        </section>
      </div>

      <div className="mt-8 flex justify-end">
        <Button variant="primary" onClick={handleSave} disabled={saving} className="gap-2">
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </AnimatedPage>
  );
}

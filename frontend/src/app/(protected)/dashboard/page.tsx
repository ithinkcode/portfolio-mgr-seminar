'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { usePortfolio } from '@/hooks/usePortfolio';
import { AnimatedPage } from '@/components/shared/AnimatedPage';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Eye, Edit3, FileDown, Share2, Globe, Trash2,
  Briefcase, GraduationCap, Award, Languages, Layers,
} from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import type { Skill, Experience, Education, Certification, Language } from '@/types';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { portfolio, isLoading, fetch, publish, unpublish, remove } = usePortfolio();

  useEffect(() => { fetch(); }, [fetch]);

  useEffect(() => {
    if (!isLoading && !portfolio) {
      router.push('/onboarding');
    }
  }, [isLoading, portfolio, router]);

  const handleDownloadPdf = async () => {
    try {
      const blob = await api.portfolio.downloadPdf();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${portfolio?.slug || 'portfolio'}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('PDF downloaded!');
    } catch {
      toast.error('Failed to download PDF');
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/p/${portfolio?.slug}`;
    await navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure? This cannot be undone.')) return;
    try {
      await remove();
      toast.success('Portfolio deleted');
      router.push('/onboarding');
    } catch {
      toast.error('Failed to delete portfolio');
    }
  };

  if (isLoading || !portfolio) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Skeleton className="h-8 w-48 mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const skills = (portfolio.skills || []) as Skill[];
  const experience = (portfolio.experience || []) as Experience[];
  const education = (portfolio.education || []) as Education[];
  const certifications = (portfolio.certifications || []) as Certification[];
  const languages = (portfolio.languages || []) as Language[];

  // Group skills by category
  const skillsByCategory: Record<string, Skill[]> = {};
  for (const skill of skills) {
    const cat = skill.category || 'Other';
    if (!skillsByCategory[cat]) skillsByCategory[cat] = [];
    skillsByCategory[cat].push(skill);
  }

  return (
    <AnimatedPage className="mx-auto max-w-4xl px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">
          Welcome, {user?.firstName}
        </h1>
        <p className="mt-1 text-text-secondary">Manage and share your portfolio</p>
      </div>

      {/* Status Card */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="font-display text-xl font-semibold">{portfolio.headline}</h2>
              <Badge variant={portfolio.isPublished ? 'gold' : 'outline'}>
                {portfolio.isPublished ? 'Published' : 'Draft'}
              </Badge>
            </div>
            {portfolio.isPublished && (
              <p className="text-sm text-text-muted flex items-center gap-1">
                <Globe size={14} />
                {typeof window !== 'undefined' ? window.location.origin : ''}/p/{portfolio.slug}
              </p>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {portfolio.isPublished ? (
              <Button variant="secondary" size="sm" onClick={() => unpublish().then(() => toast.success('Unpublished'))}>
                Unpublish
              </Button>
            ) : (
              <Button variant="primary" size="sm" onClick={() => publish().then(() => toast.success('Published!'))}>
                Publish
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Action Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/preview">
          <Card hover className="flex items-center gap-3 cursor-pointer">
            <Eye size={20} className="text-accent-gold" />
            <span className="text-sm font-medium">Preview</span>
          </Card>
        </Link>
        <Link href="/edit">
          <Card hover className="flex items-center gap-3 cursor-pointer">
            <Edit3 size={20} className="text-accent-gold" />
            <span className="text-sm font-medium">Edit</span>
          </Card>
        </Link>
        <button onClick={handleDownloadPdf} className="text-left">
          <Card hover className="flex items-center gap-3 cursor-pointer">
            <FileDown size={20} className="text-accent-gold" />
            <span className="text-sm font-medium">Download PDF</span>
          </Card>
        </button>
        {portfolio.isPublished && (
          <button onClick={handleShare} className="text-left">
            <Card hover className="flex items-center gap-3 cursor-pointer">
              <Share2 size={20} className="text-accent-gold" />
              <span className="text-sm font-medium">Copy Link</span>
            </Card>
          </button>
        )}
      </div>

      {/* Portfolio Content Overview */}
      <div className="mt-10 space-y-6">
        {/* Summary */}
        {portfolio.summary && (
          <Card>
            <h3 className="font-display text-lg font-semibold mb-3">Summary</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{portfolio.summary}</p>
          </Card>
        )}

        {/* Skills */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-accent-gold" />
              <h3 className="font-display text-lg font-semibold">Skills</h3>
            </div>
            <span className="text-xs text-text-muted">
              {skills.length > 0 ? `${skills.length} skills` : 'Not added yet'}
            </span>
          </div>
          {skills.length > 0 ? (
            <div className="space-y-4">
              {Object.entries(skillsByCategory).map(([category, catSkills]) => (
                <div key={category}>
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill) => (
                      <div key={skill.name} className="flex items-center gap-2 rounded-lg bg-surface-overlay px-3 py-1.5">
                        <span className="text-sm">{skill.name}</span>
                        <div className="h-1.5 w-12 rounded-full bg-surface-border overflow-hidden">
                          <div
                            className="h-full rounded-full bg-accent-gold"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted">No skills added yet.</p>
          )}
        </Card>

        {/* Experience */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-accent-gold" />
              <h3 className="font-display text-lg font-semibold">Experience</h3>
            </div>
            <span className="text-xs text-text-muted">
              {experience.length > 0 ? `${experience.length} roles` : 'Not added yet'}
            </span>
          </div>
          {experience.length > 0 ? (
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i} className="border-l-2 border-accent-gold/20 pl-4">
                  <p className="text-sm font-medium">{exp.role}</p>
                  <p className="text-xs text-text-muted">{exp.company} &middot; {exp.startDate} &ndash; {exp.endDate || 'Present'}</p>
                  {exp.highlights.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {exp.highlights.slice(0, 2).map((h, j) => (
                        <li key={j} className="text-xs text-text-secondary">&bull; {h}</li>
                      ))}
                      {exp.highlights.length > 2 && (
                        <li className="text-xs text-text-muted">+{exp.highlights.length - 2} more</li>
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted">No experience added yet.</p>
          )}
        </Card>

        {/* Education */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GraduationCap size={18} className="text-accent-gold" />
              <h3 className="font-display text-lg font-semibold">Education</h3>
            </div>
            <span className="text-xs text-text-muted">
              {education.length > 0 ? `${education.length} entries` : 'Not added yet'}
            </span>
          </div>
          {education.length > 0 ? (
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div key={i} className="border-l-2 border-accent-gold/20 pl-4">
                  <p className="text-sm font-medium">{edu.degree} in {edu.field}</p>
                  <p className="text-xs text-text-muted">{edu.institution} &middot; {edu.year}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted">No education added yet.</p>
          )}
        </Card>

        {/* Certifications & Languages in a 2-column grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award size={18} className="text-accent-gold" />
                <h3 className="font-display text-lg font-semibold">Certifications</h3>
              </div>
              <span className="text-xs text-text-muted">
                {certifications.length > 0 ? `${certifications.length} certs` : 'Not added yet'}
              </span>
            </div>
            {certifications.length > 0 ? (
              <div className="space-y-2">
                {certifications.map((cert, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium">{cert.name}</p>
                    <p className="text-xs text-text-muted">{cert.issuer} &middot; {cert.year}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-text-muted">No certifications added yet.</p>
            )}
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Languages size={18} className="text-accent-gold" />
                <h3 className="font-display text-lg font-semibold">Languages</h3>
              </div>
              <span className="text-xs text-text-muted">
                {languages.length > 0 ? `${languages.length} languages` : 'Not added yet'}
              </span>
            </div>
            {languages.length > 0 ? (
              <div className="space-y-2">
                {languages.map((lang, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm">{lang.language}</span>
                    <Badge variant="outline">{lang.proficiency}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-text-muted">No languages added yet.</p>
            )}
          </Card>
        </div>
      </div>

      {/* Delete */}
      <div className="mt-12 pt-8 border-t border-surface-border">
        <button onClick={handleDelete} className="flex items-center gap-2 text-sm text-red-400/60 hover:text-red-400 transition-colors">
          <Trash2 size={14} />
          Delete portfolio
        </button>
      </div>
    </AnimatedPage>
  );
}

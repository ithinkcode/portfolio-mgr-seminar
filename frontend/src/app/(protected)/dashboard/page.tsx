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
import { Eye, Edit3, FileDown, Share2, Globe, Trash2 } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';

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

  return (
    <AnimatedPage className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">
          Welcome, {user?.firstName}
        </h1>
        <p className="mt-1 text-text-secondary">Manage and share your portfolio</p>
      </div>

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

      <div className="mt-12 pt-8 border-t border-surface-border">
        <button onClick={handleDelete} className="flex items-center gap-2 text-sm text-red-400/60 hover:text-red-400 transition-colors">
          <Trash2 size={14} />
          Delete portfolio
        </button>
      </div>
    </AnimatedPage>
  );
}

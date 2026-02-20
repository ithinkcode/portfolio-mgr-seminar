'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePortfolio } from '@/hooks/usePortfolio';
import { AnimatedPage } from '@/components/shared/AnimatedPage';
import { PortfolioView } from '@/components/portfolio/PortfolioView';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { ArrowLeft, Palette } from 'lucide-react';
import type { ThemeName } from '@/types';

export default function PreviewPage() {
  const router = useRouter();
  const { portfolio, isLoading, fetch, save } = usePortfolio();
  const [themeOverride, setThemeOverride] = useState<ThemeName | null>(null);

  useEffect(() => { fetch(); }, [fetch]);

  const previewTheme = themeOverride ?? portfolio?.theme ?? 'obsidian';

  const handleThemeChange = async (theme: ThemeName) => {
    setThemeOverride(theme);
    if (portfolio) {
      await save({ theme });
    }
  };

  if (isLoading || !portfolio) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div className="border-b border-surface-border bg-surface-raised/50 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard')} className="gap-2">
            <ArrowLeft size={16} /> Back
          </Button>
          <div className="flex items-center gap-2">
            <Palette size={16} className="text-text-muted" />
            {(['obsidian', 'arctic', 'ember'] as const).map((theme) => (
              <button
                key={theme}
                onClick={() => handleThemeChange(theme)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                  previewTheme === theme
                    ? 'bg-accent-gold text-surface'
                    : 'text-text-muted hover:text-text-primary hover:bg-surface-overlay'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
      </div>
      <PortfolioView portfolio={{ ...portfolio, theme: previewTheme }} />
    </AnimatedPage>
  );
}

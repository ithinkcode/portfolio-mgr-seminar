'use client';

import { useOnboardingStore } from '@/stores/onboardingStore';
import type { ThemeName } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const themes: { name: ThemeName; label: string; desc: string; bg: string; accent: string; text: string }[] = [
  {
    name: 'obsidian',
    label: 'Obsidian',
    desc: 'Dark, dramatic, gold accents',
    bg: 'bg-[#0a0a0f]',
    accent: 'border-accent-gold',
    text: 'text-accent-gold',
  },
  {
    name: 'arctic',
    label: 'Arctic',
    desc: 'Clean whites, ice-blue accents',
    bg: 'bg-[#f8fafc]',
    accent: 'border-arctic-accent',
    text: 'text-arctic-accent',
  },
  {
    name: 'ember',
    label: 'Ember',
    desc: 'Warm cream, burgundy editorial',
    bg: 'bg-[#faf5ef]',
    accent: 'border-ember-accent',
    text: 'text-ember-accent',
  },
];

export function Step9() {
  const { theme, firstName, lastName, headline, updateField } = useOnboardingStore();

  return (
    <div>
      <h2 className="font-display text-3xl font-bold mb-2">Choose Your Theme</h2>
      <p className="text-text-secondary mb-8">Pick the look that represents you best.</p>

      <div className="grid gap-4 sm:grid-cols-3">
        {themes.map((t) => (
          <motion.button
            key={t.name}
            type="button"
            onClick={() => updateField('theme', t.name)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'relative rounded-xl border-2 p-1 transition-all text-left',
              theme === t.name
                ? `${t.accent} shadow-lg`
                : 'border-surface-border hover:border-surface-overlay'
            )}
          >
            {theme === t.name && (
              <motion.div
                layoutId="theme-glow"
                className="absolute inset-0 rounded-xl animate-glow-pulse"
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              />
            )}

            {/* Mini preview */}
            <div className={cn('relative rounded-lg p-4 h-48 overflow-hidden', t.bg)}>
              <div className={cn('h-8 w-8 rounded-full mb-3', t.name === 'obsidian' ? 'bg-amber-600/30' : t.name === 'arctic' ? 'bg-sky-200' : 'bg-rose-200')} />
              <div className={cn('font-display text-sm font-bold mb-1', t.name === 'obsidian' ? 'text-white' : t.name === 'arctic' ? 'text-gray-900' : 'text-[#2d1b0e]')}>
                {firstName || 'Your'} {lastName || 'Name'}
              </div>
              <div className={cn('text-[10px] mb-3', t.name === 'obsidian' ? 'text-gray-400' : t.name === 'arctic' ? 'text-gray-500' : 'text-[#8b7355]')}>
                {headline || 'Your Headline'}
              </div>
              <div className="flex gap-1">
                {[1, 2, 3].map((n) => (
                  <div key={n} className={cn('h-1.5 rounded-full', t.name === 'obsidian' ? 'bg-amber-600/40 w-12' : t.name === 'arctic' ? 'bg-sky-200 w-10' : 'bg-rose-200 w-11')} />
                ))}
              </div>
              <div className={cn('mt-2 h-1 w-3/4 rounded-full', t.name === 'obsidian' ? 'bg-white/10' : t.name === 'arctic' ? 'bg-gray-100' : 'bg-[#e8ddd0]')} />
              <div className={cn('mt-1 h-1 w-1/2 rounded-full', t.name === 'obsidian' ? 'bg-white/10' : t.name === 'arctic' ? 'bg-gray-100' : 'bg-[#e8ddd0]')} />
            </div>

            <div className="p-3">
              <p className={cn('text-sm font-semibold', theme === t.name ? t.text : 'text-text-primary')}>{t.label}</p>
              <p className="text-xs text-text-muted">{t.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

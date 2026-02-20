'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

const words = ['Your', 'Story.', 'Professionally', 'Told.'];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Gradient mesh background */}
      <div className="gradient-mesh absolute inset-0" />

      {/* Soft glow */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent-gold/[0.04] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-gold/20 bg-accent-gold/5 px-4 py-1.5"
        >
          <Sparkles size={14} className="text-accent-gold" />
          <span className="text-sm text-accent-gold">Portfolio builder for engineers</span>
        </motion.div>

        <h1 className="font-display text-6xl font-bold leading-[1.1] tracking-tight sm:text-7xl md:text-8xl">
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12, type: 'spring', damping: 20, stiffness: 100 }}
              className="inline-block mr-[0.25em]"
            >
              {i >= 2 ? (
                <span className="bg-gradient-to-r from-accent-gold to-accent-gold-hover bg-clip-text text-transparent">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mx-auto mt-6 max-w-xl text-lg text-text-secondary leading-relaxed"
        >
          Answer a few questions. Get a portfolio that opens doors.
          Share it anywhere or download a beautifully designed PDF.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link href="/register">
            <Button variant="primary" size="lg" className="gap-2 text-base">
              Get Started Free
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/p/alex-chen">
            <Button variant="ghost" size="lg" className="text-base">
              See Example
            </Button>
          </Link>
        </motion.div>

        {/* Floating portfolio mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, type: 'spring', damping: 20 }}
          className="mx-auto mt-20 max-w-2xl"
        >
          <div className="rounded-xl border border-surface-border bg-surface-raised/80 p-1 shadow-2xl shadow-accent-gold/5 backdrop-blur-sm">
            <div className="rounded-lg bg-surface p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-full bg-accent-gold/20 flex items-center justify-center font-display text-lg font-bold text-accent-gold">AC</div>
                <div>
                  <h3 className="font-display text-lg font-semibold">Alex Chen</h3>
                  <p className="text-sm text-text-muted">Full-Stack Engineer & Systems Architect</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'].map((skill) => (
                  <div key={skill} className="rounded-md bg-surface-overlay px-3 py-1.5 text-center text-xs text-text-secondary">
                    {skill}
                  </div>
                ))}
              </div>
              <div className="mt-4 h-2 w-3/4 rounded-full bg-surface-overlay" />
              <div className="mt-2 h-2 w-1/2 rounded-full bg-surface-overlay" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

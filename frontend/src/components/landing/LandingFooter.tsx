'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export function LandingFooter() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-t from-accent-gold/[0.03] to-transparent" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Ready to build yours?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-text-secondary">
            Join engineers who showcase their work with style. It takes less than 5 minutes.
          </p>
          <Link href="/register" className="mt-8 inline-block">
            <Button variant="primary" size="lg" className="gap-2 text-base">
              Get Started Free <ArrowRight size={18} />
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl border-t border-surface-border/50 px-6 pt-8 text-center">
        <p className="text-sm text-text-muted">
          Built for the next generation of engineers.
        </p>
        <p className="mt-1 text-xs text-text-muted/60">
          Thinking Code Technologies
        </p>
      </div>
    </section>
  );
}

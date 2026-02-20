'use client';

import { motion } from 'framer-motion';
import { Wand2, FileDown, Share2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const features = [
  {
    icon: Wand2,
    title: 'Guided Builder',
    description: 'Walk through simple questions about your experience, skills, and projects. Or paste your resume to get a head start.',
  },
  {
    icon: FileDown,
    title: 'Instant PDF',
    description: 'Download a beautifully designed resume PDF with a single click. Three stunning themes to choose from.',
  },
  {
    icon: Share2,
    title: 'Share Anywhere',
    description: 'Get a unique public link to your portfolio. Share it with recruiters, on LinkedIn, or anywhere you need to stand out.',
  },
];

export function Features() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Everything you need to <span className="text-accent-gold">stand out</span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg">Build, customize, and share your professional portfolio in minutes.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <Card hover className="h-full">
                <div className="mb-4 inline-flex rounded-lg bg-accent-gold/10 p-3">
                  <feature.icon size={24} className="text-accent-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

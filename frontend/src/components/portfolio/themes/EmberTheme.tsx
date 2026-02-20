'use client';

import { motion } from 'framer-motion';
import type { Portfolio } from '@/types';
import { getInitials, formatDate } from '@/lib/utils';
import { PdfDownloadButton } from '../PdfDownloadButton';
import { Mail, Linkedin, Github, Twitter, Globe, ExternalLink } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
};

const stagger = { initial: 'initial', whileInView: 'visible', viewport: { once: true, margin: '-50px' } };
const staggerChildren = { visible: { transition: { staggerChildren: 0.08 } } };
const staggerChild = { initial: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

interface Props {
  portfolio: Portfolio;
  isPublic?: boolean;
}

export function EmberTheme({ portfolio, isPublic }: Props) {
  const name = portfolio.user ? `${portfolio.user.firstName} ${portfolio.user.lastName}` : '';
  const initials = portfolio.user ? getInitials(portfolio.user.firstName, portfolio.user.lastName) : '';

  return (
    <div className="min-h-screen bg-[#faf5ef] text-[#2d1b0e]" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
      {/* Hero */}
      <section className="border-b border-[#e8ddd0] py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          {portfolio.photoBase64 ? (
            <motion.img {...fadeIn} src={portfolio.photoBase64} alt={name} className="mx-auto mb-6 h-28 w-28 rounded-full object-cover ring-4 ring-[#8b2635]/20" />
          ) : (
            <motion.div {...fadeIn} className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-[#8b2635]/10 ring-4 ring-[#8b2635]/20">
              <span className="text-3xl font-bold text-[#8b2635]">{initials}</span>
            </motion.div>
          )}
          <motion.h1 {...fadeIn} className="text-5xl font-bold sm:text-6xl text-[#8b2635]" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>{name}</motion.h1>
          <motion.p {...fadeIn} className="mt-3 text-xl text-[#8b7355]" style={{ fontFamily: 'var(--font-satoshi), sans-serif' }}>{portfolio.headline}</motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-20 space-y-16 pt-16">
        {portfolio.summary && (
          <motion.section {...fadeIn}>
            <h2 className="text-2xl font-bold mb-4 text-[#8b2635]">About</h2>
            <p className="text-[#8b7355] leading-relaxed whitespace-pre-line" style={{ fontFamily: 'var(--font-satoshi), sans-serif' }}>{portfolio.summary}</p>
          </motion.section>
        )}

        {portfolio.skills.length > 0 && (
          <motion.section {...stagger} variants={staggerChildren}>
            <h2 className="text-2xl font-bold mb-6 text-[#8b2635]">Skills</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {portfolio.skills.map((skill) => (
                <motion.div key={skill.name} variants={staggerChild} className="flex items-center justify-between rounded-lg border border-[#e8ddd0] bg-[#fff8f0] p-3">
                  <div>
                    <span className="text-sm font-medium text-[#2d1b0e]" style={{ fontFamily: 'var(--font-satoshi), sans-serif' }}>{skill.name}</span>
                    <span className="ml-2 text-xs text-[#8b7355]">{skill.category}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className={`h-1.5 w-6 rounded-full ${i < skill.proficiency ? 'bg-[#c46a4a]' : 'bg-[#e8ddd0]'}`} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {portfolio.experience.length > 0 && (
          <motion.section {...stagger} variants={staggerChildren}>
            <h2 className="text-2xl font-bold mb-6 text-[#8b2635]">Experience</h2>
            <div className="relative border-l-2 border-[#e8ddd0] pl-6 space-y-8">
              {portfolio.experience.map((exp) => (
                <motion.div key={`${exp.company}-${exp.role}`} variants={staggerChild} className="relative">
                  <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-[#c46a4a] bg-[#faf5ef]" />
                  <div className="text-xs text-[#8b7355] mb-1" style={{ fontFamily: 'var(--font-satoshi), sans-serif' }}>{formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : 'Present'}</div>
                  <h3 className="font-semibold text-[#2d1b0e]">{exp.role}</h3>
                  <p className="text-sm text-[#8b7355]" style={{ fontFamily: 'var(--font-satoshi), sans-serif' }}>{exp.company}</p>
                  {exp.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.highlights.map((h, i) => <li key={i} className="text-sm text-[#8b7355] before:content-['·'] before:mr-2 before:text-[#c46a4a]" style={{ fontFamily: 'var(--font-satoshi), sans-serif' }}>{h}</li>)}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {portfolio.projects.length > 0 && (
          <motion.section {...stagger} variants={staggerChildren}>
            <h2 className="text-2xl font-bold mb-6 text-[#8b2635]">Projects</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {portfolio.projects.map((proj) => (
                <motion.div key={proj.title} variants={staggerChild} className="rounded-xl border border-[#e8ddd0] bg-[#fff8f0] p-5 transition-all hover:border-[#c46a4a]/30 hover:shadow-md">
                  <h3 className="font-semibold text-[#2d1b0e] mb-2">{proj.title}</h3>
                  <p className="text-sm text-[#8b7355] mb-3 line-clamp-3" style={{ fontFamily: 'var(--font-satoshi), sans-serif' }}>{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {proj.techStack.map((t) => <span key={t} className="rounded-md bg-[#c46a4a]/10 px-2 py-0.5 text-xs text-[#c46a4a]">{t}</span>)}
                  </div>
                  <div className="flex gap-3" style={{ fontFamily: 'var(--font-satoshi), sans-serif' }}>
                    {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#c46a4a] hover:underline flex items-center gap-1"><ExternalLink size={12} />Live</a>}
                    {proj.repoUrl && <a href={proj.repoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#8b7355] hover:underline flex items-center gap-1"><Github size={12} />Code</a>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {portfolio.education.length > 0 && (
          <motion.section {...stagger} variants={staggerChildren}>
            <h2 className="text-2xl font-bold mb-6 text-[#8b2635]">Education</h2>
            {portfolio.education.map((edu) => (
              <motion.div key={`${edu.institution}-${edu.degree}`} variants={staggerChild} className="mb-4 flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8b2635]/10 text-sm font-bold text-[#8b2635]">{edu.institution.charAt(0)}</div>
                <div>
                  <h3 className="font-semibold text-[#2d1b0e]">{edu.degree} in {edu.field}</h3>
                  <p className="text-sm text-[#8b7355]" style={{ fontFamily: 'var(--font-satoshi), sans-serif' }}>{edu.institution} &middot; {edu.year}</p>
                  {edu.achievements.length > 0 && <div className="flex flex-wrap gap-1.5 mt-2">{edu.achievements.map((a) => <span key={a} className="rounded-md border border-[#e8ddd0] px-2 py-0.5 text-xs text-[#8b7355]">{a}</span>)}</div>}
                </div>
              </motion.div>
            ))}
          </motion.section>
        )}

        {(portfolio.certifications.length > 0 || portfolio.languages.length > 0) && (
          <motion.section {...fadeIn} className="grid gap-8 sm:grid-cols-2">
            {portfolio.certifications.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#8b2635]">Certifications</h2>
                <div className="space-y-2">{portfolio.certifications.map((c) => <div key={c.name} className="rounded-lg border border-[#e8ddd0] bg-[#fff8f0] p-3"><p className="text-sm font-medium text-[#2d1b0e]">{c.name}</p><p className="text-xs text-[#8b7355]">{c.issuer} &middot; {c.year}</p></div>)}</div>
              </div>
            )}
            {portfolio.languages.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#8b2635]">Languages</h2>
                <div className="flex flex-wrap gap-2">{portfolio.languages.map((l) => <div key={l.language} className="rounded-lg border border-[#e8ddd0] bg-[#fff8f0] px-4 py-2"><p className="text-sm font-medium text-[#2d1b0e]">{l.language}</p><p className="text-xs text-[#8b7355]">{l.proficiency}</p></div>)}</div>
              </div>
            )}
          </motion.section>
        )}

        {portfolio.contact && (
          <motion.section {...fadeIn}>
            <h2 className="text-2xl font-bold mb-4 text-[#8b2635]">Contact</h2>
            <div className="flex flex-wrap gap-3" style={{ fontFamily: 'var(--font-satoshi), sans-serif' }}>
              {portfolio.contact.email && <a href={`mailto:${portfolio.contact.email}`} className="flex items-center gap-2 rounded-lg border border-[#e8ddd0] bg-[#fff8f0] px-4 py-2 text-sm hover:border-[#c46a4a]/30 transition-colors"><Mail size={14} />{portfolio.contact.email}</a>}
              {portfolio.contact.linkedin && <a href={portfolio.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-[#e8ddd0] bg-[#fff8f0] px-4 py-2 text-sm hover:border-[#c46a4a]/30 transition-colors"><Linkedin size={14} />LinkedIn</a>}
              {portfolio.contact.github && <a href={portfolio.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-[#e8ddd0] bg-[#fff8f0] px-4 py-2 text-sm hover:border-[#c46a4a]/30 transition-colors"><Github size={14} />GitHub</a>}
              {portfolio.contact.twitter && <a href={portfolio.contact.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-[#e8ddd0] bg-[#fff8f0] px-4 py-2 text-sm hover:border-[#c46a4a]/30 transition-colors"><Twitter size={14} />Twitter</a>}
              {portfolio.contact.website && <a href={portfolio.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-[#e8ddd0] bg-[#fff8f0] px-4 py-2 text-sm hover:border-[#c46a4a]/30 transition-colors"><Globe size={14} />Website</a>}
            </div>
          </motion.section>
        )}

        <footer className="border-t border-[#e8ddd0] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {isPublic && <PdfDownloadButton slug={portfolio.slug} />}
          <p className="text-xs text-[#8b7355]" style={{ fontFamily: 'var(--font-satoshi), sans-serif' }}>Built with FolioForge</p>
        </footer>
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import type { Portfolio } from '@/types';
import { getInitials, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { PdfDownloadButton } from '../PdfDownloadButton';
import { Mail, Linkedin, Github, Twitter, Globe, ExternalLink } from 'lucide-react';

const fadeInUp = {
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

export function ObsidianTheme({ portfolio, isPublic }: Props) {
  const name = portfolio.user ? `${portfolio.user.firstName} ${portfolio.user.lastName}` : '';
  const initials = portfolio.user ? getInitials(portfolio.user.firstName, portfolio.user.lastName) : '';

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f0]">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#d4a853]/5 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          {portfolio.photoBase64 ? (
            <motion.img {...fadeInUp} src={portfolio.photoBase64} alt={name} className="mx-auto mb-6 h-28 w-28 rounded-full object-cover ring-4 ring-[#d4a853]/30" />
          ) : (
            <motion.div {...fadeInUp} className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-[#d4a853]/20 ring-4 ring-[#d4a853]/30">
              <span className="font-display text-3xl font-bold text-[#d4a853]">{initials}</span>
            </motion.div>
          )}
          <motion.h1 {...fadeInUp} className="font-display text-5xl font-bold sm:text-6xl">{name}</motion.h1>
          <motion.p {...fadeInUp} className="mt-3 text-xl text-[#a0a0b0]">{portfolio.headline}</motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-20 space-y-20">
        {/* Summary */}
        {portfolio.summary && (
          <motion.section {...fadeInUp}>
            <h2 className="font-display text-2xl font-bold mb-4 text-[#d4a853]">About</h2>
            <p className="text-[#a0a0b0] leading-relaxed whitespace-pre-line">{portfolio.summary}</p>
          </motion.section>
        )}

        {/* Skills */}
        {portfolio.skills.length > 0 && (
          <motion.section {...stagger} variants={staggerChildren}>
            <h2 className="font-display text-2xl font-bold mb-6 text-[#d4a853]">Skills</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {portfolio.skills.map((skill) => (
                <motion.div key={skill.name} variants={staggerChild} className="flex items-center justify-between rounded-lg border border-[#1e1e2e] bg-[#12121a] p-3">
                  <div>
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="ml-2 text-xs text-[#6b6b80]">{skill.category}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className={`h-1.5 w-6 rounded-full ${i < skill.proficiency ? 'bg-[#d4a853]' : 'bg-[#1e1e2e]'}`} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Experience */}
        {portfolio.experience.length > 0 && (
          <motion.section {...stagger} variants={staggerChildren}>
            <h2 className="font-display text-2xl font-bold mb-6 text-[#d4a853]">Experience</h2>
            <div className="relative border-l-2 border-[#1e1e2e] pl-6 space-y-8">
              {portfolio.experience.map((exp) => (
                <motion.div key={`${exp.company}-${exp.role}`} variants={staggerChild} className="relative">
                  <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-[#d4a853] bg-[#0a0a0f]" />
                  <div className="text-xs text-[#6b6b80] mb-1">{formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : 'Present'}</div>
                  <h3 className="font-semibold">{exp.role}</h3>
                  <p className="text-sm text-[#a0a0b0]">{exp.company}</p>
                  {exp.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-sm text-[#a0a0b0] before:content-['·'] before:mr-2 before:text-[#d4a853]">{h}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Projects */}
        {portfolio.projects.length > 0 && (
          <motion.section {...stagger} variants={staggerChildren}>
            <h2 className="font-display text-2xl font-bold mb-6 text-[#d4a853]">Projects</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {portfolio.projects.map((proj) => (
                <motion.div key={proj.title} variants={staggerChild} className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-5 transition-all hover:border-[#d4a853]/30 hover:shadow-lg hover:shadow-[#d4a853]/5">
                  <h3 className="font-semibold mb-2">{proj.title}</h3>
                  <p className="text-sm text-[#a0a0b0] mb-3 line-clamp-3">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {proj.techStack.map((t) => (
                      <Badge key={t} variant="gold">{t}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#d4a853] hover:underline flex items-center gap-1"><ExternalLink size={12} />Live</a>}
                    {proj.repoUrl && <a href={proj.repoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#a0a0b0] hover:underline flex items-center gap-1"><Github size={12} />Code</a>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Education */}
        {portfolio.education.length > 0 && (
          <motion.section {...stagger} variants={staggerChildren}>
            <h2 className="font-display text-2xl font-bold mb-6 text-[#d4a853]">Education</h2>
            <div className="space-y-4">
              {portfolio.education.map((edu) => (
                <motion.div key={`${edu.institution}-${edu.degree}`} variants={staggerChild} className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4a853]/10 text-sm font-bold text-[#d4a853]">
                    {edu.institution.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                    <p className="text-sm text-[#a0a0b0]">{edu.institution} &middot; {edu.year}</p>
                    {edu.achievements.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {edu.achievements.map((a) => <Badge key={a} variant="outline">{a}</Badge>)}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Certifications & Languages */}
        {(portfolio.certifications.length > 0 || portfolio.languages.length > 0) && (
          <motion.section {...fadeInUp} className="grid gap-8 sm:grid-cols-2">
            {portfolio.certifications.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-4 text-[#d4a853]">Certifications</h2>
                <div className="space-y-2">
                  {portfolio.certifications.map((c) => (
                    <div key={c.name} className="rounded-lg border border-[#1e1e2e] bg-[#12121a] p-3">
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-[#6b6b80]">{c.issuer} &middot; {c.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {portfolio.languages.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-4 text-[#d4a853]">Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {portfolio.languages.map((l) => (
                    <div key={l.language} className="rounded-lg border border-[#1e1e2e] bg-[#12121a] px-4 py-2">
                      <p className="text-sm font-medium">{l.language}</p>
                      <p className="text-xs text-[#6b6b80]">{l.proficiency}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.section>
        )}

        {/* Contact */}
        {portfolio.contact && (
          <motion.section {...fadeInUp}>
            <h2 className="font-display text-2xl font-bold mb-4 text-[#d4a853]">Contact</h2>
            <div className="flex flex-wrap gap-3">
              {portfolio.contact.email && <a href={`mailto:${portfolio.contact.email}`} className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] bg-[#12121a] px-4 py-2 text-sm hover:border-[#d4a853]/30 transition-colors"><Mail size={14} />{portfolio.contact.email}</a>}
              {portfolio.contact.linkedin && <a href={portfolio.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] bg-[#12121a] px-4 py-2 text-sm hover:border-[#d4a853]/30 transition-colors"><Linkedin size={14} />LinkedIn</a>}
              {portfolio.contact.github && <a href={portfolio.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] bg-[#12121a] px-4 py-2 text-sm hover:border-[#d4a853]/30 transition-colors"><Github size={14} />GitHub</a>}
              {portfolio.contact.twitter && <a href={portfolio.contact.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] bg-[#12121a] px-4 py-2 text-sm hover:border-[#d4a853]/30 transition-colors"><Twitter size={14} />Twitter</a>}
              {portfolio.contact.website && <a href={portfolio.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-[#1e1e2e] bg-[#12121a] px-4 py-2 text-sm hover:border-[#d4a853]/30 transition-colors"><Globe size={14} />Website</a>}
            </div>
          </motion.section>
        )}

        {/* Footer */}
        <footer className="border-t border-[#1e1e2e] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {isPublic && <PdfDownloadButton slug={portfolio.slug} />}
          <p className="text-xs text-[#6b6b80]">Built with FolioForge</p>
        </footer>
      </div>
    </div>
  );
}

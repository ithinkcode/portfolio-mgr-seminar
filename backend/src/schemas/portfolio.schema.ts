import { z } from 'zod';

export const themeEnum = z.enum(['obsidian', 'arctic', 'ember']);

const skillSchema = z.object({
  name: z.string(),
  proficiency: z.number().min(0).max(100),
  category: z.string(),
});

const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable().optional(),
  highlights: z.array(z.string()),
});

const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  year: z.string(),
  achievements: z.array(z.string()).optional().default([]),
});

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  techStack: z.array(z.string()),
  liveUrl: z.string().optional(),
  repoUrl: z.string().optional(),
  imageBase64: z.string().optional(),
});

const certificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  year: z.string(),
  url: z.string().optional(),
});

const languageSchema = z.object({
  language: z.string(),
  proficiency: z.string(),
});

const contactSchema = z.object({
  email: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  twitter: z.string().optional(),
  website: z.string().optional(),
});

export const createPortfolioSchema = z.object({
  headline: z.string(),
  summary: z.string(),
  photoBase64: z.string().nullable().optional(),
  slug: z.string().optional(),
  skills: z.array(skillSchema),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  projects: z.array(projectSchema),
  certifications: z.array(certificationSchema),
  languages: z.array(languageSchema),
  contact: contactSchema,
  theme: themeEnum.optional().default('obsidian'),
});

export const updatePortfolioSchema = createPortfolioSchema;

export const patchPortfolioSchema = createPortfolioSchema.partial();

export type CreatePortfolioInput = z.infer<typeof createPortfolioSchema>;
export type UpdatePortfolioInput = z.infer<typeof updatePortfolioSchema>;
export type PatchPortfolioInput = z.infer<typeof patchPortfolioSchema>;

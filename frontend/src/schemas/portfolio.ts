import { z } from 'zod';

export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  proficiency: z.number().min(1).max(5),
  category: z.string().min(1),
});

export const experienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Role is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().nullable(),
  highlights: z.array(z.string()),
});

export const educationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().min(1, 'Field is required'),
  year: z.string().min(1, 'Year is required'),
  achievements: z.array(z.string()),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  techStack: z.array(z.string()),
  liveUrl: z.string().url().optional().or(z.literal('')),
  repoUrl: z.string().url().optional().or(z.literal('')),
  imageBase64: z.string().optional(),
});

export const certificationSchema = z.object({
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  year: z.string().min(1, 'Year is required'),
  url: z.string().url().optional().or(z.literal('')),
});

export const languageSchema = z.object({
  language: z.string().min(1, 'Language is required'),
  proficiency: z.string().min(1, 'Proficiency is required'),
});

export const contactSchema = z.object({
  email: z.string().email().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
});

export const portfolioSchema = z.object({
  headline: z.string().min(1, 'Headline is required').max(200),
  summary: z.string().min(1, 'Summary is required').max(5000),
  photoBase64: z.string().nullable().optional(),
  skills: z.array(skillSchema),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  projects: z.array(projectSchema),
  certifications: z.array(certificationSchema),
  languages: z.array(languageSchema),
  contact: contactSchema,
  theme: z.enum(['obsidian', 'arctic', 'ember']),
  slug: z.string().min(1).max(100).optional(),
});

export type PortfolioInput = z.infer<typeof portfolioSchema>;

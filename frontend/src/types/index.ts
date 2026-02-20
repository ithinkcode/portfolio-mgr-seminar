export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt?: string;
}

export type SkillCategory = 'Frontend' | 'Backend' | 'DevOps' | 'Data' | 'Design' | 'Other';
export type ThemeName = 'obsidian' | 'arctic' | 'ember';

export interface Skill {
  name: string;
  proficiency: number;
  category: string;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  year: string;
  achievements: string[];
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  imageBase64?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface Contact {
  email?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface Portfolio {
  id: string;
  userId: string;
  slug: string;
  headline: string;
  summary: string;
  photoBase64?: string | null;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  contact: Contact;
  theme: ThemeName;
  isPublished: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: { firstName: string; lastName: string; email: string };
}

export interface AuthResponse {
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface ApiResponse<T> {
  data: T;
}

export interface ApiError {
  error: string;
  details?: unknown;
  statusCode: number;
}

export interface ThemeTokens {
  name: ThemeName;
  bg: string;
  cardBg: string;
  text: string;
  textMuted: string;
  accent: string;
  accentBg: string;
  border: string;
  headingFont: string;
}

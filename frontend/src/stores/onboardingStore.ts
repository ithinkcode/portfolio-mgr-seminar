import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Skill, Experience, Education, Project, Certification, Language, Contact, ThemeName } from '@/types';

interface OnboardingState {
  currentStep: number;
  firstName: string;
  lastName: string;
  headline: string;
  photoBase64: string | null;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  contact: Contact;
  theme: ThemeName;
  slug: string;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateField: <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 0,
  firstName: '',
  lastName: '',
  headline: '',
  photoBase64: null as string | null,
  summary: '',
  skills: [] as Skill[],
  experience: [] as Experience[],
  education: [] as Education[],
  projects: [] as Project[],
  certifications: [] as Certification[],
  languages: [] as Language[],
  contact: {} as Contact,
  theme: 'obsidian' as ThemeName,
  slug: '',
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,

      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 10) })),
      prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 0) })),
      updateField: (key, value) => set({ [key]: value }),
      reset: () => set(initialState),
    }),
    {
      name: 'folioforge-onboarding',
    }
  )
);

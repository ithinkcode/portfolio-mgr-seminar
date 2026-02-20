'use client';

import { AuthProvider } from '@/components/auth/AuthProvider';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Navbar } from '@/components/shared/Navbar';

export default function LandingPage() {
  return (
    <AuthProvider>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <LandingFooter />
      </main>
    </AuthProvider>
  );
}

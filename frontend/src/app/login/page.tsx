'use client';

import { AuthProvider } from '@/components/auth/AuthProvider';
import { LoginForm } from '@/components/auth/LoginForm';
import { AnimatedPage } from '@/components/shared/AnimatedPage';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen items-center justify-center px-4">
        <AnimatedPage className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="font-display text-2xl font-bold tracking-tight">
              Folio<span className="text-accent-gold">Forge</span>
            </Link>
            <h1 className="mt-6 font-display text-3xl font-bold">Welcome back</h1>
            <p className="mt-2 text-text-secondary">Sign in to your account</p>
          </div>
          <div className="rounded-xl border border-surface-border bg-surface-raised p-8">
            <LoginForm />
          </div>
        </AnimatedPage>
      </div>
    </AuthProvider>
  );
}

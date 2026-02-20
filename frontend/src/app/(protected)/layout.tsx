'use client';

import type { ReactNode } from 'react';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Navbar } from '@/components/shared/Navbar';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Navbar />
        <main className="pt-16">{children}</main>
      </ProtectedRoute>
    </AuthProvider>
  );
}

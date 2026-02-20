'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerSchema, type RegisterInput } from '@/schemas/auth';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';

export function RegisterForm() {
  const { register: authRegister } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsSubmitting(true);
    try {
      await authRegister(data);
      toast.success('Account created! Let\'s build your portfolio.');
      router.push('/onboarding');
    } catch (err: unknown) {
      const e = err as { error?: string };
      toast.error(e.error || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-text-secondary">
            First Name
          </label>
          <Input id="firstName" placeholder="Jane" {...register('firstName')} error={errors.firstName?.message} />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-text-secondary">
            Last Name
          </label>
          <Input id="lastName" placeholder="Doe" {...register('lastName')} error={errors.lastName?.message} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-secondary">
          Email
        </label>
        <Input id="email" type="email" placeholder="you@example.com" {...register('email')} error={errors.email?.message} />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-text-secondary">
          Password
        </label>
        <Input id="password" type="password" placeholder="At least 8 characters" {...register('password')} error={errors.password?.message} />
      </div>
      <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </Button>
      <p className="text-center text-sm text-text-muted">
        Already have an account?{' '}
        <Link href="/login" className="text-accent-gold hover:text-accent-gold-hover transition-colors">
          Sign in
        </Link>
      </p>
    </form>
  );
}

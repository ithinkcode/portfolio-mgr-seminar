import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'gold' | 'sage' | 'outline';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        {
          'bg-surface-overlay text-text-secondary': variant === 'default',
          'bg-accent-gold/10 text-accent-gold border border-accent-gold/20': variant === 'gold',
          'bg-accent-sage/10 text-accent-sage border border-accent-sage/20': variant === 'sage',
          'border border-surface-border text-text-muted': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

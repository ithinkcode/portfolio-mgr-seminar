'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  showCount?: boolean;
  maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, showCount, maxLength, value, ...props }, ref) => {
    const length = typeof value === 'string' ? value.length : 0;
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          value={value}
          maxLength={maxLength}
          className={cn(
            'w-full rounded-lg border bg-surface-raised px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold resize-y min-h-[120px]',
            error ? 'border-red-500/50' : 'border-surface-border',
            className
          )}
          {...props}
        />
        <div className="flex justify-between mt-1.5">
          {error && <p className="text-xs text-red-400">{error}</p>}
          {showCount && maxLength && (
            <p className={cn('text-xs ml-auto', length > maxLength * 0.9 ? 'text-red-400' : 'text-text-muted')}>
              {length}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

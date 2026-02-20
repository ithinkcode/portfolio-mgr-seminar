'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  readonly?: boolean;
  size?: number;
}

export function StarRating({ value, onChange, max = 5, readonly = false, size = 18 }: StarRatingProps) {
  return (
    <div className="inline-flex gap-0.5" role="radiogroup" aria-label="Rating">
      {Array.from({ length: max }, (_, i) => (
        <button
          key={i}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(i + 1)}
          className={cn(
            'transition-colors',
            readonly ? 'cursor-default' : 'cursor-pointer hover:text-accent-gold-hover'
          )}
          role="radio"
          aria-checked={value >= i + 1}
          aria-label={`${i + 1} star${i === 0 ? '' : 's'}`}
        >
          <Star
            size={size}
            className={cn(
              value >= i + 1
                ? 'fill-accent-gold text-accent-gold'
                : 'fill-transparent text-surface-border'
            )}
          />
        </button>
      ))}
    </div>
  );
}

'use client';

import { useCallback, useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  value: string | null;
  onChange: (base64: string | null) => void;
  accept?: string;
  maxSizeMb?: number;
  className?: string;
}

export function FileUpload({ value, onChange, accept = 'image/*', maxSizeMb = 2, className }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    setError(null);
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`File must be under ${maxSizeMb}MB`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [maxSizeMb, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  return (
    <div className={cn('space-y-2', className)}>
      {value ? (
        <div className="relative inline-block">
          <Image src={value} alt="Upload preview" width={96} height={96} className="h-24 w-24 rounded-full object-cover border-2 border-accent-gold/30" unoptimized />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -right-1 -top-1 rounded-full bg-surface-raised border border-surface-border p-1 text-text-muted hover:text-red-400 transition-colors"
            aria-label="Remove photo"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-8 transition-colors',
            isDragOver ? 'border-accent-gold bg-accent-gold/5' : 'border-surface-border hover:border-accent-gold/30'
          )}
        >
          {isDragOver ? <ImageIcon size={28} className="text-accent-gold" /> : <Upload size={28} className="text-text-muted" />}
          <p className="text-sm text-text-muted">
            {isDragOver ? 'Drop to upload' : 'Drag & drop or click to upload'}
          </p>
          <p className="text-xs text-text-muted">Max {maxSizeMb}MB</p>
        </div>
      )}
      <input ref={inputRef} type="file" accept={accept} onChange={(e) => { if (e.target.files?.[0]) processFile(e.target.files[0]); }} className="hidden" />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

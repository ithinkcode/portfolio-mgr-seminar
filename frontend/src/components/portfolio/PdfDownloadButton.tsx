'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { FileDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PdfDownloadButtonProps {
  slug?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function PdfDownloadButton({ slug, className, variant = 'primary' }: PdfDownloadButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const blob = await api.portfolio.downloadPdf();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${slug || 'portfolio'}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('PDF downloaded!');
    } catch {
      toast.error('Failed to generate PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant={variant} onClick={handleDownload} disabled={loading} className={className}>
      {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : <FileDown size={16} className="mr-2" />}
      {loading ? 'Generating...' : 'Download PDF'}
    </Button>
  );
}

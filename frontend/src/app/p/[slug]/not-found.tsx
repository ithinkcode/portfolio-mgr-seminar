import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface text-text-primary">
      <h1 className="font-display text-6xl font-bold text-accent-gold mb-4">404</h1>
      <p className="text-lg text-text-secondary mb-8">This portfolio doesn&apos;t exist.</p>
      <Link
        href="/"
        className="rounded-lg bg-accent-gold px-6 py-2.5 text-sm font-medium text-surface hover:bg-accent-gold-hover transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}

import type { Metadata } from 'next';
import { spaceGrotesk, dmSans, playfairDisplay } from '@/lib/fonts';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'FolioForge — Your Story. Professionally Told.',
  description: 'Build a stunning portfolio in minutes. Answer a few questions or paste your resume, and get a professional portfolio page you can share anywhere.',
  openGraph: {
    title: 'FolioForge — Your Story. Professionally Told.',
    description: 'Build a stunning portfolio in minutes.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${playfairDisplay.variable} grain-overlay antialiased`}
      >
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#12121a',
              border: '1px solid #1e1e2e',
              color: '#f0f0f0',
            },
          }}
        />
      </body>
    </html>
  );
}

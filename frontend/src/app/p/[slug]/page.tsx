import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortfolioView } from '@/components/portfolio/PortfolioView';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getPortfolio(slug: string) {
  const res = await fetch(`${API_URL}/api/public/portfolio/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = await getPortfolio(slug);
  if (!portfolio) return { title: 'Portfolio Not Found' };
  const name = portfolio.user
    ? `${portfolio.user.firstName} ${portfolio.user.lastName}`
    : slug;
  return {
    title: `${name} — FolioForge`,
    description: portfolio.headline,
    openGraph: {
      title: `${name} — Portfolio`,
      description: portfolio.headline,
      type: 'profile',
    },
  };
}

export default async function PublicPortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const portfolio = await getPortfolio(slug);
  if (!portfolio) notFound();
  return <PortfolioView portfolio={portfolio} isPublic />;
}

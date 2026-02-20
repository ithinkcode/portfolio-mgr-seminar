'use client';

import type { Portfolio } from '@/types';
import { ObsidianTheme } from './themes/ObsidianTheme';
import { ArcticTheme } from './themes/ArcticTheme';
import { EmberTheme } from './themes/EmberTheme';

interface PortfolioViewProps {
  portfolio: Portfolio;
  isPublic?: boolean;
}

export function PortfolioView({ portfolio, isPublic }: PortfolioViewProps) {
  switch (portfolio.theme) {
    case 'arctic':
      return <ArcticTheme portfolio={portfolio} isPublic={isPublic} />;
    case 'ember':
      return <EmberTheme portfolio={portfolio} isPublic={isPublic} />;
    case 'obsidian':
    default:
      return <ObsidianTheme portfolio={portfolio} isPublic={isPublic} />;
  }
}

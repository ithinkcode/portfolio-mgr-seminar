'use client';

import { useCallback, useState } from 'react';
import type { Portfolio } from '@/types';
import { api } from '@/lib/api';

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.portfolio.get();
      setPortfolio(data);
    } catch (err: unknown) {
      const e = err as { statusCode?: number; error?: string };
      if (e.statusCode === 404) {
        setPortfolio(null);
      } else {
        setError(e.error || 'Failed to load portfolio');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const save = useCallback(async (data: Partial<Portfolio>) => {
    setIsLoading(true);
    setError(null);
    // Strip null values — backend expects undefined for optional fields
    const cleaned = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, v === null ? undefined : v])
    );
    try {
      let result: Portfolio;
      if (portfolio) {
        result = await api.portfolio.patch(cleaned);
      } else {
        // Check if a portfolio already exists before deciding create vs patch
        try {
          const existing = await api.portfolio.get();
          if (existing) {
            setPortfolio(existing);
            result = await api.portfolio.patch(cleaned);
          } else {
            result = await api.portfolio.create(cleaned);
          }
        } catch {
          // 404 means no portfolio exists — create
          result = await api.portfolio.create(cleaned);
        }
      }
      setPortfolio(result);
      return result;
    } catch (err: unknown) {
      const e = err as { error?: string };
      setError(e.error || 'Failed to save portfolio');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [portfolio]);

  const publish = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await api.portfolio.publish();
      setPortfolio(result);
      return result;
    } catch (err: unknown) {
      const e = err as { error?: string };
      setError(e.error || 'Failed to publish');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const unpublish = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await api.portfolio.unpublish();
      setPortfolio(result);
      return result;
    } catch (err: unknown) {
      const e = err as { error?: string };
      setError(e.error || 'Failed to unpublish');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const remove = useCallback(async () => {
    setIsLoading(true);
    try {
      await api.portfolio.delete();
      setPortfolio(null);
    } catch (err: unknown) {
      const e = err as { error?: string };
      setError(e.error || 'Failed to delete');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { portfolio, isLoading, error, fetch, save, publish, unpublish, remove, setPortfolio };
}

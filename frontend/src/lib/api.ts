import type { User, Portfolio, AuthResponse, ApiResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

let accessToken: string | null = null;
let refreshPromise: Promise<void> | null = null;

function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
}

function setTokens(access: string, refresh: string) {
  accessToken = access;
  if (typeof window !== 'undefined') {
    localStorage.setItem('refreshToken', refresh);
  }
}

function clearTokens() {
  accessToken = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('refreshToken');
  }
}

async function refreshTokens(): Promise<void> {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error('No refresh token');

  const res = await fetch(`${API_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: refresh }),
  });

  if (!res.ok) {
    clearTokens();
    throw new Error('Refresh failed');
  }

  const data = await res.json();
  setTokens(data.data.accessToken, data.data.refreshToken);
}

async function fetchClient<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  let res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (res.status === 401 && getRefreshToken()) {
    if (!refreshPromise) {
      refreshPromise = refreshTokens().finally(() => { refreshPromise = null; });
    }
    try {
      await refreshPromise;
      headers['Authorization'] = `Bearer ${accessToken}`;
      res = await fetch(`${API_URL}${path}`, { ...options, headers });
    } catch {
      clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('Authentication failed');
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed', statusCode: res.status }));
    throw error;
  }

  const json = await res.json();
  return json.data as T;
}

export const api = {
  auth: {
    async register(data: { firstName: string; lastName: string; email: string; password: string }) {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw await res.json();
      const json: AuthResponse = await res.json();
      setTokens(json.data.accessToken, json.data.refreshToken);
      return json.data;
    },

    async login(data: { email: string; password: string }) {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw await res.json();
      const json: AuthResponse = await res.json();
      setTokens(json.data.accessToken, json.data.refreshToken);
      return json.data;
    },

    async refresh() {
      await refreshTokens();
    },

    async me(): Promise<User> {
      return fetchClient<User>('/api/auth/me');
    },
  },

  portfolio: {
    get: () => fetchClient<Portfolio>('/api/portfolio'),
    create: (data: Partial<Portfolio>) => fetchClient<Portfolio>('/api/portfolio', { method: 'POST', body: JSON.stringify(data) }),
    update: (data: Partial<Portfolio>) => fetchClient<Portfolio>('/api/portfolio', { method: 'PUT', body: JSON.stringify(data) }),
    patch: (data: Partial<Portfolio>) => fetchClient<Portfolio>('/api/portfolio', { method: 'PATCH', body: JSON.stringify(data) }),
    publish: () => fetchClient<Portfolio>('/api/portfolio/publish', { method: 'POST' }),
    unpublish: () => fetchClient<Portfolio>('/api/portfolio/unpublish', { method: 'POST' }),
    delete: () => fetchClient<void>('/api/portfolio', { method: 'DELETE' }),
    parseResume: (text: string) => fetchClient<Partial<Portfolio>>('/api/portfolio/parse-resume', { method: 'POST', body: JSON.stringify({ resumeText: text }) }),

    async downloadPdf(): Promise<Blob> {
      const headers: Record<string, string> = {};
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
      const res = await fetch(`${API_URL}/api/portfolio/pdf`, { headers });
      if (!res.ok) throw new Error('PDF generation failed');
      return res.blob();
    },
  },

  public: {
    async getPortfolio(slug: string): Promise<Portfolio> {
      const res = await fetch(`${API_URL}/api/public/portfolio/${slug}`, { next: { revalidate: 60 } } as RequestInit);
      if (!res.ok) throw new Error('Portfolio not found');
      const json: ApiResponse<Portfolio> = await res.json();
      return json.data;
    },
  },
};

export { clearTokens, getRefreshToken, accessToken };

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const API_BASE = process.env.EXPO_PUBLIC_API_BASE_URL as string
const BASE_URL = API_BASE.replace(/\/$/, '') + '/Auth';

type User = { id?: string; name?: string; email?: string } | null;

export type LoginDto = { email: string; password: string };
export type RegisterDto = { name?: string; email: string; password: string };

type Tokens = { accessToken: string; refreshToken?: string } | null;

export type AuthContextType = {
  user: User;
  tokens: Tokens;
  loading: boolean;
  login: (payload: LoginDto) => Promise<void>;
  register: (payload: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (payload: { token: string; password: string }) => Promise<void>;
};

const STORAGE_KEYS = {
  access: '@app_access_token',
  refresh: '@app_refresh_token',
};

const defaultValue: AuthContextType = {
  user: null,
  tokens: null,
  loading: true,
  login: async () => undefined,
  register: async () => undefined,
  logout: async () => undefined,
  refreshToken: async () => false,
  forgotPassword: async () => undefined,
  resetPassword: async () => undefined,
};

const AuthContext = createContext<AuthContextType>(defaultValue);

async function saveTokens(tokens: Tokens) {
  if (!tokens) {
    await AsyncStorage.removeItem(STORAGE_KEYS.access);
    await AsyncStorage.removeItem(STORAGE_KEYS.refresh);
    return;
  }
  await AsyncStorage.setItem(STORAGE_KEYS.access, tokens.accessToken);
  if (tokens.refreshToken) {
    await AsyncStorage.setItem(STORAGE_KEYS.refresh, tokens.refreshToken);
  }
}

async function loadTokens(): Promise<Tokens> {
  const access = await AsyncStorage.getItem(STORAGE_KEYS.access);
  if (!access) return null;
  const refresh = await AsyncStorage.getItem(STORAGE_KEYS.refresh);
  return { accessToken: access, refreshToken: refresh ?? undefined };
}

async function clearTokens() {
  await AsyncStorage.removeItem(STORAGE_KEYS.access);
  await AsyncStorage.removeItem(STORAGE_KEYS.refresh);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [tokens, setTokens] = useState<Tokens>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // helper to call API with optional auth header
  async function callApi(path: string, options: RequestInit = {}) {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (tokens?.accessToken) {
      headers['Authorization'] = `Bearer ${tokens.accessToken}`;
    }
    const res = await fetch(path.startsWith('http') ? path : `${BASE_URL}${path}`, {
      ...options,
      headers: { ...(options.headers as object), ...headers },
    });
    const text = await res.text();
    try {
      return { ok: res.ok, status: res.status, data: text ? JSON.parse(text) : null } as const;
    } catch {
      return { ok: res.ok, status: res.status, data: text } as const;
    }
  }

  async function fetchMe() {
    try {
      const r = await callApi('/me', { method: 'GET' });
      if (r.ok && r.data) {
        setUser(r.data);
        return true;
      }
    } catch {
      // ignore
    }
    return false;
  }

  async function login(payload: LoginDto) {
    const r = await callApi('/login', { method: 'POST', body: JSON.stringify(payload) });
    if (!r.ok) throw new Error(r.data?.message || `Login failed (${r.status})`);

    // try multiple token shapes
    const d = r.data;
    const newTokens: Tokens =
      d?.accessToken || d?.token
        ? { accessToken: d.accessToken ?? d.token, refreshToken: d.refreshToken ?? d.refresh_token }
        : null;
    if (newTokens) {
      await saveTokens(newTokens);
      setTokens(newTokens);
      await fetchMe();
      return;
    }
    throw new Error('Auth tokens not returned by server');
  }

  async function register(payload: RegisterDto) {
    const r = await callApi('/register', { method: 'POST', body: JSON.stringify(payload) });
    if (!r.ok) throw new Error(r.data?.message || `Register failed (${r.status})`);
    // registration may or may not return tokens — try to login if not provided
    const d = r.data;
    const newTokens: Tokens =
      d?.accessToken || d?.token
        ? { accessToken: d.accessToken ?? d.token, refreshToken: d.refreshToken ?? d.refresh_token }
        : null;
    if (newTokens) {
      await saveTokens(newTokens);
      setTokens(newTokens);
      await fetchMe();
    }
  }

  async function logout() {
    try {
      await callApi('/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    await clearTokens();
    setTokens(null);
    setUser(null);
  }

  async function refreshToken(): Promise<boolean> {
    const refresh = await AsyncStorage.getItem(STORAGE_KEYS.refresh);
    if (!refresh) return false;
    const r = await callApi('/refresh-token', { method: 'POST', body: JSON.stringify({ refreshToken: refresh }) });
    if (!r.ok) return false;
    const d = r.data;
    const newTokens: Tokens =
      d?.accessToken || d?.token
        ? { accessToken: d.accessToken ?? d.token, refreshToken: d.refreshToken ?? d.refresh_token ?? refresh }
        : null;
    if (newTokens) {
      await saveTokens(newTokens);
      setTokens(newTokens);
      return true;
    }
    return false;
  }

  async function forgotPassword(email: string) {
    const r = await callApi('/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });
    if (!r.ok) throw new Error(r.data?.message || `Forgot password failed (${r.status})`);
  }

  async function resetPassword(payload: { token: string; password: string }) {
    const r = await callApi('/reset-password', { method: 'POST', body: JSON.stringify(payload) });
    if (!r.ok) throw new Error(r.data?.message || `Reset password failed (${r.status})`);
  }

  // on mount load tokens and try to validate
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const t = await loadTokens();
        if (!mounted) return;
        if (t) {
          setTokens(t);
          const ok = await fetchMe();
          if (!ok) {
            // try refresh
            const refreshed = await refreshToken();
            if (refreshed) await fetchMe();
          }
        }
      } catch {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, tokens, loading, login, register, logout, refreshToken, forgotPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;

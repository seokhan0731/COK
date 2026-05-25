// src/store/authStore.ts

import { create } from 'zustand';
import type { UserType } from '../type';

type AuthStateType = {
  accessToken: string | null;
  user: UserType | null;

  setAuth: (token: string, user: UserType) => void;
  setUser: (user: UserType) => void;
  clearAuth: () => void;
};

const TOKEN_KEY = 'accessToken';
const USER_KEY = 'user';

const getInitialToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

const getInitialUser = (): UserType | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserType;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthStateType>((set) => ({
  accessToken: getInitialToken(),
  user: getInitialUser(),

  setAuth: (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    set({ accessToken: token, user });
  },
  setUser: (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    set({ user });
  },
  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    set({ accessToken: null, user: null });
  },
}));

export const useIsLoggedIn = (): boolean =>
  useAuthStore((s) => s.accessToken !== null);

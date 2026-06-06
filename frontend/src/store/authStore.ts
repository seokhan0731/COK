/* src/store/authStore.ts */

/* Library */
import { create } from 'zustand';

/* Type */
import type { UserRoleType } from '../type';

type AuthStateType = {
  accessToken: string | null;
  userRole: UserRoleType | null;

  setAuth: (token: string, role: UserRoleType) => void;
  clearAuth: () => void;
};

const TOKEN_KEY = 'ACCESS_TOKEN';
const ROLE_KEY = 'USER_ROLE';

const getInitialToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

const getInitialUserRole = (): UserRoleType | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ROLE_KEY) as UserRoleType | null;
};

export const useAuthStore = create<AuthStateType>((set) => ({
  accessToken: getInitialToken(),
  userRole: getInitialUserRole(),

  setAuth: (token, role) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role);
    set({ accessToken: token, userRole: role });
  },
  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    set({ accessToken: null, userRole: null });
  },
}));

export const useIsLoggedIn = (): boolean => useAuthStore((s) => s.accessToken !== null);

export const useUserRole = (): UserRoleType | null => useAuthStore((s) => s.userRole);

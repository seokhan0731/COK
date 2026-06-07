import axios from 'axios';
import { env } from './env';
import { useAuthStore } from '../store/authStore';

/* Github API 요청 */
export const githubClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Accept: 'application/vnd.github+json' },
});

/* 비회원 Backend API 요청 */
export const publicClient = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* 회원 Backend API 요청 */
export const authClient = axios.create({
  baseURL: env.API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

authClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* Mock Server */
export const mockClient = axios.create({
  baseURL: env.VITE_MOCK_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
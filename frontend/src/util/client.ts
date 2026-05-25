import axios from 'axios';
import { env } from './env';
import { useAuthStore } from '../store/authStore';

export const publicClient = axios.create({
  baseURL: import.meta.env.VITE_MOCK_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authClient = axios.create({
  baseURL: env.VITE_MOCK_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

authClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

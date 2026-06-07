import axios from 'axios';
import { env } from './env';
import { useAuthStore } from '../store/authStore';

export const publicClient = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

/* survey 전용 mock 클라이언트 (baseURL만 Postman mock, 토큰은 동일하게 첨부) */
export const mockClient = axios.create({
  baseURL: env.VITE_MOCK_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

mockClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

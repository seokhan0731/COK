// frontend/src/utils/env.ts

export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  KAKAO_REST_API_KEY: import.meta.env.VITE_KAKAO_API_KEY,
  KAKAO_REDIRECT_URI: import.meta.env.VITE_KAKAO_REDIRECT_URL,
} as const

Object.entries(env).forEach(([key, value]) => {
  if (!value) throw new Error(`Missing env: ${key}`)
})

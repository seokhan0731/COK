import type { KakaoAuthRequest } from '../type'
import client from '../util/client'
import { env } from '../util/env'
import.meta.env.VITE_API_BASE_URL

export const KakaoAuthApi = async ({ code }: KakaoAuthRequest) => {
  const { data } = await client.post(`${env.API_BASE_URL}/auth/kakao`, { code })
  return data
}

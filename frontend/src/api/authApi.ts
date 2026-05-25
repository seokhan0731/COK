import type { KakaoAuthRequest, KakaoAuthResponse } from '../type';
import { authClient, publicClient } from '../util/client';
import { env } from '../util/env';
import.meta.env.VITE_API_BASE_URL;

/* Type */
import type { UserType } from '../type';

/* 카카오 인가 코드를 백엔드로 보내 자체 accessToken으로 교환. */
export const KakaoAuthApi = async ({
  code,
}: KakaoAuthRequest): Promise<KakaoAuthResponse> => {
  const { data } = await publicClient.post<KakaoAuthResponse>(
    `/api/auth/kakao`,
    {
      code,
    },
  );
  return data;
};

export const fetchMeApi = async (): Promise<UserType> => {
  const { data } = await authClient.get<UserType>(`/api/user/me`);
  return data;
};

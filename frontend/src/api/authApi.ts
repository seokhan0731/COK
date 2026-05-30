import { type UserRoleType } from '../type';
import { publicClient } from '../util/client';

// #region Kakao Auth API

/* 카카오 인가 코드를 백엔드로 보내 자체 accessToken으로 교환. */
type KakaoAuthRequestType = {
  code: string;
};

type KakaoAuthResponseType = {
  accessToken: string;
  role: UserRoleType;
};

export const KakaoAuthApi = async ({
  code,
}: KakaoAuthRequestType): Promise<KakaoAuthResponseType> => {
  const { data } = await publicClient.post<KakaoAuthResponseType>(`/auth/kakao`, {
    code,
  });
  return data;
};
// #endregion

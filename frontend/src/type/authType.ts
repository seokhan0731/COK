// src/type/authType.ts

import type { UserStateType } from './userType';

export type KakaoAuthRequest = {
  code: string;
};

export type KakaoAuthResponse = {
  accessToken: string;
  userState: UserStateType;
};

/* src/api/homeApi.ts */

/* Util */
import { publicClient } from '../util/client';

/* Type */
export type MemberInfoType = {
  imageUrl: string;
  name: string;
  role: string[];
};

export type GetMemberInfoResponseType = {
  memberInfoData: MemberInfoType[];
};

export const GetMemberInfoApi = async (): Promise<GetMemberInfoResponseType> => {
  const { data } = await publicClient.get<GetMemberInfoResponseType>('/home');
  return data;
};

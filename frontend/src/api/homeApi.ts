/* src/api/homeApi.ts */

/* Util */
import { mockClient } from '../util/client';

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
  const { data } = await mockClient.get<GetMemberInfoResponseType>('/home');
  return data;
};

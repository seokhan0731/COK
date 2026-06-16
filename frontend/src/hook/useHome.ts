import { useQuery } from '@tanstack/react-query';
import { GetMemberInfoApi, type GetMemberInfoResponseType } from '../api/homeApi';

export const useHomeMemberInfo = () => {
  return useQuery<GetMemberInfoResponseType>({
    queryKey: ['members'],
    queryFn: GetMemberInfoApi,
    staleTime: 1000 * 60 * 5,
  });
};

/* src/hook/useUserSkill.ts */

import { useQuery } from '@tanstack/react-query';
import { getUserSkill } from '../api/dashboardApi';
import { useIsLoggedIn } from '../store/authStore';

export const useUserSkill = () => {
  const isLoggedIn = useIsLoggedIn();

  return useQuery({
    queryKey: ['userSkill'],
    queryFn: getUserSkill,
    staleTime: 1000 * 60 * 5,
    enabled: isLoggedIn,
  });
};

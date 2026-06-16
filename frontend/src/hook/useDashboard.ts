/* src/hook/useDashboard.ts */

import { useQuery } from '@tanstack/react-query';
import {
  getAllLoadMapProgressApi,
  getRecommendJobApi,
  getRecommendPostingApi,
  getUserSkillApi,
} from '../api/dashboardApi';
import { useIsLoggedIn } from '../store/authStore';

export const useUserSkill = () => {
  const isLoggedIn = useIsLoggedIn();
  return useQuery({
    queryKey: ['userSkill'],
    queryFn: getUserSkillApi,
    staleTime: 1000 * 60 * 5,
    enabled: isLoggedIn,
  });
};

export const useRecommendJob = () => {
  const isLoggedIn = useIsLoggedIn();
  return useQuery({
    queryKey: ['recommendJob'],
    queryFn: getRecommendJobApi,
    staleTime: 1000 * 60 * 5,
    enabled: isLoggedIn,
  });
};

export const useRecommendPosting = () => {
  const isLoggedIn = useIsLoggedIn();
  return useQuery({
    queryKey: ['recommendPosting'],
    queryFn: getRecommendPostingApi,
    staleTime: 1000 * 60 * 5,
    enabled: isLoggedIn,
  });
};

export const useAllLoadMapProgress = () => {
  const isLoggedIn = useIsLoggedIn();
  return useQuery({
    queryKey: ['allLoadMapProgress'],
    queryFn: getAllLoadMapProgressApi,
    staleTime: 1000 * 60 * 5,
    enabled: isLoggedIn,
  });
};

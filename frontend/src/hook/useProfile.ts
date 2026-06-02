/* src/hock/useProfile.ts */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProfileAndSkillApi,
  updateProfileApi,
  updateSkillApi,
  type GetProfileAndSkillResponseType,
  type UpdateProfileRequestType,
  type UpdateSkillRequest,
} from '../api/profileApi';

export const useProfile = () => {
  return useQuery<GetProfileAndSkillResponseType>({
    queryKey: ['profile'],
    queryFn: getProfileAndSkillApi,
    staleTime: 1000 * 60 * 5,
  });
};

export const useProfileImage = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfileAndSkillApi,
    staleTime: 1000 * 60 * 5,
    select: (data) => data.imageUrl,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfileRequestType) => updateProfileApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateSkillRequest) => updateSkillApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

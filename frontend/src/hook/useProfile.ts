/* src/hock/useProfile.ts */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createProfileApi,
  getProfileAndSkillApi,
  updateProfileApi,
  updateSkillApi,
  type CreateProfileRequestType,
  type GetProfileAndSkillResponseType,
  type UpdateProfileRequestType,
  type UpdateSkillRequest,
} from '../api/profileApi';
import { useIsLoggedIn, useUserRole } from '../store/authStore';

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProfileRequestType) => createProfileApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useProfile = () => {
  const isLoggedIn = useIsLoggedIn();

  return useQuery<GetProfileAndSkillResponseType>({
    queryKey: ['profile'],
    queryFn: getProfileAndSkillApi,
    staleTime: 1000 * 60 * 5,
    enabled: isLoggedIn,
  });
};

export const useGetUserName = () => {
  const isLoggedIn = useIsLoggedIn();

  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfileAndSkillApi,
    staleTime: 1000 * 60 * 5,
    select: (data) => data.name,
    enabled: isLoggedIn,
  });
};

export const useProfileImage = () => {
  const isLoggedIn = useIsLoggedIn();
  const userRole = useUserRole();

  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfileAndSkillApi,
    staleTime: 1000 * 60 * 5,
    select: (data) => data.imageUrl,
    enabled: isLoggedIn && userRole === 'USER',
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

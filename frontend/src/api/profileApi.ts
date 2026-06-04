/* src/api/profileApi.ts */

/* Library */
import axios from 'axios';

/* Type */
import {
  type AlgorithmType,
  type AttendStatusType,
  type CertificateType,
  type GradeType,
  type UserRoleType,
} from '../type';

/* util */
import { authClient, githubClient } from '../util/client';

// #region CreateProfileApi
export type CreateProfileRequestType = {
  name: string;
  birthYear: number;
  attendStatus: AttendStatusType;
  currentGrade: GradeType;
  algorithmLevel: AlgorithmType;
  certifications?: CertificateType[];
  githubId: string;
  imageFile?: File;
};

export type CreateProfileResponseType = {
  accessToken: string;
  currentRole: UserRoleType;
};

export const createProfileApi = async (
  payload: CreateProfileRequestType,
): Promise<CreateProfileResponseType> => {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('birthYear', payload.birthYear.toString());
  formData.append('attendStatus', payload.attendStatus);
  formData.append('currentGrade', payload.currentGrade);
  formData.append('algorithmLevel', payload.algorithmLevel);
  formData.append('githubId', payload.githubId);

  payload.certifications?.forEach((cert) => {
    formData.append('certifications', cert.toString());
  });

  if (payload.imageFile) {
    formData.append('imageFile', payload.imageFile);
  }

  const { data } = await authClient.post<CreateProfileResponseType>('/user/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
// #endregion

// #region GetProfileApi

export type GetProfileAndSkillResponseType = {
  name: string;
  birthYear: number;
  currentGrade: GradeType;
  attendStatus: AttendStatusType;
  imageUrl?: string;
  algorithmLevel: AlgorithmType;
  certifications?: CertificateType[];
  githubId: string;
};

export const getProfileAndSkillApi = async (): Promise<GetProfileAndSkillResponseType> => {
  const { data } = await authClient.get<GetProfileAndSkillResponseType>('/user/profile');
  return data;
};

// #endregion

// #region UpdateProfile
export type UpdateProfileRequestType = {
  name: string;
  birthYear: number;
  attendStatus: AttendStatusType;
  currentGrade?: GradeType;
  imageFile?: File;
};

export type UpdateProfileResponseType = {
  name: string;
  birthYear: number;
  attendStatus: AttendStatusType;
  currentGrade?: GradeType;
  imageUrl?: string;
};

export const updateProfileApi = async (
  payload: UpdateProfileRequestType,
): Promise<UpdateProfileResponseType> => {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('birthYear', payload.birthYear.toString());
  formData.append('attendStatus', payload.attendStatus);
  formData.append('currentGrade', payload.currentGrade?.toString() ?? '');

  if (payload.imageFile) {
    formData.append('imageFile', payload.imageFile);
  }

  console.log(formData.values);

  const { data } = await authClient.patch<UpdateProfileResponseType>('/user/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
};

// #endregion

// #region UpdateSkill
export type UpdateSkillRequest = {
  algorithmLevel: AlgorithmType;
  certifications?: CertificateType[];
  githubId: string;
};

type UpdateSkillResponseType = {
  algorithmLevel: AlgorithmType;
  certifications?: CertificateType[];
  githubId: string;
};

export const updateSkillApi = async (
  payload: UpdateSkillRequest,
): Promise<UpdateSkillResponseType> => {
  const { data } = await authClient.patch<UpdateSkillResponseType>('/user/profile/skill', payload);
  return data;
};
// #endregion

// #region Check GitHub ID
export type checkGithubIDRequestType = {
  githubID: string;
};

export type checkGithubIDResponseType = boolean;

const cache = new Map<string, boolean>();

export const checkGithubIDApi = async ({
  githubID,
}: checkGithubIDRequestType): Promise<checkGithubIDResponseType> => {
  const key = githubID.toLowerCase();
  const cached = cache.get(key);
  if (cached !== undefined) return cached;

  try {
    await githubClient.get(`/users/${encodeURIComponent(githubID)}`);
    cache.set(key, true);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      cache.set(key, false);
      return false;
    }
    throw error;
  }
};
// #endregion

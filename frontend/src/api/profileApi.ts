/* src/api/profileApi.ts */

import {
  type AlgorithmType,
  type AttendStatusType,
  type CertificateType,
  type GradeType,
} from '../type';
import { authClient } from '../util/client';

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
  const { data } = await authClient.get<GetProfileAndSkillResponseType>('/user/profile/2');
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

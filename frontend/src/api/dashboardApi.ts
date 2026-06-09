/* src/api/dashboardApi.ts */

/* Type */
import type { SkillDataType, JobDataType, PostingDataType } from '../type';

/* Util */
import { mockClient } from '../util/client';

// #region GetUserSkillAPI

type GetUserSkillResponseType = {
  competencies: SkillDataType[];
};

export const getUserSkillApi = async (): Promise<GetUserSkillResponseType> => {
  const { data } = await mockClient.get<GetUserSkillResponseType>('/user/skill');
  console.log(data);
  return data;
};

// #endregion

// #region GetUserRecommendJobAPI
type GetRecommendJobResponseType = {
  jobs: JobDataType[];
};

export const getRecommendJobApi = async (): Promise<GetRecommendJobResponseType> => {
  const { data } = await mockClient.get<GetRecommendJobResponseType>('user/recommend/job');
  console.log(data);
  return data;
};
// #endregion

// #region GetUserRecommendPostingAPI

type GetRecommendPostingResponseType = {
  postings: PostingDataType[];
};

export const getRecommendPostingApi = async (): Promise<GetRecommendPostingResponseType> => {
  const { data } = await mockClient.get<GetRecommendPostingResponseType>('user/recommend/posting');
  console.log(data);
  return data;
};

// #endregion

// #region GetAllLoadMapProgressAPI

type GetAllLoadMapProgressResponseType = {
  hasRoadmap: boolean;
  progress: number | null;
};

export const getAllLoadMapProgressApi = async (): Promise<GetAllLoadMapProgressResponseType> => {
  const { data } = await mockClient.get<GetAllLoadMapProgressResponseType>(
    'user/roadmap/progress/all',
  );
  console.log(data);
  return data;
};

// #endregion

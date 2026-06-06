/* src/api/dashboardApi.ts */

/* Type */
import type { SkillDataType } from '../type';

/* Util */
import { publicClient } from '../util/client';

type GetUserSkillResponseType = {
  competencies: SkillDataType[];
  comment: string;
};

export const getUserSkill = async (): Promise<GetUserSkillResponseType> => {
  const { data } = await publicClient.get<GetUserSkillResponseType>('/user/skill');
  console.log(data);
  return data;
};

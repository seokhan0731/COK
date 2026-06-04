import { authClient } from '../util/client';
import type { Question, Repo, SubmitSurveyRequest } from '../type/surveyType';

/* 설문 질문 목록 조회 */
export const getSurveyApi = async (signal?: AbortSignal): Promise<Question[]> => {
  const { data } = await authClient.get<{ questions: Question[] }>('/survey', { signal });
  return data.questions;
};

/* GitHub 레포지토리 목록 조회 */
export const getGithubReposApi = async (signal?: AbortSignal): Promise<Repo[]> => {
  const { data } = await authClient.get<{ repos: Repo[] }>('/github/repos', { signal });
  return data.repos;
};

/* 설문 답변 + 선택 레포 제출 */
export const submitSurveyApi = async (payload: SubmitSurveyRequest): Promise<void> => {
  await authClient.post('/survey/submit', payload);
};

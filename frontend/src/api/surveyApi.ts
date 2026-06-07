import { authClient } from '../util/client';
import type {
  Question,
  Repo,
  Stack,
  SubmitSurveyRequest,
  SubmitReposRequest,
  SubmitStacksRequest,
} from '../type/surveyType';

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

/* 기술 스택 조회  */
export const getStacksApi = async (
  selected_repos: string[],
  signal?: AbortSignal,
): Promise<Stack[]> => {
  const { data } = await authClient.post<{ stacks: Stack[] }>(
    '/github/stacks',
    { selected_repos },
    { signal },
  );
  return data.stacks ?? [];
};


/* =============================================================================================== */

// 제출

/* 설문 답변 제출 */
export const submitSurveyApi = async (payload: SubmitSurveyRequest): Promise<void> => {
  await authClient.post('/survey/submit', payload);
};

/* 선택 레포 제출 */
export const submitReposApi = async (payload: SubmitReposRequest): Promise<void> => {
  await authClient.post('/survey/repos', payload);
};

/* 선택 기술 스택 제출 */
export const submitStacksApi = async (payload: SubmitStacksRequest): Promise<void> => {
  await authClient.post('/survey/stacks', payload);
};

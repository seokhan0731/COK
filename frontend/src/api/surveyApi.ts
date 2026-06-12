import { authClient } from '../util/client';
import type {
  Question,
  Repo,
  StacksResponse,
  SubmitSurveyRequest,
  SubmitSurveyResponse,
  SubmitStacksRequest,
} from '../type/surveyType';


export const getSurveyApi = async (signal?: AbortSignal): Promise<Question[]> => {
  const { data } = await authClient.get<{ questions: Question[] }>('/survey', { signal });
  return data.questions;
};

export const getGithubReposApi = async (signal?: AbortSignal): Promise<Repo[]> => {
  const { data } = await authClient.get<{ repos: Repo[] }>('/survey/repos', { signal });
  return data.repos;
};

export const getStacksApi = async (
  selected_repos: string[],
  signal?: AbortSignal,
): Promise<StacksResponse> => {
  const { data } = await authClient.post<StacksResponse>(
    '/survey/repos',
    { selected_repos },
    { signal },
  );
  return {
    detected: data.detected ?? [],
    additional: data.additional ?? [],
  };
};


/* =============================================================================================== */

// 제출

export const submitSurveyApi = async (payload: SubmitSurveyRequest): Promise<number> => {
  const { data } = await authClient.post<number | SubmitSurveyResponse>('/survey/submit', payload);
  return typeof data === 'number' ? data : data.session_id;
};


export const submitStacksApi = async (payload: SubmitStacksRequest): Promise<void> => {
  await authClient.post('/survey/stacks', payload);
};

import { mockClient } from '../util/client';
import type { SessionResultResponse, SessionHistory } from '../type/historyType';

export const getSessionResultApi = async (
  signal?: AbortSignal,
): Promise<SessionResultResponse> => {
  const { data } = await mockClient.get<SessionResultResponse>('/result', { signal });
  return data;
};

export const getSessionHistoryApi = async (
  signal?: AbortSignal,
): Promise<SessionHistory[]> => {
  const { data } = await mockClient.get<SessionHistory[]>('/result/history', { signal });
  return data;
};

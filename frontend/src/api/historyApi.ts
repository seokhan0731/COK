import client from '../util/client';
import type { SessionResultResponse } from '../type/historyType';

/* 설문 결과(세션 결과) 조회 */
export const getSessionResultApi = async (
  signal?: AbortSignal,
): Promise<SessionResultResponse> => {
  const { data } = await client.get<SessionResultResponse>('/result', { signal });
  return data;
};

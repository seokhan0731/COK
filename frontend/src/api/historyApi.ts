import { mockClient } from '../util/client';
import type { SessionResultResponse, SessionHistory, SessionHistoryResponse } from '../type/historyType';
import { JOB_META } from '../type/dashboardType';

export const getSessionResultApi = async (
  sessionId: number,
  signal?: AbortSignal,
): Promise<SessionResultResponse> => {
  const { data } = await mockClient.get<SessionResultResponse>(`/history/result/${sessionId}`, { signal });
  return data;
};

export const getSessionHistoryApi = async (
  signal?: AbortSignal,
): Promise<SessionHistory[]> => {
  const { data } = await mockClient.get<SessionHistoryResponse>('/history/list', { signal });
  return data.history.map((h) => ({
    sessionId: h.session_id,
    createdAt: h.created_at,
    recommendedJob: JOB_META[h.top_job].label,
    topCompetency: h.top_competency,
    topScore: h.top_score,
  })).sort((a, b)=> b.createdAt.localeCompare(a.createdAt));
};

import { authClient } from '../util/client';
import type {
  SessionResultResponse,
  SessionHistory,
  SessionHistoryResponse,
} from '../type/historyType';
import { JOB_META } from '../type/dashboardType';

export const getSessionResultApi = async (
  sessionId: number,
  signal?: AbortSignal,
): Promise<SessionResultResponse> => {
  const { data } = await authClient.get<SessionResultResponse>(`/history/result/${sessionId}`, {
    signal,
  });
  console.log(data);
  return data;
};

export const getSessionHistoryApi = async (signal?: AbortSignal): Promise<SessionHistory[]> => {
  const { data } = await authClient.get<SessionHistoryResponse>('/history/list', { signal });
  console.log(data);
  return data.history
    .map((h) => ({
      sessionId: h.session_id,
      createdAt: h.createdAt,
      recommendedJob: JOB_META[h.top_job].label,
      topCompetency: h.top_competency,
      topScore: h.top_score,
    }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
};

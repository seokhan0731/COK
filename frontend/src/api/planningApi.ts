import { AxiosError } from "axios";
import { authClient, mockClient } from "../util/client";
import type { RoadmapData } from "../type/planningType";

/* 로드맵 조회 */
export const getPlanningApi = async (
  signal?: AbortSignal,
): Promise<RoadmapData> => {
  console.log("[planning] GET /planning 요청 시작");
  try {
    const res = await mockClient.get<RoadmapData>("/planning", { signal });
    console.log("[planning] status:", res.status);
    console.log("[planning] 응답 data:", res.data);
    console.log("[planning] months 개수:", res.data?.months?.length ?? 0);
    return res.data;
  } catch (e) {
    const err = e as AxiosError;
    console.error("[planning] 조회 실패:", err.response?.status, err.response?.data ?? err.message);
    throw e;
  }
};

/* 미션 완료 토글 */
export const patchDetailApi = async (
  detailId: number,
  isCompleted: boolean,
): Promise<{ detail_id: number; is_completed: boolean }> => {
  console.log(`[planning] PATCH /planning/details/${detailId} 요청, is_completed:`, isCompleted);
  try {
    const res = await mockClient.patch<{ detail_id: number; is_completed: boolean }>(
      `/planning/details/${detailId}`,
      { is_completed: isCompleted },
    );
    console.log("[planning] 토글 성공:", res.data);
    return res.data;
  } catch (e) {
    const err = e as AxiosError;
    console.error("[planning] 토글 실패:", err.response?.status, err.response?.data ?? err.message);
    throw e;
  }
};

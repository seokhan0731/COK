/* src/type/DashboardType.ts */

// #region Job
const JOB_TYPE = [
  1, // 백엔드 개발자
  2, // 프론트엔드 개발자
  3, // 모바일 개발자
  4, // AI/ML 엔지니어
  5, // DevOps 엔지니어
  6, // 데이터 엔지니어
  7, // PM/매니지먼트
  8, // 시스템/임베디드 개발자
  9, // 그래픽스 엔지니어
  10, // 블록체인 엔지니어
  11, // 영상/음성 엔지니어
] as const;

export type JobType = (typeof JOB_TYPE)[number];

type JobMetaType = {
  label: string;
};

export const JOB_META: Record<JobType, JobMetaType> = {
  1: { label: '백엔드 개발자' },
  2: { label: '프론트엔드 개발자' },
  3: { label: '모바일 개발자' },
  4: { label: 'AI/ML 엔지니어' },
  5: { label: 'DevOps 엔지니어' },
  6: { label: '데이터 엔지니어' },
  7: { label: 'PM/매니지먼트' },
  8: { label: '시스템/임베디드 개발자' },
  9: { label: '그래픽스 엔지니어' },
  10: { label: '블록체인 엔지니어' },
  11: { label: '영상/음성 엔지니어' },
};
// #endregion

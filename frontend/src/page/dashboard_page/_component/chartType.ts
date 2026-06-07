/* src/page/dashboard_page/_component/chartType.ts */

export const SKILL_TYPE = [
  'collaboration', // 협업
  'csKnowledge', // cs지식
  'implementation', // 구현력
  'algorithm', // 알고리즘
  'trend', // 트렌드
  'infrastructure', // 인프라
] as const;

export type SkillType = (typeof SKILL_TYPE)[number];

type SkillMetaType = {
  label: string;
};

export const SKILL_META: Record<SkillType, SkillMetaType> = {
  algorithm: { label: '알고리즘' },
  collaboration: { label: '협업' },
  csKnowledge: { label: 'cs지식' },
  implementation: { label: '구현력' },
  infrastructure: { label: '인프라' },
  trend: { label: '트랜드' },
};

export type SkillDataType = {
  skill: SkillType;
  value: number;
};

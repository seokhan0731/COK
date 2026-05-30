/* src/constant/skillMeta.ts*/

import {
  LucideBadgeCheck,
  Computer,
  LucideCode,
  LucideLanguages,
  LucideNetwork,
  type LucideIcon,
} from 'lucide-react';

export const INPUT_SKILL_TYPE = ['ALGORITHM', 'CERTIFICATE', 'GITHUB'] as const;

export type InputSkillType = (typeof INPUT_SKILL_TYPE)[number];

export type InputSkillMetaType = {
  icon: LucideIcon;
  iconColor: string;
  label: string;
};

export const INPUT_SKILL_META: Record<InputSkillType, InputSkillMetaType> = {
  ALGORITHM: {
    icon: LucideNetwork,
    label: '알고리즘 (baekjoon)',
    iconColor: '#f43f5e',
  },
  CERTIFICATE: {
    icon: LucideBadgeCheck,
    label: '자격증',
    iconColor: '#F59E0B	',
  },
  GITHUB: {
    icon: Computer,
    label: 'GitHub',
    iconColor: '#a855f7',
  },
};

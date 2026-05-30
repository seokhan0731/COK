/* src/constant/profileMeta.ts*/
import { LucideCake, LucideGraduationCap, type LucideIcon } from 'lucide-react';

export const TAG_TYPE = ['AGE', 'GRADE'] as const;
export type TagType = (typeof TAG_TYPE)[number];
export type TagMetaType = {
  icon: LucideIcon;
};
export type TagDataType = {
  tag: TagType;
  value: string;
};
export const TAG_META: Record<TagType, TagMetaType> = {
  AGE: { icon: LucideCake },
  GRADE: { icon: LucideGraduationCap },
};

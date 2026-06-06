/* src/type/profileType.ts */
import { LucideBookOpen, LucideGraduationCap, LucidePause, type LucideIcon } from 'lucide-react';

import algoUnrated from '../asset/algorithm_level/unrated/0.svg';
import algoBronze5 from '../asset/algorithm_level/bronze/5.svg';
import algoBronze4 from '../asset/algorithm_level/bronze/4.svg';
import algoBronze3 from '../asset/algorithm_level/bronze/3.svg';
import algoBronze2 from '../asset/algorithm_level/bronze/2.svg';
import algoBronze1 from '../asset/algorithm_level/bronze/1.svg';
import algoSilver5 from '../asset/algorithm_level/silver/5.svg';
import algoSilver4 from '../asset/algorithm_level/silver/4.svg';
import algoSilver3 from '../asset/algorithm_level/silver/3.svg';
import algoSilver2 from '../asset/algorithm_level/silver/2.svg';
import algoSilver1 from '../asset/algorithm_level/silver/1.svg';
import algoGold5 from '../asset/algorithm_level/gold/5.svg';
import algoGold4 from '../asset/algorithm_level/gold/4.svg';
import algoGold3 from '../asset/algorithm_level/gold/3.svg';
import algoGold2 from '../asset/algorithm_level/gold/2.svg';
import algoGold1 from '../asset/algorithm_level/gold/1.svg';
import algoPlatinum5 from '../asset/algorithm_level/platinum/5.svg';
import algoPlatinum4 from '../asset/algorithm_level/platinum/4.svg';
import algoPlatinum3 from '../asset/algorithm_level/platinum/3.svg';
import algoPlatinum2 from '../asset/algorithm_level/platinum/2.svg';
import algoPlatinum1 from '../asset/algorithm_level/platinum/1.svg';
import algoDiamond from '../asset/algorithm_level/over/over.svg';

// #region Form Type
export type CreateProfileFormDataType = EditProfileFormDataType & EditSkillFormDataType;

export type EditProfileFormDataType = {
  name: string;
  birthYear: number;
  attendStatus: AttendStatusType;
  currentGrade: GradeType;
  imageState: ImageStateType;
  imageFile?: File;
};

export type EditSkillFormDataType = {
  algorithmLevel: AlgorithmType;
  certifications?: CertificateType[];
  githubId: string;
};

// #endregion

/* ==================== General Type ==================== */
// #region Certificate

/* ---------------- Certificate ---------------- */
const CERTIFICATE_TYPE = [
  1, // INFO_PROCESSING_ENGINEER 정보처리기사
  2, // INFO_PROCESSING_INDUSTRIAL 정보처리산업기사
  3, // SQLD
  4, // SQLP
  5, // LINUX_MASTER_1
  6, // LINUX_MASTER_2
  7, // ADSP
  8, // ADP
  9, // TENSORFLOW_DEVELOPER
  10, // AWS_CCP
  11, // AWS_SAA
  12, // AWS_DVA
  13, // CKA
  14, // CKAD
  15, // RHCSA
] as const;

export type CertificateType = (typeof CERTIFICATE_TYPE)[number];

/* ---------------- Issuer ---------------- */
const ISSUER = [
  'HRDK', // 한국산업인력공단
  'K_DATA', // 한국데이터산업진흥원
  'KAIT', // 한국정보통신진흥협회
  'GOOGLE',
  'AWS',
  'CNCF', // Cloud Native Computing Foundation
  'RED_HAT',
] as const;

type IssuerType = (typeof ISSUER)[number];

export const ISSUER_LABEL: Record<IssuerType, string> = {
  HRDK: '한국산업인력공단',
  K_DATA: '한국데이터산업진흥원',
  KAIT: '한국정보통신진흥협회',
  GOOGLE: 'Google',
  AWS: 'Amazon Web Services',
  CNCF: 'Cloud Native Computing Foundation',
  RED_HAT: 'Red Hat',
};

/* ---------------- Meta ---------------- */
type CertificateMetaType = {
  label: string;
  issuer: IssuerType;
};

export const CERTIFICATE_META: Record<CertificateType, CertificateMetaType> = {
  1: { label: '정보처리기사', issuer: 'HRDK' }, // INFO_PROCESSING_ENGINEER
  2: { label: '정보처리산업기사', issuer: 'HRDK' }, // INFO_PROCESSING_INDUSTRIAL
  3: { label: 'SQLD', issuer: 'K_DATA' }, // SQLD
  4: { label: 'SQLP', issuer: 'K_DATA' }, // SQLP
  5: { label: '리눅스마스터 1급', issuer: 'KAIT' }, // LINUX_MASTER_1
  6: { label: '리눅스마스터 2급', issuer: 'KAIT' }, // LINUX_MASTER_2
  7: { label: 'ADsP', issuer: 'K_DATA' }, // ADSP
  8: { label: 'ADP', issuer: 'K_DATA' }, // ADP
  9: { label: 'TensorFlow Developer', issuer: 'GOOGLE' }, // TENSORFLOW_DEVELOPER
  10: { label: 'AWS CCP', issuer: 'AWS' }, // AWS_CCP
  11: { label: 'AWS SAA', issuer: 'AWS' }, // AWS_SAA
  12: { label: 'AWS DVA', issuer: 'AWS' }, // AWS_DVA
  13: { label: 'CKA', issuer: 'CNCF' }, // CKA
  14: { label: 'CKAD', issuer: 'CNCF' }, // CKAD
  15: { label: 'RHCSA', issuer: 'RED_HAT' }, // RHCSA
};

export const CERTIFICATE_OPTION = (
  Object.entries(CERTIFICATE_META) as [string, CertificateMetaType][]
).map(([value, meta]) => ({
  value: Number(value) as CertificateType,
  label: meta.label,
  description: ISSUER_LABEL[meta.issuer],
}));
// #endregion

// #region Algorithm
const ALGORITHM_TYPE = [
  'UNRATED',
  'BRONZE_5',
  'BRONZE_4',
  'BRONZE_3',
  'BRONZE_2',
  'BRONZE_1',
  'SILVER_5',
  'SILVER_4',
  'SILVER_3',
  'SILVER_2',
  'SILVER_1',
  'GOLD_5',
  'GOLD_4',
  'GOLD_3',
  'GOLD_2',
  'GOLD_1',
  'PLATINUM_5',
  'PLATINUM_4',
  'PLATINUM_3',
  'PLATINUM_2',
  'PLATINUM_1',
  'DIAMOND_OR_HIGHER',
] as const;

export type AlgorithmType = (typeof ALGORITHM_TYPE)[number];

type AlgorithmMetaType = {
  label: string;
  color: string;
  icon: string;
};

export const ALGORITHM_META: Record<AlgorithmType, AlgorithmMetaType> = {
  UNRATED: { label: '언레이티드', color: 'bg-gray-400/20', icon: algoUnrated },
  BRONZE_5: { label: '브론즈 V', color: 'bg-amber-700/20', icon: algoBronze5 },
  BRONZE_4: { label: '브론즈 IV', color: 'bg-amber-700/20', icon: algoBronze4 },
  BRONZE_3: { label: '브론즈 III', color: 'bg-amber-700/20', icon: algoBronze3 },
  BRONZE_2: { label: '브론즈 II', color: 'bg-amber-700/20', icon: algoBronze2 },
  BRONZE_1: { label: '브론즈 I', color: 'bg-amber-700/20', icon: algoBronze1 },
  SILVER_5: { label: '실버 V', color: 'bg-slate-400/20', icon: algoSilver5 },
  SILVER_4: { label: '실버 IV', color: 'bg-slate-400/20', icon: algoSilver4 },
  SILVER_3: { label: '실버 III', color: 'bg-slate-400/20', icon: algoSilver3 },
  SILVER_2: { label: '실버 II', color: 'bg-slate-400/20', icon: algoSilver2 },
  SILVER_1: { label: '실버 I', color: 'bg-slate-400/20', icon: algoSilver1 },
  GOLD_5: { label: '골드 V', color: 'bg-amber-400/20', icon: algoGold5 },
  GOLD_4: { label: '골드 IV', color: 'bg-amber-400/20', icon: algoGold4 },
  GOLD_3: { label: '골드 III', color: 'bg-amber-400/20', icon: algoGold3 },
  GOLD_2: { label: '골드 II', color: 'bg-amber-400/20', icon: algoGold2 },
  GOLD_1: { label: '골드 I', color: 'bg-amber-400/20', icon: algoGold1 },
  PLATINUM_5: { label: '플래티넘 V', color: 'bg-emerald-400/20', icon: algoPlatinum5 },
  PLATINUM_4: { label: '플래티넘 IV', color: 'bg-emerald-400/20', icon: algoPlatinum4 },
  PLATINUM_3: { label: '플래티넘 III', color: 'bg-emerald-400/20', icon: algoPlatinum3 },
  PLATINUM_2: { label: '플래티넘 II', color: 'bg-emerald-400/20', icon: algoPlatinum2 },
  PLATINUM_1: { label: '플래티넘 I', color: 'bg-emerald-400/20', icon: algoPlatinum1 },
  DIAMOND_OR_HIGHER: {
    label: '다이아 이상',
    color: 'bg-gradient-to-br from-red-400/25 via-yellow-400/25 via-green-400/25 to-purple-400/25',
    icon: algoDiamond,
  },
};

export const ALGORITHM_OPTION = (
  Object.entries(ALGORITHM_META) as [AlgorithmType, AlgorithmMetaType][]
).map(([value, meta]) => ({ value, label: meta.label, icon: meta.icon }));
// #endregion Algorithm

// #region AttendStatus
export const ATTEND_STATUS_TYPE = ['ENROLLED', 'ON_LEAVE', 'GRADUATION'] as const;

export type AttendStatusType = (typeof ATTEND_STATUS_TYPE)[number];
type AttendMetaType = {
  icon: LucideIcon;
  label: string;
};

export const ATTEND_STATUS_META: Record<AttendStatusType, AttendMetaType> = {
  ENROLLED: { icon: LucideBookOpen, label: '재학' },
  ON_LEAVE: { icon: LucidePause, label: '휴학' },
  GRADUATION: { icon: LucideGraduationCap, label: '졸업' },
};
// #endregion

// #region Grade
export const GRADE_TYPE = ['FRESHMAN', 'SOPHOMORE', 'JUNIOR', 'SENIOR', 'OTHER'] as const;
export type GradeType = (typeof GRADE_TYPE)[number];

type GradeMetaType = {
  label: string;
};

export const GRADE_META: Record<GradeType, GradeMetaType> = {
  FRESHMAN: { label: '1학년' },
  SOPHOMORE: { label: '2학년' },
  JUNIOR: { label: '3학년' },
  SENIOR: { label: '4학년' },
  OTHER: { label: '기타' },
};

export const GRADE_OPTION = (Object.entries(GRADE_META) as [GradeType, GradeMetaType][]).map(
  ([value, meta]) => ({ value, label: meta.label }),
);

// #endregion

// #region ImageState
const IMAGESTATE_TYPE = ['INIT', 'KEEP', 'CHANGE'] as const;
export type ImageStateType = (typeof IMAGESTATE_TYPE)[number];
//#endregion

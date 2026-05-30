/* src/type/profileType.ts */
import { LucideBookOpen, LucideGraduationCap, LucidePause, type LucideIcon } from 'lucide-react';

/* ==================== Form Type ==================== */
export type EditProfileFormDataType = {
  name: string;
  birthYear: number;
  attendStatus: AttendStatusType;
  currentGrade?: GradeType;
  imageFile?: File;
};

export type EditSkillFormDataType = {
  algorithmLevel: AlgorithmType;
  certifications?: CertificateType[];
  githubId: string;
};

/* ==================== General Type ==================== */
// #region Certificate

/* ---------------- Certificate ---------------- */
const CERTIFICATE_TYPE = [
  'INFO_PROCESSING_ENGINEER', // 정보처리기사
  'INFO_PROCESSING_INDUSTRIAL', // 정보처리산업기사
  'SQLD',
  'SQLP',
  'LINUX_MASTER_1',
  'LINUX_MASTER_2',
  'ADSP',
  'ADP',
  'TENSORFLOW_DEVELOPER',
  'AWS_CCP',
  'AWS_SAA',
  'AWS_DVA',
  'CKA',
  'CKAD',
  'RHCSA',
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
  INFO_PROCESSING_ENGINEER: { label: '정보처리기사', issuer: 'HRDK' },
  INFO_PROCESSING_INDUSTRIAL: { label: '정보처리산업기사', issuer: 'HRDK' },
  SQLD: { label: 'SQLD', issuer: 'K_DATA' },
  SQLP: { label: 'SQLP', issuer: 'K_DATA' },
  LINUX_MASTER_1: { label: '리눅스마스터 1급', issuer: 'KAIT' },
  LINUX_MASTER_2: { label: '리눅스마스터 2급', issuer: 'KAIT' },
  ADSP: { label: 'ADsP', issuer: 'K_DATA' },
  ADP: { label: 'ADP', issuer: 'K_DATA' },
  TENSORFLOW_DEVELOPER: { label: 'TensorFlow Developer', issuer: 'GOOGLE' },
  AWS_CCP: { label: 'AWS CCP', issuer: 'AWS' },
  AWS_SAA: { label: 'AWS SAA', issuer: 'AWS' },
  AWS_DVA: { label: 'AWS DVA', issuer: 'AWS' },
  CKA: { label: 'CKA', issuer: 'CNCF' },
  CKAD: { label: 'CKAD', issuer: 'CNCF' },
  RHCSA: { label: 'RHCSA', issuer: 'RED_HAT' },
};

export const CERTIFICATE_OPTION = (
  Object.entries(CERTIFICATE_META) as [CertificateType, CertificateMetaType][]
).map(([value, meta]) => ({
  value,
  label: meta.label,
  description: ISSUER_LABEL[meta.issuer],
}));
// #endregion

// #region Algorithm
const ALGORITHM_TYPE = [
  'UNRATED',
  'BRONZE',
  'SILVER',
  'GOLD',
  'PLATINUM',
  'DIAMOND',
  'RUBY',
] as const;

export type AlgorithmType = (typeof ALGORITHM_TYPE)[number];

type AlgorithmMetaType = {
  label: string;
};

export const ALGORITHM_META: Record<AlgorithmType, AlgorithmMetaType> = {
  UNRATED: { label: '언레이티드' },
  BRONZE: { label: '브론즈' },
  SILVER: { label: '실버' },
  GOLD: { label: '골드' },
  PLATINUM: { label: '플래티넘' },
  DIAMOND: { label: '다이아' },
  RUBY: { label: '루비' },
};

export const ALGORITHM_OPTION = (
  Object.entries(ALGORITHM_META) as [AlgorithmType, AlgorithmMetaType][]
).map(([value, meta]) => ({ value, label: meta.label }));
// #endregion Algorithm

// #region AttendStatus
export const ATTEND_STATUS_TYPE = ['ENROLLED', 'ON_LEAVE', 'GRADUATED'] as const;

export type AttendStatusType = (typeof ATTEND_STATUS_TYPE)[number];
type AttendMetaType = {
  icon: LucideIcon;
  label: string;
};

export const ATTEND_STATUS_META: Record<AttendStatusType, AttendMetaType> = {
  ENROLLED: { icon: LucideBookOpen, label: '재학' },
  ON_LEAVE: { icon: LucidePause, label: '휴학' },
  GRADUATED: { icon: LucideGraduationCap, label: '졸업' },
};
// #endregion

// #region Grade
export const GRADE_TYPE = [1, 2, 3, 4] as const;
export type GradeType = (typeof GRADE_TYPE)[number];

type GradeMetaType = {
  label: string;
};

export const GRADE_META: Record<GradeType, GradeMetaType> = {
  1: { label: '1' },
  2: { label: '2' },
  3: { label: '3' },
  4: { label: '4 +' },
};

// #endregion

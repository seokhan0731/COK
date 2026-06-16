/* src/type/index.ts */

// #region ==================== User ====================

export { USER_ROLE_TYPE, type UserRoleType } from './userType';

// #endregion

// #region ==================== Dashboard ====================

export type { Competency, CompetencyData } from './chart';

export {
  SKILL_META,
  type SkillType,
  type SkillDataType,
  type JobDataType,
  type PostingDataType,
} from './dashboardType';

// #endregion

// #region ==================== Profile ====================

export {
  ATTEND_STATUS_TYPE,
  CERTIFICATE_META,
  ISSUER_LABEL,
  ATTEND_STATUS_META,
  ATTEND_STATUS_OPTION,
  GRADE_TYPE,
  GRADE_META,
  ALGORITHM_OPTION,
  CERTIFICATE_OPTION,
  GRADE_OPTION,
  type AttendStatusType,
  type AlgorithmType,
  type CertificateType,
  type EditProfileFormDataType,
  type EditSkillFormDataType,
  type GradeType,
  type ImageStateType,
  type CreateProfileFormDataType,
} from './profileType';

// #endregion

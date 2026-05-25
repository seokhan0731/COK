// src/type/userType.ts

export type GradeType =
  | 'YEAR_1'
  | 'YEAR_2'
  | 'YEAR_3'
  | 'YEAR_4'
  | 'YEAR_5_PLUS';
export type AttendStatusType = 'ENROLLED' | 'ON_LEAVE' | 'GRADUATED';
export type AlgorithmLevelType =
  | 'UNRATED'
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'PLATINUM'
  | 'DIAMOND'
  | 'RUBY';
export type UserStateType = 'GUEST' | 'USER' | 'BANNED';

export type UserType = {
  userId: number;
  kakaoId: string;
  userState: UserStateType;
  name: string;
  birthYear: number;
  currentGrade?: GradeType;
  attendStatus: AttendStatusType;
  imageUrl: string | null;
  algorithmLevel: AlgorithmLevelType;
  createdAt: string;
  updatedAt: string;
};

export const GRADE_LABEL: Record<GradeType, string> = {
  YEAR_1: '1학년',
  YEAR_2: '2학년',
  YEAR_3: '3학년',
  YEAR_4: '4학년',
  YEAR_5_PLUS: '5학년 이상',
};

export const ATTEND_STATUS_LABEL: Record<AttendStatusType, string> = {
  ENROLLED: '재학',
  ON_LEAVE: '휴학',
  GRADUATED: '졸업',
};

export const ALGORITHM_LEVEL_LABEL: Record<AlgorithmLevelType, string> = {
  UNRATED: '언레이티드',
  BRONZE: '브론즈',
  SILVER: '실버',
  GOLD: '골드',
  PLATINUM: '플래티넘',
  DIAMOND: '다이아',
  RUBY: '루비',
};

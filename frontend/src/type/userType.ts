// src/type/userType.ts

// #region UserRoleType
export const USER_ROLE_TYPE = ['GUEST', 'USER'] as const;
export type UserRoleType = (typeof USER_ROLE_TYPE)[number];
// #endregion

export type EnrollmentStatus = 'ENROLLED' | 'ON_LEAVE' | 'GRADUATE' | null;
export type Grade = '1학년' | '2학년' | '3학년' | '4학년' | '기타' | null
export type User = {
    // id: number;
    name: string;
    birth: string;
    grade: Grade;
    status: EnrollmentStatus;
}
import type { JobType, SkillType, SkillDataType } from './dashboardType';

export interface Session {
    session_id: number;
    user_id: number;
    created_at: string;
}

/* dashboard의 SkillDataType({ skill, value })과 동일한 형태 */
export type CompetencyResult = SkillDataType;

export interface JobResult {
    job_id: JobType;
    match: number;
}

export interface PostingResult {
    posting_id: number;
    company_name: string;
    title: string;
    description: string;
    match: number;
}

export interface SessionResultResponse {
    session: Session;
    competency_results: CompetencyResult[];
    job_results: JobResult[];
    posting_results: PostingResult[];
}

export interface SessionHistoryRaw {
    session_id: number;
    created_at: string;
    top_job: JobType;
    top_competency: SkillType;
    top_score: number;
}

export interface SessionHistoryResponse {
    history: SessionHistoryRaw[];
    total: number;
}

export interface SessionHistory {
    sessionId: number;
    createdAt: string;
    recommendedJob: string;
    topCompetency: SkillType;
    topScore: number;
}

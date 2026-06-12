import type { JobType, SkillType } from './DashboardType';

export interface Session {
    sessionId: number;
    userId: number;
    createdAt: string;
}

export interface CompetencyResult {
    competencyResultId: number;
    sessionId: number;
    competencyId: number;
    name: string;
    value: number;
    rank: number;
}

export interface JobResult {
    jobResultId: number;
    sessionId: number;
    jobId: number;
    name: string;
    match: number;
    rank: number;
}

export interface PostingResult {
    postingResultId: number;
    sessionId: number;
    postingId: number;
    companyName: string;
    title: string;
    description: string;
    match: number;
    rank: number;
}

export interface SessionResultResponse {
    session: Session;
    competencyResults: CompetencyResult[];
    jobResults: JobResult[];
    postingResults: PostingResult[];
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

export interface Session {
    session_id: number;
    user_id: number;
    created_at: string;
}

export interface CompetencyResult {
    competency_result_id: number;
    session_id: number;
    competency_id: number;
    name: string;
    total_score: number;
    rank: number;
}

export interface JobResult {
    job_result_id: number;
    session_id: number;
    job_id: number;
    name: string;
    total_score: number;
    rank: number;
}

export interface PostingResult {
    posting_result_id: number;
    session_id: number;
    posting_id: number;
    company_name: string;
    title: string;
    description: string;
    similarity: number;
    rank: number;
}

export interface SessionResultResponse {
    session: Session;
    competency_results: CompetencyResult[];
    job_results: JobResult[];
    posting_results: PostingResult[];
}

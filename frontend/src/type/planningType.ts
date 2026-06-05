export interface MonthlyDetail {
  detail_id: number;
  content: string;
  is_completed: boolean;
  category: Category;
  overview_id: number;
}

export interface MonthlyOverview {
  overview_id: number;
  roadmap_id: number;
  month_num: number;
  comment: string;
  details: MonthlyDetail[];
}

export interface RoadmapData {
  roadmap_id: number;
  session_id: number;
  job_id: number;
  created_at: string;
  months: MonthlyOverview[];
}

export interface RoadmapCardProps {
  month: MonthlyOverview | undefined;
  createdAt: string;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export interface ProgressCardProps {
  completed: number;
  remaining: number;
}

export interface CommentCardProps {
  comment?: string;
}

export type Category = "TECH_STACK" | "ALGORITHM" | "KNOWLEDGE" | "CERTIFICATE";
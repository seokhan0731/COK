export interface MonthlyDetail {
  detail_id: number;
  content: string;
  is_completed: boolean;
  category: string;
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
  // onMonthChange: (month: number) => void;
}

export interface ProgressCardProps {
  completed: number;
  remaining: number;
}

export interface CommentCardProps {
  comment?: string;
}

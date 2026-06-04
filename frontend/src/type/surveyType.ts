export type QuestionType = 'single' | 'subjective';

export type Option = {
  option_id: number;
  question_id: number;
  content: string;
};

export type Question = {
  question_id: number;
  competency_id: number;
  content: string;
  type: QuestionType;
  options: Option[];
};

export type Repo = {
  name: string;
  description: string | null;
  html_url: string;
};

export type Answer = {
  question_id: number;
  option_id?: number;
  subjective_answer?: string;
};

export type SubmitSurveyRequest = {
  answers: Answer[];
  selected_repos: string[];
};

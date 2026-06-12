export type QuestionType = 'MULTI' | 'ESSAY';

export type Option = {
  option_id: number;
  question_id: number;
  content: string;
};

export type Question = {
  question_id: number;
  competency_id?: number | null;
  content: string;
  type: QuestionType;
  options: Option[];
};

export type Repo = {
  name: string;
  description: string | null;
};

export type TechSkill = string;

export type UserTechSkill = string;

export type StacksResponse = {
  detected: TechSkill[];
  additional: TechSkill[];
};

export type Answer = {
  question_id: number;
  option_id?: number;
  essay_answer?: string;
};

export type SubmitSurveyRequest = {
  answers: Answer[];
};

export type SubmitStacksRequest = {
  selected_stacks: TechSkill[];
  session_id: number;
};

export type Option = {
  option_id: number
  question_id: number
  content: string
  score: number
}

export type Question = {
  question_id: number
  competency_id: number
  content: string
  type: string
  options: Option[]
}

export type Survey = {
  competency_id: number
  category: string
  questions: Question[]
}

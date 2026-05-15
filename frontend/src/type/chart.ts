export type Competency =
  | 'collaboration'
  | 'cs'
  | 'implementation'
  | 'algorithm'
  | 'trand'
  | 'infrastructure'

export const CompetencyLabel: Record<Competency, string> = {
  collaboration: '협업',
  cs: 'cs지식',
  implementation: '구현력',
  algorithm: '알고리즘',
  trand: '트렌드',
  infrastructure: '인프라',
}

export type CompetencyData = {
  subject: Competency
  value: number
}

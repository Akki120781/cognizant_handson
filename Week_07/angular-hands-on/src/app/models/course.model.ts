export type GradeStatus = 'passed' | 'failed' | 'pending';

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number | null;
  gradeStatus: GradeStatus;
  capacity: number;
  fee: number;
  rating: number;
  startDate: string;
  summary: string;
}

export interface EnrollmentRequest {
  id?: number;
  studentName: string;
  studentEmail: string;
  courseId: string | number;
  preferredSemester: 'Odd' | 'Even';
  agreeToTerms: boolean;
  additionalCourses?: string[];
}

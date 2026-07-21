import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { INITIAL_STUDENTS } from '../data/mock-data';
import { Course } from '../models/course.model';
import { EnrollmentRequest } from '../models/enrollment-request.model';
import { Student } from '../models/student.model';
import { CourseService } from './course.service';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private readonly courseService = inject(CourseService);
  private readonly http = inject(HttpClient);
  private readonly enrolledCourseIdsSubject = new BehaviorSubject<number[]>([]);

  readonly enrolledCourseIds$ = this.enrolledCourseIdsSubject.asObservable();

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIdsSubject.next([...this.enrolledCourseIdsSubject.value, courseId]);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIdsSubject.next(
      this.enrolledCourseIdsSubject.value.filter((id) => id !== courseId)
    );
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIdsSubject.value.includes(courseId);
  }

  getEnrolledCourses(): Course[] {
    const ids = this.enrolledCourseIdsSubject.value;
    return this.courseService.getLocalCourses().filter((course) => ids.includes(course.id));
  }

  getEnrolledCourses$(): Observable<Course[]> {
    return combineLatest([this.enrolledCourseIds$, this.courseService.localCourses$]).pipe(
      map(([ids, courses]) => courses.filter((course) => ids.includes(course.id)))
    );
  }

  submitEnrollment(request: EnrollmentRequest): Observable<EnrollmentRequest> {
    return this.http
      .post<EnrollmentRequest>('http://localhost:3000/enrollments', request)
      .pipe(catchError(() => of(request)));
  }

  getStudentsByCourse(courseId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`http://localhost:3000/students?courseId=${courseId}`).pipe(
      catchError(() => of(INITIAL_STUDENTS.filter((student) => student.courseId === courseId)))
    );
  }
}

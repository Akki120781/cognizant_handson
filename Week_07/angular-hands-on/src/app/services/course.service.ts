import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { INITIAL_COURSES } from '../data/mock-data';
import { Course } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/courses';
  private readonly coursesSubject = new BehaviorSubject<Course[]>(INITIAL_COURSES);

  readonly localCourses$ = this.coursesSubject.asObservable();

  getLocalCourses(): Course[] {
    return this.coursesSubject.value;
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      retry(2),
      map((courses) => courses.filter((course) => (course.credits ?? 0) > 0)),
      // tap is used for logging and local cache updates without changing the stream value.
      tap((courses) => {
        console.log('Courses loaded:', courses.length);
        this.coursesSubject.next(courses);
      }),
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        const fallback = this.getLocalCourseById(id);
        return fallback
          ? new Observable<Course>((observer) => {
              observer.next(fallback);
              observer.complete();
            })
          : throwError(() => new Error('Course not found.'));
      })
    );
  }

  getLocalCourseById(id: number): Course | undefined {
    return this.coursesSubject.value.find((course) => course.id === id);
  }

  addCourse(course: Course): void {
    this.coursesSubject.next([...this.coursesSubject.value, course]);
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap((createdCourse) => this.addCourse(createdCourse))
    );
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      tap((updatedCourse) => {
        const nextCourses = this.coursesSubject.value.map((item) =>
          item.id === id ? updatedCourse : item
        );
        this.coursesSubject.next(nextCourses);
      })
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.coursesSubject.next(this.coursesSubject.value.filter((course) => course.id !== id));
      })
    );
  }
}

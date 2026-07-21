import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, filter, of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { HighlightDirective } from '../../directives/highlight.directive';
import { Course } from '../../models/course.model';
import { Student } from '../../models/student.model';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { loadCourses } from '../../store/course/course.actions';
import {
  selectAllCourses,
  selectCoursesError,
  selectCoursesLoading
} from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [AsyncPipe, CourseCardComponent, FormsModule, HighlightDirective],
  template: `
    <section class="panel course-toolbar">
      <div>
        <h1 class="page-title">Courses</h1>
        <p>Browse, search, preview students and manage enrollment state.</p>
      </div>

      <div class="field">
        <label for="courseSearch">Search</label>
        <input
          id="courseSearch"
          name="courseSearch"
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearchChange($event)"
          placeholder="angular"
        />
      </div>

      <div class="actions-row">
        <button type="button" class="secondary-button" (click)="addSampleCourse()">POST sample</button>
        <button type="button" class="secondary-button" (click)="reloadCourses()">Reload</button>
      </div>
    </section>

    @if (localLoading || ((loading$ | async) ?? false)) {
      <p class="panel loading-state">Loading courses...</p>
    } @else {
      @if (error$ | async; as error) {
        <p class="alert">{{ error }}</p>
      } @else {
        @if (filteredCourses$ | async; as courses) {
          @if (courses.length > 0) {
            <section class="course-grid" aria-label="Course list">
              @for (course of courses; track trackByCourseId($index, course)) {
                <app-course-card
                  appHighlight="lightblue"
                  [course]="course"
                  [enrolled]="((enrolledIds$ | async)?.includes(course.id)) ?? false"
                  (courseSelected)="openCourse($event)"
                  (enrollRequested)="onEnroll($event)"
                />
              }
            </section>
          } @else {
            <p class="panel">No courses available.</p>
          }
        }
      }
    }

    @if (selectedCourseId) {
      <section class="panel">
        <h2>Selected course ID: {{ selectedCourseId }}</h2>
        @if (selectedCourseStudents$ | async; as students) {
          @if (students.length > 0) {
            <ul class="student-list">
              @for (student of students; track student.id) {
                <li>{{ student.name }} - {{ student.email }}</li>
              }
            </ul>
          } @else {
            <p>No enrolled students found for this course.</p>
          }
        }
      </section>
    }
  `,
  styles: [
    `
      .course-toolbar {
        align-items: end;
        display: grid;
        gap: 16px;
        grid-template-columns: minmax(220px, 1fr) minmax(220px, 320px) auto;
      }

      .course-toolbar p {
        color: #64748b;
        margin: 6px 0 0;
      }

      .course-grid {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      }

      .loading-state {
        color: #475569;
        font-weight: 700;
      }

      h2 {
        font-size: 1.1rem;
        margin: 0 0 10px;
      }

      .student-list {
        display: grid;
        gap: 8px;
        margin: 0;
        padding-left: 18px;
      }

      @media (max-width: 900px) {
        .course-toolbar {
          align-items: stretch;
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class CourseListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);
  private readonly enrollmentService = inject(EnrollmentService);
  private readonly searchSubject = new BehaviorSubject('');
  private readonly selectedCourseIdSubject = new BehaviorSubject<number | null>(null);

  readonly courses$ = this.store.select(selectAllCourses);
  readonly loading$ = this.store.select(selectCoursesLoading);
  readonly error$ = this.store.select(selectCoursesError);
  readonly enrolledIds$ = this.store.select(selectEnrolledIds);
  readonly filteredCourses$ = combineLatest([this.courses$, this.searchSubject]).pipe(
    map(([courses, searchTerm]) => {
      const normalisedSearch = searchTerm.trim().toLowerCase();
      return normalisedSearch
        ? courses.filter(
            (course) =>
              course.name.toLowerCase().includes(normalisedSearch) ||
              course.code.toLowerCase().includes(normalisedSearch)
          )
        : courses;
    })
  );
  readonly selectedCourseStudents$ = this.selectedCourseIdSubject.pipe(
    filter((courseId): courseId is number => courseId !== null),
    // switchMap cancels the previous student lookup if another course is selected quickly.
    switchMap((courseId) => this.enrollmentService.getStudentsByCourse(courseId))
  );

  searchTerm = '';
  selectedCourseId: number | null = null;
  localLoading = true;

  ngOnInit(): void {
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') ?? '';
    this.searchSubject.next(this.searchTerm);
    this.reloadCourses();
    window.setTimeout(() => {
      this.localLoading = false;
    }, 1500);
  }

  reloadCourses(): void {
    this.store.dispatch(loadCourses());
  }

  onSearchChange(value: string): void {
    this.searchSubject.next(value);
    void this.router.navigate(['courses'], {
      queryParams: value ? { search: value } : {}
    });
  }

  trackByCourseId(_index: number, course: Course): number {
    // trackBy keeps Angular from recreating unchanged cards when the array changes.
    return course.id;
  }

  openCourse(courseId: number): void {
    void this.router.navigate(['courses', courseId]);
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
    this.selectedCourseIdSubject.next(courseId);
  }

  addSampleCourse(): void {
    const course: Omit<Course, 'id'> = {
      name: 'HTTP Practice Course',
      code: 'NG777',
      credits: 3,
      gradeStatus: 'pending',
      capacity: 22,
      fee: 4100,
      rating: 4.0,
      startDate: '2026-09-16',
      summary: 'Created through the CourseService POST method.'
    };

    this.courseService
      .createCourse(course)
      .pipe(
        catchError(() => {
          this.courseService.addCourse({ id: Date.now(), ...course });
          return of(null);
        })
      )
      .subscribe(() => this.reloadCourses());
  }
}

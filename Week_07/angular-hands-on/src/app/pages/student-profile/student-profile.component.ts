import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnrollmentService } from '../../services/enrollment.service';
import { loadCourses } from '../../store/course/course.actions';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <section class="page-stack">
      <div class="panel profile-header">
        <div>
          <h1 class="page-title">Student Profile</h1>
          <p>Akhil - Java FSE learner</p>
        </div>
        <strong>GPA 3.8</strong>
      </div>

      <section class="panel">
        <h2>NgRx Enrolled Courses</h2>
        @if (storeEnrolledCourses$ | async; as courses) {
          @if (courses.length > 0) {
            <ul>
              @for (course of courses; track course.id) {
                <li>{{ course.name }} - {{ course.code }}</li>
              }
            </ul>
          } @else {
            <p>No store-backed enrollments yet.</p>
          }
        }
      </section>

      <section class="panel">
        <h2>Service Enrolled Courses</h2>
        @if (serviceEnrolledCourses$ | async; as courses) {
          @if (courses.length > 0) {
            <ul>
              @for (course of courses; track course.id) {
                <li>{{ course.name }} - {{ course.code }}</li>
              }
            </ul>
          } @else {
            <p>No service-backed enrollments yet.</p>
          }
        }
      </section>
    </section>
  `,
  styles: [
    `
      .profile-header {
        align-items: center;
        display: flex;
        justify-content: space-between;
      }

      .profile-header p,
      section p {
        color: #64748b;
        margin: 6px 0 0;
      }

      h2 {
        font-size: 1.05rem;
        margin: 0 0 12px;
      }

      ul {
        display: grid;
        gap: 8px;
        margin: 0;
        padding-left: 18px;
      }
    `
  ]
})
export class StudentProfileComponent implements OnInit {
  private readonly enrollmentService = inject(EnrollmentService);
  private readonly store = inject(Store);

  readonly serviceEnrolledCourses$ = this.enrollmentService.getEnrolledCourses$();
  readonly storeEnrolledCourses$ = this.store.select(selectEnrolledCourses);

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
  }
}

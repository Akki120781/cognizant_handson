import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <section class="summary-widget" aria-label="Course summary">
      <div>
        <span>Live Course Count</span>
        <strong>{{ courseCount$ | async }}</strong>
      </div>
      <button type="button" class="secondary-button" (click)="addCourse()">Add Course Locally</button>
    </section>
  `,
  styles: [
    `
      .summary-widget {
        align-items: center;
        background: #f8fafc;
        border: 1px solid #dbe3ef;
        border-radius: 8px;
        display: flex;
        gap: 14px;
        justify-content: space-between;
        padding: 14px;
      }

      span {
        color: #64748b;
        display: block;
        font-size: 0.82rem;
        font-weight: 700;
      }

      strong {
        color: #0f766e;
        display: block;
        font-size: 1.7rem;
      }
    `
  ]
})
export class CourseSummaryWidgetComponent {
  private readonly courseService = inject(CourseService);

  readonly courseCount$ = this.courseService.localCourses$.pipe(map((courses) => courses.length));

  addCourse(): void {
    this.courseService.addCourse({
      id: Date.now(),
      name: 'Portal Practice Lab',
      code: 'NG900',
      credits: 1,
      gradeStatus: 'pending',
      capacity: 18,
      fee: 2500,
      rating: 4.1,
      startDate: '2026-09-09',
      summary: 'Local singleton service update used to verify shared service state.'
    });
  }
}

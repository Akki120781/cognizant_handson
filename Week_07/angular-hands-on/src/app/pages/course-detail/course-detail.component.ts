import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="panel detail-panel">
      @if (course) {
        <a routerLink="/courses" class="back-link">Back to courses</a>
        <span class="code">{{ course.code }}</span>
        <h1 class="page-title">{{ course.name }}</h1>
        <p>{{ course.summary }}</p>
        <dl>
          <div>
            <dt>Credits</dt>
            <dd>{{ course.credits }}</dd>
          </div>
          <div>
            <dt>Capacity</dt>
            <dd>{{ course.capacity }}</dd>
          </div>
          <div>
            <dt>Grade Status</dt>
            <dd>{{ course.gradeStatus }}</dd>
          </div>
        </dl>
      } @else {
        <p class="alert">{{ errorMessage }}</p>
      }
    </section>
  `,
  styles: [
    `
      .detail-panel {
        display: grid;
        gap: 12px;
      }

      .back-link {
        color: #2563eb;
        font-weight: 800;
        text-decoration: none;
      }

      .code {
        color: #64748b;
        font-size: 0.8rem;
        font-weight: 800;
      }

      p {
        color: #475569;
        margin: 0;
      }

      dl {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        margin: 0;
      }

      dt {
        color: #64748b;
        font-size: 0.78rem;
        font-weight: 800;
      }

      dd {
        margin: 0;
      }
    `
  ]
})
export class CourseDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);

  course: Course | null = null;
  errorMessage = 'Course not found.';

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));

    if (!courseId) {
      return;
    }

    this.courseService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.course = course;
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
      }
    });
  }
}

import { FormsModule } from '@angular/forms';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CourseSummaryWidgetComponent, FormsModule],
  template: `
    <section class="page-stack">
      <div class="panel intro-panel">
        <div>
          <h1 class="page-title">{{ portalName }}</h1>
          <p>
            Manage courses, enrollment requests, profile state and Angular practice workflows from
            one portal.
          </p>
        </div>

        <div class="stats-row" aria-label="Student statistics">
          <div>
            <span>Courses Available</span>
            <strong>{{ availableCourses }}</strong>
          </div>
          <div>
            <span>Enrolled</span>
            <strong>3</strong>
          </div>
          <div>
            <span>GPA</span>
            <strong>3.8</strong>
          </div>
        </div>
      </div>

      <div class="panel binding-panel">
        <div class="field-grid">
          <div class="field">
            <label for="searchTerm">Course Search</label>
            <input id="searchTerm" name="searchTerm" [(ngModel)]="searchTerm" />
          </div>
          <p>Searching for: {{ searchTerm || 'All courses' }}</p>
        </div>

        <div class="actions-row">
          <button type="button" class="primary-button" [disabled]="!isPortalActive" (click)="onEnrollClick()">
            Enroll Now
          </button>
          @if (message) {
            <strong class="success-text">{{ message }}</strong>
          }
        </div>
      </div>

      <app-course-summary-widget />
    </section>
  `,
  styles: [
    `
      .intro-panel {
        display: grid;
        gap: 18px;
      }

      .intro-panel p,
      .binding-panel p {
        color: #475569;
        margin: 8px 0 0;
      }

      .stats-row {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .stats-row div {
        background: #f8fafc;
        border: 1px solid #dbe3ef;
        border-radius: 8px;
        padding: 14px;
      }

      .stats-row span {
        color: #64748b;
        display: block;
        font-size: 0.8rem;
        font-weight: 800;
      }

      .stats-row strong {
        color: #111827;
        display: block;
        font-size: 1.8rem;
        margin-top: 4px;
      }

      .binding-panel {
        display: grid;
        gap: 14px;
      }

      @media (max-width: 720px) {
        .stats-row {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly courseService = inject(CourseService);

  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  availableCourses = 0;

  ngOnInit(): void {
    this.availableCourses = this.courseService.getLocalCourses().length;
    console.log('HomeComponent initialised - courses loaded');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    // [disabled] is one-way component-to-DOM binding; [(ngModel)] keeps DOM and component state synchronized.
    this.message = 'Enrollment opened!';
  }
}

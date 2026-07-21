import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  NgClass,
  NgStyle,
  UpperCasePipe
} from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { EnrollmentService } from '../../services/enrollment.service';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CurrencyPipe, CreditLabelPipe, DatePipe, DecimalPipe, NgClass, NgStyle, UpperCasePipe],
  template: `
    <article
      class="course-card"
      [ngClass]="cardClasses"
      [ngStyle]="{ 'border-left-color': statusColor }"
      (click)="selectCourse()"
    >
      <header>
        <span class="code">{{ course.code | uppercase }}</span>
        <h3>{{ course.name }}</h3>
      </header>

      @switch (course.gradeStatus) {
        @case ('passed') {
          <span class="badge badge--passed">Passed</span>
        }
        @case ('failed') {
          <span class="badge badge--failed">Failed</span>
        }
        @default {
          <span class="badge badge--pending">Pending</span>
        }
      }

      <p>{{ course.summary }}</p>

      <dl>
        <div>
          <dt>Credits</dt>
          <dd>{{ course.credits | creditLabel }}</dd>
        </div>
        <div>
          <dt>Fee</dt>
          <dd>{{ course.fee | currency: 'INR' : 'symbol' : '1.0-0' }}</dd>
        </div>
        <div>
          <dt>Start</dt>
          <dd>{{ course.startDate | date: 'mediumDate' }}</dd>
        </div>
        <div>
          <dt>Rating</dt>
          <dd>{{ course.rating | number: '1.1-1' }}</dd>
        </div>
      </dl>

      @if (isExpanded) {
        <div class="details">
          <span>Capacity: {{ course.capacity }}</span>
          <span>Status: {{ course.gradeStatus }}</span>
        </div>
      }

      <footer>
        <button type="button" class="secondary-button details-button" (click)="toggleDetails($event)">
          {{ isExpanded ? 'Hide Details' : 'Show Details' }}
        </button>
        <button type="button" class="primary-button enroll-button" (click)="toggleEnrollment($event)">
          {{ enrolled ? 'Unenroll' : 'Enroll' }}
        </button>
      </footer>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .course-card {
        background: #ffffff;
        border: 1px solid #dbe3ef;
        border-left: 5px solid #94a3b8;
        border-radius: 8px;
        cursor: pointer;
        display: grid;
        gap: 12px;
        min-height: 100%;
        padding: 16px;
        transition:
          box-shadow 160ms ease,
          transform 160ms ease;
      }

      .course-card:hover {
        box-shadow: 0 16px 35px rgba(15, 23, 42, 0.12);
        transform: translateY(-2px);
      }

      .course-card.card--enrolled {
        background: #f0fdf4;
      }

      .course-card.card--full {
        border-top-color: #f97316;
      }

      .course-card.expanded {
        min-height: 360px;
      }

      header {
        display: grid;
        gap: 4px;
      }

      .code {
        color: #64748b;
        font-size: 0.76rem;
        font-weight: 800;
      }

      h3,
      p {
        margin: 0;
      }

      h3 {
        font-size: 1.08rem;
        letter-spacing: 0;
      }

      p {
        color: #475569;
        line-height: 1.45;
      }

      .badge {
        border-radius: 999px;
        font-size: 0.76rem;
        font-weight: 800;
        justify-self: start;
        padding: 5px 9px;
      }

      .badge--passed {
        background: #dcfce7;
        color: #166534;
      }

      .badge--failed {
        background: #fee2e2;
        color: #991b1b;
      }

      .badge--pending {
        background: #e2e8f0;
        color: #334155;
      }

      dl {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        margin: 0;
      }

      dt {
        color: #64748b;
        font-size: 0.74rem;
        font-weight: 800;
      }

      dd {
        color: #111827;
        font-weight: 700;
        margin: 0;
      }

      .details {
        background: #f8fafc;
        border-radius: 6px;
        display: grid;
        gap: 6px;
        padding: 10px;
      }

      footer {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
    `
  ]
})
export class CourseCardComponent implements OnChanges {
  @Input({ required: true }) course!: Course;
  @Input() enrolled = false;
  @Output() enrollRequested = new EventEmitter<number>();
  @Output() courseSelected = new EventEmitter<number>();

  private readonly enrollmentService = inject(EnrollmentService);
  private readonly store = inject(Store);

  isExpanded = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('Course input changed', {
        previous: changes['course'].previousValue,
        current: changes['course'].currentValue
      });
    }
  }

  get cardClasses(): Record<string, boolean> {
    // A getter keeps conditional class logic in TypeScript instead of making the template noisy.
    return {
      'card--enrolled': this.enrolled,
      'card--full': (this.course.credits ?? 0) >= 4,
      expanded: this.isExpanded
    };
  }

  get statusColor(): string {
    const colorByStatus = {
      passed: '#16a34a',
      failed: '#dc2626',
      pending: '#64748b'
    };

    return colorByStatus[this.course.gradeStatus];
  }

  selectCourse(): void {
    this.courseSelected.emit(this.course.id);
  }

  toggleDetails(event: MouseEvent): void {
    event.stopPropagation();
    this.isExpanded = !this.isExpanded;
  }

  toggleEnrollment(event: MouseEvent): void {
    event.stopPropagation();

    if (this.enrolled) {
      this.enrollmentService.unenroll(this.course.id);
      this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.enrollmentService.enroll(this.course.id);
      this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
    }

    this.enrollRequested.emit(this.course.id);
  }
}

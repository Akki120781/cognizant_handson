import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Course } from '../../models/course.model';
import { CourseListComponent } from './course-list.component';

describe('CourseListComponent', () => {
  let fixture: ComponentFixture<CourseListComponent>;
  let component: CourseListComponent;
  let store: MockStore;

  const mockCourses: Course[] = [
    {
      id: 1,
      name: 'Angular Foundations',
      code: 'NG101',
      credits: 3,
      gradeStatus: 'passed',
      capacity: 35,
      fee: 4500,
      rating: 4.6,
      startDate: '2026-08-05',
      summary: 'Components and bindings.'
    },
    {
      id: 2,
      name: 'Reactive Forms Workshop',
      code: 'NG205',
      credits: 4,
      gradeStatus: 'pending',
      capacity: 28,
      fee: 5200,
      rating: 4.4,
      startDate: '2026-08-12',
      summary: 'FormBuilder and validators.'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideMockStore({
          initialState: {
            course: {
              courses: mockCourses,
              loading: false,
              error: null
            },
            enrollment: {
              enrolledCourseIds: []
            }
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should render course cards from store state', async () => {
    component.localLoading = false;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cards.length).toBe(2);
  });

  it('should render loading state from store state', () => {
    component.localLoading = false;
    store.setState({
      course: {
        courses: [],
        loading: true,
        error: null
      },
      enrollment: {
        enrolledCourseIds: []
      }
    });

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Loading courses...');
  });
});

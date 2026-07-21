import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Course } from '../models/course.model';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load courses from the API URL', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
    });

    const request = httpMock.expectOne('http://localhost:3000/courses');
    expect(request.request.method).toBe('GET');
    request.flush(mockCourses);
  });

  it('should surface the configured error message after retries fail', () => {
    let errorMessage = '';

    service.getCourses().subscribe({
      error: (error: Error) => {
        errorMessage = error.message;
      }
    });

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const request = httpMock.expectOne('http://localhost:3000/courses');
      request.flush('Server error', {
        status: 500,
        statusText: 'Server Error'
      });
    }

    expect(errorMessage).toBe('Failed to load courses. Please try again.');
  });
});

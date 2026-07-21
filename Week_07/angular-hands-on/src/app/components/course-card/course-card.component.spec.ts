import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { Course } from '../../models/course.model';
import { CourseCardComponent } from './course-card.component';

describe('CourseCardComponent', () => {
  let fixture: ComponentFixture<CourseCardComponent>;
  let component: CourseCardComponent;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed',
    capacity: 30,
    fee: 5000,
    rating: 4.5,
    startDate: '2026-08-05',
    summary: 'Algorithm and data structure fundamentals.'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideMockStore()]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.course = mockCourse;
    expect(component).toBeTruthy();
  });

  it('should render the course input', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const heading = fixture.debugElement.query(By.css('h3')).nativeElement as HTMLElement;
    expect(heading.textContent).toContain('Data Structures');
  });

  it('should emit the selected course id when enroll is clicked', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    spyOn(component.enrollRequested, 'emit');

    const button = fixture.debugElement.query(By.css('.enroll-button')).nativeElement as HTMLButtonElement;
    button.click();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  it('should log previous and current values in ngOnChanges', () => {
    spyOn(console, 'log');

    component.ngOnChanges({
      course: new SimpleChange(undefined, mockCourse, true)
    });

    expect(console.log).toHaveBeenCalled();
  });

  it('should expose enrolled and full card classes', () => {
    component.course = mockCourse;
    component.enrolled = true;

    expect(component.cardClasses['card--enrolled']).toBeTrue();
    expect(component.cardClasses['card--full']).toBeTrue();
  });
});

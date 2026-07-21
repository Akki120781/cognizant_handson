import { Course } from '../models/course.model';
import { Student } from '../models/student.model';

export const INITIAL_COURSES: Course[] = [
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
    summary: 'Components, templates, bindings and application structure.'
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
    summary: 'FormBuilder, FormArray, validators and route protection.'
  },
  {
    id: 3,
    name: 'RxJS and HTTP Integration',
    code: 'NG310',
    credits: 4,
    gradeStatus: 'failed',
    capacity: 24,
    fee: 6100,
    rating: 4.2,
    startDate: '2026-08-19',
    summary: 'HttpClient, Observables, retry, error handling and interceptors.'
  },
  {
    id: 4,
    name: 'NgRx State Management',
    code: 'NG420',
    credits: 5,
    gradeStatus: 'pending',
    capacity: 20,
    fee: 6800,
    rating: 4.8,
    startDate: '2026-08-26',
    summary: 'Actions, reducers, selectors, effects and DevTools tracing.'
  },
  {
    id: 5,
    name: 'Angular Testing Lab',
    code: 'NG510',
    credits: 2,
    gradeStatus: 'passed',
    capacity: 30,
    fee: 3900,
    rating: 4.3,
    startDate: '2026-09-02',
    summary: 'Jasmine, Karma, TestBed, HTTP testing and MockStore.'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  { id: 1, name: 'Akhil', email: 'akhil@example.com', courseId: 1 },
  { id: 2, name: 'Meera', email: 'meera@example.com', courseId: 2 },
  { id: 3, name: 'Rahul', email: 'rahul@example.com', courseId: 1 }
];

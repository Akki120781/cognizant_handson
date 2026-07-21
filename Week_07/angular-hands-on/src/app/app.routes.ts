import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CoursesLayoutComponent } from './pages/courses-layout/courses-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';

export const routes: Routes = [
  { path: '', title: 'Student Course Portal', component: HomeComponent },
  {
    path: 'courses',
    component: CoursesLayoutComponent,
    children: [
      { path: '', title: 'Courses', component: CourseListComponent },
      { path: ':id', title: 'Course Detail', component: CourseDetailComponent }
    ]
  },
  {
    path: 'profile',
    title: 'Profile',
    canActivate: [authGuard],
    component: StudentProfileComponent
  },
  {
    path: 'enroll',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/enrollment/enrollment.routes').then((m) => m.ENROLLMENT_ROUTES)
  },
  { path: 'enroll-reactive', redirectTo: 'enroll/reactive', pathMatch: 'full' },
  { path: '**', title: 'Page Not Found', component: NotFoundComponent }
];

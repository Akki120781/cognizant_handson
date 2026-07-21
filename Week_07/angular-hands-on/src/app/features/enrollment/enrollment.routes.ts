import { Routes } from '@angular/router';
import { unsavedChangesGuard } from '../../guards/unsaved-changes.guard';
import { EnrollmentFormComponent } from './enrollment-form.component';
import { ReactiveEnrollmentFormComponent } from './reactive-enrollment-form.component';

export const ENROLLMENT_ROUTES: Routes = [
  { path: '', title: 'Enrollment Form', component: EnrollmentFormComponent },
  {
    path: 'reactive',
    title: 'Reactive Enrollment Form',
    canDeactivate: [unsavedChangesGuard],
    component: ReactiveEnrollmentFormComponent
  }
];

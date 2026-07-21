import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EnrollmentRequest } from '../../models/enrollment-request.model';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="panel form-panel">
      <h1 class="page-title">Enrollment Request</h1>

      <form #enrollForm="ngForm" (ngSubmit)="onSubmit(enrollForm)" novalidate>
        <div class="field-grid">
          <div class="field">
            <label for="studentName">Student Name</label>
            <input
              id="studentName"
              name="studentName"
              required
              minlength="3"
              [(ngModel)]="model.studentName"
              #nameCtrl="ngModel"
            />
            @if (nameCtrl.touched && nameCtrl.errors?.['required']) {
              <span class="error-text">Name is required.</span>
            }
            @if (nameCtrl.touched && nameCtrl.errors?.['minlength']) {
              <span class="error-text">Name must be at least 3 characters.</span>
            }
          </div>

          <div class="field">
            <label for="studentEmail">Student Email</label>
            <input
              id="studentEmail"
              name="studentEmail"
              type="email"
              required
              email
              [(ngModel)]="model.studentEmail"
              #emailCtrl="ngModel"
            />
            @if (emailCtrl.touched && emailCtrl.errors?.['required']) {
              <span class="error-text">Email is required.</span>
            }
            @if (emailCtrl.touched && emailCtrl.errors?.['email']) {
              <span class="error-text">Enter a valid email address.</span>
            }
          </div>

          <div class="field">
            <label for="courseId">Course ID</label>
            <input
              id="courseId"
              name="courseId"
              type="number"
              required
              [(ngModel)]="model.courseId"
              #courseCtrl="ngModel"
            />
            @if (courseCtrl.touched && courseCtrl.errors?.['required']) {
              <span class="error-text">Course ID is required.</span>
            }
          </div>

          <div class="field">
            <label for="preferredSemester">Preferred Semester</label>
            <select
              id="preferredSemester"
              name="preferredSemester"
              required
              [(ngModel)]="model.preferredSemester"
            >
              <option value="Odd">Odd</option>
              <option value="Even">Even</option>
            </select>
          </div>

          <label class="checkbox-label">
            <input
              type="checkbox"
              name="agreeToTerms"
              required
              [(ngModel)]="model.agreeToTerms"
              #termsCtrl="ngModel"
            />
            I agree to the enrollment terms.
          </label>
          @if (termsCtrl.touched && termsCtrl.errors?.['required']) {
            <span class="error-text">Agreement is required.</span>
          }
        </div>

        <div class="actions-row">
          <button type="submit" class="primary-button" [disabled]="enrollForm.invalid">Submit</button>
          <button type="button" class="secondary-button" (click)="onReset(enrollForm)">Reset</button>
        </div>
      </form>

      @if (submitted) {
        <div class="success-text">Enrollment request submitted successfully!</div>
      }
    </section>
  `,
  styles: [
    `
      .form-panel,
      form {
        display: grid;
        gap: 16px;
      }

      input.ng-invalid.ng-touched,
      select.ng-invalid.ng-touched {
        border-color: #dc2626;
      }

      input.ng-valid.ng-touched,
      select.ng-valid.ng-touched {
        border-color: #16a34a;
      }
    `
  ]
})
export class EnrollmentFormComponent {
  private readonly enrollmentService = inject(EnrollmentService);

  model: EnrollmentRequest = {
    studentName: '',
    studentEmail: '',
    courseId: '',
    preferredSemester: 'Odd',
    agreeToTerms: false
  };
  submitted = false;

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    console.log(form.value, form.valid);
    this.enrollmentService.submitEnrollment(form.value as EnrollmentRequest).subscribe(() => {
      this.submitted = true;
    });
  }

  onReset(form: NgForm): void {
    this.submitted = false;
    form.resetForm({
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
  }
}

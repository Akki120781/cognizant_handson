import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { CanComponentDeactivate } from '../../guards/unsaved-changes.guard';

export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '').trim().toUpperCase();
  return value.startsWith('XX') ? { noCourseCode: true } : null;
}

export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  const value = String(control.value ?? '').toLowerCase();
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(value.includes('test@') ? { emailTaken: true } : null);
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="panel form-panel">
      <h1 class="page-title">Reactive Enrollment</h1>

      <form [formGroup]="enrollForm" (ngSubmit)="onSubmit()" novalidate>
        <div class="field-grid">
          <div class="field">
            <label for="reactiveName">Student Name</label>
            <input id="reactiveName" formControlName="studentName" />
            @if (enrollForm.get('studentName')?.touched && enrollForm.get('studentName')?.invalid) {
              <span class="error-text">Name must be at least 3 characters.</span>
            }
          </div>

          <div class="field">
            <label for="reactiveEmail">Student Email</label>
            <input id="reactiveEmail" formControlName="studentEmail" />
            @if (enrollForm.get('studentEmail')?.pending) {
              <span class="error-text">Checking email...</span>
            }
            @if (enrollForm.get('studentEmail')?.errors?.['emailTaken']) {
              <span class="error-text">Email taken.</span>
            }
          </div>

          <div class="field">
            <label for="reactiveCourse">Course Code</label>
            <input id="reactiveCourse" formControlName="courseId" placeholder="NG101" />
            @if (enrollForm.get('courseId')?.errors?.['noCourseCode']) {
              <span class="error-text">Course code starting with XX is not allowed.</span>
            }
          </div>

          <div class="field">
            <label for="reactiveSemester">Preferred Semester</label>
            <select id="reactiveSemester" formControlName="preferredSemester">
              <option value="Odd">Odd</option>
              <option value="Even">Even</option>
            </select>
          </div>

          <label class="checkbox-label">
            <input type="checkbox" formControlName="agreeToTerms" />
            I agree to the enrollment terms.
          </label>
        </div>

        <section formArrayName="additionalCourses" class="additional-panel">
          <div class="actions-row">
            <h2>Additional Courses</h2>
            <button type="button" class="secondary-button" (click)="addCourse()">Add Another Course</button>
          </div>

          @for (control of additionalCourses.controls; track $index; let i = $index) {
            <div class="dynamic-row">
              <input [formControlName]="i" placeholder="Additional course code" />
              <button type="button" class="danger-button" (click)="removeCourse(i)">Remove</button>
            </div>
          }
        </section>

        <div class="actions-row">
          <button type="submit" class="primary-button" [disabled]="enrollForm.invalid">Submit</button>
          <button type="button" class="secondary-button" (click)="enrollForm.reset()">Reset</button>
        </div>
      </form>

      @if (submitted) {
        <div class="success-text">Reactive enrollment submitted successfully!</div>
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

      .additional-panel {
        background: #f8fafc;
        border: 1px solid #dbe3ef;
        border-radius: 8px;
        display: grid;
        gap: 12px;
        padding: 14px;
      }

      h2 {
        font-size: 1rem;
        margin: 0;
      }

      .dynamic-row {
        display: grid;
        gap: 10px;
        grid-template-columns: minmax(0, 1fr) auto;
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
export class ReactiveEnrollmentFormComponent implements OnInit, CanComponentDeactivate {
  private readonly fb = inject(FormBuilder);

  enrollForm!: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: this.fb.control(
        '',
        [Validators.required, Validators.email],
        [simulateEmailCheck]
      ),
      courseId: ['', [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });
  }

  get additionalCourses(): FormArray<FormControl<string | null>> {
    // This getter centralises the FormArray cast so the template stays strongly typed and readable.
    return this.enrollForm.get('additionalCourses') as FormArray<FormControl<string | null>>;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control<string | null>('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    if (this.enrollForm.invalid) {
      return;
    }

    // value excludes disabled controls; getRawValue includes every control, including disabled ones.
    console.log(this.enrollForm.value, this.enrollForm.getRawValue());
    this.submitted = true;
    this.enrollForm.markAsPristine();
  }

  canDeactivate(): boolean {
    return this.enrollForm.dirty ? window.confirm('You have unsaved changes. Leave?') : true;
  }
}

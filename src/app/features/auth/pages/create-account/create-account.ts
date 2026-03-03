import { Component, signal, computed } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AfriInputComponent } from '../../../../components/ui/input/input.component';

@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule, AfriInputComponent],
  template: `
    <div class="flex flex-col gap-6">
      <h2 class="text-xl font-semibold text-gray-900">Create account</h2>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-5">
        <afri-input
          formControlName="fullName"
          label="Full name"
          placeholder="Enter your full name"
          [errorMessage]="fullNameError()"
        />

        <afri-input
          formControlName="email"
          label="Email address"
          placeholder="Enter your email"
          type="email"
          [errorMessage]="emailError()"
        />

        <afri-input
          formControlName="password"
          label="Password"
          placeholder="Enter password"
          type="password"
          [errorMessage]="passwordError()"
        />

        <afri-input
          formControlName="confirmPassword"
          label="Confirm password"
          placeholder="Confirm your password"
          type="password"
          [errorMessage]="confirmPasswordError()"
        />

        <button
          type="submit"
          class="mt-2 h-12 w-full rounded-lg bg-primary-600 px-6 font-medium text-white transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-60"
        >
          Create account
        </button>
      </form>
    </div>
  `,
  styles: ``,
})
export default class CreateAccount {
  private readonly fb = new FormBuilder();

  form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  });

  fullNameError = computed(() => {
    const c = this.form.controls.fullName;
    if (!c.touched || !c.errors) return '';
    if (c.errors['required']) return 'Full name is required';
    if (c.errors['minlength']) return 'Enter at least 2 characters';
    return '';
  });

  emailError = computed(() => {
    const c = this.form.controls.email;
    if (!c.touched || !c.errors) return '';
    if (c.errors['required']) return 'Email is required';
    if (c.errors['email']) return 'Enter a valid email address';
    return '';
  });

  passwordError = computed(() => {
    const c = this.form.controls.password;
    if (!c.touched || !c.errors) return '';
    if (c.errors['required']) return 'Password is required';
    if (c.errors['minlength']) return 'Password must be at least 8 characters';
    return '';
  });

  confirmPasswordError = computed(() => {
    const c = this.form.controls.confirmPassword;
    if (this.form.errors?.['mismatch']) return 'Passwords do not match';
    if (!c.touched || !c.errors) return '';
    if (c.errors['required']) return 'Please confirm your password';
    return '';
  });

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.value.password !== this.form.value.confirmPassword && this.form.value.password !== '') {
      this.form.setErrors({ mismatch: true });
    } else {
      this.form.setErrors(null);
    }
    if (this.form.invalid) {
      return;
    }
    console.log('Create account', this.form.getRawValue());
  }
}

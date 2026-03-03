import { Component, signal } from '@angular/core';
import {
  form,
  FormField,
  required,
  email,
  minLength,
  submit,
  validate,
} from '@angular/forms/signals';
import { AfriInputComponent } from '../../../../components/ui/input/input.component';

interface CreateAccountModel {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-create-account',
  imports: [AfriInputComponent, FormField],
  template: `
    <div class="flex flex-col gap-6">
      <h2 class="text-xl font-semibold text-gray-900">Create account</h2>

      <form (submit)="onSubmit($event)" class="flex flex-col gap-5">
        <afri-input
          [formField]="createAccountForm.fullName"
          label="Full name"
          placeholder="Enter your full name"
        />

        <afri-input
          [formField]="createAccountForm.email"
          label="Email address"
          placeholder="Enter your email"
          type="email"
        />

        <afri-input
          [formField]="createAccountForm.password"
          label="Password"
          placeholder="Enter password"
          type="password"
        />

        <afri-input
          [formField]="createAccountForm.confirmPassword"
          label="Confirm password"
          placeholder="Confirm your password"
          type="password"
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
  protected readonly model = signal<CreateAccountModel>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  protected readonly createAccountForm = form(this.model, (s) => {
    required(s.fullName, { message: 'Full name is required' });
    minLength(s.fullName, 2, { message: 'Enter at least 2 characters' });

    required(s.email, { message: 'Email is required' });
    email(s.email, { message: 'Enter a valid email address' });

    required(s.password, { message: 'Password is required' });
    minLength(s.password, 8, { message: 'Password must be at least 8 characters' });

    required(s.confirmPassword, { message: 'Please confirm your password' });
    validate(s.confirmPassword, (ctx) => {
      const passwordValue = ctx.valueOf(s.password);
      if (passwordValue && ctx.value() && ctx.value() !== passwordValue) {
        return { kind: 'mismatch', message: 'Passwords do not match' };
      }
      return null;
    });
  });

  onSubmit(event: Event): void {
    event.preventDefault();
    submit(this.createAccountForm, async () => {
      console.log('Create account', this.model());
      return null;
    });
  }
}

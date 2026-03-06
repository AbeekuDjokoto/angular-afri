import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  form,
  FormField,
  required,
  email,
  minLength,
  validate,
  requiredError,
} from '@angular/forms/signals';
import { AfriInputComponent } from '../../../../components/ui/input/input.component';
import { AuthService } from '../../../../services/auth-service';
import type { CreateAccountCredentials } from '../../../../core/models/auth/auth-credentials';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-create-account',
  imports: [FormField, AfriInputComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="flex flex-col gap-6">
      <div class="flex flex-col gap-1">
        <h4 class="text-2xl font-semibold text-gray-900">Create account</h4>
        <p class="text-sm font-medium text-gray-600">
          Enter your details to register for an account
        </p>
      </div>

      <form class="flex flex-col gap-5" (submit)="onSubmit($event)">
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
          [disabled]="createAccountForm().invalid() || loading()"
        >
          {{ loading() ? 'Creating account…' : 'Create account' }}
        </button>
        @if (error()) {
          <p class="text-sm text-error-600" role="alert">{{ error() }}</p>
        }
      </form>

      <p class="text-sm text-gray-600 text-center">
        Already have an account?
        <a routerLink="/auth/login" class="font-medium text-primary-600 hover:underline">Sign in</a>
      </p>
    </section>
  `,
})
export default class CreateAccount {
  private readonly authService = inject(AuthService);
  private readonly hotToast = inject(HotToastService);
  private readonly router = inject(Router);
  loading = signal(false);
  error = signal<string | null>(null);

  createAccountModel = signal({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  createAccountForm = form(this.createAccountModel, (schemaPath) => {
    required(schemaPath.fullName, { message: 'Full name is required' });
    minLength(schemaPath.fullName, 2, {
      message: 'Enter at least 2 characters',
    });

    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });

    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 8, {
      message: 'Password must be at least 8 characters',
    });

    required(schemaPath.confirmPassword, {
      message: 'Please confirm your password',
    });
    validate(schemaPath.confirmPassword, (ctx) => {
      const confirm = ctx.value();
      const password = ctx.valueOf(schemaPath.password);
      if (password !== '' && confirm !== password) {
        return requiredError({ message: 'Passwords do not match' });
      }
      return undefined;
    });
  });

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.createAccountForm().invalid()) return;

    this.error.set(null);
    this.loading.set(true);

    const model = this.createAccountModel();
    const credentials: CreateAccountCredentials = {
      userId: 0,
      emailId: model.email,
      fullName: model.fullName,
      password: model.password,
    };

    this.authService.createAccount(credentials).subscribe({
      next: (res: any) => {
        this.loading.set(false);
        this.hotToast.success(res?.data?.message ?? 'Account created successfully.');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.loading.set(false);
        this.hotToast.error(err?.error?.message ?? 'Could not create account. Please try again.');
      },
    });
  }
}

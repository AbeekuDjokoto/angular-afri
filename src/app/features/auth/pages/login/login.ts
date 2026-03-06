import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { form, FormField, required, email } from '@angular/forms/signals';
import { AfriInputComponent } from '../../../../components/ui/input/input.component';
import { AuthService } from '../../../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [FormField, AfriInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="flex flex-col gap-6">
      <div class="flex flex-col gap-1">
        <h4 class="text-2xl font-semibold text-gray-900">Welcome, Admin</h4>
        <p class="text-sm font-medium text-gray-600">
          Sign in with your email address and password to access your account
        </p>
      </div>

      <form class="flex flex-col gap-5" (ngSubmit)="onSubmit()">
        <afri-input
          [formField]="loginForm.email"
          label="Email"
          placeholder="Enter your email"
          type="email"
        />

        <afri-input
          [formField]="loginForm.password"
          label="Password"
          placeholder="Enter your password"
          [type]="passwordVisible() ? 'text' : 'password'"
        >
          <button
            suffix
            type="button"
            class="afri-input__suffix-btn"
            (click)="passwordVisible.set(!passwordVisible())"
            [attr.aria-label]="passwordVisible() ? 'Hide password' : 'Show password'"
          >
            @if (passwordVisible()) {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            } @else {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            }
          </button>
        </afri-input>

        <button
          type="submit"
          class="mt-2 h-12 w-full rounded-lg bg-primary-600 px-6 font-medium text-white transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-60"
          [disabled]="loginForm().invalid() || loading()"
        >
          {{ loading() ? 'Signing in…' : 'Sign In' }}
        </button>
        @if (error()) {
          <p class="text-sm text-error-600" role="alert">{{ error() }}</p>
        }
      </form>
    </section>
  `,
  styles: `
    .afri-input__suffix-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      border: none;
      background: none;
      cursor: pointer;
      color: var(--color-gray-400);
      border-radius: 4px;
    }
    .afri-input__suffix-btn:hover {
      color: var(--color-gray-600);
    }
    .afri-input__suffix-btn:focus-visible {
      outline: 2px solid var(--color-primary-500);
      outline-offset: 2px;
    }
  `,
})
export default class Login {
  private readonly authService = inject(AuthService);

  passwordVisible = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  loginModel = signal({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.password, { message: 'Password is required' });
  });

  onSubmit(): void {
    debugger;
    if (this.loginForm().invalid()) return;

    this.error.set(null);
    this.loading.set(true);

    this.authService.login(this.loginModel()).subscribe({
      next: (res: any) => {
        this.loading.set(false);
        console.log('response', res);
        // API returns: OTP sent; data.has_verified_login_otp indicates if OTP already verified
        if (res.data.has_verified_login_otp) {
          // TODO: store session, navigate to dashboard
        } else {
          // TODO: navigate to OTP verification (e.g. /auth/verify-otp), pass res.data or store temporarily
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message ?? 'Sign in failed. Please try again.');
      },
    });
  }
}

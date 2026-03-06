import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HotToastService } from '@ngxpert/hot-toast';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../store/auth.store';

export const globalHttpErrorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const hotToast = inject(HotToastService);
  const router = inject(Router);
  const authStore = inject(AuthStore);
  return next(req).pipe(
    tap({
      error: (error: HttpErrorResponse) => {
        if (error.status === 401 && !window.location.pathname.includes('auth')) {
          hotToast.error(error?.error?.message ?? 'Unauthorized');
          authStore.reset();
          router.navigateByUrl('/auth/login');
        }
      },
      next: (event) => {
        return event;
      },
    }),
  );
};

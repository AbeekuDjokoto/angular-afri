import { HttpInterceptorFn } from '@angular/common/http';
import { AuthStore } from '../../store/auth.store';
import { inject } from '@angular/core';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authStore.getToken()}`,
    },
  });
  return next(authRequest);
};

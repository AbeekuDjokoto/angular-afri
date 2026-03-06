import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../../store/auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authStore = inject(AuthStore);
  if (!authStore.isAuthenticated()) {
    router.navigateByUrl('/auth/login');
    return false;
  } else {
    router.navigateByUrl('/dashboard/home');
    return true;
  }
};

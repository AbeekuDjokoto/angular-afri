import { Routes } from '@angular/router';
import { NotFound } from './components/not-found/not-found';
import AuthLayout from './features/auth/layout/auth-layout/auth-layout';
import { DashboardLayout } from './features/dashboard/layout/dashboard-layout/dashboard-layout';
import { authGuard } from './core/guards/auth-guard';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorInterceptor } from './core/interceptors/auth-interceptor-interceptor';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login'),
      },
      {
        path: 'create-account',
        loadComponent: () => import('./features/auth/pages/create-account/create-account'),
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardLayout,
    providers: [provideHttpClient(withInterceptors([authInterceptorInterceptor]))],
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./features/dashboard/pages/home/home'),
      },
    ],
  },
  {
    path: '**',
    component: NotFound,
  },
];

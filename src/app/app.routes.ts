import { Routes } from '@angular/router';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/layout/auth-layout/auth-layout'),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login'),
      },
    ],
  },
  {
    path: '**',
    component: NotFound,
  },
];

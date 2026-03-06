import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { HotToastService } from '@ngxpert/hot-toast';
import { jwtDecode } from 'jwt-decode';
import type { LoginCredentials } from '../core/models/auth/auth-credentials';
import type { LoginResponse, LoginResponseData, User } from '../core/models/auth/auth-response';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  loading: false,
};

export const AuthStore = signalStore(
  withState(initialState),
  withStorageSync({
    key: 'angular-afri-auth',
    select: ({ user, isAuthenticated, token, refreshToken }) => ({
      user,
      isAuthenticated,
      token,
      refreshToken,
    }),
  }),
  withMethods((store) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const hotToast = inject(HotToastService);
    const setAuth = (data: LoginResponseData) => {
      const user = jwtDecode<User>(data.token);
      patchState(store, {
        token: data.token,
        refreshToken: data.refreshToken,
        user,
        isAuthenticated: true,
      });
    };

    return {
      reset() {
        patchState(store, initialState);
      },
      login(credentials: LoginCredentials) {
        patchState(store, { loading: true });
        authService.login(credentials).subscribe({
          next: (res: LoginResponse) => {
            setAuth(res.data);
            hotToast.success(res?.message ?? 'Sign in successful.');
            patchState(store, { loading: false });
            router.navigateByUrl('/dashboard/home');
          },
          error: (err) => {
            hotToast.error(err?.error?.message ?? 'Sign in failed.');
            patchState(store, { loading: false });
          },
        });
      },
      authenticate(data: LoginResponseData) {
        setAuth(data);
      },
      logout() {
        patchState(store, initialState);
      },
      getToken() {
        return store.token();
      },
      getRefreshToken() {
        return store.refreshToken();
      },
      setToken(token: string) {
        patchState(store, { token });
      },
      setRefreshToken(refreshToken: string) {
        patchState(store, { refreshToken });
      },
    };
  }),
);

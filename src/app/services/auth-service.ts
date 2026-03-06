import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GlobalConstant } from '../core/constants/global.constant';
import type { LoginCredentials } from '../core/models/auth/login-credentials';
import type { LoginResponse } from '../core/models/auth/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  login(credentials: LoginCredentials) {
    const url = `${environment.API_URL}${GlobalConstant.API_END_POINTS.AUTH.LOGIN}`;
    return this.http.post<LoginResponse>(url, credentials);
  }
}

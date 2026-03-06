import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GlobalConstant } from '../core/constants/global.constant';
import type {
  LoginCredentials,
  CreateAccountCredentials,
} from '../core/models/auth/auth-credentials';
import type {
  LoginResponse,
  CreateAccountResponse,
} from '../core/models/auth/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  login(credentials: LoginCredentials) {
    const url = `${environment.API_URL}${GlobalConstant.API_END_POINTS.AUTH.LOGIN}`;
    return this.http.post<LoginResponse>(url, credentials);
  }

  createAccount(credentials: CreateAccountCredentials) {
    const url = `${environment.API_URL}${GlobalConstant.API_END_POINTS.AUTH.CREATE_ACCOUNT}`;
    return this.http.post<CreateAccountResponse>(url, credentials);
  }
}

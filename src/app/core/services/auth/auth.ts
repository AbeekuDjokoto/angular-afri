import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GlobalConstant } from '../../constants/global.constant';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);

  /** Base URL for API v1: origin + /api/v1 */
  private get apiBase(): string {
    return `${environment.API_URL}${GlobalConstant.API_PREFIX}`;
  }

  getAllProduct() {
    return this.http.get<any>(`${this.apiBase}/products`);
  }
}

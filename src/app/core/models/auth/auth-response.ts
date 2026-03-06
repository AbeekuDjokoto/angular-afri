export interface LoginResponseData {
  emailId: string;
  refreshToken: string;
  token: string;
  userId: number;
}

export interface LoginResponse {
  result: boolean;
  message: string;
  data: LoginResponseData;
}

export interface User {
  exp: number;
  iss: string;
  aud: string;
}

export interface CreateAccountResponse {
  status?: string;
  statusCode?: number;
  message?: string;
  data?: unknown;
}

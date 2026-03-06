export interface LoginResponseData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_super_admin: boolean;
  has_verified_login_otp: boolean;
  otp_code: string;
}

export interface LoginResponse {
  status: 'success' | 'error';
  statusCode: number;
  message: string;
  data: LoginResponseData;
}

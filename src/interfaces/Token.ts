export interface JwtToken {
  grantType: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpire: string;
  refreshTokenExpire: string;
  role: string;
}

export interface UserLoginRequest {
  loginId: string;
  password: string;
}


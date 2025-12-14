import fetchApi from "@/configs/api";
import { ToApi } from "@/interfaces/ToApi";
import { JwtToken, UserLoginRequest } from "@/interfaces/Token";

/**
 * 이메일로 JWT 토큰 발급
 */
async function login(request: UserLoginRequest): Promise<ToApi<JwtToken>> {
  return fetchApi<ToApi<JwtToken>>("/tokens/login", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

/**
 * Refresh Token으로 Access Token 재발급
 */
async function reissue(refreshToken: string): Promise<ToApi<JwtToken>> {
  return fetchApi<ToApi<JwtToken>>(`/tokens/reissue?refresh=${refreshToken}`, {
    method: "POST",
  });
}

const tokenService = {
  login,
  reissue,
};

export default tokenService;

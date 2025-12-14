import { useAuthStore } from "@/stores/authStore";

/**
 * 토큰 관련 유틸리티 함수
 */

/**
 * 토큰이 만료되었는지 확인
 */
export function isTokenExpired(expireTime: string | null): boolean {
  if (!expireTime) return true;
  
  try {
    const expireDate = new Date(expireTime);
    const now = new Date();
    // 만료 1분 전을 만료로 간주 (여유 시간)
    const bufferTime = 60 * 1000; // 1분
    return expireDate.getTime() - now.getTime() < bufferTime;
  } catch {
    return true;
  }
}

/**
 * Access Token이 만료되었는지 확인
 */
export function isAccessTokenExpired(): boolean {
  if (typeof window === "undefined") return true;
  
  const accessTokenExpire = useAuthStore.getState().accessTokenExpire;
  return isTokenExpired(accessTokenExpire);
}

/**
 * Refresh Token이 만료되었는지 확인
 */
export function isRefreshTokenExpired(): boolean {
  if (typeof window === "undefined") return true;
  
  const refreshTokenExpire = useAuthStore.getState().refreshTokenExpire;
  return isTokenExpired(refreshTokenExpire);
}

/**
 * 로그아웃 처리 (모든 토큰 및 사용자 정보 제거)
 */
export function logout(): void {
  if (typeof window === "undefined") return;
  
  useAuthStore.getState().logout();
}

/**
 * 토큰 저장
 */
export function saveTokens(
  accessToken: string,
  refreshToken: string,
  accessTokenExpire: string,
  refreshTokenExpire: string,
  role?: string
): void {
  if (typeof window === "undefined") return;
  
  useAuthStore.getState().setTokens(
    accessToken,
    refreshToken,
    accessTokenExpire,
    refreshTokenExpire,
    role
  );
}

/**
 * Refresh Token 가져오기
 */
export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return useAuthStore.getState().refreshToken;
}


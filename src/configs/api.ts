import { getRefreshToken, isRefreshTokenExpired, isAccessTokenExpired, logout, saveTokens } from "@/utils/tokenUtils";
import { useAuthStore } from "@/stores/authStore";

// API 기본 설정
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://ec2-43-201-119-165.ap-northeast-2.compute.amazonaws.com:8080";

export const API_VERSION = "/api/v1";

// 클라이언트는 /api/server로 요청 (프록시를 통해 백엔드로 전달)
const getApiUrl = () => {
  if (typeof window !== "undefined") {
    // 클라이언트 사이드: Next.js 프록시 사용
    return "/api/server";
  }
  // 서버 사이드: 직접 백엔드 서버 사용
  return `${API_BASE_URL}${API_VERSION}`;
};

// 토큰 재발급 중인지 추적 (무한 루프 방지)
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

/**
 * 토큰 재발급
 */
async function refreshAccessToken(): Promise<string | null> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      // 클라이언트 사이드에서만 실행
      if (typeof window === "undefined") {
        return null;
      }

      const refreshToken = getRefreshToken();

      if (!refreshToken || isRefreshTokenExpired()) {
        logout();
        return null;
      }

      // 토큰 재발급 API 호출 (fetchApi를 직접 사용하지 않고 fetch 사용)
      const baseUrl = getApiUrl();
      const url = `${baseUrl}${API_VERSION}/tokens/reissue?refresh=${refreshToken}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        logout();
        return null;
      }

      const data = await response.json();

      if (data.status === "success" && data.data) {
        saveTokens(
          data.data.accessToken,
          data.data.refreshToken,
          data.data.accessTokenExpire,
          data.data.refreshTokenExpire,
          data.data.role
        );
        return data.data.accessToken;
      }

      logout();
      return null;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// 공통 fetch 함수
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const baseUrl = getApiUrl();
  const url = `${baseUrl}${API_VERSION}${endpoint}`;

  // 토큰 재발급 엔드포인트는 제외
  const isTokenEndpoint = endpoint.includes("/tokens/");

  let token = typeof window !== "undefined" ? useAuthStore.getState().accessToken : null;

  // Access Token이 만료되었고, 토큰 엔드포인트가 아니면 재발급 시도
  if (!isTokenEndpoint && typeof window !== "undefined") {
    if (isAccessTokenExpired() && token) {
      const newToken = await refreshAccessToken();
      token = newToken;
    }
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options?.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // 401 Unauthorized 에러 발생 시 토큰 재발급 시도
  if (response.status === 401 && !isTokenEndpoint && typeof window !== "undefined") {
    const newToken = await refreshAccessToken();

    if (newToken) {
      // 재발급 성공 시 원래 요청 재시도
      const retryHeaders: HeadersInit = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newToken}`,
        ...options?.headers,
      };

      const retryResponse = await fetch(url, {
        ...options,
        headers: retryHeaders,
      });

      if (!retryResponse.ok) {
        const error = await retryResponse.json().catch(() => ({
          status: "error",
          statusCode: retryResponse.status,
          message: retryResponse.statusText,
        }));
        throw error;
      }

      return retryResponse.json();
    } else {
      // 재발급 실패 시 에러 반환 (logout은 refreshAccessToken에서 처리됨)
      const error = await response.json().catch(() => ({
        status: "error",
        statusCode: response.status,
        message: "인증이 만료되었습니다. 다시 로그인해주세요.",
      }));
      throw error;
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      status: "error",
      statusCode: response.status,
      message: response.statusText,
    }));
    throw error;
  }

  return response.json();
}

export default fetchApi;

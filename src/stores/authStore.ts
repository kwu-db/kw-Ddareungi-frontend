import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  // 토큰 정보
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpire: string | null;
  refreshTokenExpire: string | null;
  
  // 사용자 정보
  userId: string | null;
  userEmail: string | null;
  role: string | null;
  
  // Actions
  setTokens: (
    accessToken: string,
    refreshToken: string,
    accessTokenExpire: string,
    refreshTokenExpire: string,
    role?: string
  ) => void;
  setUserInfo: (userId: string, userEmail: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      accessToken: null,
      refreshToken: null,
      accessTokenExpire: null,
      refreshTokenExpire: null,
      userId: null,
      userEmail: null,
      role: null,

      // 토큰 설정
      setTokens: (
        accessToken,
        refreshToken,
        accessTokenExpire,
        refreshTokenExpire,
        role
      ) => {
        set({
          accessToken,
          refreshToken,
          accessTokenExpire,
          refreshTokenExpire,
          role: role || null,
        });
      },

      // 사용자 정보 설정
      setUserInfo: (userId, userEmail) => {
        set({
          userId,
          userEmail,
        });
      },

      // 로그아웃
      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          accessTokenExpire: null,
          refreshTokenExpire: null,
          userId: null,
          userEmail: null,
          role: null,
        });
        
        // 로그인 페이지로 리다이렉트
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      },

      // 인증 상태 확인
      isAuthenticated: () => {
        const state = get();
        return !!state.accessToken && !!state.userId;
      },
    }),
    {
      name: "auth-storage", // localStorage 키 이름
    }
  )
);


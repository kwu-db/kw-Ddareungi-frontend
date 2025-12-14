"use client";

import { useMutation } from "@tanstack/react-query";
import tokenService from "@/services/api/tokenService";
import adminService from "@/services/api/adminService";
import { UserLoginRequest } from "@/interfaces/Token";
import { saveTokens } from "@/utils/tokenUtils";
import { useAuthStore } from "@/stores/authStore";

/**
 * 로그인 훅
 */
export function useLogin() {
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  
  return useMutation({
    mutationFn: async (data: UserLoginRequest) => {
      // 1. 로그인 API 호출
      const loginResponse = await tokenService.login(data);
      
      // 2. 로그인 성공 시 사용자 정보 조회
      if (loginResponse.status === "success" && loginResponse.data) {
        try {
          const userInfoResponse = await adminService.getUserInfo(data.loginId);
          if (userInfoResponse.status === "success" && userInfoResponse.data) {
            return {
              ...loginResponse,
              userInfo: userInfoResponse.data,
            };
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          // 사용자 정보 조회 실패해도 로그인은 성공으로 처리
        }
      }
      
      return loginResponse;
    },
    onSuccess: (response, variables) => {
      if (response.status === "success" && response.data) {
        // 토큰 저장 (만료 시간 포함)
        saveTokens(
          response.data.accessToken,
          response.data.refreshToken,
          response.data.accessTokenExpire,
          response.data.refreshTokenExpire,
          response.data.role
        );
        
        // 사용자 정보 저장 (userInfo가 있으면 사용, 없으면 임시값)
        if ((response as any).userInfo) {
          const userInfo = (response as any).userInfo;
          setUserInfo(String(userInfo.userId), variables.loginId);
        } else {
          // 사용자 정보 조회 실패 시 임시값 사용
          setUserInfo("1", variables.loginId);
        }
      }
    },
  });
}

/**
 * 토큰 재발급 훅
 */
export function useReissueToken() {
  return useMutation({
    mutationFn: (refreshToken: string) =>
      tokenService.reissue(refreshToken),
    onSuccess: (response) => {
      if (response.status === "success" && response.data) {
        // 토큰 갱신 (만료 시간 포함)
        saveTokens(
          response.data.accessToken,
          response.data.refreshToken,
          response.data.accessTokenExpire,
          response.data.refreshTokenExpire,
          response.data.role
        );
      }
    },
  });
}


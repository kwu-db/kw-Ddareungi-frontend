"use client";

import { useMutation } from "@tanstack/react-query";
import tokenService from "@/services/tokenService";
import { UserLoginRequest } from "@/interfaces/Token";

/**
 * 로그인 훅
 */
export function useLogin() {
  return useMutation({
    mutationFn: (data: UserLoginRequest) => tokenService.login(data),
    onSuccess: (response) => {
      if (response.status === "success" && response.data) {
        // 토큰 저장
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          localStorage.setItem("role", response.data.role);
          // TODO: 실제 사용자 ID를 응답에서 가져와야 함
          // 임시로 이메일을 키로 사용
          localStorage.setItem("userId", "1"); // 임시 값
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
        // 토큰 갱신
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }
      }
    },
  });
}


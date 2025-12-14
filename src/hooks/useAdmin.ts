"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import adminService from "@/services/api/adminService";
import { AdminRequestDto, UpdateAdminRequest } from "@/interfaces/Admin";

interface AdminCheckResponse {
  isAdmin: boolean;
  email: string;
}

/**
 * 관리자 계정 생성 훅
 */
export function useCreateAdmin() {
  return useMutation({
    mutationFn: (data: AdminRequestDto) => adminService.createAdmin(data),
  });
}

/**
 * 관리자 정보 변경 훅
 */
export function useUpdateAdmin() {
  return useMutation({
    mutationFn: ({ adminId, data }: { adminId: number; data: UpdateAdminRequest }) =>
      adminService.updateAdmin(adminId, data),
  });
}

/**
 * 관리자 계정 여부 확인 훅
 * @param email 확인할 이메일 주소
 * @param enabled 쿼리 활성화 여부 (기본값: true)
 */
export function useCheckAdmin(email: string | null, enabled: boolean = true) {
  return useQuery<AdminCheckResponse>({
    queryKey: ["admin", "check", email],
    queryFn: async () => {
      if (!email) {
        throw new Error("이메일이 필요합니다.");
      }
      const response = await adminService.checkAdmin(email);
      if (response.status === "success") {
        return response.data;
      }
      throw new Error(response.message || "관리자 권한 확인 실패");
    },
    enabled: enabled && !!email,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
}

/**
 * 대여소 개수 조회 훅
 */
export function useStationsCount() {
  return useQuery({
    queryKey: ["admin", "stations", "count"],
    queryFn: async () => {
      const response = await adminService.getStationsCount();
      if (response.status === "success") {
        return response.data.count;
      }
      throw new Error(response.message || "대여소 개수 조회 실패");
    },
    staleTime: 1 * 60 * 1000, // 1분간 캐시 유지
  });
}

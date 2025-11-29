"use client";

import { useMutation } from "@tanstack/react-query";
import adminService from "@/services/adminService";
import {
  AdminRequestDto,
  UpdateAdminRequest,
} from "@/interfaces/Admin";

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
    mutationFn: ({
      adminId,
      data,
    }: {
      adminId: number;
      data: UpdateAdminRequest;
    }) => adminService.updateAdmin(adminId, data),
  });
}


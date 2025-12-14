"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import userService from "@/services/api/userService";
import adminService from "@/services/api/adminService";
import { CreateUser } from "@/interfaces/User";

// Query Keys
export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
};

/**
 * 사용자 생성 훅
 */
export function useCreateUser() {
  return useMutation({
    mutationFn: (data: CreateUser) => userService.createUser(data),
  });
}

/**
 * 회원 목록 조회 훅 (관리자용)
 */
export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: async () => {
      const response = await adminService.getUsers();
      if (response.status === "success") {
        return response.data;
      }
      throw new Error(response.message || "회원 목록 조회 실패");
    },
  });
}

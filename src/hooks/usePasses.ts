"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import passService from "@/services/passService";
import { ResponsePass, ResponseUserPass } from "@/interfaces/Pass";

// Query Keys
export const passKeys = {
  all: ["passes"] as const,
  lists: () => [...passKeys.all, "list"] as const,
  list: () => [...passKeys.lists()] as const,
  userPasses: () => [...passKeys.all, "user"] as const,
};

/**
 * 이용권 목록 조회 훅
 */
export function usePasses() {
  return useQuery({
    queryKey: passKeys.list(),
    queryFn: async () => {
      const response = await passService.getPasses();
      if (response.status === "success") {
        return response.data.passes;
      }
      throw new Error(response.message || "이용권 목록 조회 실패");
    },
  });
}

/**
 * 내가 구매한 이용권 조회 훅
 */
export function useUserPasses() {
  return useQuery({
    queryKey: passKeys.userPasses(),
    queryFn: async () => {
      const response = await passService.getUserPasses();
      if (response.status === "success") {
        return response.data.userPasses;
      }
      throw new Error(response.message || "사용자 이용권 조회 실패");
    },
  });
}

/**
 * 이용권 구매 훅
 */
export function usePurchasePass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (passId: number) => passService.purchasePass(passId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: passKeys.userPasses() });
    },
  });
}


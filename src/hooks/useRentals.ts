"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import rentalService from "@/services/rentalService";
import { RentalResponseDto } from "@/interfaces/Rental";

// Query Keys
export const rentalKeys = {
  all: ["rentals"] as const,
  lists: () => [...rentalKeys.all, "list"] as const,
  list: () => [...rentalKeys.lists()] as const,
  userRentals: (userId: number) => [...rentalKeys.all, "user", userId] as const,
};

/**
 * 대여현황 목록 조회 훅
 */
export function useRentals() {
  return useQuery({
    queryKey: rentalKeys.list(),
    queryFn: async () => {
      const response = await rentalService.getRentals();
      if (response.status === "success") {
        return response.data.rentals;
      }
      throw new Error(response.message || "대여현황 조회 실패");
    },
  });
}

/**
 * 유저 자전거 대여 내역 조회 훅
 */
export function useUserRentals(userId: number) {
  return useQuery({
    queryKey: rentalKeys.userRentals(userId),
    queryFn: async () => {
      const response = await rentalService.getUserRentals(userId);
      if (response.status === "success") {
        return response.data;
      }
      throw new Error(response.message || "대여 내역 조회 실패");
    },
    enabled: !!userId,
  });
}

/**
 * 대여하기 훅
 */
export function useRentBike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (stationId: number) => rentalService.rentBike(stationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rentalKeys.lists() });
    },
  });
}

/**
 * 반납하기 훅
 */
export function useReturnBike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rentalId: number) => rentalService.returnBike(rentalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rentalKeys.lists() });
    },
  });
}


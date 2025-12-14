"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import rentalService from "@/services/api/rentalService";
import { RentalResponseDto, RentalInfo } from "@/interfaces/Rental";

// Query Keys
export const rentalKeys = {
  all: ["rentals"] as const,
  lists: () => [...rentalKeys.all, "list"] as const,
};

/**
 * 대여현황 목록 조회 훅
 */
export function useRentals() {
  return useQuery({
    queryKey: rentalKeys.lists(),
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
 * 대여하기 훅
 */
export function useRentBike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (stationId: number) => rentalService.rentBike(stationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rentalKeys.all });
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
      queryClient.invalidateQueries({ queryKey: rentalKeys.all });
    },
  });
}

/**
 * 이용시간 랭킹 조회 훅
 */
export function useTimeRankings(limit: number = 10) {
  return useQuery({
    queryKey: [...rentalKeys.all, "rankings", "time", limit],
    queryFn: async () => {
      const response = await rentalService.getTimeRankings(limit);
      if (response.status === "success") {
        return response.data.rankings;
      }
      throw new Error(response.message || "이용시간 랭킹 조회 실패");
    },
  });
}

/**
 * 이용횟수 랭킹 조회 훅
 */
export function useCountRankings(limit: number = 10) {
  return useQuery({
    queryKey: [...rentalKeys.all, "rankings", "count", limit],
    queryFn: async () => {
      const response = await rentalService.getCountRankings(limit);
      if (response.status === "success") {
        return response.data.rankings;
      }
      throw new Error(response.message || "이용횟수 랭킹 조회 실패");
    },
  });
}

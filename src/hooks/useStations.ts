"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import stationService from "@/services/stationService";
import {
  ResponseStation,
  RequestRegisterStation,
  UpdateStation,
} from "@/interfaces/Station";

// Query Keys
export const stationKeys = {
  all: ["stations"] as const,
  lists: () => [...stationKeys.all, "list"] as const,
  list: (filters?: string) => [...stationKeys.lists(), { filters }] as const,
  details: () => [...stationKeys.all, "detail"] as const,
  detail: (id: number) => [...stationKeys.details(), id] as const,
};

/**
 * 대여소 목록 조회 훅
 */
export function useStations() {
  return useQuery({
    queryKey: stationKeys.lists(),
    queryFn: async () => {
      const response = await stationService.getStations();
      if (response.status === "success") {
        return response.data.stationList;
      }
      throw new Error(response.message || "대여소 목록 조회 실패");
    },
  });
}

/**
 * 대여소 상세 조회 훅
 */
export function useStation(stationId: number) {
  return useQuery({
    queryKey: stationKeys.detail(stationId),
    queryFn: async () => {
      const response = await stationService.getStation(stationId);
      if (response.status === "success") {
        return response.data.responseStation;
      }
      throw new Error(response.message || "대여소 조회 실패");
    },
    enabled: !!stationId,
  });
}

/**
 * 대여소 생성 훅
 */
export function useCreateStation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RequestRegisterStation) =>
      stationService.createStation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stationKeys.lists() });
    },
  });
}

/**
 * 대여소 수정 훅
 */
export function useUpdateStation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      stationId,
      data,
    }: {
      stationId: number;
      data: UpdateStation;
    }) => stationService.updateStation(stationId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: stationKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: stationKeys.detail(variables.stationId),
      });
    },
  });
}

/**
 * 대여소 삭제 훅
 */
export function useDeleteStation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (stationId: number) =>
      stationService.deleteStation(stationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stationKeys.lists() });
    },
  });
}

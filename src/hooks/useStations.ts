"use client";

import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import stationService from "@/services/api/stationService";
import { ResponseStation, RequestRegisterStation, UpdateStation, PageResponseStation } from "@/interfaces/Station";

// Query Keys
export const stationKeys = {
  all: ["stations"] as const,
  lists: () => [...stationKeys.all, "list"] as const,
  list: (filters?: string) => [...stationKeys.lists(), { filters }] as const,
  details: () => [...stationKeys.all, "detail"] as const,
  detail: (id: number) => [...stationKeys.details(), id] as const,
};

/**
 * 대여소 목록 조회 훅 (일반 쿼리)
 */
export function useStations(search?: string, pageable?: { page?: number; size?: number; sort?: string[] }) {
  return useQuery({
    queryKey: [...stationKeys.lists(), search, pageable],
    queryFn: async () => {
      const response = await stationService.getStations(search, pageable);
      if (response.status === "success") {
        // 페이지네이션 응답에서 content 배열 반환
        return response.data.content;
      }
      throw new Error(response.message || "대여소 목록 조회 실패");
    },
  });
}

/**
 * 대여소 목록 무한 스크롤 훅
 */
export function useInfiniteStations(
  search?: string,
  pageSize: number = 20
) {
  return useInfiniteQuery({
    queryKey: [...stationKeys.lists(), "infinite", search, pageSize],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await stationService.getStations(search, {
        page: pageParam,
        size: pageSize,
      });
      if (response.status === "success") {
        return response.data;
      }
      throw new Error(response.message || "대여소 목록 조회 실패");
    },
    getNextPageParam: (lastPage: PageResponseStation) => {
      // 마지막 페이지가 아니면 다음 페이지 번호 반환
      if (!lastPage.last && lastPage.number < lastPage.totalPages - 1) {
        return lastPage.number + 1;
      }
      return undefined; // 더 이상 페이지가 없으면 undefined
    },
    initialPageParam: 0,
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
    mutationFn: (data: RequestRegisterStation) => stationService.createStation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: [...stationKeys.lists(), "infinite"] });
    },
  });
}

/**
 * 대여소 수정 훅
 */
export function useUpdateStation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ stationId, data }: { stationId: number; data: UpdateStation }) =>
      stationService.updateStation(stationId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: stationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: [...stationKeys.lists(), "infinite"] });
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
    mutationFn: (stationId: number) => stationService.deleteStation(stationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: [...stationKeys.lists(), "infinite"] });
    },
  });
}

/**
 * 대여소 동기화 훅
 */
export function useSyncStations() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => stationService.syncStations(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: [...stationKeys.lists(), "infinite"] });
    },
  });
}

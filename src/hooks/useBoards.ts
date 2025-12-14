"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import boardService from "@/services/api/boardService";
import { BoardInfo, BoardListInfo, CreateBoard, UpdateBoard, Pageable } from "@/interfaces/Board";

// Query Keys
export const boardKeys = {
  all: ["boards"] as const,
  lists: () => [...boardKeys.all, "list"] as const,
  list: (filters?: { pageable?: Pageable; boardType?: string; keyword?: string }) =>
    [...boardKeys.lists(), filters] as const,
  details: () => [...boardKeys.all, "detail"] as const,
  detail: (id: number) => [...boardKeys.details(), id] as const,
};

/**
 * 게시글 목록 조회 훅
 */
export function useBoards(
  pageable?: Pageable,
  boardType?: string,
  keyword?: string,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: boardKeys.list({ pageable, boardType, keyword }),
    queryFn: async () => {
      const response = await boardService.getBoards(pageable, boardType, keyword);
      if (response.status === "success") {
        return response.data;
      }
      throw new Error(response.message || "게시글 목록 조회 실패");
    },
    enabled,
  });
}

/**
 * 게시글 상세 조회 훅
 */
export function useBoard(boardId: number) {
  return useQuery({
    queryKey: boardKeys.detail(boardId),
    queryFn: async () => {
      const response = await boardService.getBoard(boardId);
      if (response.status === "success") {
        return response.data;
      }
      throw new Error(response.message || "게시글 조회 실패");
    },
    enabled: !!boardId,
  });
}

/**
 * 게시글 생성 훅
 */
export function useCreateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBoard) => boardService.createBoard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
    },
  });
}

/**
 * 게시글 수정 훅
 */
export function useUpdateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ boardId, data }: { boardId: number; data: UpdateBoard }) => boardService.updateBoard(boardId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(variables.boardId),
      });
    },
  });
}

/**
 * 게시글 삭제 훅
 */
export function useDeleteBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardId: number) => boardService.deleteBoard(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
    },
  });
}

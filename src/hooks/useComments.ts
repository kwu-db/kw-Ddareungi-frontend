"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import commentService from "@/services/api/commentService";
import { RequestComment } from "@/interfaces/Comment";

// Query Keys
export const commentKeys = {
  all: ["comments"] as const,
  lists: () => [...commentKeys.all, "list"] as const,
  list: (boardId: number) => [...commentKeys.lists(), boardId] as const,
};

/**
 * 댓글 목록 조회 훅
 */
export function useComments(boardId: number) {
  return useQuery({
    queryKey: commentKeys.list(boardId),
    queryFn: async () => {
      const response = await commentService.getComments(boardId);
      if (response.status === "success") {
        return response.data.commentList;
      }
      throw new Error(response.message || "댓글 목록 조회 실패");
    },
    enabled: !!boardId,
  });
}

/**
 * 댓글 작성 훅
 */
export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ boardId, data }: { boardId: number; data: RequestComment }) =>
      commentService.createComment(boardId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.list(variables.boardId),
      });
    },
  });
}

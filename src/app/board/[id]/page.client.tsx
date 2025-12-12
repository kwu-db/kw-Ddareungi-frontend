"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BoardDetail } from "@/components/organism/BoardDetail";
import { BoardFormModal } from "@/components/organism/BoardFormModal";
import {
  useBoard,
  useComments,
  useCreateComment,
  useUpdateBoard,
  useDeleteBoard,
} from "@/hooks";

interface BoardDetailPageClientProps {
  boardId: number;
  isAuthor?: boolean;
}

export default function BoardDetailPageClient({
  boardId,
  isAuthor,
}: BoardDetailPageClientProps) {
  const router = useRouter();
  const { data: board, isLoading: boardLoading, error: boardError } = useBoard(boardId);
  const { data: comments, isLoading: commentsLoading } = useComments(boardId);
  const createCommentMutation = useCreateComment();
  const updateBoardMutation = useUpdateBoard();
  const deleteBoardMutation = useDeleteBoard();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (data: any) => {
    try {
      await updateBoardMutation.mutateAsync({ boardId, data });
      alert("게시글이 수정되었습니다.");
    } catch (err) {
      alert("게시글 수정 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
      throw err;
    }
  };

  const handleDelete = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteBoardMutation.mutateAsync(boardId);
        alert("삭제되었습니다.");
        router.push("/board");
      } catch (err) {
        alert("삭제 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
      }
    }
  };

  const handleCommentSubmit = async (content: string) => {
    try {
      await createCommentMutation.mutateAsync({
        boardId,
        data: { content },
      });
    } catch (err) {
      alert("댓글 등록 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
    }
  };

  const handleCommentDelete = (id: number) => {
    if (confirm("댓글을 삭제하시겠습니까?")) {
      alert(`댓글 삭제: ${id} (API 미구현)`);
    }
  };

  if (boardLoading) {
    return (
      <div className="px-4 py-4">
        <div className="text-center py-12 text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (boardError || !board) {
    return (
      <div className="px-4 py-4">
        <div className="text-center py-12 text-red-500">
          에러: {boardError?.message || "게시글을 찾을 수 없습니다."}
        </div>
      </div>
    );
  }

  const commentList =
    comments?.map((comment) => ({
      id: comment.commentId,
      author: comment.writerName,
      content: comment.content,
      createdAt: "", // API에 없으면 빈 문자열
      isAuthor: false, // 실제로는 현재 사용자와 비교 필요
    })) || [];

  return (
    <>
      <BoardDetail
        board={{
          id: board.boardId,
          title: board.title,
          content: board.content,
          author: board.userName,
          boardType: board.boardType,
          createdAt: board.createdDate,
          modifiedAt: board.lastModifiedDate,
        }}
        comments={commentList}
        isAuthor={isAuthor}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCommentSubmit={handleCommentSubmit}
        onCommentDelete={handleCommentDelete}
      />
      {board && (
        <BoardFormModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditSubmit}
          initialData={{
            title: board.title,
            content: board.content,
            boardType: board.boardType,
          }}
          mode="edit"
        />
      )}
    </>
  );
}



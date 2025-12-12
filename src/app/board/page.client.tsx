"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BoardList } from "@/components/organism/BoardList";
import { BoardFormModal } from "@/components/organism/BoardFormModal";
import { useBoards, useCreateBoard } from "@/hooks/useBoards";

export default function BoardPageClient() {
  const router = useRouter();
  const { data: boardsData, isLoading, error } = useBoards();
  const createBoardMutation = useCreateBoard();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleBoardClick = (id: number) => {
    router.push(`/board/${id}`);
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = async (data: any) => {
    try {
      await createBoardMutation.mutateAsync(data);
      alert("게시글이 작성되었습니다.");
    } catch (err) {
      alert("게시글 작성 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
      throw err;
    }
  };

  if (isLoading) {
    return (
      <div className="px-4 py-4">
        <div className="text-center py-12 text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-4">
        <div className="text-center py-12 text-red-500">
          에러: {error.message}
        </div>
      </div>
    );
  }

  // API 응답 형식에 맞게 변환
  const boards =
    boardsData?.content.map((board) => ({
      id: board.boardId,
      title: board.title,
      author: board.userName,
      boardType: board.boardType,
      createdAt: board.createdDate,
      commentCount: 0, // API에 없으면 0
    })) || [];

  return (
    <>
      <BoardList
        boards={boards}
        onBoardClick={handleBoardClick}
        onCreateClick={handleCreateClick}
      />
      <BoardFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
        mode="create"
      />
    </>
  );
}


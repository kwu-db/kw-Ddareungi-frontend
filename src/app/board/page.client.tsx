"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BoardList } from "@/components/organism/BoardList";
import { BoardFormModal } from "@/components/organism/BoardFormModal";
import { Card } from "@/components/atom/Card";
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
      <div className="px-5 py-8">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-[#00a651] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-500 font-medium">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-5 py-8">
        <Card className="p-6 text-center" variant="elevated">
          <div className="text-red-500 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 font-semibold mb-1">에러가 발생했습니다</p>
          <p className="text-sm text-gray-500">{error?.message || "알 수 없는 오류"}</p>
        </Card>
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


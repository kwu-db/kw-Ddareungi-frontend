"use client";

import { useRouter } from "next/navigation";
import { BoardList } from "@/components/organism/BoardList";
import { useBoards } from "@/hooks/useBoards";

export default function BoardPageClient() {
  const router = useRouter();
  const { data: boardsData, isLoading, error } = useBoards();

  const handleBoardClick = (id: number) => {
    router.push(`/board/${id}`);
  };

  const handleCreateClick = () => {
    alert("글쓰기 기능은 추후 구현 예정입니다.");
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
    <BoardList
      boards={boards}
      onBoardClick={handleBoardClick}
      onCreateClick={handleCreateClick}
    />
  );
}


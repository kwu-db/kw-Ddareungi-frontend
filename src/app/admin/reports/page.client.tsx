"use client";

import { useRouter } from "next/navigation";
import { ReportList } from "@/components/organism/ReportList";
import { useBoards } from "@/hooks/useBoards";

export default function AdminReportsPageClient() {
  const router = useRouter();

  // REPORT 타입 게시글 조회 (모든 신고 - userId 필터 없음)
  const {
    data: boardsData,
    isLoading,
    error,
  } = useBoards(
    { page: 0, size: 100 }, // 충분히 큰 사이즈로 모든 신고 가져오기
    "REPORT" // REPORT 타입만 조회
  );

  // 모든 신고를 표시 (userId 필터링 없음)
  const allReports =
    boardsData?.content.map(board => {
      // 제목에서 대여소명 추출 (예: "[대여소명] 고장 신고")
      const stationNameMatch = board.title.match(/\[([^\]]+)\]/);
      const stationName = stationNameMatch ? stationNameMatch[1] : "대여소 정보 없음";

      return {
        id: board.boardId,
        stationName: stationName,
        bikeNum: undefined, // API에 없음
        description: board.title,
        status: "PENDING" as const, // API에 상태 필드가 없으므로 기본값
        createdAt: board.createdDate,
      };
    }) || [];

  const handleReportClick = (id: number) => {
    router.push(`/board/${id}`);
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
        <div className="p-6 text-center bg-white rounded-lg shadow">
          <div className="text-red-500 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-red-600 font-semibold mb-1">에러가 발생했습니다</p>
          <p className="text-sm text-gray-500">{error?.message || "알 수 없는 오류"}</p>
        </div>
      </div>
    );
  }

  return <ReportList reports={allReports} onReportClick={handleReportClick} showCreateButton={false} />;
}

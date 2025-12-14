"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ReportList } from "@/components/organism/ReportList";
import { useAuthStore } from "@/stores/authStore";
import { Card } from "@/components/atom/Card";
import { useBoards } from "@/hooks/useBoards";

export default function ReportsPageClient() {
  const router = useRouter();
  const { isAuthenticated, userId } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Zustand persist hydration 대기
  useEffect(() => {
    // 다음 틱에서 hydration 완료로 표시
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // 인증 확인 및 리다이렉트
  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router, isAuthenticated, isHydrated]);

  // REPORT 타입 게시글 조회 (사용자 신고 내역)
  const {
    data: boardsData,
    isLoading,
    error,
  } = useBoards(
    { page: 0, size: 100 }, // 충분히 큰 사이즈로 모든 신고 가져오기
    "REPORT" // REPORT 타입만 조회
  );

  // 사용자가 작성한 신고만 필터링
  const currentUserId = userId ? parseInt(userId) : null;

  const userReports =
    boardsData?.content
      .filter(board => {
        // userId 타입 일치 확인 (문자열/숫자 모두 처리)
        const boardUserId = typeof board.userId === "string" ? parseInt(board.userId) : board.userId;
        return currentUserId !== null && boardUserId === currentUserId;
      })
      .map(board => {
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

  // hydration 완료 전 또는 인증되지 않은 경우 로딩 표시
  if (!isHydrated || !isAuthenticated()) {
    return (
      <div className="px-5 py-8">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-[#00a651] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-500 font-medium">로딩 중...</p>
        </div>
      </div>
    );
  }

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
        </Card>
      </div>
    );
  }

  return <ReportList reports={userReports} onReportClick={handleReportClick} showCreateButton={false} />;
}

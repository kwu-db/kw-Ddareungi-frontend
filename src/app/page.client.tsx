"use client";

import { Card } from "@/components/atom/Card";
import { Button } from "@/components/atom/Button";
import Link from "next/link";
import { useStations } from "@/hooks/useStations";
import { useBoards } from "@/hooks/useBoards";

export default function HomePageClient() {
  const { data: stations, isLoading: stationsLoading } = useStations();
  const { data: boardsData, isLoading: boardsLoading } = useBoards(
    { page: 0, size: 5 },
    undefined,
    undefined
  );

  const isLoading = stationsLoading || boardsLoading;

  // 최근 대여소 (최대 3개)
  const recentStations =
    stations?.slice(0, 3).map((station) => ({
      id: station.stationId,
      name: station.stationName,
      distance: undefined, // API에 없음
      available: undefined, // API에 없음
    })) || [];

  // 최근 공지 (NOTICE 타입만, 최대 2개)
  const recentNotices =
    boardsData?.content
      .filter((board) => board.boardType === "NOTICE")
      .slice(0, 2)
      .map((board) => ({
        id: board.boardId,
        title: board.title,
        boardType: board.boardType,
        createdAt: board.createdDate,
      })) || [];

  // 통계 계산
  const quickStats = {
    nearbyStations: stations?.length || 0,
    activeRentals: 0, // API에 없음
    newNotices: recentNotices.length,
  };

  if (isLoading) {
    return (
      <div className="px-4 py-6">
        <div className="text-center py-12 text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* 빠른 통계 */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-[#00a651] mb-1">
            {quickStats.nearbyStations}
          </div>
          <div className="text-xs text-gray-600">주변 대여소</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-500 mb-1">
            {quickStats.activeRentals}
          </div>
          <div className="text-xs text-gray-600">대여 중</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-500 mb-1">
            {quickStats.newNotices}
          </div>
          <div className="text-xs text-gray-600">새 공지</div>
        </Card>
      </div>

      {/* 빠른 액션 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">빠른 시작</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/stations">
            <Button fullWidth variant="primary" className="h-20 flex-col">
              <svg
                className="w-8 h-8 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              대여소 찾기
            </Button>
          </Link>
          <Link href="/board">
            <Button fullWidth variant="outline" className="h-20 flex-col">
              <svg
                className="w-8 h-8 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              게시판
            </Button>
          </Link>
        </div>
      </div>

      {/* 주변 대여소 */}
      {recentStations.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">주변 대여소</h2>
            <Link
              href="/stations"
              className="text-sm text-[#00a651] hover:underline"
            >
              전체보기
            </Link>
          </div>
          <div className="space-y-2">
            {recentStations.map((station) => (
              <Link key={station.id} href={`/stations/${station.id}`}>
                <Card className="p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{station.name}</h3>
                      {station.distance && (
                        <p className="text-sm text-gray-500">
                          {station.distance}
                        </p>
                      )}
                    </div>
                    {station.available !== undefined && (
                      <div className="text-right">
                        <div className="text-sm font-medium text-[#00a651]">
                          {station.available}대 가능
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 최근 공지 */}
      {recentNotices.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">최근 공지</h2>
            <Link
              href="/board"
              className="text-sm text-[#00a651] hover:underline"
            >
              전체보기
            </Link>
          </div>
          <Card className="p-4">
            <div className="space-y-3">
              {recentNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="flex items-start justify-between"
                >
                  <div>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full mr-2">
                      공지
                    </span>
                    <span className="text-sm font-medium">{notice.title}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

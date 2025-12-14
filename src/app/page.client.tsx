"use client";

import { Card } from "@/components/atom/Card";
import { Button } from "@/components/atom/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStations } from "@/hooks/useStations";
import { useBoards } from "@/hooks/useBoards";
import { useTimeRankings, useCountRankings, useRentals } from "@/hooks/useRentals";
import { useUserPasses } from "@/hooks/usePasses";
import { useAuthStore } from "@/stores/authStore";
import { PassCard } from "@/components/molecule/PassCard";

export default function HomePageClient() {
  const router = useRouter();
  const { userId, isAuthenticated } = useAuthStore();
  const { data: stations, isLoading: stationsLoading } = useStations();
  const { data: boardsData, isLoading: boardsLoading } = useBoards({ page: 0, size: 5 }, undefined, undefined);
  const { data: timeRankings } = useTimeRankings(5);
  const { data: countRankings } = useCountRankings(5);
  const { data: rentals } = useRentals();

  // 사용자 이용권 (로그인한 경우만)
  const { data: userPasses } = useUserPasses();

  const isLoading = stationsLoading || boardsLoading;

  // 최근 대여소 (최대 3개)
  const recentStations =
    stations?.slice(0, 3).map(station => ({
      id: station.stationId,
      name: station.stationName,
      address: station.address,
      capacity: station.capacity,
      distance: undefined, // API에 없음
      available: station.availableBikes, // SWAGGER에 명시된 availableBikes 필드 사용
      closedDate: station.closedDate, // 운영 종료일 정보
    })) || [];

  // 최근 공지 (NOTICE 타입만, 최대 2개)
  const recentNotices =
    boardsData?.content
      .filter(board => board.boardType === "NOTICE")
      .slice(0, 2)
      .map(board => ({
        id: board.boardId,
        title: board.title,
        boardType: board.boardType,
        createdAt: board.createdDate,
      })) || [];

  // 활성화된 이용권
  const activePasses = userPasses?.filter(pass => pass.status === "ACTIVATE") || [];

  // 활성 대여 수 (endTime이 없는 대여)
  const activeRentals = rentals?.filter(rental => !rental.endTime || rental.status === "ACTIVE").length || 0;

  const quickStats = {
    nearbyStations: stations?.length || 0,
    newNotices: recentNotices.length,
    activeRentals: activeRentals,
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

  return (
    <div className="px-5 py-6 space-y-6">
      {/* 빠른 통계 */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 text-center bg-gradient-to-br from-[#00a651]/10 to-[#00a651]/5 border-[#00a651]/20">
          <div className="text-3xl font-bold text-[#00a651] mb-1.5">{quickStats.nearbyStations}</div>
          <div className="text-xs text-gray-600 font-medium">주변 대여소</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50">
          <div className="text-3xl font-bold text-blue-600 mb-1.5">{quickStats.activeRentals}</div>
          <div className="text-xs text-gray-600 font-medium">활성 대여</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/50">
          <div className="text-3xl font-bold text-orange-600 mb-1.5">{quickStats.newNotices}</div>
          <div className="text-xs text-gray-600 font-medium">새 공지</div>
        </Card>
      </div>

      {/* 빠른 액션 */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">빠른 시작</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/stations">
            <Card className="p-5 h-24 flex flex-col items-center justify-center bg-gradient-to-br from-[#00a651] to-[#008a43] text-white border-0 shadow-lg hover:shadow-xl transition-all">
              <svg className="w-7 h-7 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <span className="text-sm font-semibold">대여소 찾기</span>
            </Card>
          </Link>
          <Link href="/board">
            <Card className="p-5 h-24 flex flex-col items-center justify-center bg-white border-2 border-gray-200 hover:border-[#00a651] hover:bg-[#00a651]/5 transition-all">
              <svg className="w-7 h-7 mb-2 text-[#00a651]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-sm font-semibold text-gray-700">게시판</span>
            </Card>
          </Link>
        </div>
      </div>

      {/* 활성 이용권 */}
      {isAuthenticated() && activePasses.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">활성 이용권</h2>
            <Link href="/mypage/passes" className="text-sm text-[#00a651] font-semibold hover:underline">
              전체보기 →
            </Link>
          </div>
          <div className="space-y-3">
            {activePasses.slice(0, 2).map(pass => {
              let passType: "ANNUAL" | "1DAY" | "7DAY" | "30DAY";
              if (pass.passType === "ONE_DAY") {
                passType = "1DAY";
              } else if (pass.passType === "SEVEN_DAY") {
                passType = "7DAY";
              } else if (pass.passType === "THIRTY_DAY") {
                passType = "30DAY";
              } else {
                passType = "ANNUAL";
              }

              return (
                <PassCard
                  key={pass.userPassId}
                  type={passType}
                  price={pass.price}
                  activatedAt={new Date(pass.activatedDate).toLocaleDateString("ko-KR")}
                  expiredAt={new Date(pass.expiredDate).toLocaleDateString("ko-KR")}
                  status="ACTIVE"
                  onClick={() => router.push(`/mypage/passes`)}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* 주변 대여소 */}
      {recentStations.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">주변 대여소</h2>
            <Link href="/stations" className="text-sm text-[#00a651] font-semibold hover:underline">
              전체보기 →
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentStations.map(station => {
              const isClosed = !!station.closedDate;
              const isAvailable = !isClosed && (station.available || 0) > 0;
              const isUnavailable = !isClosed && (station.available || 0) === 0;

              return (
                <Link key={station.id} href={`/stations/${station.id}`}>
                  <Card className="p-4" variant="elevated">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{station.name}</h3>
                        {station.distance && <p className="text-sm text-gray-500">{station.distance}</p>}
                      </div>
                      <div className="text-right ml-3">
                        {isClosed ? (
                          <>
                            <div className="text-sm font-bold text-gray-500">운영 종료</div>
                            <div className="text-xs text-gray-400">-</div>
                          </>
                        ) : (
                          <>
                            <div className={`text-sm font-bold ${isAvailable ? "text-[#00a651]" : "text-red-500"}`}>
                              {station.available || 0}대
                            </div>
                            <div className={`text-xs ${isAvailable ? "text-[#00a651]" : "text-red-500"}`}>
                              {isAvailable ? "가능" : "불가"}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* 최근 공지 */}
      {recentNotices.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">최근 공지</h2>
            <Link href="/board" className="text-sm text-[#00a651] font-semibold hover:underline">
              전체보기 →
            </Link>
          </div>
          <Card className="p-4" variant="elevated">
            <div className="space-y-4">
              {recentNotices.map(notice => (
                <div
                  key={notice.id}
                  className="flex items-start justify-between pb-4 last:pb-0 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-yellow-100 text-yellow-800 mr-2.5">
                      공지
                    </span>
                    <span className="text-sm font-semibold text-gray-900">{notice.title}</span>
                  </div>
                  <span className="text-xs text-gray-400 ml-3 whitespace-nowrap">
                    {new Date(notice.createdAt).toLocaleDateString("ko-KR", { month: "short", day: "numeric" })}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* 랭킹 */}
      {(timeRankings && timeRankings.length > 0) || (countRankings && countRankings.length > 0) ? (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">랭킹</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* 이용시간 랭킹 */}
            {timeRankings && timeRankings.length > 0 && (
              <Card className="p-4" variant="elevated">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">이용시간 TOP 5</h3>
                <div className="space-y-2">
                  {timeRankings.slice(0, 5).map(ranking => (
                    <div key={ranking.userId} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#00a651] w-6">{ranking.rank}</span>
                        <span className="text-gray-700 truncate">{ranking.userName}</span>
                      </div>
                      <span className="text-gray-500 text-xs">
                        {ranking.hours > 0 && `${ranking.hours}시간 `}
                        {ranking.minutes}분
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* 이용횟수 랭킹 */}
            {countRankings && countRankings.length > 0 && (
              <Card className="p-4" variant="elevated">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">이용횟수 TOP 5</h3>
                <div className="space-y-2">
                  {countRankings.slice(0, 5).map(ranking => (
                    <div key={ranking.userId} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#00a651] w-6">{ranking.rank}</span>
                        <span className="text-gray-700 truncate">{ranking.userName}</span>
                      </div>
                      <span className="text-gray-500 text-xs">{ranking.value}회</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

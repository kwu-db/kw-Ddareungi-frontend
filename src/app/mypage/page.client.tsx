"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/atom/Card";
import { Avatar } from "@/components/atom/Avatar";
import { Button } from "@/components/atom/Button";
import Link from "next/link";
import { useUserPasses } from "@/hooks/usePasses";
import { useAuthStore } from "@/stores/authStore";
import { useRentals } from "@/hooks/useRentals";
import { useBoards } from "@/hooks/useBoards";

export default function MyPageClient() {
  const router = useRouter();
  const { accessToken, userId, userEmail, isAuthenticated } = useAuthStore();
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
    if (!isHydrated) return; // hydration 완료 전에는 실행하지 않음

    if (!isAuthenticated() || !accessToken || !userId) {
      router.push("/login");
      return;
    }
  }, [router, accessToken, userId, isAuthenticated, isHydrated]);

  const userName = userEmail?.split("@")[0] || "사용자";

  const { data: userPasses, isLoading: passesLoading } = useUserPasses();
  const { data: rentals, isLoading: rentalsLoading } = useRentals();
  const { data: reportsData, isLoading: reportsLoading } = useBoards(
    { page: 0, size: 100 },
    "REPORT" // REPORT 타입만 조회
  );

  // hydration 완료 전 또는 인증되지 않은 경우 로딩 표시
  if (!isHydrated || !isAuthenticated() || !userId) {
    return (
      <div className="px-5 py-8">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-[#00a651] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-500 font-medium">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 활성 이용권 개수
  const activePasses = userPasses?.filter(pass => pass.status === "ACTIVATE").length || 0;

  // 총 대여 수
  const totalRentals = rentals?.length || 0;

  // 사용자가 작성한 신고 수
  const pendingReports = reportsData?.content.filter(board => board.userId === parseInt(userId || "0")).length || 0;

  if (passesLoading || rentalsLoading || reportsLoading) {
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
      {/* 사용자 정보 */}
      <Card className="p-6" variant="elevated">
        <div className="flex items-center gap-4 mb-5">
          <Avatar name={userName || "사용자"} size="lg" />
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 mb-0.5 truncate">{userName || "사용자"}</h2>
            {userEmail && <p className="text-sm text-gray-600 truncate">{userEmail}</p>}
          </div>
        </div>
        <Button variant="outline" fullWidth className="border-[#00a651] text-[#00a651] hover:bg-[#00a651]/5">
          프로필 수정
        </Button>
      </Card>

      {/* 통계 */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 text-center" variant="elevated">
          <div className="text-3xl font-bold text-[#00a651] mb-1.5">{activePasses}</div>
          <div className="text-xs text-gray-600 font-medium">활성 이용권</div>
        </Card>
        <Card className="p-4 text-center" variant="elevated">
          <div className="text-3xl font-bold text-blue-600 mb-1.5">{totalRentals}</div>
          <div className="text-xs text-gray-600 font-medium">총 대여</div>
        </Card>
        <Card className="p-4 text-center" variant="elevated">
          <div className="text-3xl font-bold text-orange-600 mb-1.5">{pendingReports}</div>
          <div className="text-xs text-gray-600 font-medium">대기 신고</div>
        </Card>
      </div>

      {/* 메뉴 */}
      <div className="flex flex-col gap-3">
        <Link href="/mypage/passes">
          <Button
            fullWidth
            variant="outline"
            className="flex items-center justify-start h-auto p-4 border-[#00a651] text-[#00a651] hover:bg-[#00a651]/5"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#00a651]/10 mr-3 shrink-0">
              <svg className="w-4 h-4 text-[#00a651]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-semibold text-base">이용권 관리</span>
          </Button>
        </Link>
        <Link href="/mypage/rentals">
          <Button
            fullWidth
            variant="outline"
            className="flex items-center justify-start h-auto p-4 border-[#00a651] text-[#00a651] hover:bg-[#00a651]/5"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#00a651]/10 mr-3 shrink-0">
              <svg className="w-4 h-4 text-[#00a651]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <span className="font-semibold text-base">대여 이력</span>
          </Button>
        </Link>
        <Link href="/reports">
          <Button
            fullWidth
            variant="outline"
            className="flex items-center justify-start h-auto p-4 border-[#00a651] text-[#00a651] hover:bg-[#00a651]/5"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#00a651]/10 mr-3 shrink-0">
              <svg className="w-4 h-4 text-[#00a651]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <span className="font-semibold text-base">신고 내역</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

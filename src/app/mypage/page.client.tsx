"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/atom/Card";
import { Avatar } from "@/components/atom/Avatar";
import { Button } from "@/components/atom/Button";
import Link from "next/link";
import { useUserPasses } from "@/hooks/usePasses";
import { useUserRentals } from "@/hooks/useRentals";

export default function MyPageClient() {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [isChecking, setIsChecking] = useState(true);

  // 유저 정보 확인
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      const storedUserId = localStorage.getItem("userId");
      const storedEmail = localStorage.getItem("userEmail");

      // 토큰이나 유저 ID가 없으면 로그인 페이지로 이동
      if (!token || !storedUserId) {
        router.push("/login");
        return;
      }

      // 유저 정보 설정
      setUserId(parseInt(storedUserId));
      setUserEmail(storedEmail || "");
      setUserName(storedEmail?.split("@")[0] || "사용자");
      setIsChecking(false);
    }
  }, [router]);

  const { data: userPasses, isLoading: passesLoading } = useUserPasses();
  const { data: userRentals, isLoading: rentalsLoading } = useUserRentals(
    userId || 0
  );

  const isLoading = passesLoading || rentalsLoading || isChecking;

  // 유저가 없으면 로딩 표시 (리다이렉트 중)
  if (isChecking || !userId) {
    return (
      <div className="px-4 py-6">
        <div className="text-center py-12 text-gray-500">로딩 중...</div>
      </div>
    );
  }

  // 활성 이용권 개수
  const activePasses =
    userPasses?.filter((pass) => pass.status === "ACTIVATE").length || 0;

  // 총 대여 횟수
  const totalRentals = userRentals?.length || 0;

  // 대기 중인 신고 (API 없음)
  const pendingReports = 0;

  if (isLoading) {
    return (
      <div className="px-4 py-6">
        <div className="text-center py-12 text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* 사용자 정보 */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar name={userName || "사용자"} size="lg" />
          <div>
            <h2 className="text-xl font-bold">{userName || "사용자"}</h2>
            {userEmail && <p className="text-sm text-gray-600">{userEmail}</p>}
          </div>
        </div>
        <Button variant="outline" fullWidth>
          프로필 수정
        </Button>
      </Card>

      {/* 통계 */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-[#00a651] mb-1">
            {activePasses}
          </div>
          <div className="text-xs text-gray-600">활성 이용권</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-500 mb-1">
            {totalRentals}
          </div>
          <div className="text-xs text-gray-600">총 대여</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-500 mb-1">
            {pendingReports}
          </div>
          <div className="text-xs text-gray-600">대기 신고</div>
        </Card>
      </div>

      {/* 메뉴 */}
      <div className="space-y-3">
        <Link href="/mypage/passes">
          <Button fullWidth variant="outline" className="justify-start">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            이용권 관리
          </Button>
        </Link>
        <Link href="/mypage/rentals">
          <Button fullWidth variant="outline" className="justify-start">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            대여 이력
          </Button>
        </Link>
        <Link href="/reports">
          <Button fullWidth variant="outline" className="justify-start">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            신고 내역
          </Button>
        </Link>
      </div>
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RentalList } from "@/components/organism/RentalList";
import { useAuthStore } from "@/stores/authStore";
import { Card } from "@/components/atom/Card";
import { useRentals } from "@/hooks/useRentals";

export default function RentalsPageClient() {
  const router = useRouter();
  const { userId, isAuthenticated } = useAuthStore();
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

    if (!isAuthenticated() || !userId) {
      router.push("/login");
    }
  }, [router, userId, isAuthenticated, isHydrated]);

  const { data: rentals, isLoading, error } = useRentals();

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
  const rentalList =
    rentals?.map((rental) => ({
      id: rental.rentalId,
      bikeNum: rental.bikeNumber,
      startStation: rental.startStationName,
      endStation: rental.endStationName || "-",
      startTime: rental.startTime,
      endTime: rental.endTime,
    })) || [];

  return (
    <RentalList
      rentals={rentalList}
      onRentalClick={(id) => {
        console.log("대여 상세:", id);
      }}
    />
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StationDetail } from "@/components/organism/StationDetail";
import { StationReportModal } from "@/components/organism/StationReportModal";
import { useStation, useRentBike, useReturnBike } from "@/hooks";
import { useRentals } from "@/hooks/useRentals";
import { useCreateBoard } from "@/hooks/useBoards";
import { useQueryClient } from "@tanstack/react-query";
import { boardKeys } from "@/hooks/useBoards";

interface StationDetailPageClientProps {
  stationId: number;
}

export default function StationDetailPageClient({ stationId }: StationDetailPageClientProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: station, isLoading, error } = useStation(stationId);
  const { data: rentals, isLoading: rentalsLoading } = useRentals();
  const rentMutation = useRentBike();
  const returnMutation = useReturnBike();
  const createBoardMutation = useCreateBoard();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // 현재 사용자의 활성 대여 확인 (endTime이 없거나 status가 ACTIVE인 대여)
  // /api/v1/rentals는 JWT 토큰 기반으로 현재 사용자의 대여만 반환한다고 가정
  const activeRental = rentals?.find(rental => !rental.endTime || rental.status === "ACTIVE");

  const handleRent = async () => {
    try {
      // 이미 대여 중인지 확인
      if (activeRental) {
        alert("이미 대여 중인 자전거가 있습니다. 먼저 반납해주세요.");
        return;
      }

      // 대여소에 자전거가 있는지 확인
      if (station && station.availableBikes === 0) {
        alert("대여 가능한 자전거가 없습니다.");
        return;
      }

      await rentMutation.mutateAsync(stationId);
      alert("대여가 완료되었습니다.");
    } catch (err) {
      alert("대여 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
    }
  };

  const handleReturn = async () => {
    try {
      // 활성 대여가 없으면 반납 불가
      if (!activeRental) {
        alert("반납할 자전거가 없습니다.");
        return;
      }

      // rentalId로 반납
      await returnMutation.mutateAsync(activeRental.rentalId);
      alert("반납이 완료되었습니다.");
    } catch (err) {
      alert("반납 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
    }
  };

  const handleReport = () => {
    setIsReportModalOpen(true);
  };

  const handleReportSubmit = async (data: { boardType: "REPORT"; title: string; content: string }) => {
    try {
      await createBoardMutation.mutateAsync(data);
      // 신고 내역 페이지 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
      alert("고장 신고가 접수되었습니다.");
    } catch (err) {
      alert("신고 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
      throw err;
    }
  };

  if (isLoading || rentalsLoading) {
    return (
      <div className="px-4 py-4">
        <div className="text-center py-12 text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (error || !station) {
    return (
      <div className="px-4 py-4">
        <div className="text-center py-12 text-red-500">에러: {error?.message || "대여소를 찾을 수 없습니다."}</div>
      </div>
    );
  }

  // 반납 버튼 활성화 여부 (활성 대여가 있을 때만)
  const canReturn = !!activeRental;
  // 대여 버튼 활성화 여부 (활성 대여가 없고, 자전거가 있을 때만)
  const canRent = !activeRental && station && station.availableBikes > 0;

  return (
    <>
      <StationDetail
        station={{
          id: station.stationId,
          name: station.stationName,
          address: station.address,
          capacity: station.capacity,
          available: station.availableBikes, // SWAGGER에 명시된 availableBikes 필드 사용
          latitude: station.latitude,
          longitude: station.longitude,
        }}
        onRent={canRent ? handleRent : undefined}
        onReturn={canReturn ? handleReturn : undefined}
        onReport={handleReport}
      />
      <StationReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleReportSubmit}
        stationName={station.stationName}
        stationAddress={station.address}
        capacity={station.capacity}
        availableBikes={station.availableBikes}
      />
    </>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { StationDetail } from "@/components/organism/StationDetail";
import { useStation, useRentBike, useReturnBike } from "@/hooks";

interface StationDetailPageClientProps {
  stationId: number;
}

export default function StationDetailPageClient({
  stationId,
}: StationDetailPageClientProps) {
  const router = useRouter();
  const { data: station, isLoading, error } = useStation(stationId);
  const rentMutation = useRentBike();
  const returnMutation = useReturnBike();

  const handleRent = async () => {
    try {
      await rentMutation.mutateAsync(stationId);
      alert("대여가 완료되었습니다.");
    } catch (err) {
      alert("대여 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
    }
  };

  const handleReturn = async () => {
    try {
      // 실제로는 현재 대여 중인 rentalId를 가져와야 함
      const rentalId = 1; // 임시 값
      await returnMutation.mutateAsync(rentalId);
      alert("반납이 완료되었습니다.");
    } catch (err) {
      alert("반납 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
    }
  };

  const handleReport = () => {
    router.push("/reports?create=true");
  };

  if (isLoading) {
    return (
      <div className="px-4 py-4">
        <div className="text-center py-12 text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (error || !station) {
    return (
      <div className="px-4 py-4">
        <div className="text-center py-12 text-red-500">
          에러: {error?.message || "대여소를 찾을 수 없습니다."}
        </div>
      </div>
    );
  }

  return (
    <StationDetail
      station={{
        id: station.stationId,
        name: station.stationName,
        address: station.address,
        capacity: station.capacity,
        available: undefined,
        latitude: station.latitude,
        longitude: station.longitude,
      }}
      onRent={handleRent}
      onReturn={handleReturn}
      onReport={handleReport}
    />
  );
}


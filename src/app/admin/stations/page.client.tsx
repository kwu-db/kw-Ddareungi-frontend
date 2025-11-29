"use client";

import { StationList } from "@/components/organism/StationList";
import { Button } from "@/components/atom/Button";
import { useStations } from "@/hooks/useStations";

export default function AdminStationsPageClient() {
  const { data: stations, isLoading, error } = useStations();

  const handleStationClick = (id: number) => {
    alert(`대여소 수정: ${id}`);
  };

  const handleCreateClick = () => {
    alert("대여소 등록 기능은 추후 구현 예정입니다.");
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
  const stationList =
    stations?.map((station) => ({
      id: station.stationId,
      name: station.stationName,
      address: station.address,
      capacity: station.capacity,
      available: undefined, // API에 없음
    })) || [];

  return (
    <div className="px-4 py-4">
      <div className="mb-4">
        <Button fullWidth onClick={handleCreateClick}>
          대여소 등록
        </Button>
      </div>
      <StationList stations={stationList} onStationClick={handleStationClick} />
    </div>
  );
}


"use client";

import { useRouter } from "next/navigation";
import { StationList } from "@/components/organism/StationList";
import { Input } from "@/components/atom/Input";
import { useStations } from "@/hooks/useStations";

export default function StationsPageClient() {
  const router = useRouter();
  const { data: stations, isLoading, error } = useStations();

  const handleStationClick = (id: number) => {
    router.push(`/stations/${id}`);
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
      available: undefined, // API에 없으면 undefined
      distance: undefined, // API에 없으면 undefined
    })) || [];

  return (
    <div className="px-4 py-4">
      <Input placeholder="대여소 이름 또는 주소로 검색" className="mb-4" />
      <StationList stations={stationList} onStationClick={handleStationClick} />
    </div>
  );
}

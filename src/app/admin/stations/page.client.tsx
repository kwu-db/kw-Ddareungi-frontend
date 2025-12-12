"use client";

import { useState } from "react";
import { Button } from "@/components/atom/Button";
import { StationFormModal } from "@/components/organism/StationFormModal";
import { useStations, useCreateStation, useUpdateStation, useDeleteStation } from "@/hooks/useStations";

export default function AdminStationsPageClient() {
  const { data: stations, isLoading, error } = useStations();
  const createStationMutation = useCreateStation();
  const updateStationMutation = useUpdateStation();
  const deleteStationMutation = useDeleteStation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState<number | null>(null);

  const handleStationClick = (id: number) => {
    setSelectedStation(id);
    setIsEditModalOpen(true);
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = async (data: any) => {
    try {
      await createStationMutation.mutateAsync(data);
      alert("대여소가 등록되었습니다.");
    } catch (err) {
      alert("대여소 등록 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
      throw err;
    }
  };

  const handleEditSubmit = async (data: any) => {
    if (!selectedStation) return;
    try {
      await updateStationMutation.mutateAsync({ stationId: selectedStation, data });
      alert("대여소가 수정되었습니다.");
      setSelectedStation(null);
    } catch (err) {
      alert("대여소 수정 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
      throw err;
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteStationMutation.mutateAsync(id);
        alert("대여소가 삭제되었습니다.");
      } catch (err) {
        alert("대여소 삭제 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
      }
    }
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
        <div className="text-center py-12 text-red-500">에러: {error.message}</div>
      </div>
    );
  }

  // API 응답 형식에 맞게 변환
  const stationList =
    stations?.map(station => ({
      id: station.stationId,
      name: station.stationName,
      address: station.address,
      capacity: station.capacity,
      available: undefined, // API에 없음
    })) || [];

  const selectedStationData = selectedStation ? stations?.find(s => s.stationId === selectedStation) : undefined;

  return (
    <div className="px-4 py-4">
      <div className="mb-4">
        <Button fullWidth onClick={handleCreateClick}>
          대여소 등록
        </Button>
      </div>
      {stationList.length === 0 ? (
        <div className="text-center py-12 text-gray-500">대여소가 없습니다.</div>
      ) : (
        <div className="space-y-4">
          {stationList.map(station => (
            <div key={station.id} className="border rounded-lg p-4">
              <div className="mb-2">
                <h3 className="font-semibold text-lg">{station.name}</h3>
                <p className="text-sm text-gray-600">{station.address}</p>
                <p className="text-sm text-gray-500">수용 대수: {station.capacity}대</p>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" onClick={() => handleStationClick(station.id)} className="flex-1">
                  수정
                </Button>
                <Button variant="secondary" onClick={() => handleDelete(station.id)} className="flex-1">
                  삭제
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <StationFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
        mode="create"
      />
      {selectedStationData && (
        <StationFormModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedStation(null);
          }}
          onSubmit={handleEditSubmit}
          initialData={selectedStationData}
          mode="edit"
        />
      )}
    </div>
  );
}

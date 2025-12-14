"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/atom/Button";
import { StationFormModal } from "@/components/organism/StationFormModal";
import {
  useInfiniteStations,
  useCreateStation,
  useUpdateStation,
  useDeleteStation,
  useSyncStations,
} from "@/hooks/useStations";

export default function AdminStationsPageClient() {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteStations(undefined, 20);
  const createStationMutation = useCreateStation();
  const updateStationMutation = useUpdateStation();
  const deleteStationMutation = useDeleteStation();
  const syncStationsMutation = useSyncStations();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState<number | null>(null);

  // Intersection Observer로 무한 스크롤 구현
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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

  const handleSync = async () => {
    if (confirm("따릉이 API에서 대여소 데이터를 동기화하시겠습니까?")) {
      try {
        const response = await syncStationsMutation.mutateAsync();
        alert(`동기화가 완료되었습니다. (${response.data}개 대여소)`);
      } catch (err) {
        alert("동기화 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
      }
    }
  };

  // 모든 페이지의 데이터를 평탄화
  const allStations = data?.pages.flatMap(page => page.content) || [];

  // API 응답 형식에 맞게 변환
  const stationList = allStations.map(station => ({
    id: station.stationId,
    name: station.stationName,
    address: station.address,
    capacity: station.capacity,
    available: station.availableBikes,
  }));

  const selectedStationData = selectedStation ? allStations.find(s => s.stationId === selectedStation) : undefined;

  if (isLoading && !data) {
    return (
      <div className="px-4 py-4">
        <div className="text-center py-12 text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-4">
        <div className="text-center py-12 text-red-500">에러: {error?.message || "알 수 없는 오류"}</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="mb-4 space-y-2">
        <Button fullWidth onClick={handleCreateClick}>
          대여소 등록
        </Button>
        <Button fullWidth variant="outline" onClick={handleSync} disabled={syncStationsMutation.isPending}>
          {syncStationsMutation.isPending ? "동기화 중..." : "따릉이 데이터 동기화"}
        </Button>
      </div>
      {stationList.length === 0 ? (
        <div className="text-center py-12 text-gray-500">대여소가 없습니다.</div>
      ) : (
        <>
          <div className="space-y-4">
            {stationList.map(station => (
              <div key={station.id} className="border rounded-lg p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-lg">{station.name}</h3>
                  <p className="text-sm text-gray-600">{station.address}</p>
                  <p className="text-sm text-gray-500">
                    수용 대수: {station.capacity}대 | 사용 가능: {station.available}대
                  </p>
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
          {/* 무한 스크롤 트리거 */}
          <div ref={loadMoreRef} className="py-4">
            {isFetchingNextPage && (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-6 h-6 border-3 border-[#00a651] border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-sm text-gray-500">더 불러오는 중...</p>
              </div>
            )}
            {!hasNextPage && stationList.length > 0 && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-400">모든 대여소를 불러왔습니다</p>
              </div>
            )}
          </div>
        </>
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

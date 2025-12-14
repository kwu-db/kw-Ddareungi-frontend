"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { StationList } from "@/components/organism/StationList";
import { Input } from "@/components/atom/Input";
import { Card } from "@/components/atom/Card";
import { useInfiniteStations } from "@/hooks/useStations";
import { StationCard } from "@/components/molecule/StationCard";

export default function StationsPageClient() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteStations(debouncedSearch || undefined, 20);

  // 검색어 디바운싱
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Intersection Observer로 무한 스크롤 구현
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
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
    router.push(`/stations/${id}`);
  };

  // 모든 페이지의 데이터를 평탄화
  const allStations =
    data?.pages.flatMap((page) => page.content) || [];

  // API 응답 형식에 맞게 변환
  const stationList = allStations.map((station) => ({
    id: station.stationId,
    name: station.stationName,
    address: station.address,
    capacity: station.capacity,
    available: station.availableBikes,
    closedDate: station.closedDate,
    distance: undefined,
  }));

  if (isLoading && !data) {
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

  return (
    <div className="px-5 py-5">
      <div className="mb-5">
        <Input
          placeholder="대여소 이름 또는 주소로 검색"
          className="shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {stationList.length === 0 ? (
        <Card className="p-12 text-center" variant="elevated">
          <div className="text-gray-400 mb-2">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">대여소가 없습니다</p>
        </Card>
      ) : (
        <>
          <div className="space-y-0">
            {stationList.map((station) => (
              <StationCard
                key={station.id}
                stationName={station.name}
                address={station.address}
                capacity={station.capacity}
                available={station.available}
                closedDate={station.closedDate}
                distance={station.distance}
                onClick={() => handleStationClick(station.id)}
              />
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
    </div>
  );
}

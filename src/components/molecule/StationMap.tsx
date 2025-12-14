'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Leaflet CSS는 클라이언트 사이드에서만 로드
const LeafletMap = dynamic(
  () => import('./StationMapClient'),
  { ssr: false }
);

interface StationMapProps {
  latitude: number;
  longitude: number;
  stationName: string;
}

export const StationMap: React.FC<StationMapProps> = ({
  latitude,
  longitude,
  stationName,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
        지도 로딩 중...
      </div>
    );
  }

  return <LeafletMap latitude={latitude} longitude={longitude} stationName={stationName} />;
};


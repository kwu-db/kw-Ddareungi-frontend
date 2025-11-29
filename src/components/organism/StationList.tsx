'use client';

import React from 'react';
import { StationCard } from '../molecule/StationCard';

interface Station {
  id: number;
  name: string;
  address: string;
  capacity: number;
  available?: number;
  distance?: string;
}

interface StationListProps {
  stations: Station[];
  onStationClick?: (id: number) => void;
}

export const StationList: React.FC<StationListProps> = ({
  stations,
  onStationClick,
}) => {
  return (
    <div className="px-4 py-4">
      {stations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          대여소가 없습니다.
        </div>
      ) : (
        stations.map((station) => (
          <StationCard
            key={station.id}
            stationName={station.name}
            address={station.address}
            capacity={station.capacity}
            available={station.available}
            distance={station.distance}
            onClick={() => onStationClick?.(station.id)}
          />
        ))
      )}
    </div>
  );
};


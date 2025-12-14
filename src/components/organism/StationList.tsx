'use client';

import React from 'react';
import { StationCard } from '../molecule/StationCard';
import { Card } from '../atom/Card';

interface ClosedDate {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

interface Station {
  id: number;
  name: string;
  address: string;
  capacity: number;
  available?: number;
  closedDate?: ClosedDate | null;
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
    <div>
      {stations.length === 0 ? (
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
        <div className="space-y-0">
          {stations.map((station) => (
            <StationCard
              key={station.id}
              stationName={station.name}
              address={station.address}
              capacity={station.capacity}
              available={station.available}
              closedDate={station.closedDate}
              distance={station.distance}
              onClick={() => onStationClick?.(station.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};


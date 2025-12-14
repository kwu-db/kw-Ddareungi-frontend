'use client';

import React from 'react';
import { RentalCard } from '../molecule/RentalCard';
import { Card } from '../atom/Card';

interface Rental {
  id: number;
  bikeNum: string;
  startStation: string;
  endStation?: string;
  startTime: string;
  endTime?: string;
}

interface RentalListProps {
  rentals: Rental[];
  onRentalClick?: (id: number) => void;
}

export const RentalList: React.FC<RentalListProps> = ({
  rentals,
  onRentalClick,
}) => {
  return (
    <div className="px-5 py-6">
      {rentals.length === 0 ? (
        <Card className="p-12 text-center" variant="elevated">
          <div className="text-gray-400 mb-3">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">대여 이력이 없습니다</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {rentals.map((rental) => (
            <RentalCard
              key={rental.id}
              id={rental.id}
              bikeNum={rental.bikeNum}
              startStation={rental.startStation}
              endStation={rental.endStation}
              startTime={rental.startTime}
              endTime={rental.endTime}
              onClick={() => onRentalClick?.(rental.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};


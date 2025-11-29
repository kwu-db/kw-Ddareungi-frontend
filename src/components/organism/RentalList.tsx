'use client';

import React from 'react';
import { RentalCard } from '../molecule/RentalCard';

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
    <div className="px-4 py-4">
      {rentals.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          대여 이력이 없습니다.
        </div>
      ) : (
        rentals.map((rental) => (
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
        ))
      )}
    </div>
  );
};


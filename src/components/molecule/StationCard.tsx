import React from 'react';
import { Card } from '../atom/Card';
import { Badge } from '../atom/Badge';

interface StationCardProps {
  stationName: string;
  address: string;
  capacity: number;
  available?: number;
  distance?: string;
  onClick?: () => void;
}

export const StationCard: React.FC<StationCardProps> = ({
  stationName,
  address,
  capacity,
  available,
  distance,
  onClick,
}) => {
  return (
    <Card onClick={onClick} className="p-4 mb-3">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-gray-900">{stationName}</h3>
        {distance && (
          <Badge variant="info">{distance}</Badge>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-3">{address}</p>
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <span className="text-gray-500">수용 대수:</span>
          <span className="font-medium">{capacity}대</span>
        </div>
        {available !== undefined && (
          <div className="flex items-center gap-1">
            <span className="text-gray-500">가능:</span>
            <span className={`font-medium ${available > 0 ? 'text-[#00a651]' : 'text-red-500'}`}>
              {available}대
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};


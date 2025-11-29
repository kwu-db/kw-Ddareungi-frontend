import React from 'react';
import { Card } from '../atom/Card';
import { Badge } from '../atom/Badge';

interface RentalCardProps {
  id: number;
  bikeNum: string;
  startStation: string;
  endStation?: string;
  startTime: string;
  endTime?: string;
  onClick?: () => void;
}

export const RentalCard: React.FC<RentalCardProps> = ({
  bikeNum,
  startStation,
  endStation,
  startTime,
  endTime,
  onClick,
}) => {
  const isActive = !endTime;
  
  return (
    <Card onClick={onClick} className="p-4 mb-3">
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className="text-sm text-gray-500">자전거 번호</span>
          <p className="font-semibold">{bikeNum}</p>
        </div>
        {isActive && (
          <Badge variant="warning">대여 중</Badge>
        )}
      </div>
      <div className="space-y-2 text-sm">
        <div>
          <span className="text-gray-500">출발:</span>
          <span className="ml-2 font-medium">{startStation}</span>
          <span className="ml-2 text-gray-400">{startTime}</span>
        </div>
        {endStation && endTime ? (
          <div>
            <span className="text-gray-500">반납:</span>
            <span className="ml-2 font-medium">{endStation}</span>
            <span className="ml-2 text-gray-400">{endTime}</span>
          </div>
        ) : (
          <div className="text-[#00a651] font-medium">반납 대기 중</div>
        )}
      </div>
    </Card>
  );
};


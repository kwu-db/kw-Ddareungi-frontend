import React from 'react';
import { Card } from '../atom/Card';
import { Badge } from '../atom/Badge';

interface ClosedDate {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

interface StationCardProps {
  stationName: string;
  address: string;
  capacity: number;
  available?: number;
  closedDate?: ClosedDate | null;
  distance?: string;
  onClick?: () => void;
}

export const StationCard: React.FC<StationCardProps> = ({
  stationName,
  address,
  capacity,
  available = 0,
  closedDate,
  distance,
  onClick,
}) => {
  // 운영 상태 판단: closedDate가 있으면 운영 종료
  const isClosed = !!closedDate;
  
  // 가능 여부 판단
  const isAvailable = !isClosed && available > 0;
  const isUnavailable = !isClosed && available === 0;

  // 상태에 따른 텍스트와 색상
  const getStatusInfo = () => {
    if (isClosed) {
      return {
        availableText: '운영 종료',
        color: 'text-gray-500',
        badgeVariant: 'secondary' as const,
        badgeText: '운영 종료',
      };
    }
    if (isAvailable) {
      return {
        availableText: `${available}대`,
        color: 'text-[#00a651]',
        badgeVariant: 'success' as const,
        badgeText: '가능',
      };
    }
    if (isUnavailable) {
      return {
        availableText: '0대',
        color: 'text-red-500',
        badgeVariant: 'danger' as const,
        badgeText: '불가',
      };
    }
    return {
      availableText: '-',
      color: 'text-gray-400',
      badgeVariant: 'secondary' as const,
      badgeText: '확인 불가',
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <Card onClick={onClick} className="p-5 mb-3" variant="elevated">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg text-gray-900 pr-2">{stationName}</h3>
        {distance && (
          <Badge variant="info" className="shrink-0">{distance}</Badge>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{address}</p>
      <div className="flex items-center gap-5 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">수용 대수</span>
          <span className="font-bold text-gray-900">{capacity}대</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">가능</span>
          <span className={`font-bold ${statusInfo.color}`}>
            {statusInfo.availableText}
          </span>
          <Badge variant={statusInfo.badgeVariant} className="ml-1">
            {statusInfo.badgeText}
          </Badge>
        </div>
      </div>
    </Card>
  );
};


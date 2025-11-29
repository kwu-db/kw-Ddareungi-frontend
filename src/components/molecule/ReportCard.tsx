import React from 'react';
import { Card } from '../atom/Card';
import { Badge } from '../atom/Badge';

interface ReportCardProps {
  id: number;
  stationName: string;
  bikeNum?: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
  onClick?: () => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  stationName,
  bikeNum,
  description,
  status,
  createdAt,
  onClick,
}) => {
  const statusLabels = {
    PENDING: '대기 중',
    IN_PROGRESS: '처리 중',
    RESOLVED: '처리 완료',
  };
  
  const statusVariants = {
    PENDING: 'warning' as const,
    IN_PROGRESS: 'info' as const,
    RESOLVED: 'success' as const,
  };
  
  return (
    <Card onClick={onClick} className="p-4 mb-3">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-base">{stationName}</h3>
        <Badge variant={statusVariants[status]}>
          {statusLabels[status]}
        </Badge>
      </div>
      {bikeNum && (
        <p className="text-sm text-gray-600 mb-2">자전거 번호: {bikeNum}</p>
      )}
      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{description}</p>
      <span className="text-xs text-gray-500">{createdAt}</span>
    </Card>
  );
};


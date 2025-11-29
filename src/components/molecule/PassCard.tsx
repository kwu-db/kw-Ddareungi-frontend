import React from 'react';
import { Card } from '../atom/Card';
import { Badge } from '../atom/Badge';

interface PassCardProps {
  type: '1DAY' | '7DAY' | '30DAY' | 'ANNUAL';
  price: number;
  activatedAt?: string;
  expiredAt?: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELED';
  onClick?: () => void;
}

export const PassCard: React.FC<PassCardProps> = ({
  type,
  price,
  activatedAt,
  expiredAt,
  status,
  onClick,
}) => {
  const typeLabels = {
    '1DAY': '1일권',
    '7DAY': '7일권',
    '30DAY': '30일권',
    'ANNUAL': '연간권',
  };
  
  const statusLabels = {
    ACTIVE: '사용 가능',
    EXPIRED: '만료됨',
    CANCELED: '취소됨',
  };
  
  const statusVariants = {
    ACTIVE: 'success' as const,
    EXPIRED: 'default' as const,
    CANCELED: 'danger' as const,
  };
  
  return (
    <Card onClick={onClick} className="p-4 mb-3">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-lg">{typeLabels[type]}</h3>
        <Badge variant={statusVariants[status]}>
          {statusLabels[status]}
        </Badge>
      </div>
      <div className="mb-3">
        <span className="text-2xl font-bold text-[#00a651]">{price.toLocaleString()}원</span>
      </div>
      {activatedAt && (
        <div className="text-sm text-gray-600 mb-1">
          <span className="text-gray-500">활성화:</span> {activatedAt}
        </div>
      )}
      {expiredAt && (
        <div className="text-sm text-gray-600">
          <span className="text-gray-500">만료:</span> {expiredAt}
        </div>
      )}
    </Card>
  );
};


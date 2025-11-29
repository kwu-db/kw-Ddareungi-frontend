'use client';

import React from 'react';
import { Card } from '../atom/Card';
import { Button } from '../atom/Button';
import { Badge } from '../atom/Badge';

interface StationDetailProps {
  station: {
    id: number;
    name: string;
    address: string;
    capacity: number;
    available?: number;
    latitude: number;
    longitude: number;
  };
  onRent?: () => void;
  onReturn?: () => void;
  onReport?: () => void;
}

export const StationDetail: React.FC<StationDetailProps> = ({
  station,
  onRent,
  onReturn,
  onReport,
}) => {
  return (
    <div className="px-4 py-4">
      <Card className="p-6 mb-4">
        <h2 className="text-2xl font-bold mb-2">{station.name}</h2>
        <p className="text-gray-600 mb-4">{station.address}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">수용 대수</span>
            <span className="font-semibold">{station.capacity}대</span>
          </div>
          {station.available !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">가능 대수</span>
              <Badge variant={station.available > 0 ? 'success' : 'danger'}>
                {station.available}대
              </Badge>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          {onRent && (
            <Button
              fullWidth
              onClick={onRent}
              disabled={station.available === 0}
            >
              대여하기
            </Button>
          )}
          {onReturn && (
            <Button
              fullWidth
              variant="outline"
              onClick={onReturn}
            >
              반납하기
            </Button>
          )}
          {onReport && (
            <Button
              fullWidth
              variant="secondary"
              onClick={onReport}
            >
              고장 신고
            </Button>
          )}
        </div>
      </Card>
      
      {/* 지도 영역 (플레이스홀더) */}
      <Card className="p-4 mb-4">
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          지도 영역
        </div>
      </Card>
    </div>
  );
};


import React from 'react';
import { Card } from '../atom/Card';

interface StatsChartProps {
  title: string;
  data?: Array<{ label: string; value: number }>;
  type?: 'bar' | 'line' | 'pie';
}

export const StatsChart: React.FC<StatsChartProps> = ({
  title,
  data = [],
  type = 'bar',
}) => {
  return (
    <Card className="p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 border-2 border-dashed">
        <div className="text-center">
          <p className="text-sm mb-2">차트 영역</p>
          <p className="text-xs text-gray-500">
            {type} 차트 - {data.length}개 데이터
          </p>
        </div>
      </div>
    </Card>
  );
};


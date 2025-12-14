'use client';

import React from 'react';
import { ReportCard } from '../molecule/ReportCard';
import { Button } from '../atom/Button';
import { Card } from '../atom/Card';

interface Report {
  id: number;
  stationName: string;
  bikeNum?: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
}

interface ReportListProps {
  reports: Report[];
  onReportClick?: (id: number) => void;
  onCreateClick?: () => void;
  showCreateButton?: boolean;
}

export const ReportList: React.FC<ReportListProps> = ({
  reports,
  onReportClick,
  onCreateClick,
  showCreateButton = true,
}) => {
  return (
    <div className="px-5 py-6 space-y-4">
      {showCreateButton && onCreateClick && (
        <Button 
          fullWidth 
          onClick={onCreateClick}
          className="bg-[#00a651] text-white hover:bg-[#008a43] shadow-md"
        >
          신고하기
        </Button>
      )}
      
      {reports.length === 0 ? (
        <Card className="p-12 text-center" variant="elevated">
          <div className="text-gray-400 mb-3">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">신고 내역이 없습니다</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              id={report.id}
              stationName={report.stationName}
              bikeNum={report.bikeNum}
              description={report.description}
              status={report.status}
              createdAt={report.createdAt}
              onClick={() => onReportClick?.(report.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};


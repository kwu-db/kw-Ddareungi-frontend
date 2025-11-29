'use client';

import React from 'react';
import { ReportCard } from '../molecule/ReportCard';
import { Button } from '../atom/Button';

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
    <div className="px-4 py-4">
      {showCreateButton && onCreateClick && (
        <div className="mb-4">
          <Button fullWidth onClick={onCreateClick}>
            신고하기
          </Button>
        </div>
      )}
      
      {reports.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          신고 내역이 없습니다.
        </div>
      ) : (
        reports.map((report) => (
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
        ))
      )}
    </div>
  );
};


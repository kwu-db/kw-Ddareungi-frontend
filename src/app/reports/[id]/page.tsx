import { MainLayout } from '@/components/template/MainLayout';
import { Card } from '@/components/atom/Card';
import { Badge } from '@/components/atom/Badge';
import { Button } from '@/components/atom/Button';

interface ReportDetailPageProps {
  params: {
    id: string;
  };
}

export default function ReportDetailPage({ params }: ReportDetailPageProps) {
  // 더미 데이터
  const report = {
    id: parseInt(params.id),
    stationName: '강남역 10번 출구',
    bikeNum: 'BIKE-002',
    description: '체인에서 이상한 소음이 발생합니다. 사용 시 주의가 필요합니다.',
    status: 'PENDING' as const,
    createdAt: '2025-01-10 10:00',
    reporter: '홍길동',
  };

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
    <MainLayout title="신고 상세" showBack>
      <div className="px-4 py-4">
        <Card className="p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{report.stationName}</h2>
            <Badge variant={statusVariants[report.status]}>
              {statusLabels[report.status]}
            </Badge>
          </div>

          <div className="space-y-4 mb-6">
            {report.bikeNum && (
              <div>
                <span className="text-sm text-gray-500">자전거 번호</span>
                <p className="font-medium">{report.bikeNum}</p>
              </div>
            )}
            <div>
              <span className="text-sm text-gray-500">신고자</span>
              <p className="font-medium">{report.reporter}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">신고 시간</span>
              <p className="font-medium">{report.createdAt}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">신고 내용</span>
              <p className="mt-1 text-gray-700 whitespace-pre-wrap">
                {report.description}
              </p>
            </div>
          </div>

          {report.status !== 'RESOLVED' && (
            <Button fullWidth variant="danger">
              신고 취소
            </Button>
          )}
        </Card>
      </div>
    </MainLayout>
  );
}


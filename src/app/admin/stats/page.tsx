import { AdminLayout } from '@/components/template/AdminLayout';
import { StatsChart } from '@/components/organism/StatsChart';

export default function AdminStatsPage() {
  // 더미 데이터
  const topStations = [
    { label: '시청역 1번 출구', value: 150 },
    { label: '강남역 10번 출구', value: 120 },
    { label: '숭실대 정문', value: 95 },
    { label: '홍대입구역 2번 출구', value: 80 },
    { label: '이대앞역 1번 출구', value: 65 },
  ];

  const dailyStats = [
    { label: '월', value: 450 },
    { label: '화', value: 520 },
    { label: '수', value: 480 },
    { label: '목', value: 550 },
    { label: '금', value: 600 },
    { label: '토', value: 580 },
    { label: '일', value: 500 },
  ];

  return (
    <AdminLayout title="통계 대시보드" showBack>
      <div className="px-4 py-4">
        <StatsChart
          title="대여소별 이용량 TOP 5"
          data={topStations}
          type="bar"
        />
        <StatsChart
          title="요일별 이용 현황"
          data={dailyStats}
          type="line"
        />
        <StatsChart
          title="이용권 유형별 분포"
          data={[
            { label: '1일권', value: 30 },
            { label: '7일권', value: 25 },
            { label: '30일권', value: 35 },
            { label: '연간권', value: 10 },
          ]}
          type="pie"
        />
      </div>
    </AdminLayout>
  );
}


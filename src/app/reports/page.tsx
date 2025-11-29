import { MainLayout } from "@/components/template/MainLayout";
import ReportsPageClient from "./page.client";

export default function ReportsPage() {
  // 더미 데이터
  const reports = [
    {
      id: 1,
      stationName: "강남역 10번 출구",
      bikeNum: "BIKE-002",
      description: "체인 이상 소음",
      status: "PENDING" as const,
      createdAt: "2025-01-10 10:00",
    },
    {
      id: 2,
      stationName: "시청역 1번 출구",
      bikeNum: undefined,
      description: "대여소 잠금 장치 고장",
      status: "IN_PROGRESS" as const,
      createdAt: "2025-01-09 15:30",
    },
    {
      id: 3,
      stationName: "숭실대 정문",
      bikeNum: "BIKE-015",
      description: "타이어 펑크",
      status: "RESOLVED" as const,
      createdAt: "2025-01-08 11:20",
    },
  ];

  return (
    <MainLayout title="신고 관리" showBack>
      <ReportsPageClient reports={reports} />
    </MainLayout>
  );
}


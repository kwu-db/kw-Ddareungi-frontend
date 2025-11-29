"use client";

import { useRouter } from "next/navigation";
import { ReportList } from "@/components/organism/ReportList";

interface ReportsPageClientProps {
  reports: Array<{
    id: number;
    stationName: string;
    bikeNum?: string;
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "RESOLVED";
    createdAt: string;
  }>;
}

export default function ReportsPageClient({
  reports,
}: ReportsPageClientProps) {
  const router = useRouter();

  const handleReportClick = (id: number) => {
    router.push(`/reports/${id}`);
  };

  const handleCreateClick = () => {
    alert("신고 작성 기능은 추후 구현 예정입니다.");
  };

  return (
    <ReportList
      reports={reports}
      onReportClick={handleReportClick}
      onCreateClick={handleCreateClick}
      showCreateButton={true}
    />
  );
}


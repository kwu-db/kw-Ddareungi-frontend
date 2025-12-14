"use client";

import { AdminDashboard } from "@/components/organism/AdminDashboard";
import { useRentals } from "@/hooks/useRentals";
import { useUsers } from "@/hooks/useUsers";
import { useBoards } from "@/hooks/useBoards";
import { useStationsCount } from "@/hooks/useAdmin";

export default function AdminPageClient() {
  const { data: stationsCount } = useStationsCount();
  const { data: rentals } = useRentals();
  const { data: users } = useUsers();
  const { data: reportsData } = useBoards({ page: 0, size: 100 }, "REPORT");

  // 통계 계산
  const stats = {
    totalStations: stationsCount || 0,
    totalUsers: users?.length || 0,
    pendingReports: reportsData?.content.length || 0, // REPORT 타입 게시글 전체 (대기 중인 것으로 간주)
    activeRentals: rentals?.filter(rental => !rental.endTime || rental.status === "ACTIVE").length || 0,
  };

  return <AdminDashboard stats={stats} />;
}

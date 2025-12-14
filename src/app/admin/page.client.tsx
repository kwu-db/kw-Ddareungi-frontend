"use client";

import { AdminDashboard } from "@/components/organism/AdminDashboard";
import { useStations } from "@/hooks/useStations";
import { useRentals } from "@/hooks/useRentals";

export default function AdminPageClient() {
  const { data: stations } = useStations();
  const { data: rentals } = useRentals();

  // 통계 계산
  const stats = {
    totalStations: stations?.length || 0,
    totalUsers: 0, // API 없음
    pendingReports: 0, // API 없음
    activeRentals: rentals?.filter(rental => !rental.endTime || rental.status === "ACTIVE").length || 0,
  };

  return <AdminDashboard stats={stats} />;
}

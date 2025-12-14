import { MainLayout } from "@/components/template/MainLayout";
import ReportsPageClient from "./page.client";

export default function ReportsPage() {
  return (
    <MainLayout title="신고 내역" showBack>
      <ReportsPageClient />
    </MainLayout>
  );
}


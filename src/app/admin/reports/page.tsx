import { AdminLayout } from "@/components/template/AdminLayout";
import AdminReportsPageClient from "./page.client";

export default function AdminReportsPage() {
  return (
    <AdminLayout title="신고 내역" showBack>
      <AdminReportsPageClient />
    </AdminLayout>
  );
}

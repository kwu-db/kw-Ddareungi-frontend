import { AdminLayout } from "@/components/template/AdminLayout";
import AdminPageClient from "./page.client";

export default function AdminPage() {
  return (
    <AdminLayout title="관리자 대시보드">
      <AdminPageClient />
    </AdminLayout>
  );
}


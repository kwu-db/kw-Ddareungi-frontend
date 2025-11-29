import { AdminLayout } from "@/components/template/AdminLayout";
import AdminStationsPageClient from "./page.client";

export default function AdminStationsPage() {
  return (
    <AdminLayout title="대여소 관리" showBack>
      <AdminStationsPageClient />
    </AdminLayout>
  );
}


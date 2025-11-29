import { AdminLayout } from "@/components/template/AdminLayout";
import AdminUsersPageClient from "./page.client";

export default function AdminUsersPage() {
  return (
    <AdminLayout title="회원 관리" showBack>
      <AdminUsersPageClient />
    </AdminLayout>
  );
}


import { AdminLayout } from '@/components/template/AdminLayout';
import AdminStatsPageClient from './page.client';

export default function AdminStatsPage() {
  return (
    <AdminLayout title="통계 대시보드" showBack>
      <AdminStatsPageClient />
    </AdminLayout>
  );
}


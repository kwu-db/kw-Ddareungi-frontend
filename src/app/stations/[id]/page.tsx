import { MainLayout } from "@/components/template/MainLayout";
import StationDetailPageClient from "./page.client";

interface StationDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StationDetailPage({ params }: StationDetailPageProps) {
  const { id } = await params;
  const stationId = parseInt(id);

  return (
    <MainLayout title="대여소 상세" showBack>
      <StationDetailPageClient stationId={stationId} />
    </MainLayout>
  );
}


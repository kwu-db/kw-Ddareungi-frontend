import { MainLayout } from "@/components/template/MainLayout";
import StationDetailPageClient from "./page.client";

interface StationDetailPageProps {
  params: {
    id: string;
  };
}

export default function StationDetailPage({ params }: StationDetailPageProps) {
  const stationId = parseInt(params.id);

  return (
    <MainLayout title="대여소 상세" showBack>
      <StationDetailPageClient stationId={stationId} />
    </MainLayout>
  );
}


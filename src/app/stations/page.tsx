import { MainLayout } from "@/components/template/MainLayout";
import StationsPageClient from "./page.client";

export default function StationsPage() {
  return (
    <MainLayout title="대여소 목록" showBack>
      <StationsPageClient />
    </MainLayout>
  );
}

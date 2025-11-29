import { MainLayout } from "@/components/template/MainLayout";
import PassesPageClient from "./page.client";

export default function PassesPage() {
  return (
    <MainLayout title="이용권 관리" showBack>
      <PassesPageClient />
    </MainLayout>
  );
}


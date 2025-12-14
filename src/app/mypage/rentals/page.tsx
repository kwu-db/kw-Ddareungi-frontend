import { MainLayout } from "@/components/template/MainLayout";
import RentalsPageClient from "./page.client";

export default function RentalsPage() {
  // 클라이언트에서 userId를 가져오므로 서버에서는 전달하지 않음
  return (
    <MainLayout title="대여 이력" showBack>
      <RentalsPageClient />
    </MainLayout>
  );
}


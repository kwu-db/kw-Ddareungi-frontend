import { MainLayout } from "@/components/template/MainLayout";
import RentalsPageClient from "./page.client";

export default function RentalsPage() {
  // TODO: 실제 사용자 ID를 가져와야 함 (인증 후)
  const userId = 1; // 임시 값

  return (
    <MainLayout title="대여 이력" showBack>
      <RentalsPageClient userId={userId} />
    </MainLayout>
  );
}


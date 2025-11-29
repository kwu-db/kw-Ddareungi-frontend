import { MainLayout } from "@/components/template/MainLayout";
import MyPageClient from "./page.client";

export default function MyPage() {
  // 클라이언트에서 localStorage에서 가져오므로 서버에서는 undefined
  return (
    <MainLayout title="마이페이지" showBack>
      <MyPageClient />
    </MainLayout>
  );
}

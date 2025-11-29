import { MainLayout } from "@/components/template/MainLayout";
import LoginPageClient from "./page.client";

export default function LoginPage() {
  return (
    <MainLayout title="로그인" showBack>
      <LoginPageClient />
    </MainLayout>
  );
}


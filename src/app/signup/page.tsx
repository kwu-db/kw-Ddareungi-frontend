import { MainLayout } from "@/components/template/MainLayout";
import SignupPageClient from "./page.client";

export default function SignupPage() {
  return (
    <MainLayout title="회원가입" showBack>
      <SignupPageClient />
    </MainLayout>
  );
}


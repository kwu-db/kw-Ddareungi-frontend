import { MainLayout } from "@/components/template/MainLayout";
import BoardPageClient from "./page.client";

export default function BoardPage() {
  return (
    <MainLayout title="게시판" showBack>
      <BoardPageClient />
    </MainLayout>
  );
}


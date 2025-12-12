import { MainLayout } from "@/components/template/MainLayout";
import BoardDetailPageClient from "./page.client";

interface BoardDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BoardDetailPage({ params }: BoardDetailPageProps) {
  const { id } = await params;
  const boardId = parseInt(id);

  return (
    <MainLayout title="게시글 상세" showBack>
      <BoardDetailPageClient boardId={boardId} isAuthor={false} />
    </MainLayout>
  );
}


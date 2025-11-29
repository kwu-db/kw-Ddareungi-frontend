import { MainLayout } from "@/components/template/MainLayout";
import BoardDetailPageClient from "./page.client";

interface BoardDetailPageProps {
  params: {
    id: string;
  };
}

export default function BoardDetailPage({ params }: BoardDetailPageProps) {
  const boardId = parseInt(params.id);

  return (
    <MainLayout title="게시글 상세" showBack>
      <BoardDetailPageClient boardId={boardId} isAuthor={false} />
    </MainLayout>
  );
}


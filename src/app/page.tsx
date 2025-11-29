import { MainLayout } from "@/components/template/MainLayout";
import HomePageClient from "./page.client";

export default function Home() {
  return (
    <MainLayout title="따릉이">
      <HomePageClient />
    </MainLayout>
  );
}

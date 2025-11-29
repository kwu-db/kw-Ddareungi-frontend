"use client";

import { UserList } from "@/components/organism/UserList";

export default function AdminUsersPageClient() {
  // TODO: User 목록 조회 API가 없으므로 일단 빈 배열
  // SWAGGER.md를 확인했을 때 User 목록 조회 API가 없음
  const users: Array<{
    id: number;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
  }> = [];

  const handleUserClick = (id: number) => {
    alert(`회원 상세: ${id}`);
  };

  return <UserList users={users} onUserClick={handleUserClick} />;
}


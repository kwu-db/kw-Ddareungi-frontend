"use client";

import { UserList } from "@/components/organism/UserList";
import { useUsers } from "@/hooks/useUsers";
import { Card } from "@/components/atom/Card";

export default function AdminUsersPageClient() {
  const { data: users, isLoading, error } = useUsers();

  const handleUserClick = (id: number) => {
    alert(`회원 상세: ${id}`);
  };

  if (isLoading) {
    return (
      <div className="px-4 py-4">
        <div className="text-center py-12 text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-4">
        <Card className="p-6 text-center" variant="elevated">
          <div className="text-red-500 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-red-600 font-semibold mb-1">에러가 발생했습니다</p>
          <p className="text-sm text-gray-500">{error?.message || "알 수 없는 오류"}</p>
        </Card>
      </div>
    );
  }

  // API 응답 형식에 맞게 변환
  const userList =
    users?.map((user) => ({
      id: user.userId,
      name: user.name || user.username || "이름 없음",
      email: user.email,
      role: user.role,
    })) || [];

  return <UserList users={userList} onUserClick={handleUserClick} />;
}


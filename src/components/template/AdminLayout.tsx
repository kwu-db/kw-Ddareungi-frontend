"use client";

import React from "react";
import { Header } from "../organism/Header";
import { Footer } from "../organism/Footer";
import { useAuthStore } from "@/stores/authStore";
import { useCheckAdmin } from "@/hooks/useAdmin";
import { Card } from "../atom/Card";
import { Button } from "../atom/Button";
import { useRouter } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title = "관리자", showBack }) => {
  const router = useRouter();
  const { userEmail, isAuthenticated } = useAuthStore();
  const {
    data: adminCheckData,
    isLoading: isCheckingAdmin,
    error: adminCheckError,
  } = useCheckAdmin(userEmail, !!userEmail && isAuthenticated());

  // 인증되지 않은 경우 - 401 Unauthorized
  if (!isAuthenticated() || !userEmail) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header title={title} showBack={showBack} />
        <main className="flex-1 pb-6 max-w-[428px] w-full mx-auto px-4 py-8">
          <Card className="p-6 text-center" variant="elevated">
            <div className="text-orange-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">401 Unauthorized</h2>
            <p className="text-gray-600 mb-6">로그인이 필요합니다.</p>
            <Button onClick={() => router.push("/login")} className="w-full" variant="primary">
              로그인하기
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // admin 체크 중인 경우
  if (isCheckingAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header title={title} showBack={showBack} />
        <main className="flex-1 pb-6 max-w-[428px] w-full mx-auto px-4 py-8">
          <Card className="p-6 text-center" variant="elevated">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-[#00a651] border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-gray-500 font-medium">권한 확인 중...</p>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // admin 체크 에러 발생 시 - 500 Internal Server Error
  if (adminCheckError) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header title={title} showBack={showBack} />
        <main className="flex-1 pb-6 max-w-[428px] w-full mx-auto px-4 py-8">
          <Card className="p-6 text-center" variant="elevated">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">500 Internal Server Error</h2>
            <p className="text-gray-600 mb-2">관리자 권한 확인 중 오류가 발생했습니다.</p>
            <p className="text-sm text-gray-500 mb-6">
              {adminCheckError instanceof Error ? adminCheckError.message : "알 수 없는 오류가 발생했습니다."}
            </p>
            <Button onClick={() => router.push("/")} className="w-full" variant="secondary">
              홈으로 돌아가기
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // admin 체크 완료 후 admin이 아닌 경우 - 403 Forbidden
  if (adminCheckData && !adminCheckData.isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header title={title} showBack={showBack} />
        <main className="flex-1 pb-6 max-w-[428px] w-full mx-auto px-4 py-8">
          <Card className="p-6 text-center" variant="elevated">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">403 Forbidden</h2>
            <p className="text-gray-600 mb-2">접근 권한이 없습니다.</p>
            <p className="text-sm text-gray-500 mb-6">관리자 권한이 필요합니다.</p>
            <Button onClick={() => router.push("/")} className="w-full" variant="secondary">
              홈으로 돌아가기
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // admin 체크 완료 후 admin인 경우 정상 렌더링
  if (adminCheckData && adminCheckData.isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header title={title} showBack={showBack} />
        <main className="flex-1 pb-6 max-w-[428px] w-full mx-auto">{children}</main>
        <Footer />
      </div>
    );
  }

  // 기본 로딩 상태 (adminCheckData가 아직 없는 경우)
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title={title} showBack={showBack} />
      <main className="flex-1 pb-6 max-w-[428px] w-full mx-auto px-4 py-8">
        <Card className="p-6 text-center" variant="elevated">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-[#00a651] border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-gray-500 font-medium">권한 확인 중...</p>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

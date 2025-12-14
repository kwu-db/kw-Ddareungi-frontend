"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/atom/Card";
import { Button } from "@/components/atom/Button";
import { FormField } from "@/components/molecule/FormField";
import { useLogin } from "@/hooks/useAuth";
import Link from "next/link";

export default function LoginPageClient() {
  const router = useRouter();
  const loginMutation = useLogin();

  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    loginId?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.loginId.trim()) {
      newErrors.loginId = "이메일을 입력해주세요.";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await loginMutation.mutateAsync({
        loginId: formData.loginId,
        password: formData.password,
      });

      if (response.status === "success" && response.data) {
        // 사용자 정보는 useLogin 훅에서 이미 저장됨
        router.push("/mypage");
      } else {
        throw new Error(response.message || "로그인 실패");
      }
    } catch (error: any) {
      const errorMessage = 
        error?.message || 
        error?.data?.message || 
        (typeof error === 'string' ? error : "알 수 없는 오류");
      alert(`로그인 실패: ${errorMessage}`);
    }
  };

  return (
    <div className="px-5 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">로그인</h2>
          <p className="text-sm text-gray-500">따릉이 서비스에 오신 것을 환영합니다</p>
        </div>

        <Card className="p-6" variant="elevated">
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              label="이메일"
              id="loginId"
              type="email"
              value={formData.loginId}
              onChange={(e) =>
                setFormData({ ...formData, loginId: e.target.value })
              }
              error={errors.loginId}
              required
            />

            <FormField
              label="비밀번호"
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={errors.password}
              required
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={loginMutation.isPending}
              className="mt-6"
            >
              {loginMutation.isPending ? "로그인 중..." : "로그인"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/signup"
              className="text-sm text-[#00a651] font-semibold hover:underline"
            >
              계정이 없으신가요? 회원가입
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}


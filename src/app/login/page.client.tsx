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
        // 사용자 정보 저장 (이메일을 userId로 임시 사용)
        if (typeof window !== "undefined") {
          localStorage.setItem("userEmail", formData.loginId);
          // TODO: 실제 사용자 ID를 응답에서 가져와야 함
          localStorage.setItem("userId", "1"); // 임시 값
        }
        alert("로그인 성공!");
        router.push("/mypage");
      } else {
        throw new Error(response.message || "로그인 실패");
      }
    } catch (error: any) {
      alert(
        "로그인 실패: " + (error?.message || error?.data || "알 수 없는 오류")
      );
    }
  };

  return (
    <div className="px-4 py-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "로그인 중..." : "로그인"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link
            href="/signup"
            className="text-sm text-[#00a651] hover:underline"
          >
            회원가입
          </Link>
        </div>
      </Card>
    </div>
  );
}


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/atom/Card";
import { Button } from "@/components/atom/Button";
import { FormField } from "@/components/molecule/FormField";
import { useCreateUser } from "@/hooks/useUsers";

export default function SignupPageClient() {
  const router = useRouter();
  const createUserMutation = useCreateUser();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 6자 이상이어야 합니다.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
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
      const response = await createUserMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === "success") {
        alert("회원가입이 완료되었습니다. 로그인해주세요.");
        router.push("/login");
      } else {
        throw new Error(response.message || "회원가입 실패");
      }
    } catch (error: any) {
      const errorMessage =
        error?.message ||
        error?.data ||
        error?.response?.data?.message ||
        "알 수 없는 오류";
      alert("회원가입 실패: " + errorMessage);
    }
  };

  return (
    <div className="px-4 py-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="이름"
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            error={errors.name}
            required
          />

          <FormField
            label="이메일"
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
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

          <FormField
            label="비밀번호 확인"
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            error={errors.confirmPassword}
            required
          />

          <Button
            type="submit"
            fullWidth
            disabled={createUserMutation.isPending}
          >
            {createUserMutation.isPending ? "가입 중..." : "회원가입"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link
            href="/login"
            className="text-sm text-[#00a651] hover:underline"
          >
            이미 계정이 있으신가요? 로그인
          </Link>
        </div>
      </Card>
    </div>
  );
}


import fetchApi from "@/configs/api";
import { ToApi } from "@/interfaces/ToApi";
import { AdminRequestDto, AdminResponseDto, UpdateAdminRequest } from "@/interfaces/Admin";

interface AdminCheckResponse {
  isAdmin: boolean;
  email: string;
}

interface UserInfoResponse {
  userId: number;
  email: string;
  role: string;
}

/**
 * 관리자 계정 생성
 */
async function createAdmin(admin: AdminRequestDto): Promise<ToApi<number>> {
  return fetchApi<ToApi<number>>("/admins", {
    method: "POST",
    body: JSON.stringify(admin),
  });
}

/**
 * 관리자 정보 변경
 */
async function updateAdmin(adminId: number, admin: UpdateAdminRequest): Promise<ToApi<AdminResponseDto>> {
  return fetchApi<ToApi<AdminResponseDto>>(`/admins/${adminId}`, {
    method: "PATCH",
    body: JSON.stringify(admin),
  });
}

/**
 * 관리자 계정 여부 확인
 * 내부 API를 직접 호출 (서버 사이드에서만 동작)
 */
async function checkAdmin(email: string): Promise<ToApi<AdminCheckResponse>> {
  // 클라이언트 사이드에서는 내부 API를 직접 호출
  const url = `/api/admin/check?email=${encodeURIComponent(email)}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      status: "error",
      statusCode: response.status,
      message: response.statusText,
    }));
    throw error;
  }

  return response.json();
}

/**
 * 사용자 정보 조회
 * 내부 API를 직접 호출
 */
async function getUserInfo(email: string): Promise<ToApi<UserInfoResponse>> {
  const url = `/api/user/info?email=${encodeURIComponent(email)}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      status: "error",
      statusCode: response.status,
      message: response.statusText,
    }));
    throw error;
  }

  return response.json();
}

const adminService = {
  createAdmin,
  updateAdmin,
  checkAdmin,
  getUserInfo,
};

export default adminService;

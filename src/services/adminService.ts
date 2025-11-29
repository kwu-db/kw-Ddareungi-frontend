import fetchApi from "@/configs/api";
import { ToApi } from "@/interfaces/ToApi";
import {
  AdminRequestDto,
  AdminResponseDto,
  UpdateAdminRequest,
} from "@/interfaces/Admin";

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
async function updateAdmin(
  adminId: number,
  admin: UpdateAdminRequest
): Promise<ToApi<AdminResponseDto>> {
  return fetchApi<ToApi<AdminResponseDto>>(`/admins/${adminId}`, {
    method: "PATCH",
    body: JSON.stringify(admin),
  });
}

const adminService = {
  createAdmin,
  updateAdmin,
};

export default adminService;

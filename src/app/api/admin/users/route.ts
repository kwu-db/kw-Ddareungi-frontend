import { NextRequest, NextResponse } from "next/server";
import adminService from "@/services/admin";

/**
 * 회원 목록 조회 API
 * GET /api/admin/users
 */
export async function GET(request: NextRequest) {
  try {
    const users = await adminService.read();

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "조회 성공",
      data: users,
    });
  } catch (error) {
    console.error("Users list error:", error);
    return NextResponse.json(
      {
        status: "error",
        statusCode: 500,
        message: "서버 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}


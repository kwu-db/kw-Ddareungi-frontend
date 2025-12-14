import { NextRequest, NextResponse } from "next/server";
import adminService from "@/services/admin";

/**
 * 관리자 계정 여부 확인 API
 * GET /api/admin/check?email={email}
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        {
          status: "error",
          statusCode: 400,
          message: "이메일이 필요합니다.",
        },
        { status: 400 }
      );
    }

    const isAdmin = await adminService.authenticate(email);

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "조회 성공",
      data: {
        isAdmin,
        email,
      },
    });
  } catch (error) {
    console.error("Admin check error:", error);
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

import { NextRequest, NextResponse } from "next/server";
import adminService from "@/services/admin";

/**
 * 사용자 정보 조회 API
 * GET /api/user/info?email={email}
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

    const user = await adminService.getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        {
          status: "error",
          statusCode: 404,
          message: "사용자를 찾을 수 없습니다.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "조회 성공",
      data: {
        userId: user.userId,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("User info error:", error);
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


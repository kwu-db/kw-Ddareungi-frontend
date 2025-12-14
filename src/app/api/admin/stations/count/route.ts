import { NextRequest, NextResponse } from "next/server";
import stationService from "@/services/station";

/**
 * 대여소 개수 조회 API
 * GET /api/admin/stations/count
 */
export async function GET(request: NextRequest) {
  try {
    const count = await stationService.count();

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      message: "조회 성공",
      data: {
        count,
      },
    });
  } catch (error) {
    console.error("Stations count error:", error);
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

"use client";

import React, { useState } from "react";
import { Card } from "../atom/Card";
import { Button } from "../atom/Button";
import Link from "next/link";
import { NoticeFormModal } from "./NoticeFormModal";
import { useCreateBoard } from "@/hooks/useBoards";
import { CreateBoard } from "@/interfaces/Board";

interface AdminDashboardProps {
  stats?: {
    totalStations: number;
    totalUsers: number;
    pendingReports: number;
    activeRentals: number;
  };
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats = {
    totalStations: 0,
    totalUsers: 0,
    pendingReports: 0,
    activeRentals: 0,
  },
}) => {
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const createBoardMutation = useCreateBoard();

  const handleNoticeSubmit = async (data: CreateBoard) => {
    try {
      await createBoardMutation.mutateAsync(data);
      alert("공지가 등록되었습니다.");
    } catch (err) {
      alert("공지 등록 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
      throw err;
    }
  };

  return (
    <>
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4">
            <div className="text-sm text-gray-600 mb-1">대여소</div>
            <div className="text-2xl font-bold text-[#00a651]">{stats.totalStations}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-600 mb-1">회원</div>
            <div className="text-2xl font-bold text-[#00a651]">{stats.totalUsers}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-600 mb-1">대기 중인 신고</div>
            <div className="text-2xl font-bold text-red-500">{stats.pendingReports}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-600 mb-1">대여 중</div>
            <div className="text-2xl font-bold text-blue-500">{stats.activeRentals}</div>
          </Card>
        </div>

        <div className="space-y-3">
          <Button fullWidth onClick={() => setIsNoticeModalOpen(true)}>
            공지 작성
          </Button>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/stations">
              <Button fullWidth variant="outline">
                대여소 관리
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button fullWidth variant="outline">
                회원 관리
              </Button>
            </Link>
            <Link href="/admin/stats">
              <Button fullWidth variant="outline">
                통계 대시보드
              </Button>
            </Link>
            <Link href="/reports">
              <Button fullWidth variant="outline">
                신고 관리
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <NoticeFormModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        onSubmit={handleNoticeSubmit}
      />
    </>
  );
};

"use client";

import React, { useState } from "react";
import { Modal } from "../molecule/Modal";
import { Button } from "../atom/Button";
import { usePasses, usePurchasePass } from "@/hooks/usePasses";
import { Card } from "../atom/Card";

interface PassPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PassPurchaseModal: React.FC<PassPurchaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { data: passes, isLoading } = usePasses();
  const purchaseMutation = usePurchasePass();
  const [selectedPassId, setSelectedPassId] = useState<number | null>(null);

  const handlePurchase = async () => {
    if (!selectedPassId) {
      alert("이용권을 선택해주세요.");
      return;
    }

    try {
      await purchaseMutation.mutateAsync(selectedPassId);
      alert("이용권 구매가 완료되었습니다.");
      onClose();
      setSelectedPassId(null);
    } catch (error: any) {
      alert(
        `구매 실패: ${error?.message || error?.data?.message || "알 수 없는 오류"}`
      );
    }
  };

  const getPassTypeLabel = (type: string) => {
    switch (type) {
      case "ONE_DAY":
        return "1일권";
      case "SEVEN_DAY":
        return "7일권";
      case "THIRTY_DAY":
        return "30일권";
      case "ANNUAL":
        return "연간권";
      default:
        return type;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="이용권 구매"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={purchaseMutation.isPending}>
            취소
          </Button>
          <Button
            onClick={handlePurchase}
            disabled={!selectedPassId || purchaseMutation.isPending}
          >
            {purchaseMutation.isPending ? "구매 중..." : "구매하기"}
          </Button>
        </>
      }
    >
      {isLoading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-[#00a651] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500">로딩 중...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {passes && passes.length > 0 ? (
            passes.map((pass) => (
              <Card
                key={pass.passId}
                onClick={() => setSelectedPassId(pass.passId)}
                className={`p-4 cursor-pointer transition-all ${
                  selectedPassId === pass.passId
                    ? "ring-2 ring-[#00a651] bg-[#00a651]/5"
                    : "hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {getPassTypeLabel(pass.passType)}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {pass.passType === "ONE_DAY"
                        ? "24시간 이용 가능"
                        : pass.passType === "SEVEN_DAY"
                        ? "7일간 이용 가능"
                        : pass.passType === "THIRTY_DAY"
                        ? "30일간 이용 가능"
                        : "1년간 이용 가능"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#00a651]">
                      {pass.price.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              이용권이 없습니다.
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};


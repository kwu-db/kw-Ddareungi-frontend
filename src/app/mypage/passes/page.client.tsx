"use client";

import { useState } from "react";
import { PassList } from "@/components/organism/PassList";
import { PassPurchaseModal } from "@/components/organism/PassPurchaseModal";
import { useUserPasses } from "@/hooks/usePasses";

export default function PassesPageClient() {
  const { data: userPasses, isLoading, error } = useUserPasses();
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const handlePassClick = (id: number) => {
    alert(`이용권 상세: ${id}`);
  };

  const handlePurchaseClick = () => {
    setIsPurchaseModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="px-4 py-4">
        <div className="text-center py-12 text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-4">
        <div className="text-center py-12 text-red-500">
          에러: {error?.message || "알 수 없는 오류"}
        </div>
      </div>
    );
  }

  // API 응답 형식에 맞게 변환
  const passList =
    userPasses?.map((pass) => {
      let passType: "ANNUAL" | "1DAY" | "7DAY" | "30DAY";
      if (pass.passType === "ONE_DAY") {
        passType = "1DAY";
      } else if (pass.passType === "SEVEN_DAY") {
        passType = "7DAY";
      } else if (pass.passType === "THIRTY_DAY") {
        passType = "30DAY";
      } else {
        passType = "ANNUAL";
      }

      let status: "ACTIVE" | "EXPIRED" | "CANCELED";
      if (pass.status === "ACTIVATE") {
        status = "ACTIVE";
      } else if (pass.status === "EXPIRED") {
        status = "EXPIRED";
      } else {
        status = "CANCELED";
      }

      return {
        id: pass.userPassId,
        type: passType,
        price: pass.price,
        activatedAt: pass.activatedDate,
        expiredAt: pass.expiredDate,
        status: status,
      };
    }) || [];

  return (
    <>
      <PassList
        passes={passList}
        onPassClick={handlePassClick}
        onPurchaseClick={handlePurchaseClick}
        showPurchaseButton={true}
      />
      <PassPurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
      />
    </>
  );
}


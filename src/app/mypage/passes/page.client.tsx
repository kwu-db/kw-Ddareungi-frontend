"use client";

import { PassList } from "@/components/organism/PassList";
import { useUserPasses, usePurchasePass } from "@/hooks/usePasses";

export default function PassesPageClient() {
  const { data: userPasses, isLoading, error } = useUserPasses();
  const purchaseMutation = usePurchasePass();

  const handlePassClick = (id: number) => {
    alert(`이용권 상세: ${id}`);
  };

  const handlePurchaseClick = () => {
    alert("이용권 구매 기능은 추후 구현 예정입니다.");
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
          에러: {error.message}
        </div>
      </div>
    );
  }

  // API 응답 형식에 맞게 변환
  const passList =
    userPasses?.map((pass) => ({
      id: pass.userPassId,
      type: pass.passType === "ONE_DAY" ? "1DAY" :
            pass.passType === "SEVEN_DAY" ? "7DAY" :
            pass.passType === "THIRTY_DAY" ? "30DAY" : "ANNUAL",
      price: pass.price,
      activatedAt: pass.activatedDate,
      expiredAt: pass.expiredDate,
      status: pass.status === "ACTIVATE" ? "ACTIVE" :
              pass.status === "EXPIRED" ? "EXPIRED" : "CANCELED",
    })) || [];

  return (
    <PassList
      passes={passList}
      onPassClick={handlePassClick}
      onPurchaseClick={handlePurchaseClick}
      showPurchaseButton={true}
    />
  );
}


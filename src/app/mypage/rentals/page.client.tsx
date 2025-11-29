"use client";

import { RentalList } from "@/components/organism/RentalList";
import { useUserRentals } from "@/hooks/useRentals";

interface RentalsPageClientProps {
  userId: number;
}

export default function RentalsPageClient({ userId }: RentalsPageClientProps) {
  const { data: rentals, isLoading, error } = useUserRentals(userId);

  const handleRentalClick = (id: number) => {
    alert(`대여 상세: ${id}`);
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
  const rentalList =
    rentals?.map((rental) => ({
      id: rental.rentalId,
      bikeNum: rental.bikeNum,
      startStation: rental.startStationName,
      endStation: rental.endStationName,
      startTime: rental.startTime,
      endTime: rental.endTime,
    })) || [];

  return <RentalList rentals={rentalList} onRentalClick={handleRentalClick} />;
}

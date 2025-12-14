import fetchApi from "@/configs/api";
import { ToApi } from "@/interfaces/ToApi";
import { RankingListResponseDto, ResponseRentalList } from "@/interfaces/Rental";

/**
 * 대여현황 목록 조회
 */
async function getRentals(): Promise<ToApi<ResponseRentalList>> {
  return fetchApi<ToApi<ResponseRentalList>>(`/rentals`, {
    method: "GET",
  });
}

/**
 * 대여하기
 */
async function rentBike(stationId: number): Promise<ToApi<number>> {
  return fetchApi<ToApi<number>>(`/rentals/stations/${stationId}`, {
    method: "POST",
  });
}

/**
 * 반납하기
 */
async function returnBike(rentalId: number): Promise<ToApi<number>> {
  return fetchApi<ToApi<number>>(`/rentals/${rentalId}`, {
    method: "PATCH",
  });
}

/**
 * 이용시간 랭킹 조회
 */
async function getTimeRankings(limit: number = 10): Promise<ToApi<RankingListResponseDto>> {
  return fetchApi<ToApi<RankingListResponseDto>>(`/rentals/rankings/time?limit=${limit}`, {
    method: "GET",
  });
}

/**
 * 이용횟수 랭킹 조회
 */
async function getCountRankings(limit: number = 10): Promise<ToApi<RankingListResponseDto>> {
  return fetchApi<ToApi<RankingListResponseDto>>(`/rentals/rankings/count?limit=${limit}`, {
    method: "GET",
  });
}

const rentalService = {
  getRentals,
  rentBike,
  returnBike,
  getTimeRankings,
  getCountRankings,
};

export default rentalService;

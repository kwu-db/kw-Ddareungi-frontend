import fetchApi from '@/configs/api';
import { ToApi } from '@/interfaces/ToApi';
import {
  ResponseRentalList,
  RentalResponseDto,
} from '@/interfaces/Rental';

/**
 * 대여현황 목록 조회
 */
async function getRentals(): Promise<ToApi<ResponseRentalList>> {
  return fetchApi<ToApi<ResponseRentalList>>('/rentals', {
    method: 'GET',
  });
}

/**
 * 유저 자전거 대여 내역 조회
 */
async function getUserRentals(
  userId: number
): Promise<ToApi<RentalResponseDto[]>> {
  return fetchApi<ToApi<RentalResponseDto[]>>(`/rentals/users/${userId}`, {
    method: 'GET',
  });
}

/**
 * 대여하기
 */
async function rentBike(stationId: number): Promise<ToApi<number>> {
  return fetchApi<ToApi<number>>(`/rentals/stations/${stationId}`, {
    method: 'POST',
  });
}

/**
 * 반납하기
 */
async function returnBike(rentalId: number): Promise<ToApi<number>> {
  return fetchApi<ToApi<number>>(`/rentals/${rentalId}`, {
    method: 'PATCH',
  });
}

const rentalService = {
  getRentals,
  getUserRentals,
  rentBike,
  returnBike,
};

export default rentalService;


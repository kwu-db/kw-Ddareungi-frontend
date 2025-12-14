import fetchApi from '@/configs/api';
import { ToApi } from '@/interfaces/ToApi';
import {
  ResponseStation,
  PageResponseStation,
  ResponseStationSpecific,
  RequestRegisterStation,
  UpdateStation,
} from '@/interfaces/Station';

/**
 * 대여소 목록 조회 (페이지네이션)
 */
async function getStations(
  search?: string,
  pageable?: { page?: number; size?: number; sort?: string[] }
): Promise<ToApi<PageResponseStation>> {
  const params = new URLSearchParams();
  
  if (search) {
    params.append('search', search);
  }
  
  if (pageable) {
    if (pageable.page !== undefined) {
      params.append('page', pageable.page.toString());
    }
    if (pageable.size !== undefined) {
      params.append('size', pageable.size.toString());
    }
    if (pageable.sort) {
      pageable.sort.forEach((sort) => params.append('sort', sort));
    }
  }
  
  const queryString = params.toString();
  const endpoint = queryString ? `/stations?${queryString}` : '/stations';
  
  return fetchApi<ToApi<PageResponseStation>>(endpoint, {
    method: 'GET',
  });
}

/**
 * 대여소 상세 조회
 */
async function getStation(
  stationId: number
): Promise<ToApi<ResponseStationSpecific>> {
  return fetchApi<ToApi<ResponseStationSpecific>>(`/stations/${stationId}`, {
    method: 'GET',
  });
}

/**
 * 대여소 등록
 */
async function createStation(
  station: RequestRegisterStation
): Promise<ToApi<number>> {
  return fetchApi<ToApi<number>>('/stations', {
    method: 'POST',
    body: JSON.stringify(station),
  });
}

/**
 * 대여소 정보 수정
 */
async function updateStation(
  stationId: number,
  station: UpdateStation
): Promise<ToApi<void>> {
  return fetchApi<ToApi<void>>(`/stations/${stationId}`, {
    method: 'PATCH',
    body: JSON.stringify(station),
  });
}

/**
 * 대여소 삭제
 */
async function deleteStation(stationId: number): Promise<ToApi<void>> {
  return fetchApi<ToApi<void>>(`/stations/${stationId}`, {
    method: 'DELETE',
  });
}

/**
 * 따릉이 데이터 동기화
 */
async function syncStations(): Promise<ToApi<number>> {
  return fetchApi<ToApi<number>>('/stations/sync', {
    method: 'POST',
  });
}

const stationService = {
  getStations,
  getStation,
  createStation,
  updateStation,
  deleteStation,
  syncStations,
};

export default stationService;


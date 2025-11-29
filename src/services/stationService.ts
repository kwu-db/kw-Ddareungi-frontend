import fetchApi from '@/configs/api';
import { ToApi } from '@/interfaces/ToApi';
import {
  ResponseStation,
  ResponseStationList,
  ResponseStationSpecific,
  RequestRegisterStation,
  UpdateStation,
} from '@/interfaces/Station';

/**
 * 대여소 목록 조회
 */
async function getStations(): Promise<ToApi<ResponseStationList>> {
  return fetchApi<ToApi<ResponseStationList>>('/stations', {
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

const stationService = {
  getStations,
  getStation,
  createStation,
  updateStation,
  deleteStation,
};

export default stationService;


import fetchApi from '@/configs/api';
import { ToApi } from '@/interfaces/ToApi';
import {
  ResponsePassList,
  ResponseUserPassList,
} from '@/interfaces/Pass';

/**
 * 이용권 조회
 */
async function getPasses(): Promise<ToApi<ResponsePassList>> {
  return fetchApi<ToApi<ResponsePassList>>('/passes', {
    method: 'GET',
  });
}

/**
 * 내가 구매한 이용권 조회
 */
async function getUserPasses(): Promise<ToApi<ResponseUserPassList>> {
  return fetchApi<ToApi<ResponseUserPassList>>('/passes/users', {
    method: 'GET',
  });
}

/**
 * 이용권 구매하기
 */
async function purchasePass(passId: number): Promise<ToApi<number>> {
  return fetchApi<ToApi<number>>(`/passes/${passId}`, {
    method: 'POST',
  });
}

const passService = {
  getPasses,
  getUserPasses,
  purchasePass,
};

export default passService;


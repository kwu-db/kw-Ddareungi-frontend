import fetchApi from '@/configs/api';
import { ToApi } from '@/interfaces/ToApi';
import { CreateUser, UserResponse } from '@/interfaces/User';

/**
 * 사용자 생성
 */
async function createUser(user: CreateUser): Promise<ToApi<number>> {
  return fetchApi<ToApi<number>>('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });
}

const userService = {
  createUser,
};

export default userService;


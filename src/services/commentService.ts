import fetchApi from '@/configs/api';
import { ToApi } from '@/interfaces/ToApi';
import {
  ResponseCommentList,
  RequestComment,
} from '@/interfaces/Comment';

/**
 * 댓글 목록 조회
 */
async function getComments(
  boardId: number
): Promise<ToApi<ResponseCommentList>> {
  return fetchApi<ToApi<ResponseCommentList>>(`/comments/boards/${boardId}`, {
    method: 'GET',
  });
}

/**
 * 댓글 작성
 */
async function createComment(
  boardId: number,
  comment: RequestComment
): Promise<ToApi<number>> {
  return fetchApi<ToApi<number>>(`/comments/boards/${boardId}`, {
    method: 'POST',
    body: JSON.stringify(comment),
  });
}

const commentService = {
  getComments,
  createComment,
};

export default commentService;


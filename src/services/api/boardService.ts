import fetchApi from "@/configs/api";
import { ToApi } from "@/interfaces/ToApi";
import {
  BoardInfo,
  BoardListInfo,
  CreateBoard,
  UpdateBoard,
  Pageable,
  PageBoardListInfo,
} from "@/interfaces/Board";

/**
 * 게시글 목록 조회
 */
async function getBoards(
  pageable?: Pageable,
  boardType?: string,
  keyword?: string
): Promise<ToApi<PageBoardListInfo>> {
  const params = new URLSearchParams();

  if (pageable) {
    params.append("page", pageable.page.toString());
    params.append("size", pageable.size.toString());
    if (pageable.sort) {
      pageable.sort.forEach((sort) => params.append("sort", sort));
    }
  }

  if (boardType) {
    params.append("boardType", boardType);
  }

  if (keyword) {
    params.append("keyword", keyword);
  }

  const queryString = params.toString();
  const endpoint = queryString ? `/boards?${queryString}` : "/boards";

  return fetchApi<ToApi<PageBoardListInfo>>(endpoint, {
    method: "GET",
  });
}

/**
 * 게시글 단일 조회
 */
async function getBoard(boardId: number): Promise<ToApi<BoardInfo>> {
  return fetchApi<ToApi<BoardInfo>>(`/boards/${boardId}`, {
    method: "GET",
  });
}

/**
 * 게시글 작성
 */
async function createBoard(board: CreateBoard): Promise<ToApi<BoardInfo>> {
  return fetchApi<ToApi<BoardInfo>>("/boards", {
    method: "POST",
    body: JSON.stringify(board),
  });
}

/**
 * 게시글 수정
 */
async function updateBoard(
  boardId: number,
  board: UpdateBoard
): Promise<ToApi<BoardInfo>> {
  return fetchApi<ToApi<BoardInfo>>(`/boards/${boardId}`, {
    method: "PATCH",
    body: JSON.stringify(board),
  });
}

/**
 * 게시글 삭제
 */
async function deleteBoard(boardId: number): Promise<ToApi<void>> {
  return fetchApi<ToApi<void>>(`/boards/${boardId}`, {
    method: "DELETE",
  });
}

const boardService = {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
};

export default boardService;

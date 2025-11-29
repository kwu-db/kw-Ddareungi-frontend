export type BoardType = 'QNA' | 'NOTICE' | 'REPORT';

export interface BoardInfo {
  boardId: number;
  userId: number;
  userName: string;
  boardType: BoardType;
  title: string;
  content: string;
  createdDate: string;
  lastModifiedDate: string;
}

export interface BoardListInfo {
  boardId: number;
  userId: number;
  userName: string;
  boardType: BoardType;
  title: string;
  createdDate: string;
}

export interface CreateBoard {
  boardType: BoardType;
  title: string;
  content: string;
}

export interface UpdateBoard {
  title?: string;
  content?: string;
}

export interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}

export interface PageBoardListInfo {
  content: BoardListInfo[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}


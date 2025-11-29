'use client';

import React from 'react';
import { BoardItem } from '../molecule/BoardItem';
import { Button } from '../atom/Button';

interface Board {
  id: number;
  title: string;
  author: string;
  boardType: 'QNA' | 'NOTICE' | 'REPORT';
  createdAt: string;
  commentCount?: number;
}

interface BoardListProps {
  boards: Board[];
  onBoardClick?: (id: number) => void;
  onCreateClick?: () => void;
}

export const BoardList: React.FC<BoardListProps> = ({
  boards,
  onBoardClick,
  onCreateClick,
}) => {
  return (
    <div className="px-4 py-4">
      {onCreateClick && (
        <div className="mb-4">
          <Button fullWidth onClick={onCreateClick}>
            글쓰기
          </Button>
        </div>
      )}
      
      {boards.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          게시글이 없습니다.
        </div>
      ) : (
        boards.map((board) => (
          <BoardItem
            key={board.id}
            id={board.id}
            title={board.title}
            author={board.author}
            boardType={board.boardType}
            createdAt={board.createdAt}
            commentCount={board.commentCount}
            onClick={() => onBoardClick?.(board.id)}
          />
        ))
      )}
    </div>
  );
};


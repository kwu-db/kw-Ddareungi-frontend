'use client';

import React from 'react';
import { BoardItem } from '../molecule/BoardItem';
import { NoticeItem } from '../molecule/NoticeItem';
import { Button } from '../atom/Button';
import { Card } from '../atom/Card';

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
  // 공지와 문의 분리
  const notices = boards.filter(board => board.boardType === 'NOTICE');
  const qnas = boards.filter(board => board.boardType === 'QNA');

  return (
    <div className="px-5 py-5">
      {onCreateClick && (
        <div className="mb-5">
          <Button fullWidth onClick={onCreateClick} size="lg">
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              글쓰기
            </span>
          </Button>
        </div>
      )}
      
      {boards.length === 0 ? (
        <Card className="p-12 text-center" variant="elevated">
          <div className="text-gray-400 mb-2">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">게시글이 없습니다</p>
        </Card>
      ) : (
        <div className="space-y-0">
          {/* 공지 섹션 - 최상단에 작은 컴포넌트로 표시 */}
          {notices.length > 0 && (
            <div className="mb-4">
              {notices.map((notice) => (
                <NoticeItem
                  key={notice.id}
                  id={notice.id}
                  title={notice.title}
                  createdAt={notice.createdAt}
                  onClick={() => onBoardClick?.(notice.id)}
                />
              ))}
            </div>
          )}
          
          {/* 문의 섹션 - 공지 아래에 표시 */}
          {qnas.length > 0 && (
            <div>
              {qnas.map((board) => (
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
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};


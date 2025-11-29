'use client';

import React from 'react';
import { Card } from '../atom/Card';
import { Badge } from '../atom/Badge';
import { CommentList } from './CommentList';
import { Button } from '../atom/Button';
import { FormField } from '../molecule/FormField';

interface BoardDetailProps {
  board: {
    id: number;
    title: string;
    content: string;
    author: string;
    boardType: 'QNA' | 'NOTICE' | 'REPORT';
    createdAt: string;
    modifiedAt?: string;
  };
  comments: Array<{
    id: number;
    author: string;
    content: string;
    createdAt: string;
    isAuthor?: boolean;
  }>;
  isAuthor?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onCommentSubmit?: (content: string) => void;
  onCommentDelete?: (id: number) => void;
}

export const BoardDetail: React.FC<BoardDetailProps> = ({
  board,
  comments,
  isAuthor,
  onEdit,
  onDelete,
  onCommentSubmit,
  onCommentDelete,
}) => {
  const typeLabels = {
    QNA: '문의',
    NOTICE: '공지',
    REPORT: '신고',
  };
  
  const typeVariants = {
    QNA: 'info' as const,
    NOTICE: 'warning' as const,
    REPORT: 'danger' as const,
  };
  
  const [commentContent, setCommentContent] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim() && onCommentSubmit) {
      onCommentSubmit(commentContent);
      setCommentContent('');
    }
  };
  
  return (
    <div className="px-4 py-4">
      <Card className="p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant={typeVariants[board.boardType]}>
            {typeLabels[board.boardType]}
          </Badge>
          <span className="text-sm text-gray-500">{board.createdAt}</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">{board.title}</h1>
        
        <div className="flex items-center justify-between mb-4 pb-4 border-b">
          <span className="text-gray-600">{board.author}</span>
          {isAuthor && (
            <div className="flex gap-2">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="text-sm text-[#00a651] hover:underline"
                >
                  수정
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="text-sm text-red-500 hover:underline"
                >
                  삭제
                </button>
              )}
            </div>
          )}
        </div>
        
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-gray-700">{board.content}</p>
        </div>
      </Card>
      
      <CommentList
        comments={comments}
        onDelete={onCommentDelete}
      />
      
      <Card className="p-4 mt-4">
        <form onSubmit={handleSubmit}>
          <FormField
            label="댓글 작성"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="댓글을 입력하세요"
            required
          />
          <Button type="submit" fullWidth>
            댓글 등록
          </Button>
        </form>
      </Card>
    </div>
  );
};


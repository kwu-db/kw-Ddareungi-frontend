import React from 'react';
import { Avatar } from '../atom/Avatar';
import { Card } from '../atom/Card';

interface CommentItemProps {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  isAuthor?: boolean;
  onDelete?: () => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  author,
  content,
  createdAt,
  isAuthor = false,
  onDelete,
}) => {
  return (
    <Card className="p-3 mb-2">
      <div className="flex gap-3">
        <Avatar name={author} size="sm" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{author}</span>
              {isAuthor && (
                <span className="text-xs text-[#00a651]">작성자</span>
              )}
            </div>
            <span className="text-xs text-gray-500">{createdAt}</span>
          </div>
          <p className="text-sm text-gray-700 mb-2">{content}</p>
          {isAuthor && onDelete && (
            <button
              onClick={onDelete}
              className="text-xs text-red-500 hover:text-red-700"
            >
              삭제
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};


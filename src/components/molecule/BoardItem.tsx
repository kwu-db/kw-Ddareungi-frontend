import React from 'react';
import { Card } from '../atom/Card';
import { Badge } from '../atom/Badge';

interface BoardItemProps {
  id: number;
  title: string;
  author: string;
  boardType: 'QNA' | 'NOTICE' | 'REPORT';
  createdAt: string;
  commentCount?: number;
  onClick?: () => void;
}

export const BoardItem: React.FC<BoardItemProps> = ({
  title,
  author,
  boardType,
  createdAt,
  commentCount = 0,
  onClick,
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
  
  return (
    <Card onClick={onClick} className="p-4 mb-2">
      <div className="flex items-start justify-between mb-2">
        <Badge variant={typeVariants[boardType]} className="mr-2">
          {typeLabels[boardType]}
        </Badge>
        <span className="text-xs text-gray-500">{createdAt}</span>
      </div>
      <h3 className="font-semibold text-base mb-2 line-clamp-2">{title}</h3>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{author}</span>
        {commentCount > 0 && (
          <span className="text-[#00a651]">댓글 {commentCount}</span>
        )}
      </div>
    </Card>
  );
};


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
    <Card onClick={onClick} className="p-4 mb-3" variant="elevated">
      <div className="flex items-start justify-between mb-3">
        <Badge variant={typeVariants[boardType]} className="mr-2">
          {typeLabels[boardType]}
        </Badge>
        <span className="text-xs text-gray-400 font-medium">{createdAt}</span>
      </div>
      <h3 className="font-bold text-base mb-3 line-clamp-2 text-gray-900 leading-snug">{title}</h3>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 font-medium">{author}</span>
        {commentCount > 0 && (
          <span className="text-[#00a651] font-semibold flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {commentCount}
          </span>
        )}
      </div>
    </Card>
  );
};


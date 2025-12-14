import React from 'react';
import { Card } from '../atom/Card';
import { Badge } from '../atom/Badge';

interface NoticeItemProps {
  id: number;
  title: string;
  createdAt: string;
  onClick?: () => void;
}

export const NoticeItem: React.FC<NoticeItemProps> = ({
  title,
  createdAt,
  onClick,
}) => {
  return (
    <Card onClick={onClick} className="p-3 mb-2 cursor-pointer hover:bg-gray-50 transition-colors" variant="elevated">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Badge variant="warning" className="shrink-0">
            공지
          </Badge>
          <span className="text-sm font-semibold text-gray-900 truncate">{title}</span>
        </div>
        <span className="text-xs text-gray-400 font-medium shrink-0">{createdAt}</span>
      </div>
    </Card>
  );
};


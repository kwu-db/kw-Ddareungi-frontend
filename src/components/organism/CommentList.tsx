'use client';

import React from 'react';
import { CommentItem } from '../molecule/CommentItem';

interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  isAuthor?: boolean;
}

interface CommentListProps {
  comments: Comment[];
  onDelete?: (id: number) => void;
}

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  onDelete,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 px-4">
        댓글 {comments.length}
      </h3>
      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500 px-4">
          댓글이 없습니다.
        </div>
      ) : (
        <div className="px-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              id={comment.id}
              author={comment.author}
              content={comment.content}
              createdAt={comment.createdAt}
              isAuthor={comment.isAuthor}
              onDelete={comment.isAuthor ? () => onDelete?.(comment.id) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};


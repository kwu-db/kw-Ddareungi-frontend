import React from 'react';
import { Card } from '../atom/Card';
import { Avatar } from '../atom/Avatar';
import { Badge } from '../atom/Badge';

interface UserCardProps {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  onClick?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  role,
  onClick,
}) => {
  return (
    <Card onClick={onClick} className="p-4 mb-3">
      <div className="flex items-center gap-3">
        <Avatar name={name} size="md" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">{name}</h3>
            {role === 'ADMIN' && (
              <Badge variant="danger">관리자</Badge>
            )}
          </div>
          <p className="text-sm text-gray-600">{email}</p>
        </div>
      </div>
    </Card>
  );
};


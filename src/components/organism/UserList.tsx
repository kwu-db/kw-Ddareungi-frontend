'use client';

import React from 'react';
import { UserCard } from '../molecule/UserCard';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

interface UserListProps {
  users: User[];
  onUserClick?: (id: number) => void;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  onUserClick,
}) => {
  return (
    <div className="px-4 py-4">
      {users.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          회원이 없습니다.
        </div>
      ) : (
        users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            role={user.role}
            onClick={() => onUserClick?.(user.id)}
          />
        ))
      )}
    </div>
  );
};


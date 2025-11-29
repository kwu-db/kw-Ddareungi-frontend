import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title = '따릉이',
  showBack = false,
  rightAction,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 max-w-[428px] mx-auto">
        <div className="flex items-center gap-3">
          {showBack && (
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
          )}
          <Link href="/" className="text-xl font-bold text-[#00a651]">
            {title}
          </Link>
        </div>
        {rightAction && <div>{rightAction}</div>}
      </div>
    </header>
  );
};


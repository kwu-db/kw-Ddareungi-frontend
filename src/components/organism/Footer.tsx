import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-[428px] mx-auto px-4 py-6">
        <div className="text-center text-sm text-gray-600">
          <p className="mb-2">서울시 따릉이 통합 관리 시스템</p>
          <p className="text-xs text-gray-500">
            © 2025 따릉이. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};


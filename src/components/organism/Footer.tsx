import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/60 border-t border-gray-200/60 mt-auto">
      <div className="max-w-[428px] mx-auto px-5 py-5">
        <div className="text-center">
          <p className="text-sm text-gray-600 font-medium mb-1.5">서울시 따릉이 통합 관리 시스템</p>
          <p className="text-xs text-gray-400">
            © 2025 따릉이. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};


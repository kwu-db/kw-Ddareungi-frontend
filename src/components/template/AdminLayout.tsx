import React from 'react';
import { Header } from '../organism/Header';
import { Footer } from '../organism/Footer';
import Link from 'next/link';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title = '관리자',
  showBack,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title={title} showBack={showBack} />
      <main className="flex-1 pb-6 max-w-[428px] w-full mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};


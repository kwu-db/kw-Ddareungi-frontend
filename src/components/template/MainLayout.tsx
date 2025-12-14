import React from 'react';
import { Header } from '../organism/Header';
import { Footer } from '../organism/Footer';
import { Navigation } from '../organism/Navigation';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  showBack,
  rightAction,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header title={title} showBack={showBack} rightAction={rightAction} />
      <main className="flex-1 pb-24 max-w-[428px] w-full mx-auto">
        {children}
      </main>
      <Navigation />
      <Footer />
    </div>
  );
};


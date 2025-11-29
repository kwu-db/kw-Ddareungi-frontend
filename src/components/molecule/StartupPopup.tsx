"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/atom/Logo";

interface StartupPopupProps {
  onClose: () => void;
}

export const StartupPopup: React.FC<StartupPopupProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 2초 후 자동으로 사라지기
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 500); // 페이드 아웃 시간
    }, 2000); // 2초 표시

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-[#00a651] to-[#008a43] flex items-center justify-center z-50 transition-opacity duration-500 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6 animate-bounce">
          <Logo size="lg" className="justify-center" showText={false} />
        </div>
        <div className="text-white text-center">
          <p className="text-3xl font-bold mb-2">따릉이</p>
          <p className="text-base opacity-90">서울시 공공자전거</p>
        </div>
      </div>
    </div>
  );
};


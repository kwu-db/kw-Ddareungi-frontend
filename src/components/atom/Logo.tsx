import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
  textColor?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  className = "",
  showText = true,
  textColor = "text-[#00a651]",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full bg-white flex items-center justify-center shadow-xl`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00a651"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-2/3 h-2/3"
        >
          {/* 자전거 아이콘 */}
          <path d="M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          <path d="M19 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          <path d="M12 19h-2a4 4 0 0 1-4-4V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
          <path d="M12 19h2a4 4 0 0 0 4-4v-5a2 2 0 0 0-2-2h-4" />
          <path d="M8 11h8" />
        </svg>
      </div>
      {showText && (
        <span className={`ml-3 ${textSizes[size]} font-bold ${textColor}`}>
          따릉이
        </span>
      )}
    </div>
  );
};


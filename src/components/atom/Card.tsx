import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = "", 
  onClick,
  variant = 'default'
}) => {
  const variantStyles = {
    default: 'bg-white border border-gray-200/60 shadow-sm',
    elevated: 'bg-white border-0 shadow-md',
    outlined: 'bg-white border-2 border-gray-200 shadow-none',
  };

  return (
    <div
      className={`rounded-xl ${variantStyles[variant]} ${
        onClick ? "cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200" : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

'use client';

import React from 'react';
import { PassCard } from '../molecule/PassCard';
import { Button } from '../atom/Button';

interface Pass {
  id: number;
  type: '1DAY' | '7DAY' | '30DAY' | 'ANNUAL';
  price: number;
  activatedAt?: string;
  expiredAt?: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELED';
}

interface PassListProps {
  passes: Pass[];
  onPassClick?: (id: number) => void;
  onPurchaseClick?: () => void;
  showPurchaseButton?: boolean;
}

export const PassList: React.FC<PassListProps> = ({
  passes,
  onPassClick,
  onPurchaseClick,
  showPurchaseButton = true,
}) => {
  return (
    <div className="px-4 py-4">
      {showPurchaseButton && onPurchaseClick && (
        <div className="mb-4">
          <Button fullWidth onClick={onPurchaseClick}>
            이용권 구매
          </Button>
        </div>
      )}
      
      {passes.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          보유한 이용권이 없습니다.
        </div>
      ) : (
        passes.map((pass) => (
          <PassCard
            key={pass.id}
            type={pass.type}
            price={pass.price}
            activatedAt={pass.activatedAt}
            expiredAt={pass.expiredAt}
            status={pass.status}
            onClick={() => onPassClick?.(pass.id)}
          />
        ))
      )}
    </div>
  );
};


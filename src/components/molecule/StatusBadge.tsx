import React from 'react';
import { Badge } from '../atom/Badge';

interface StatusBadgeProps {
  status: string;
  type?: 'report' | 'pass' | 'rental';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = 'report',
}) => {
  const getStatusConfig = () => {
    if (type === 'report') {
      const configs: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'danger' | 'info' }> = {
        PENDING: { label: '대기 중', variant: 'warning' },
        IN_PROGRESS: { label: '처리 중', variant: 'info' },
        RESOLVED: { label: '처리 완료', variant: 'success' },
      };
      return configs[status] || { label: status, variant: 'default' };
    }
    
    if (type === 'pass') {
      const configs: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'danger' | 'info' }> = {
        ACTIVE: { label: '사용 가능', variant: 'success' },
        EXPIRED: { label: '만료됨', variant: 'default' },
        CANCELED: { label: '취소됨', variant: 'danger' },
      };
      return configs[status] || { label: status, variant: 'default' };
    }
    
    return { label: status, variant: 'default' };
  };
  
  const { label, variant } = getStatusConfig();
  
  return <Badge variant={variant}>{label}</Badge>;
};


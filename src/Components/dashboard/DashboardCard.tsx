// src/Components/dashboard/DashboardCard.tsx
import type { ReactNode } from 'react';
import { Card, type SxProps, type Theme } from '@mui/material';

interface DashboardCardProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

const DashboardCard = ({ children, sx }: DashboardCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 4,
        boxShadow: '0 14px 36px rgba(15, 23, 42, 0.07)',
        transition: 'transform 180ms ease, box-shadow 180ms ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 18px 44px rgba(15, 23, 42, 0.11)',
        },
        ...sx,
      }}
    >
      {children}
    </Card>
  );
};

export default DashboardCard;

// src/Components/dashboard/DashboardSection.tsx
import type { ReactNode } from 'react';
import { Box, Button, CardContent, Stack, Typography } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DashboardCard from './DashboardCard';

interface DashboardSectionProps {
  title: string;
  children: ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
}

const DashboardSection = ({ title, children, buttonText, onButtonClick }: DashboardSectionProps) => {
  return (
    <DashboardCard>
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ mb: 2.5 }}>
          {title}
        </Typography>
        <Box sx={{ flex: 1 }}>{children}</Box>
        {buttonText ? (
          <Button
            fullWidth
            variant="text"
            endIcon={<ArrowForwardRoundedIcon />}
            onClick={onButtonClick}
            sx={{ mt: 2.5, justifyContent: 'space-between', px: 0 }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <span>{buttonText}</span>
            </Stack>
          </Button>
        ) : null}
      </CardContent>
    </DashboardCard>
  );
};

export default DashboardSection;

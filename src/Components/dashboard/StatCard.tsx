import type { ReactNode } from 'react';
import { Box, CardContent, Stack, Typography, alpha, useTheme } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import DashboardCard from './DashboardCard';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  growth: number;
  subtitle: string;
}

const StatCard = ({ title, value, icon, growth, subtitle }: StatCardProps) => {
  const theme = useTheme();

  return (
    <DashboardCard>
      <CardContent sx={{ p: 3 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ mt: 1.2, letterSpacing: 0 }}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              display: 'grid',
              placeItems: 'center',
              color: 'primary.main',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              '& svg': { fontSize: 26 },
            }}
          >
            {icon}
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 2, alignItems: 'center' }}>
          <Stack
            direction="row"
            spacing={0.4}
            sx={{
              px: 1,
              py: 0.35,
              borderRadius: 999,
              color: 'success.main',
              bgcolor: alpha(theme.palette.success.main, 0.1),
              alignItems: 'center',
            }}
          >
            <TrendingUpRoundedIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 800 }}>
              {growth}%
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" noWrap>
            {subtitle}
          </Typography>
        </Stack>
      </CardContent>
    </DashboardCard>
  );
};

export default StatCard;

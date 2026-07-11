// src/Components/dashboard/ListCard.tsx
import { Avatar, Box, Chip, Divider, Stack, Typography, alpha, useTheme } from '@mui/material';
import DashboardSection from './DashboardSection';
import EmptyState from './EmptyState';
import type { CoachingCenter, DashboardStatus } from '../../types/dashboard';

interface ListCardProps {
  title: string;
  items: CoachingCenter[];
  buttonText: string;
  onButtonClick?: () => void;
}

const STATUS_LABELS: Record<DashboardStatus, string> = {
  active: 'Active',
  completed: 'Completed',
  upcoming: 'Upcoming',
  cancelled: 'Cancelled',
};

const ListCard = ({ title, items, buttonText, onButtonClick }: ListCardProps) => {
  const theme = useTheme();

  return (
    <DashboardSection title={title} buttonText={buttonText} onButtonClick={onButtonClick}>
      {items.length === 0 ? (
        <EmptyState title="No coaching centers" description="Assigned centers will appear here." />
      ) : (
        <Stack divider={<Divider flexItem />} spacing={2}>
          {items.map((item) => (
            <Stack key={item.id} direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 44,
                  height: 44,
                  fontSize: 14,
                  fontWeight: 800,
                  color: 'primary.main',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                }}
              >
                {item.avatarText}
              </Avatar>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="subtitle2" noWrap>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {item.subtitle}
                </Typography>
              </Box>
              <Chip color="success" size="small" label={STATUS_LABELS[item.status]} />
            </Stack>
          ))}
        </Stack>
      )}
    </DashboardSection>
  );
};

export default ListCard;

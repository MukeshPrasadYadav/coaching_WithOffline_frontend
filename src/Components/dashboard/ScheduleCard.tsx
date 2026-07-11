import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import DashboardSection from './DashboardSection';
import EmptyState from './EmptyState';
import type { TodayScheduleItem } from '../../types/dashboard';

interface ScheduleCardProps {
  title: string;
  schedule: TodayScheduleItem[];
  buttonText: string;
  onButtonClick?: () => void;
}

const STATUS_META: Record<TodayScheduleItem['status'], { label: string; color: 'default' | 'success' | 'primary' | 'error' }> = {
  completed: { label: 'Completed', color: 'success' },
  upcoming: { label: 'Upcoming', color: 'primary' },
  cancelled: { label: 'Cancelled', color: 'error' },
};

const ScheduleCard = ({ title, schedule, buttonText, onButtonClick }: ScheduleCardProps) => {
  return (
    <DashboardSection title={title} buttonText={buttonText} onButtonClick={onButtonClick}>
      {schedule.length === 0 ? (
        <EmptyState title="No classes today" description="Today's schedule will appear here." />
      ) : (
        <Stack divider={<Divider flexItem />} spacing={2}>
          {schedule.map((item) => {
            const status = STATUS_META[item.status];

            return (
              <Stack key={item.id} direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                <Box
                  sx={{
                    minWidth: 74,
                    py: 0.75,
                    px: 1,
                    borderRadius: 2,
                    bgcolor: 'action.hover',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 800 }}>
                    {item.time}
                  </Typography>
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Typography variant="subtitle2" noWrap>
                      {item.className}
                    </Typography>
                    <Chip size="small" color={status.color} label={status.label} />
                  </Stack>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {item.coaching}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.room}
                  </Typography>
                </Box>
              </Stack>
            );
          })}
        </Stack>
      )}
    </DashboardSection>
  );
};

export default ScheduleCard;

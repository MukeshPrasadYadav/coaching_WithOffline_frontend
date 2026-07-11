// src/Components/dashboard/UpcomingClassesCard.tsx
import { Box, Divider, Stack, Typography } from '@mui/material';
import DashboardSection from './DashboardSection';
import EmptyState from './EmptyState';
import type { UpcomingClass } from '../../types/dashboard';

interface UpcomingClassesCardProps {
  title: string;
  classes: UpcomingClass[];
  buttonText: string;
  onButtonClick?: () => void;
}

const UpcomingClassesCard = ({ title, classes, buttonText, onButtonClick }: UpcomingClassesCardProps) => {
  return (
    <DashboardSection title={title} buttonText={buttonText} onButtonClick={onButtonClick}>
      {classes.length === 0 ? (
        <EmptyState title="No upcoming classes" description="Future classes will appear here." />
      ) : (
        <Stack divider={<Divider flexItem />} spacing={2}>
          {classes.map((item) => (
            <Stack key={item.id} direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  width: 52,
                  height: 58,
                  borderRadius: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.main',
                  bgcolor: 'action.selected',
                  flexShrink: 0,
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 800, lineHeight: 1 }}>
                  {item.date.month}
                </Typography>
                <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
                  {item.date.day}
                </Typography>
              </Box>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="subtitle2" noWrap>
                  {item.subject}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {item.coaching}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.room} • {item.time}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      )}
    </DashboardSection>
  );
};

export default UpcomingClassesCard;

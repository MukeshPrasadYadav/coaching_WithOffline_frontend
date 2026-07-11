// src/Components/dashboard/AnnouncementCard.tsx
import { Avatar, Box, Divider, Stack, Typography, alpha, useTheme } from '@mui/material';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import DashboardSection from './DashboardSection';
import EmptyState from './EmptyState';
import type { Announcement } from '../../types/dashboard';

interface AnnouncementCardProps {
  title: string;
  announcements: Announcement[];
  buttonText: string;
  onButtonClick?: () => void;
}

const AnnouncementCard = ({ title, announcements, buttonText, onButtonClick }: AnnouncementCardProps) => {
  const theme = useTheme();

  return (
    <DashboardSection title={title} buttonText={buttonText} onButtonClick={onButtonClick}>
      {announcements.length === 0 ? (
        <EmptyState title="No announcements" description="New notices from coaching centers will appear here." />
      ) : (
        <Stack divider={<Divider flexItem />} spacing={2}>
          {announcements.map((announcement) => (
            <Stack key={announcement.id} direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  color: 'primary.main',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                }}
              >
                <CampaignOutlinedIcon />
              </Avatar>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="subtitle2" noWrap>
                  {announcement.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.35 }}>
                  {announcement.description}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.75 }}>
                  {announcement.time}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      )}
    </DashboardSection>
  );
};

export default AnnouncementCard;

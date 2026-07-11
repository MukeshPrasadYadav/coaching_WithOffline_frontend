// src/Components/dashboard/DashboardHeader.tsx
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import type { TeacherDashboardTeacher } from '../../types/dashboard';

interface DashboardHeaderProps {
  teacher: TeacherDashboardTeacher;
}

const DashboardHeader = ({ teacher }: DashboardHeaderProps) => {
  const theme = useTheme();
  const initials = teacher.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 700 }}>
          Welcome Back,
        </Typography>
        <Typography variant="h4" sx={{ mt: 0.5, letterSpacing: 0 }}>
          {teacher.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Here's what's happening with your teaching today.
        </Typography>
      </Box>
      <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
        <Tooltip title="Notifications">
          <IconButton
            aria-label="Notifications"
            sx={{
              width: 44,
              height: 44,
              bgcolor: 'background.paper',
              boxShadow: '0 10px 24px rgba(15, 23, 42, 0.06)',
            }}
          >
            <Badge color="error" variant="dot">
              <NotificationsNoneOutlinedIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Calendar">
          <IconButton
            aria-label="Calendar"
            sx={{
              width: 44,
              height: 44,
              bgcolor: 'background.paper',
              boxShadow: '0 10px 24px rgba(15, 23, 42, 0.06)',
            }}
          >
            <CalendarMonthOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Avatar
          src={teacher.avatarUrl}
          alt={teacher.name}
          sx={{
            width: 48,
            height: 48,
            fontWeight: 800,
            color: 'primary.main',
            bgcolor: alpha(theme.palette.primary.main, 0.12),
          }}
        >
          {initials}
        </Avatar>
      </Stack>
    </Stack>
  );
};

export default DashboardHeader;

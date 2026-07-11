// src/pages/teacher/Dashboard.tsx
import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import AnnouncementCard from '../../Components/dashboard/AnnouncementCard';
import DashboardHeader from '../../Components/dashboard/DashboardHeader';
import DegreeCard from '../../Components/dashboard/DegreeCard';
import ListCard from '../../Components/dashboard/ListCard';
import ScheduleCard from '../../Components/dashboard/ScheduleCard';
import StatsCards from '../../Components/dashboard/StatsCards';
import SubjectCard from '../../Components/dashboard/SubjectCard';
import UpcomingClassesCard from '../../Components/dashboard/UpcomingClassesCard';
import { useTeacherDashboard } from '../../hooks/teacher/useTeacherDashboard';

const DASHBOARD_ACTIONS = {
  viewCoachings: 'View All Coaching Centers',
  viewSchedule: 'View Full Schedule',
  addDegree: 'Add Degree',
  viewClasses: 'View All Classes',
  viewAnnouncements: 'View All',
};

const Dashboard = () => {
  const { data, isLoading, isError } = useTeacherDashboard();
  const handleCardAction = () => undefined;

  if (isLoading) {
    return (
      <Box sx={{ minHeight: 360, display: 'grid', placeItems: 'center' }}>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <CircularProgress />
          <Typography color="text.secondary">Loading dashboard...</Typography>
        </Stack>
      </Box>
    );
  }

  if (isError || !data) {
    return <Alert severity="error">Unable to load the teacher dashboard.</Alert>;
  }

  return (
    <Box
      sx={{
        minHeight: '100%',
        bgcolor: 'background.default',
      }}
    >
      <Stack spacing={3.5}>
        <DashboardHeader teacher={data.teacher} />
        <StatsCards statistics={data.statistics} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 4 }}>
            <ListCard
              title="My Coaching Centers"
              items={data.coachings}
              buttonText={DASHBOARD_ACTIONS.viewCoachings}
              onButtonClick={handleCardAction}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <ScheduleCard
              title="Today's Schedule"
              schedule={data.todaySchedule}
              buttonText={DASHBOARD_ACTIONS.viewSchedule}
              onButtonClick={handleCardAction}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <SubjectCard title="Subjects Teaching" subjects={data.subjects} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 4 }}>
            <DegreeCard
              title="My Degrees"
              degrees={data.degrees}
              buttonText={DASHBOARD_ACTIONS.addDegree}
              onButtonClick={handleCardAction}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <UpcomingClassesCard
              title="Upcoming Classes"
              classes={data.upcomingClasses}
              buttonText={DASHBOARD_ACTIONS.viewClasses}
              onButtonClick={handleCardAction}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <AnnouncementCard
              title="Recent Announcements"
              announcements={data.announcements}
              buttonText={DASHBOARD_ACTIONS.viewAnnouncements}
              onButtonClick={handleCardAction}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default Dashboard;

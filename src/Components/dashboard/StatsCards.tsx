import type { ReactNode } from 'react';
import Grid from '@mui/material/Grid';
import {
  AccountBalanceWalletOutlined,
  AutoStoriesOutlined,
  GroupsOutlined,
  SchoolOutlined,
} from '@mui/icons-material';
import StatCard from './StatCard';
import type { StatisticIconKey, TeacherDashboardStatistic } from '../../types/dashboard';

interface StatsCardsProps {
  statistics: TeacherDashboardStatistic[];
}

const STATISTIC_ICONS: Record<StatisticIconKey, ReactNode> = {
  classes: <SchoolOutlined />,
  students: <GroupsOutlined />,
  subjects: <AutoStoriesOutlined />,
  earnings: <AccountBalanceWalletOutlined />,
};

const StatsCards = ({ statistics }: StatsCardsProps) => {
  return (
    <Grid container spacing={3}>
      {statistics.map((statistic) => (
        <Grid key={statistic.id} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title={statistic.title}
            value={statistic.value}
            icon={STATISTIC_ICONS[statistic.iconKey]}
            growth={statistic.growth}
            subtitle={statistic.subtitle}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;

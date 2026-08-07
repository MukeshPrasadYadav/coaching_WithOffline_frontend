// src/Components/ui/BatchInfoCard.tsx
// src/Components/ui/BatchInfo.tsx
import {
  AccessTimeOutlined,
  CalendarMonthOutlined,
  GroupsOutlined,
  LocationOnOutlined,
  MenuBookOutlined,
  SchoolOutlined,
  PaymentsOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import InfoRow from "./InfoRow";

interface BatchInfoCardProps {
  teacher: string;
  coaching: string;
  subject: string;
  room: string;
  students: number;
  startDate: string;
  endDate: string;
  schedule: string;
  timing: string;
  fees: string;
}

const BatchInfoCard = ({
  teacher,
  coaching,
  subject,
  room,
  students,
  startDate,
  endDate,
  schedule,
  timing,
  fees,
}: BatchInfoCardProps) => {
  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <InfoRow
              icon={<PersonOutlineOutlined />}
              label="Teacher"
              value={teacher}
              color="#B569D6"
              bgColor="#F5EDFA"
            />

            <Divider />

            <InfoRow
              icon={<SchoolOutlined />}
              label="Coaching"
              value={coaching}
              color="#69B2F0"
              bgColor="#E6F2FD"
            />

            <Divider />

            <InfoRow
              icon={<MenuBookOutlined />}
              label="Subject"
              value={subject}
              color="#6BC88E"
              bgColor="#F3F9F3"
            />

            <Divider />

            <InfoRow
              icon={<LocationOnOutlined />}
              label="Room"
              value={room}
              color="#F39452"
              bgColor="#FEF5EB"
            />

            <Divider />

            <InfoRow
              icon={<GroupsOutlined />}
              label="Students"
              value={students}
              color="#6879E6"
              bgColor="#ECF2FE"
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <InfoRow
              icon={<CalendarMonthOutlined />}
              label="Start Date"
              value={startDate}
              color="#60BF82"
              bgColor="#E8FCEF"
            />

            <Divider />

            <InfoRow
              icon={<CalendarMonthOutlined />}
              label="End Date"
              value={endDate}
              color="#ED6979"
              bgColor="#FDE4E8"
            />

            <Divider />

            <InfoRow
              icon={<CalendarMonthOutlined />}
              label="Schedule"
              value={schedule}
              color="#F4B549"
              bgColor="#FEF6DD"
            />

            <Divider />

            <InfoRow
              icon={<AccessTimeOutlined />}
              label="Timing"
              value={timing}
              color="#AC5EC9"
              bgColor="#F8F2FB"
            />

            <Divider />

            <InfoRow
              icon={<PaymentsOutlined />}
              label="Fees"
              value={fees}
              color="#59BF7B"
              bgColor="#E7F8EC"
            />
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default BatchInfoCard;
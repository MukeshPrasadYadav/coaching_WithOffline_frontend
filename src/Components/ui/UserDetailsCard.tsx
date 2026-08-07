// src/Components/ui/UserDetailsCard.tsx
import { CalendarViewDayOutlined, EmailOutlined, PhoneOutlined, PlaceOutlined } from '@mui/icons-material'
import { Avatar, Box, Card, Grid, Icon, Stack, Typography } from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import React from 'react'

const UserDetailsCard = ({student}) => {
    
  return (
    <Card sx={{ mt: 4, mb: 4, p: 3 }}>
  <Grid container spacing={3} alignItems="center">
  <Grid size={{ xs: 12, sm: 3, md: 2 }}>
    <Avatar
  src={student?.profile_picture || ""}
  sx={{
    width: 120,
    height: 120,
    borderRadius: "50%",
    border: "4px solid #fff",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
    transform: "translateY(-8px)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-12px)",
      boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
    },
  }}
/>
  </Grid>

    {/* Details */}
    <Grid size={{ xs: 12, sm: 9, md: 10 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        {student?.name}
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <EmailOutlined fontSize="small" />
            <Typography>{student?.email}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <PhoneOutlined fontSize="small" />
            <Typography>{student?.contactNumber}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <PlaceOutlined fontSize="small" />
            <Typography>{student?.address}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarMonthOutlinedIcon fontSize="small" />
            <Typography>{student?.dob}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <EmailOutlined fontSize="small" />
            <Typography>{student?.parentEmail}</Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <PhoneOutlined fontSize="small" />
            <Typography>{student?.parentPhone}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
</Card>
  )
}

export default UserDetailsCard
// src/Components/ui/UserDetailsCard.tsx
import { Avatar, Box, Card, Grid, Stack, Typography } from '@mui/material'
import React from 'react'

const UserDetailsCard = () => {
    
  return (
    <Card sx={{ mt: 4, mb: 4 }}>
        <Stack direction="row" spacing={2} sx={{ p: 2, alignItems: "center" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Avatar  />
                </Grid>
            </Grid>

        </Stack>
    </Card>
  )
}

export default UserDetailsCard
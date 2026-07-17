// src/coaching/pages/Setting.tsx
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import CoachingInformationCard from "../components/CoachingInformationCard";
import AddressCard from "../components/AddressCard";

import { useAuthStore } from "../../store/auth.store";
import {
  useAddCoaching,
  useGetCoaching,
  useUpdateCoachingAddress,
  useUpdateCoachingInfo,
} from "../../hooks/coaching.hooks";
import { useCoachingStore } from "../../store/coaching.store";
import PersonalInfoCardForm from "../components/PersonalnfoCardForm";

const CompleteCoachingProfile = () => {
    const [editingGeneral, setEditingGeneral] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false)

  const user = useAuthStore((state) => state.user);
  console.log("user",user)
    const coachingId = "";
    const {
    data: coaching,
    isLoading,
  } = useGetCoaching(coachingId);

      const addCoaching = useAddCoaching();
  const updateGeneral = useUpdateCoachingInfo(coachingId);

  const updateAddress = useUpdateCoachingAddress(coachingId);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box maxWidth={1000} mx="auto" py={4}>
      <Typography variant="h4" fontWeight={700}>
        Complete Coaching Profile
      </Typography>

     

      <Stack spacing={3}>

          <PersonalInfoCardForm user = {user} />
        

        
        
      </Stack>
    </Box>
  );
};

export default CompleteCoachingProfile;
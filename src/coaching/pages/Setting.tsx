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

const CompleteCoachingProfile = () => {
    const [editingGeneral, setEditingGeneral] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false)

  const user = useAuthStore((state) => state.user);
    const coachingId = user?.coachingIds?.[0] ?? "";
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
        
          <CoachingInformationCard
            editing ={editingGeneral}
            loading={addCoaching.isPending}
            coaching={{
              name: coaching?.name ?? "",
              ownerName: coaching?.ownerName ?? "",
              ownerEmail: coaching?.ownerEmail ?? "",
              ownerContactNumber: coaching?.ownerContactNumber ?? "",
            }}
            onEdit={() => {
                 setEditingGeneral(true)

            }}
            onCancel={() => {
              setEditingGeneral(false)
            }}
            onSubmit={(values) =>{
              updateGeneral.mutate({...values})
            }}
          />
        

        
          <AddressCard
            editing ={editingAddress}
            loading={updateAddress.isPending}
            address={ coaching?.address ?? {
                  country: "",
                  state: "",
                  city: "",
                  area: "",
                  pinCode: "",
                  postOffice: "",
                  building: "",
                  houseNo: "",
                } }
            onEdit={() => {
              setEditingAddress(true)
            }}
            onCancel={() => {
              setEditingAddress(false)
            }}
            onSubmit={(values) =>{
              updateAddress.mutate({
                ...values
              })
            }}
          />
        
      </Stack>
    </Box>
  );
};

export default CompleteCoachingProfile;
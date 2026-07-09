// src/coaching/pages/Setting.tsx

import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";

import CoachingInformationCard from "../components/CoachingInformationCard";
import AddressCard from "../components/AddressCard";

import { Role, useAuthStore } from "../../store/auth.store";
import {
  useAddCoaching,
  useGetCoaching,
  useUpdateCoachingAddress,
  useUpdateCoachingInfo
} from "../../hooks/coaching.hooks";
import { Navigate } from "react-router-dom";


const Setting = () => {

  const [editingGeneral, setEditingGeneral] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false)
  const user = useAuthStore((state) => state.user);
   

 
  

  const coachingId = user?.coachingIds?.[0] ?? "";
  

  const {
    data: coaching,
    isLoading,
  } = useGetCoaching(coachingId);

  console.log("coachngId",coachingId)
  console.log("coaching ",coaching)
  ;

  const addCoaching = useAddCoaching();

  const updateGeneral = useUpdateCoachingInfo(coachingId);

  const updateAddress = useUpdateCoachingAddress(coachingId);

  if (!user) return <Navigate to ="/login" replace />
  

 

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        py={10}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      maxWidth={1000}
      mx="auto"
      py={4}
      
    >
      {/* Header */}

      <Typography
        variant="h4"
        fontWeight={700}
      >
        Coaching Settings
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Manage your coaching profile.
      </Typography>

      <Stack spacing={3}>

        {!coaching && (
          <>
          <CoachingInformationCard
            editing
            loading={addCoaching.isPending}
            coaching={{
              name: "",
              ownerName: user.name,
              ownerEmail: user.email,
              ownerContactNumber: user.contactNumber,
            }}
            onEdit={() => {}}
            onCancel={() => {}}
            onSubmit={(values) => {
              addCoaching.mutate({
                ...values,
                address: {
                  country: "",
                  state: "",
                  city: "",
                  area: "",
                  pinCode: "",
                  postOffice: "",
                  building: "",
                  houseNo: "",
                },
              });
            }}
          />
              


</>
          
        )}


        {coaching && (
          <>
            <CoachingInformationCard
              coaching={{
                name: coaching.name,
                ownerName: coaching.ownerName,
                ownerEmail: coaching.ownerEmail,
                ownerContactNumber:
                  coaching.ownerContactNumber,
              }}
              editing={editingGeneral}
              loading={updateGeneral.isPending}
              onEdit={() =>
                setEditingGeneral(true)
              }
              onCancel={() =>
                setEditingGeneral(false)
              }
              onSubmit={(values) => {
                updateGeneral.mutate({
                  ...values,
                });

                setEditingGeneral(false);
              }}
            />

            <AddressCard
              address={coaching.address}
              editing={editingAddress}
              loading={updateAddress.isPending}
              onEdit={() =>
                setEditingAddress(true)
              }
              onCancel={() =>
                setEditingAddress(false)
              }
              onSubmit={(values) => {
                updateAddress.mutate({
                  ...values,
                });

                setEditingAddress(false);
              }}
            />
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Setting;
// src/pages/otherPages/TeacherProfile.tsx
import React, { useState } from 'react'
import { Role, useAuthStore } from '../../store/auth.store';
import { Navigate } from 'react-router-dom';
import AddressCard from '../../coaching/components/AddressCard';
import PersonalInfo from '../../Components/PersonalInfo';
import { Box, Stack, Typography } from '@mui/material';
import { useUpdateUserBasicInfo } from '../../hooks/user.hook';


const TeacherProfile = () => {
     const [editingGeneral, setEditingGeneral] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false)
  const user = useAuthStore((state) => state.user);
     const updateBasicInfo = useUpdateUserBasicInfo(user?.id);

   if (!user) return <Navigate to ="/login" replace />

  

  if(user?.role !== Role.TEACHER){
   return  <Navigate to ="/" replace />
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
        User Settings
      </Typography>

      

      <Stack spacing={3}>

        {user && (
          <>
            <PersonalInfo
              user={{
                name: user.name,
                email: user.email,
                contactNumber: user.contactNumber,
                id:user?.id,
                role:user.role,
                coachingIds : user.coachingIds,
                batchIds:user.batchIds,
                address: user.address
              }}
              editing={editingGeneral}
              loading={false}
              onEdit={() =>
                setEditingGeneral(true)
              }
              onCancel={() =>
                setEditingGeneral(false)
              }
              onSubmit={(values) => {
                updateBasicInfo.mutate(values);
              }}
               
            />

            <AddressCard
              address={user.address}
              editing={editingAddress}
              loading={false}
              onEdit={() =>
                setEditingAddress(true)
              }
              onCancel={() =>
                setEditingAddress(false)
              }
              onSubmit={(values) => {
                              
                console.log("address",values)
                setEditingAddress(false);
              }}
            />
          </>
        )}
      </Stack>
    </Box>

                    
  )
}

export default TeacherProfile
// src/pages/otherPages/TeacherProfile.tsx
import React, { useState } from 'react'
import { Role, useAuthStore } from '../../store/auth.store';
import { Navigate } from 'react-router-dom';
import AddressCard from '../../coaching/components/AddressCard';
import PersonalInfo from '../../Components/PersonalInfo';
import { Autocomplete, Box, Card, Stack, TextField, Typography } from '@mui/material';
import { useTeacherStore } from '../../store/teacher.store';
import { useGetTeacher } from '../../hooks/teacher.hooks';
import { useGetUser } from '../../hooks/auth.hooks';
import { Grid } from 'lucide-react';
import TeacherSider from '../../Components/sideBars/TeacherSider';
import TeacherSpecificFormCard from '../../Components/ui/TeacherSpecificFormCard';


const TeacherProfile = () => {
     const [editingGeneral, setEditingGeneral] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false)

    const user = useAuthStore((state) => state.user);
  const teacherId = user?.id ?? "";
    const {data:teacher, isPending} = useGetTeacher(teacherId) 
    console.log("user",user);
    console.log("teacher",teacher)


  if(!user) return <Navigate to= {"/login"} replace />
  



   if (!teacher) return <Navigate to ="/login" replace />
   if(isPending) return <div>...pending</div>

  
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
        teacher Settings
      </Typography>

      

      <Stack spacing={3}>

        {teacher && user && (
          <>
            <PersonalInfo
                user={{
                name: user.name,
                email: user.email,
                contactNumber: user.contactNumber,
                id:user?.id,
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
                //
              }}
               
            />

            <AddressCard
              address={teacher.address}
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

            <TeacherSpecificFormCard />
          </>
        )}
      </Stack>
    </Box>

                    
  )
}

export default TeacherProfile
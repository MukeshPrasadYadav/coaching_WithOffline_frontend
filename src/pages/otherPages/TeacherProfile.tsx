// src/pages/otherPages/TeacherProfile.tsx
import React, { useState } from 'react'
import { Role, useAuthStore, type User } from '../../store/auth.store';
import { Navigate } from 'react-router-dom';
import { Box, Card, Stack, Typography } from '@mui/material';
// import { useGetTeacher } from '../../hooks/teacher.hooks';
import TeacherSpecificFormCard from '../../Components/ui/TeacherSpecificFormCard';
import PersonalnfoCardForm from '../../coaching/components/PersonalnfoCardForm';
import PersonalInfoCardForm from '../../coaching/components/PersonalnfoCardForm';


const TeacherProfile = () => {

    const user = useAuthStore((state) => state.user);
  const teacherId = user?.id ?? "";
    // const {data:teacher, isPending} = useGetTeacher(teacherId) 
    // console.log("user",user);
    // console.log("teacher",teacher)
    // const completeUser : User = { 
    //   name : user?.name ?? "",
    //         email : user?.email ?? "",
    //         contactNumber : user?.contactNumber ?? "",
    //         address : teacher?.address


    // }
    // console.log("complete user",completeUser)


  if(!user) return <Navigate to= {"/login"} replace />
  



   if (!teacher && !isPending) return <Navigate to ="/login" replace />
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
            <PersonalInfoCardForm user = {completeUser} />
            {/* <TeacherSpecificFormCard teacher = {teacher} /> */}
          </>
        )}
      </Stack>
    </Box>

                    
  )
}

export default TeacherProfile
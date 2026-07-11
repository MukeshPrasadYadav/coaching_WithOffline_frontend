// src/pages/otherPages/CompleteProfile.tsx
// src/coaching/pages/CompleteProfile.tsx
import React, { lazy } from 'react'
import { Role, useAuthStore } from '../../store/auth.store';
import { Navigate } from 'react-router-dom';

const TeacherProfile = lazy(() => import("./CompleteTeacherProfile"));
const CoachngProfile = lazy(() => import("./CompleteCoachingProfile"));
const StudentProfile = lazy(()=> import("./CompleteStudentProfile"));
const ParentProfile = lazy(() => import("./CompleteParentProfile"));

const CompleteProfile = () => {
    const user = useAuthStore(state => state.user)
      if(!user) return null;
    
      const role: Role = user.role;
      if(user.isProfileCompleted) {
        return <Navigate to ="/home" replace />
      }


  return (
    <>
    {role === Role.ADMIN && <CoachngProfile />}
    {role === Role.TEACHER && <TeacherProfile />}
    {role === Role.STUDENT && <StudentProfile />}
    {role === Role.PARENT && <ParentProfile />}
    </>
  )
}

export default CompleteProfile